<template>
  <match-history v-model="settings" v-model:shots="shots" :can="match.author_id === userId" :users="users" />

  <div h-full flex flex-col>
    <n-progress border-radius="0" type="line" :status="percent === 100 ? 'success' : undefined" :percentage="percent" indicator-placement="inside" />
    <n-page-header m2 @back="$router.push({ name: 'index' })">
      <template #title>
        MATCH #{{ id }}
      </template>
      <!--<template #subtitle></template>-->

      <template #extra>
        <!--<n-dropdown :options="options" placement="bottom-start">-->
        <n-button text @click="settings = !settings">
          <template #icon>
            <centered-icon i-ph-monitor-play text-xl />
          </template>
        </n-button>
      </template>
    </n-page-header>

    <div flex-1 m2>
      <!--shots: {{ shots }}<br />-->
      <leaderboard :chosed="chosed" :shots="shots" @accept="choise => accept(choise)" />
    </div>

    <!--
      <div>
      scores: {{ scores }}<br />
      </div>
    -->

    <userboard :shots="shots" :users="users" />

    <keyboard :disable="!IAmPlaying || percent === 100" />
  </div>
</template>

<script setup lang="ts">
import { Howl } from 'howler'
import type { RealtimeSubscription } from '@supabase/supabase-js'
import { handleLoading, result, results, supabase, toggleLoading, userId } from '~/composables'
import type { Choise, Match, Profile, Shot } from '~/types'

const message = useMessage()

onBeforeUnmount(() => { result.value = [] })

let newUserSubscription: RealtimeSubscription
let newResultSubscription: RealtimeSubscription
onUnmounted(async () => {
  newUserSubscription && await supabase.removeSubscription(newUserSubscription)
  newResultSubscription && await supabase.removeSubscription(newResultSubscription)
})

const props = defineProps<{ id: string }>()

const sound = new Howl({ src: ['sium.mp3'] })
const match = ref<Partial<Match>>({})
const settings = ref(false)
// const scores = ref<Record<string, number>>({})
const users = ref<Partial<Profile>[]>([])
const shots = ref<Shot[]>([])

const IAmPlaying = computed(() => users.value.some(u => u.user_id === userId.value))
const percent = computed(() => users.value.length === 0 ? 0 : Math.round(100 * shots.value.length / (users.value.length * 13)))
const chosed = computed(() => shots.value.filter(s => s.user_id === userId.value).map(s => s.choise))

async function addMissingPlayer (player_id: string) {
  await supabase.from('match_player')
    .insert({ // upsert
      match_id: props.id,
      user_id: player_id,
    })
}

async function loadPlayers () {
  const { data } = await supabase.from('match_player')
    .select('score,user:profiles(user_id,avatar_url,full_name)')
    .eq('match_id', props.id)

  if (data) {
    for (const { score, user } of data) {
      console.log('--- ~ loadPlayers ~ score', score)
      // TODO: scores.value[user.user_id] = score
      users.value.push(user)
    }
  }
}

async function loadShots () {
  const { data, count } = await supabase.from('match_player_shot')
    .select('id,result,choise,user_id,value)', { count: 'exact' })
    .eq('match_id', props.id)

  if (data) shots.value = data

  return count ?? 0
}

function subscribeForNewPlayers () {
  newUserSubscription = supabase
    .from(`match_player:match_id=eq.${props.id}`)
    .on('INSERT', async payload => {
      const { data } = await supabase.from('profiles')
        .select('user_id,avatar_url,full_name,online')
        .eq('user_id', payload.new.user_id)
        .single()
      if (data) {
        users.value.push(data)
        message.success('Nuovo Player aggiunto')
      }
    })
    .subscribe()
}

function subscribeForNewResults () {
  newResultSubscription = supabase
    .from<Shot>(`match_player_shot:match_id=eq.${props.id}`)
    .on('INSERT', payload => {
      shots.value.push(payload.new)
      // TODO if match finish set winner? non qui
    })
    .on('DELETE', payload => {
      const idx = shots.value.findIndex(s => s.id === payload.old.id)
      shots.value.splice(idx, 1)
    })
    .subscribe()
}

async function loadMatch () {
  const { data } = await supabase.from<Match>('matches').select('*').eq('id', props.id).single()
  if (data) match.value = data
}

async function accept (choise: Choise) {
  await handleLoading(async () => {
    if (result.value.length !== 5) return
    if (chosed.value.includes(choise)) return
    import.meta.env.PROD && choise === 'sium' && results.value[choise] === 50 && sound.play()
    const { error } = await supabase.from('match_player_shot')
      .insert({
        match_id: props.id,
        user_id: supabase.auth.user()?.id, // props.users[currentUser.value]
        result: result.value,
        value: results.value[choise],
        choise,
      })
    if (!error) {
      // if (currentUser.value === props.users.length - 1) currentUser.value = 0
      // else currentUser.value++
      result.value = []
    }
  })
}

onMounted(async () => {
  toggleLoading()

  await loadMatch()

  const count = await loadShots()

  if (count === 0) subscribeForNewPlayers()

  // TODO if (count !== users.value.length * 13)
  subscribeForNewResults()

  await loadPlayers()

  if (!IAmPlaying.value) {
    count === 0
      ? await addMissingPlayer(userId.value)
      : message.warning('La partita è gia iniziata')
  }

  toggleLoading()
})
</script>

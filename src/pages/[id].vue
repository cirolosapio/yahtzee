<template>
  <match-settings v-model="settings" v-model:shots="shots" :can="match.author_id === userId" :users="users" />

  <div h-full flex flex-col>
    <n-progress border-radius="0" type="line" :status="percent === 100 ? 'success' : undefined" :percentage="percent" indicator-placement="inside" />

    <n-page-header m2 @back="$router.push({ name: 'index' })">
      <template #title>
        MATCH #{{ id }}
      </template>
      <!--<template #subtitle></template>-->

      <template #extra>
        <div flex space-x-2>
          <n-tooltip>
            <template #trigger>
              <n-button v-if="isSupported" text circle @click="toggleWakeLock()">
                <template #icon>
                  <centered-icon v-if="isActive" i-mdi-lock />
                  <centered-icon v-else i-mdi-lock-open-variant />
                </template>
              </n-button>
            </template>
            {{ isActive ? 'Disabilita': 'Abilita' }} Wake Lock
          </n-tooltip>

          <n-button text circle @click="toggle()">
            <centered-icon v-if="isFullscreen" text-xl i-mdi-fullscreen-exit />
            <centered-icon v-else text-xl i-mdi-fullscreen />
          </n-button>

          <n-button text @click="settings = !settings">
            <template #icon>
              <centered-icon i-ph-gear-fill text-xl />
            </template>
          </n-button>
        </div>
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

    <numeric-keyboard v-if="match.keyboard === 'numeric'" :disable="!IAmPlaying || percent === 100" />
    <casual-keyboard v-else :disable="!IAmPlaying || percent === 100" />
  </div>
</template>

<script setup lang="ts">
import type { RealtimeSubscription } from '@supabase/supabase-js'
import sium from '/sium.mp3'
import he_sium from '/he_sium.mp3'
import { useSound } from '@vueuse/sound'
import { handleLoading, picked, result, results, shaked, supabase, toggleLoading, userId } from '~/composables'
import type { Choise, Match, Profile, Shot } from '~/types'

const message = useMessage()
const { toggle, isFullscreen } = useFullscreen()

onBeforeUnmount(() => { result.value = [] })

let newUserSubscription: RealtimeSubscription
let newResultSubscription: RealtimeSubscription
onUnmounted(async () => {
  newUserSubscription && await supabase.removeSubscription(newUserSubscription)
  newResultSubscription && await supabase.removeSubscription(newResultSubscription)
})

const props = defineProps<{ id: string }>()

const siumSound = useSound(sium)
const heSiumSound = useSound(he_sium)
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

// TODO
async function loadPlayers () {
  const { data } = await supabase.from('match_player')
    .select('score,user:profiles(user_id,avatar_url,full_name)')
    // .select('score,user_id')
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
  if (result.value.length !== 5) return
  if (chosed.value.includes(choise)) return
  await handleLoading(async () => {
    if (import.meta.env.PROD && choise === 'sium') results.value[choise] === 50 ? siumSound.play() : heSiumSound.play()
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

      if (match.value.keyboard === 'casual') {
        picked.value = []
        shaked.value = 0
      }

      result.value = []
    }
  })
}

const { isSupported, isActive, request, release } = useWakeLock()
function toggleWakeLock () {
  isActive.value ? release() : request('screen')
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
      ? (userId.value && await addMissingPlayer(userId.value))
      : message.warning('La partita è gia iniziata')
  }

  toggleLoading()
})
</script>

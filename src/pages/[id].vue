<template>
  <div h-full flex flex-col>
    <n-progress :border-radius="0" type="line" :percentage="percent" indicator-placement="inside" />
    <n-page-header m2 @back="$router.push({ name: 'index' })">
      <template #title>
        MATCH #{{ id }}
      </template>
      <template #subtitle />
      <!--
        <template #extra>
        <n-dropdown :options="options" placement="bottom-start">
        <n-button text>
        <centered-icon i-ph-dots-three-vertical text-2xl />
        </n-button>
        </n-dropdown>
        </template>
      -->
    </n-page-header>

    <div flex-1 m2>
      <!--shots: {{ shots }}<br />-->
      <!--_shots: {{ _shots }}<br />-->
      <leaderboard @accept="choise => accept(choise)" />
    </div>

    <!--
      <div>
      scores: {{ scores }}<br />
      </div>
    -->

    <userboard :shots="shots" :users="users" />

    <keyboard v-model="result" :disable="!IAmPlaying" />
  </div>
</template>

<script setup lang="ts">
import type { RealtimeSubscription } from '@supabase/supabase-js'
import { result, results, supabase, toggleLoading, userId } from '~/composables'
import type { Choise, Profile, Shot } from '~/types'

const message = useMessage()

let newUserSubscription: RealtimeSubscription
let newResultSubscription: RealtimeSubscription
onUnmounted(async () => {
  newUserSubscription && await supabase.removeSubscription(newUserSubscription)
  newResultSubscription && await supabase.removeSubscription(newResultSubscription)
})

const props = defineProps<{ id: string }>()

// const scores = ref<Record<string, number>>({})
const users = ref<Partial<Profile>[]>([])
const shots = ref<Shot[]>([])

const IAmPlaying = computed(() => users.value.some(u => u.user_id === userId.value))
const percent = computed(() => users.value.length === 0 ? 0 : Math.round(100 * shots.value.length / (users.value.length * 13)))

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
      // scores.value[user.user_id] = score
      users.value.push(user)
    }
  }
}

async function loadShots () {
  const { data, count } = await supabase.from('match_player_shot')
    .select('result,choise,user_id,value)', { count: 'exact' })
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
      // shots.value[payload.new.user_id][payload.new.choise] = payload.new.result
      // TODO if match finish set winner?
    })
    .subscribe()
}

async function accept (choise: Choise) {
  if (result.value.length !== 5) return
  // if (alreadyChosen.value(choise)) return
  const { error } = await supabase.from('match_player_shot')
    .insert({
      match_id: props.id,
      user_id: supabase.auth.user()?.id, // props.users[currentUser.value]
      result: result.value,
      value: '123456'.includes(choise) ? results.value.face(choise) : results.value[choise],
      choise,
    })
  if (!error) {
    // if (currentUser.value === props.users.length - 1) currentUser.value = 0
    // else currentUser.value++
    result.value = []
  }
}

onMounted(async () => {
  toggleLoading()

  const count = await loadShots()

  if (count === 0) subscribeForNewPlayers()

  if (count !== users.value.length * 13) subscribeForNewResults()

  await loadPlayers()

  console.log('--- ~ onMounted ~ IAmPlaying.value', IAmPlaying.value)
  if (!IAmPlaying.value) {
    count === 0
      ? await addMissingPlayer(userId.value)
      : message.warning('La partita è gia iniziata')
  }

  toggleLoading()
})
</script>

<template>
  <div h-full flex flex-col>
    <div flex-grow>
      <matches-list v-if="matches.length > 0" :matches="matches" @destroy="(id, idx) => destroyMatch(id, idx)" />
      <n-result v-else-if="!isLoading" mt24 status="418" title="Ancora nessuna partita" description="You know life is always ridiculous">
        <template #footer>
          <n-button size="small" secondary @click="createNewMatch()">Crea</n-button>
        </template>
      </n-result>
    </div>
    <div v-if="matches.length > 0" m2>
      <n-button block type="primary" @click="createNewMatch()">Nuova Partita</n-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { RealtimeSubscription } from '@supabase/supabase-js'
import { destroy, isLoading, supabase, toggleLoading, userId } from '~/composables'
import type { KeyboardType, Match, Profile } from '~/types'

const $router = useRouter()
const dialog = useDialog()

let matchesSub: RealtimeSubscription
const matches = ref<Match[]>([])

onMounted(async () => {
  toggleLoading()

  const { data } = await supabase.from('matches')
    .select('*,players:match_player(user:profiles(full_name,avatar_url))')
    .order('created_at', { ascending: false })

  if (data) {
    for (const { players, ...rest } of data) {
      matches.value.push({
        ...rest,
        players: players.map(({ user }: { user: Profile }) => ({ src: user.avatar_url })),
      })
    }
  }

  matchesSub = supabase.from('matches')
    .on('INSERT', async payload => {
      // const { data } = await supabase.from<{ match_id: number; user: Profile }>('match_player')
      //   .select('user:profiles(full_name,avatar_url)')
      //   .eq('match_id', payload.new.id)
      matches.value.unshift({
        ...payload.new,
        // players: data?.map(({ user: { avatar_url } }) => ({ src: avatar_url })),
      })
    })
    .on('DELETE', payload => { matches.value = matches.value.filter(match => match.id !== payload.old.id) })
    .subscribe()

  toggleLoading()
})

onUnmounted(async () => { matchesSub && await supabase.removeSubscription(matchesSub) })

async function destroyMatch (match_id: number, idx: number) {
  toggleLoading()
  await Promise.all([
    destroy('match_player_shot', match_id, 'match_id'),
    destroy('match_player', match_id, 'match_id'),
  ])
  await destroy('matches', match_id)
  matches.value?.splice(idx, 1)
  toggleLoading()
}

async function createNewMatch () {
  dialog.success({
    showIcon: false,
    title: 'Crea una nuova partita',
    content: 'Come vuoi che siano gestiti i lanci?',
    negativeText: 'Dadi',
    positiveText: 'Tastiera',
    positiveButtonProps: { quaternary: true, text: true },
    negativeButtonProps: { quaternary: true, text: true },
    onPositiveClick: async () => { await storeMatch('numeric') },
    onNegativeClick: async () => { await storeMatch('casual') },
  })
}

async function storeMatch (keyboard: KeyboardType) {
  const { data } = await supabase.from('matches').insert({ author_id: userId.value, keyboard }).single()
  data && await $router.push({ name: 'id', params: { id: data.id } })
}
</script>

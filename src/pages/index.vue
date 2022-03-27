<template>
  <div h-full flex flex-col>
    <div flex-1>
      <matches-list v-if="matches.length > 0" :matches="matches" @destroy="(id, idx) => destroyMatch(id, idx)" />
      <n-empty v-else mt24 description="Nessun match aperto">
        <template #extra>
          <n-button size="small" secondary @click="createNewMatch()">
            Crea
          </n-button>
        </template>
      </n-empty>
    </div>
    <div v-if="matches.length > 0" m2>
      <n-button block type="primary" @click="createNewMatch()">Nuova Partita</n-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { destroy, supabase, userId } from '~/composables'
import type { Match } from '~/types'

const $router = useRouter()

const matches = ref<Match[]>([])

onMounted(async () => {
  const { data } = await supabase.from('matches')
    .select('*,players:match_player(user:profiles(full_name,avatar_url))')
    .order('created_at', { ascending: false })
  if (data) {
    for (const { players, ...rest } of data) {
      matches.value.push({
        ...rest,
        players: players.map(({ user }) => ({
          full_name: user.full_name,
          src: user.avatar_url,
        })),
      })
    }
  }
  // matches.value = await refresh('matches', '*,author:author_id(full_name,avatar_url)')
})

async function destroyMatch (match_id: number, idx: number) {
  await Promise.all([
    destroy('match_player_shot', match_id, 'match_id'),
    await destroy('match_player', match_id, 'match_id'),
  ])
  await destroy('matches', match_id)
  matches.value?.splice(idx, 1)
}

async function createNewMatch () {
  const { data } = await supabase.from('matches').insert({ author_id: userId.value }).single()
  data && await $router.push({ name: 'id', params: { id: data.id } })
}
</script>

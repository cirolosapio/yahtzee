<template>
  <div m2 space-x-2 flex justify-around>
    <n-badge v-for="user in users" :key="user.user_id" :show="user.online" dot type="success">
      <n-avatar size="large" round :src="user.avatar_url" @click="selected = user.user_id" />
    </n-badge>
  </div>

  <n-drawer :show="Boolean(selected)" placement="bottom" height="400" @update-show="selected = undefined">
    <n-drawer-content closable>
      <template #header>
        <div flex items-center>
          <n-avatar round :src="u?.avatar_url" />
          <div ml2 mr1>{{ u?.full_name }}</div>
        </div>
      </template>
      <scoreboard :score="score" />
    </n-drawer-content>
  </n-drawer>
</template>

<script setup lang="ts">
import type { Profile, Shot } from '~/types'

const props = defineProps<{
  users: Partial<Profile>[]
  shots: Shot[]
}>()

const selected = ref<string>()

const u = computed(() => props.users.find(u => u.user_id === selected.value))

const score = computed(() => props.shots.reduce((res, shot) => {
  res[shot.choise] = shot.value
  return res
}, {
  1: 0,
  2: 0,
  3: 0,
  4: 0,
  5: 0,
  6: 0,
  tris: 0,
  poker: 0,
  full: 0,
  smallStair: 0,
  bigStair: 0,
  sium: 0,
  sum: 0,
}))
</script>

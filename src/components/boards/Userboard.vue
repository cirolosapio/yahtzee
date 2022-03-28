<template>
  <div m2 space-x-2 flex justify-around>
    <n-badge v-for="user in users" :key="user.user_id" :show="user.online" dot type="success">
      <n-avatar size="large" round :src="user.avatar_url" @click="selected = user.user_id" />
    </n-badge>
  </div>

  <n-drawer :show="Boolean(selected)" placement="bottom" height="400" @update-show="selected = undefined">
    <n-drawer-content closable>
      <template #header>
        <div w-full flex items-center>
          <n-avatar round :src="u?.avatar_url" />
          <div mx2>{{ u?.full_name }}</div>
          <div text="gray md">
            {{ total }}
            <n-badge v-if="bonus > 0" type="success" value="bonus" />
          </div>
        </div>
      </template>
      <scoreboard :score="score" />
    </n-drawer-content>
  </n-drawer>
</template>

<script setup lang="ts">
import type { Choise, Profile, Shot } from '~/types'

const props = defineProps<{
  users: Partial<Profile>[]
  shots: Shot[]
}>()

const selected = ref<string>()

const u = computed(() => props.users.find(u => u.user_id === selected.value))

const score = computed(() => props.shots.reduce((res, shot) => {
  if (shot.user_id === selected.value) res[shot.choise] = shot.value
  return res
}, {} as Record<Choise, number>))

const bonus = computed(() => {
  const leftTotal = props.shots.reduce((res, { choise, value }) => {
    if ('123456'.includes(choise)) res += value
    return res
  }, 0)
  return leftTotal > 62 ? 35 : 0
})

const total = computed(() => Object.values(score.value).reduce((res, v) => res + v, 0) + bonus.value)
</script>

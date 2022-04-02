<template>
  <div grid grid-cols-5 text-center my2>
    <div v-for="(n, idx) in models[matchId]" :key="`res-${idx}`">{{ n }}</div>
  </div>
  <div grid grid-cols-3>
    <n-button v-for="face in faces" :key="`face-${face}`" :disabled="disable" m2 type="primary" :secondary="isDark" @click="add(face)">{{ face }}</n-button>
  </div>
</template>

<script setup lang="ts">
import type { Face } from '~/types'
import { isDark, models } from '~/composables'

const props = defineProps<{
  matchId: string
  disable: boolean
}>()

const faces: Face[] = [1, 2, 3, 4, 5, 6]

async function add (n: Face) {
  const res = [...models.value[props.matchId], n]
  models.value[props.matchId].length === 5 && res.shift()
  models.value[props.matchId] = res
}
</script>

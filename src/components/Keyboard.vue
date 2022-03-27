<template>
  <div grid grid-cols-5 text-center my2>
    <div v-for="n in modelValue" :key="n">{{ n }}</div>
  </div>
  <div grid grid-cols-3>
    <n-button v-for="n in faces" :key="n" :disabled="disable" m2 type="primary" :secondary="isDark" @click="add(n)">{{ n }}</n-button>
  </div>
</template>

<script setup lang="ts">
import type { Face, Result } from '~/types'
import { isDark } from '~/composables'

const faces: Face[] = [1, 2, 3, 4, 5, 6]

const props = defineProps<{
  modelValue: Result
  disable: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', result: Result): void
}>()

function add (n: Face) {
  const res = [...props.modelValue, n]
  props.modelValue.length === 5 && res.shift()
  emit('update:modelValue', res)
}
</script>

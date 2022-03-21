<template>
  <n-tooltip v-if="$route.name !== name" :placement="placement">
    <template #trigger>
      <n-button text circle size="large" @click="name ? $router.push({ name }) : $emit('click')">
        <template #icon>
          <centered-icon :class="icon" />
        </template>
      </n-button>
    </template>
    {{ label }}
  </n-tooltip>
</template>

<script setup lang="ts">
import type { PopoverPlacement } from 'naive-ui'

defineEmits<{
  (e: 'click'): void
}>()

defineProps<{
  icon: string
  name?: string
  label: string
  placement?: PopoverPlacement
}>()
</script>

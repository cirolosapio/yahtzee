<template>
  <div m2>
    <n-button-group flex>
      <div grid grid-cols-5 w-full>
        <n-button v-for="(n, idx) in model" :key="`res-${idx}`" type="primary" v-bind="isPicked(idx)" :disabled="disable" @click="toggle(idx)">
          <!--
            <n-number-animation
            ref="numberAnimationInstRef"
            :from="9.96"
            :to="0.07"
            :active="false"
            :precision="2"
            />
          -->
          {{ n }}
        </n-button>
      </div>
    </n-button-group>

    <div mt2>
      <n-button :disabled="disable || shotComplete" block type="primary" secondary @click="shake()">
        LANCIA
        <template v-if="[1, 2].includes(shaked)">
          {{ shaked }}/3
        </template>
      </n-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { model, picked, shaked } from '~/composables'
import type { Face } from '~/types'

defineProps<{ disable: boolean }>()

const shotComplete = computed(() => shaked.value === 3)

const isPicked = computed(() => (n: number) => ({ [picked.value.includes(n) ? 'primary' : 'quaternary']: true }))

function toggle (idx: number) {
  if (shotComplete.value) return
  picked.value = picked.value.includes(idx)
    ? picked.value.filter(n => n !== idx)
    : [...picked.value, idx]
}

function shake () {
  for (let i = 0; i < 5; i++) if (!picked.value.includes(i)) model.value[i] = Math.floor(6 * Math.random()) + 1 as Face
  if (shaked.value) shaked.value++
  else shaked.value = 1

  if (shotComplete) picked.value = []
}
</script>

<template>
  <div m2>
    <n-button-group flex>
      <div grid grid-cols-5 w-full>
        <n-button v-for="(n, idx) in models[matchId]" :key="`res-${idx}`" type="primary" v-bind="isPicked(idx)" :disabled="disable" @click="toggle(idx)">
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
        <template v-if="[1, 2].includes(shakeds[matchId])">
          {{ shakeds[matchId] }}/3
        </template>
      </n-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { models, pickeds, shakeds } from '~/composables'
import type { Face } from '~/types'

const props = defineProps<{
  matchId: string
  disable: boolean
}>()

const shotComplete = computed(() => shakeds.value[props.matchId] === 3)

const isPicked = computed(() => (n: number) => ({ [pickeds.value[props.matchId].includes(n) ? 'primary' : 'quaternary']: true }))

function toggle (idx: number) {
  if (shotComplete.value) return
  pickeds.value[props.matchId] = pickeds.value[props.matchId].includes(idx)
    ? pickeds.value[props.matchId].filter(n => n !== idx)
    : [...pickeds.value[props.matchId], idx]
}

function shake () {
  for (let i = 0; i < 5; i++) if (!pickeds.value[props.matchId].includes(i)) models.value[props.matchId][i] = Math.floor(6 * Math.random()) + 1 as Face
  if (shakeds.value[props.matchId]) shakeds.value[props.matchId]++
  else shakeds.value[props.matchId] = 1

  if (shotComplete) pickeds.value[props.matchId] = []
}
</script>

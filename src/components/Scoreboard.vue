<template>
  <n-table size="small">
    <tbody text-center>
      <tr>
        <th text-2xl><centered-icon i-ph-dice-one-fill /></th>
        <td>{{ z(score[1]) }}</td>
        <th text-xl>3</th>
        <td>{{ z(score.tris) }}</td>
      </tr>
      <tr>
        <th text-2xl><centered-icon i-ph-dice-two-fill /></th>
        <td>{{ z(score[2]) }}</td>
        <th text-xl>4</th>
        <td>{{ z(score.poker) }}</td>
      </tr>
      <tr>
        <th text-2xl><centered-icon i-ph-dice-three-fill /></th>
        <td>{{ z(score[3]) }}</td>
        <th text-xl><centered-icon i-ph-house-fill /></th>
        <td>{{ z(score.full) }}</td>
      </tr>
      <tr>
        <th text-2xl><centered-icon i-ph-dice-four-fill /></th>
        <td>{{ z(score[4]) }}</td>
        <th text-2xl><centered-icon i-mdi-stairs text-lg /></th>
        <td>{{ z(score.smallStair) }}</td>
      </tr>
      <tr>
        <th text-2xl><centered-icon i-ph-dice-five-fill /></th>
        <td>{{ z(score[5]) }}</td>
        <th text-2xl><centered-icon i-mdi-stairs /></th>
        <td>{{ z(score.bigStair) }}</td>
      </tr>
      <tr>
        <th text-2xl><centered-icon i-ph-dice-six-fill /></th>
        <td>{{ z(score[6]) }}</td>
        <th text-2xl><centered-icon i-ph-star-fill /></th>
        <td>{{ z(score.sium) }}</td>
      </tr>
      <tr>
        <td />
        <td />
        <th text-2xl><centered-icon i-ph-question-fill /></th>
        <td>{{ z(score.sum) }}</td>
      </tr>
    </tbody>
  </n-table>
</template>

<script setup lang="ts">
import type { Choise } from '~/types'

defineProps<{ score: Record<Partial<Choise>, number> }>()

const z = (n: number) => n === 0 ? undefined : n
</script>

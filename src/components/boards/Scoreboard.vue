<template>
  <n-table size="small">
    <tbody text-center>
      <tr>
        <th text-2xl><centered-icon i-ph-dice-one-fill /></th>
        <td>{{ score[1] }}</td>
        <th text-xl><centered-icon i-tabler-box-multiple-3 /></th>
        <td>{{ score.tris }}</td>
      </tr>
      <tr>
        <th text-2xl><centered-icon i-ph-dice-two-fill /></th>
        <td>{{ score[2] }}</td>
        <th text-xl><centered-icon i-tabler-box-multiple-4 /></th>
        <td>{{ score.poker }}</td>
      </tr>
      <tr>
        <th text-2xl><centered-icon i-ph-dice-three-fill /></th>
        <td>{{ score[3] }}</td>
        <th text-xl><centered-icon i-ph-house-fill /></th>
        <td>{{ score.full }}</td>
      </tr>
      <tr>
        <th text-2xl><centered-icon i-ph-dice-four-fill /></th>
        <td>{{ score[4] }}</td>
        <th text-xl><centered-icon i-mdi-stairs /></th>
        <td>{{ score.smallStair }}</td>
      </tr>
      <tr>
        <th text-2xl><centered-icon i-ph-dice-five-fill /></th>
        <td>{{ score[5] }}</td>
        <th text-xl><centered-icon i-medical-icon-i-stairs /></th>
        <td>{{ score.bigStair }}</td>
      </tr>
      <tr>
        <th text-2xl><centered-icon i-ph-dice-six-fill /></th>
        <td>{{ score[6] }}</td>
        <th text-xl><centered-icon i-ph-star-fill /></th>
        <td>{{ score.sium }}</td>
      </tr>
      <tr>
        <td colspan="2">
          {{ left }}
          <template v-if="bonus">+ {{ bonus }}</template>
          + {{ total -bonus -left }}
        </td>
        <th text-2xl><centered-icon i-ph-question-fill /></th>
        <td>{{ score.sum }}</td>
      </tr>
    </tbody>
  </n-table>
</template>

<script setup lang="ts">
import type { Choise } from '~/types'
// import { icons } from '~/composables'

defineProps<{
  score: Record<Choise, number>
  left: number
  bonus: number
  total: number
}>()
</script>

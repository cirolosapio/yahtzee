<template>
  <div m2 space-y-3>
    <div flex space-x-2>
      <n-input-number v-for="n in 5" :key="n" v-model:value="result[n-1]" :show-button="false" placeholder="" :min="1" :max="6" />
    </div>

    <n-table>
      <tbody text-center>
        <tr>
          <th text-2xl><centered-icon i-ph-dice-one-fill /></th>
          <td>{{ results.face(1) }}</td>
          <th text-2xl>3</th>
          <td>{{ results.tris }}</td>
        </tr>
        <tr>
          <th text-2xl><centered-icon i-ph-dice-two-fill /></th>
          <td>{{ results.face(2) }}</td>
          <th text-2xl>4</th>
          <td>{{ results.poker }}</td>
        </tr>
        <tr>
          <th text-2xl><centered-icon i-ph-dice-three-fill /></th>
          <td>{{ results.face(3) }}</td>
          <th text-2xl><centered-icon i-ph-house-fill /></th>
          <td>{{ results.full }}</td>
        </tr>
        <tr>
          <th text-2xl><centered-icon i-ph-dice-four-fill /></th>
          <td>{{ results.face(4) }}</td>
          <th text-2xl><centered-icon i-mdi-stairs text-lg /></th>
          <td>{{ results.smallStairs }}</td>
        </tr>
        <tr>
          <th text-2xl><centered-icon i-ph-dice-five-fill /></th>
          <td>{{ results.face(5) }}</td>
          <th text-2xl><centered-icon i-mdi-stairs /></th>
          <td>{{ results.bigStairs }}</td>
        </tr>
        <tr>
          <th text-2xl><centered-icon i-ph-dice-six-fill /></th>
          <td>{{ results.face(6) }}</td>
          <th text-2xl><centered-icon i-ph-star-fill /></th>
          <td>{{ results.sium }}</td>
        </tr>
        <tr>
          <td />
          <td />
          <th text-2xl><centered-icon i-ph-question-fill /></th>
          <td>{{ results.sum }}</td>
        </tr>
      </tbody>
    </n-table>
  </div>
</template>

<script setup lang="ts">
import type { Result } from '~/composables'
import { useResults } from '~/composables'

const result = ref<Result>([1, 1, 1, 1, 1])

const { results } = useResults(result)
</script>

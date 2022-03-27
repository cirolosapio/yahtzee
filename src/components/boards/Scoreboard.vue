<template>
  <n-table size="small">
    <tbody text-center>
      <tr>
        <th text-2xl><centered-icon :class="icons[1]" /></th>
        <td>{{ score[1] }}</td>
        <th text-xl><centered-icon :class="icons.tris" /></th>
        <td>{{ score.tris }}</td>
      </tr>
      <tr>
        <th text-2xl><centered-icon :class="icons[2]" /></th>
        <td>{{ score[2] }}</td>
        <th text-xl><centered-icon :class="icons.poker" /></th>
        <td>{{ score.poker }}</td>
      </tr>
      <tr>
        <th text-2xl><centered-icon :class="icons[3]" /></th>
        <td>{{ score[3] }}</td>
        <th text-xl><centered-icon :class="icons['full']" /></th>
        <td>{{ score.full }}</td>
      </tr>
      <tr>
        <th text-2xl><centered-icon :class="icons[4]" /></th>
        <td>{{ score[4] }}</td>
        <th text-xl><centered-icon :class="icons.smallStair" /></th>
        <td>{{ score.smallStair }}</td>
      </tr>
      <tr>
        <th text-2xl><centered-icon :class="icons[5]" /></th>
        <td>{{ score[5] }}</td>
        <th text-xl><centered-icon :class="icons.bigStair" /></th>
        <td>{{ score.bigStair }}</td>
      </tr>
      <tr>
        <th text-2xl><centered-icon :class="icons[6]" /></th>
        <td>{{ score[6] }}</td>
        <th text-xl><centered-icon :class="icons.sium" /></th>
        <td>{{ score.sium }}</td>
      </tr>
      <tr>
        <td />
        <td />
        <th text-2xl><centered-icon i-ph-question-fill /></th>
        <td>{{ score.sum }}</td>
      </tr>
    </tbody>
  </n-table>
</template>

<script setup lang="ts">
import type { Choise } from '~/types'
import { icons } from '~/composables'

defineProps<{ score: Record<Partial<Choise>, number> }>()

const z = (n: number) => n === 0 ? undefined : n
</script>

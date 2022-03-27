<template>
  <n-table size="small" shadow shadow-lg>
    <!--
      <thead text-center>
      <th style="padding: 0">
      <n-button block text circle @click="$router.push({ name: 'index' })">
      <centered-icon i-ph-arrow-left-bold />
      </n-button>
      </th>
      <th style="padding: 5px 0 0 0">
      <n-avatar round :src="user?.avatar_url" />
      </th>
      <th style="padding: 0" />
      <th style="padding: 5px 0 0 0">
      <n-avatar round :src="user?.avatar_url" />
      </th>
      </thead>
    -->
    <tbody text-center>
      <tr>
        <th text-2xl @click="$emit('accept', '1')"><centered-icon :class="klass('1')" i-ph-dice-one-fill /></th>
        <td>{{ z(results.face(1)) }}</td>
        <th text-xl @click="$emit('accept', 'tris')"><div :class="klass('tris')">3</div></th>
        <td>{{ z(results.tris) }}</td>
      </tr>
      <tr>
        <th text-2xl @click="$emit('accept', '2')"><centered-icon :class="klass('2')" i-ph-dice-two-fill /></th>
        <td>{{ z(results.face(2)) }}</td>
        <th text-xl @click="$emit('accept', 'poker')"><div :class="klass('poker')">4</div></th>
        <td>{{ z(results.poker) }}</td>
      </tr>
      <tr>
        <th text-2xl @click="$emit('accept', '3')"><centered-icon :class="klass('3')" i-ph-dice-three-fill /></th>
        <td>{{ z(results.face(3)) }}</td>
        <th text-xl @click="$emit('accept', 'full')"><centered-icon :class="klass('full')" i-ph-house-fill /></th>
        <td>{{ z(results.full) }}</td>
      </tr>
      <tr>
        <th text-2xl @click="$emit('accept', '4')"><centered-icon :class="klass('4')" i-ph-dice-four-fill /></th>
        <td>{{ z(results.face(4)) }}</td>
        <th text-2xl @click="$emit('accept', 'smallStair')"><centered-icon :class="klass('smallStair')" i-mdi-stairs text-lg /></th>
        <td>{{ z(results.smallStair) }}</td>
      </tr>
      <tr>
        <th text-2xl @click="$emit('accept', '5')"><centered-icon :class="klass('5')" i-ph-dice-five-fill /></th>
        <td>{{ z(results.face(5)) }}</td>
        <th text-2xl @click="$emit('accept', 'bigStair')"><centered-icon :class="klass('bigStair')" i-mdi-stairs /></th>
        <td>{{ z(results.bigStair) }}</td>
      </tr>
      <tr>
        <th text-2xl @click="$emit('accept', '6')"><centered-icon :class="klass('6')" i-ph-dice-six-fill /></th>
        <td>{{ z(results.face(6)) }}</td>
        <th text-2xl @click="$emit('accept', 'sium')"><centered-icon :class="klass('sium')" i-ph-star-fill /></th>
        <td>{{ z(results.sium) }}</td>
      </tr>
      <tr>
        <td />
        <td />
        <th text-2xl @click="$emit('accept', 'sum')"><centered-icon :class="klass('sum')" i-ph-question-fill /></th>
        <td>{{ z(results.sum) }}</td>
      </tr>
    </tbody>
  </n-table>
</template>

<script setup lang="ts">
import type { Choise } from '~/types'
import { results } from '~/composables'

defineEmits<{ (e: 'accept', choise: Choise): void }>()

const z = (n: number) => n === 0 ? undefined : n

const klass = (c: Choise) => ''
// const klass = computed(() => (choise: Choise) => ({
//   'text-green-700': alreadyChosen.value(choise) && result.value.length < 5,
//   'text-green': alreadyChosen.value(choise) && result.value.length === 5,
//   'text-gray-400': !alreadyChosen.value(choise) && result.value.length < 5,
// }))
</script>

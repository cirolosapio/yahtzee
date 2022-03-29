<template>
  <div v-if="isDark" i-openmoji-github />
  <div v-else i-logos-github-icon />
  <!--<div i-codicon-github-inverted  />-->
</template>

<script setup lang="ts">
import { isDark } from '~/composables'
</script>

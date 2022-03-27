
<template>
  <n-layout-footer bordered p2>
    <nav flex items-center justify-center>
      <!--
        <div v-if="loggedIn" flex items-center>
        <n-avatar round :src="user?.avatar_url" />
        <div ml2 mr1>{{ user?.full_name }}</div>
        <div i-ph-circle-fill :class="isOnline ? 'text-green' : 'text-red'" text-xs />
        </div>
      -->

      <n-tooltip>
        <template #trigger>
          <n-button text circle size="large" @click="toggleDark()">
            <template #icon>
              <centered-icon v-if="isDark" i-carbon-moon />
              <centered-icon v-else i-carbon-sun />
            </template>
          </n-button>
        </template>
        {{ isDark ? 'Tema Chiaro' : 'Tema Scuro' }}
      </n-tooltip>

      <!--
        <n-button href="https://github.com/heartbeatLV/yahtzee" text circle size="large" rel="noopener noreferrer" target="_blank">
        <template #icon>
        <centered-icon i-carbon-logo-github />
        </template>
        </n-button>
      -->
    </nav>
  </n-layout-footer>
</template>

<script setup lang="ts">
import { isDark, toggleDark } from '~/composables'
</script>

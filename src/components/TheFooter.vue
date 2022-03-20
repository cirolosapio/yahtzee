
<template>
  <n-layout-footer bordered p2>
    <nav flex items-center :class="loggedIn ? 'justify-between' : 'justify-center'">
      <div v-if="loggedIn" flex items-center>
        <n-avatar round :src="user?.avatar_url" />
        <div mx2>{{ user?.full_name }}</div>
        <div v-if="isOnline" i-ph-circle-fill text-green text-xs />
      </div>

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
import { isDark, loggedIn, toggleDark, user } from '~/composables'
const { isOnline } = useNetwork ()
</script>

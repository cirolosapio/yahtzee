
<template>
  <n-layout-footer bordered p2>
    <nav flex items-center :class="loggedIn ? 'justify-between' : 'justify-center'">
      <div v-if="loggedIn" flex items-center>
        <n-avatar round :src="user?.avatar_url" />
        <div mx2>{{ user?.full_name }}</div>
        <div i-ph-circle-fill :class="isOnline ? 'text-green' : 'text-red'" text-xs />
      </div>

      <div flex items-center space-x-2>
        <template v-if="loggedIn">
          <n-tooltip v-if="$route.name !== 'index'">
            <template #trigger>
              <n-button text circle size="large" @click="$router.push('/')">
                <template #icon>
                  <centered-icon i-ph:game-controller-duotone />
                </template>
              </n-button>
            </template>
            Game
          </n-tooltip>

          <n-tooltip v-if="$route.name !== 'users'">
            <template #trigger>
              <n-button text circle size="large" @click="$router.push('users')">
                <template #icon>
                  <centered-icon i-ph-user-list-duotone />
                </template>
              </n-button>
            </template>
            Utenti
          </n-tooltip>

          <n-tooltip v-if="$route.name !== 'roadmap'">
            <template #trigger>
              <n-button text circle size="large" @click="$router.push('roadmap')">
                <template #icon>
                  <centered-icon i-ph-graduation-cap-duotone />
                </template>
              </n-button>
            </template>
            Roadmap
          </n-tooltip>
          <n-divider vertical />
        </template>

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
      </div>
    </nav>
  </n-layout-footer>
</template>

<script setup lang="ts">
import { isDark, loggedIn, toggleDark, user } from '~/composables'
const { isOnline } = useNetwork()
</script>

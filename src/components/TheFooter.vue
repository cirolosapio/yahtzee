
<template>
  <n-layout-footer bordered text="center" py2>
    <nav text-xl inline-flex gap-2>
      <n-button v-if="loggedIn" text circle @click="logout()">
        <centered-icon>
          <div i-carbon-logout />
        </centered-icon>
      </n-button>

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

      <a class="icon-btn" i-carbon-logo-github rel="noopener noreferrer" href="https://github.com/heartbeatLV/yahtzee" target="_blank" title="GitHub" />
    </nav>
  </n-layout-footer>
</template>

<script setup lang="ts">
import { isDark, supabase, toggleDark, toggleLoading, useAuth } from '~/composables'

const $router = useRouter()
const { loggedIn } = useAuth()

async function logout () {
  try {
    toggleLoading()
    await supabase.auth.signOut()
    await $router.push('login')
  } finally { toggleLoading() }
}
</script>

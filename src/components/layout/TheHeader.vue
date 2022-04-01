<template>
  <n-layout-header bordered>
    <div class="mx4 my2" flex items-center :class="loggedIn ? 'justify-between' : 'justify-center'">
      <n-gradient-text text-2xl @click="showMessage()">
        SI<template v-for="n in u" :key="n">U</template>M
      </n-gradient-text>

      <div flex items-center space-x-2>
        <template v-if="loggedIn">
          <n-tabs size="small" :value="String($route.name)" type="bar" @update:value="name => $router.push({ name })">
            <n-tab name="index">
              <div text-4 i-ph-game-controller-duotone />
            </n-tab>
            <n-tab name="users">
              <div text-4 i-ph-user-list-duotone />
            </n-tab>
            <n-tab name="roadmap">
              <div text-4 i-ph-graduation-cap-duotone />
            </n-tab>
          </n-tabs>

          <n-divider vertical />

          <n-button text circle @click="toggle()">
            <centered-icon v-if="isFullscreen" text-xl i-mdi-fullscreen-exit />
            <centered-icon v-else text-xl i-mdi-fullscreen />
          </n-button>

          <menu-item placement="left" label="Chiudi Sessione" icon="i-uiw-logout" @click="logout()" />
        </template>
      </div>
    </div>
  </n-layout-header>
</template>

<script setup lang="ts">
import { NInputNumber } from 'naive-ui'
import { loggedIn, supabase, toggleLoading } from '~/composables'

const { toggle, isFullscreen } = useFullscreen()

const $router = useRouter()
const dialog = useDialog()
const message = useMessage()

const u = ref(2)

function showMessage () {
  if (import.meta.env.PROD) {
    dialog.info({
      closable: false,
      title: 'Quante U?',
      maskClosable: false,
      onMaskClick: () => { message.warning('Rispun') },
      positiveText: 'Conferma',
      content: () => h(NInputNumber, {
        value: u.value,
        min: 2,
        max: 100,
        onUpdateValue: val => {
          if (val) u.value = val
        },
      }),
    })
  }
}

async function logout () {
  try {
    toggleLoading()
    await supabase.auth.signOut()
    await $router.push('login')
  } finally { toggleLoading() }
}
</script>

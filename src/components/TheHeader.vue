<template>
  <n-layout-header bordered>
    <div class="mx4 my2" flex items-center :class="loggedIn ? 'justify-between' : 'justify-center'">
      <n-gradient-text text-2xl @click="showMessage()">
        SI<template v-for="n in u" :key="n">U</template>M
      </n-gradient-text>

      <n-tooltip v-if="loggedIn" placement="left">
        <template #trigger>
          <n-button text circle size="large" @click="logout()">
            <template #icon>
              <centered-icon i-uiw-logout />
            </template>
          </n-button>
        </template>
        Chiudi Sessione
      </n-tooltip>
    </div>
  </n-layout-header>
</template>

<script setup lang="ts">
import { NInputNumber } from 'naive-ui'
import { loggedIn, supabase, toggleLoading } from '~/composables'

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
      onMaskClick: () => {
        message.warning('Rispun')
      },
      positiveText: 'Conferma',
      content: () => h(NInputNumber, {
        value: u.value,
        min: 2,
        max: 10,
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

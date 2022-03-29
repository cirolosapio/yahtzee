<template>
  <div w-full mt-24 grid gap-2 gap-y-44 grid-cols-3>
    <n-button v-for="provider in providers" :key="provider" text-4xl :disabled="!['github', 'google'].includes(provider)" text circle @click="signInWith(provider)">
      <centered-icon>
        <provider-icon :name="provider" hover:scale-125 transition duration-300 />
      </centered-icon>
    </n-button>
  </div>
</template>

<script setup lang="ts">
import type { Provider } from '@supabase/supabase-js'
import { loggedIn, supabase, toggleLoading } from '~/composables'

const message = useMessage()
const $router = useRouter()

watchEffect(async () => {
  loggedIn.value && await $router.push('/')
})

const providers: Provider[] = ['github', 'google', 'twitter', 'discord', 'twitch', 'spotify'] // facebook, azure

async function signInWith (provider: Provider) {
  toggleLoading()
  const { error } = await supabase.auth.signIn({ provider }, { redirectTo: import.meta.env.VITE_APP_DOMAIN })
  error && message.error(error?.message)
}
</script>

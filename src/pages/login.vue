<template>
  <div w-full mt-24 grid gap-2 gap-y-44 grid-cols-3>
    <n-button v-for="provider in providers" :key="provider" text-4xl :disabled="provider !=='github'" text circle @click="signInWith(provider)">
      <centered-icon>
        <provider-icon :name="provider" hover:scale-125 transition duration-300 />
      </centered-icon>
    </n-button>
  </div>
</template>

<script setup lang="ts">
import type { Provider } from '@supabase/supabase-js'
import { isDark, supabase, toggleLoading } from '~/composables'

const $router = useRouter()
const message = useMessage()

const providers: Provider[] = ['github', 'google', 'twitter', 'discord', 'twitch', 'spotify'] // facebook, azure

async function signInWith (provider: Provider) {
  toggleLoading()
  const { error } = await supabase.auth.signIn({ provider }, { redirectTo: import.meta.env.VITE_APP_DOMAIN })
  error && message.error(error?.message)
}
</script>

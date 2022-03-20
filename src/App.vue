<template>
  <n-config-provider :theme="isDark ? darkTheme : null" :locale="itIT" :date-locale="dateItIT">
    <n-notification-provider>
      <pwa-notification />
    </n-notification-provider>

    <n-spin :show="isLoading">
      <div flex flex-col h-screen>
        <n-message-provider>
          <n-dialog-provider>
            <the-header />
          </n-dialog-provider>
        </n-message-provider>

        <n-layout flex-grow>
          <n-layout embedded>
            <main font-sans text="gray-700 dark:gray-200">
              <n-message-provider>
                <router-view />
              </n-message-provider>
            </main>
          </n-layout>
        </n-layout>

        <the-footer />
      </div>
    </n-spin>
  </n-config-provider>
</template>

<script setup lang="ts">
import { darkTheme, dateItIT, itIT } from 'naive-ui'
import { isDark, isLoading, supabase, user } from '~/composables'

const visibility = useDocumentVisibility()

watchEffect(async () => {
  if (user.value?.user_id) {
    await supabase
      .from('profiles')
      .update({ online: visibility.value === 'visible' })
      .eq('user_id', user.value.user_id)
  }
})
</script>

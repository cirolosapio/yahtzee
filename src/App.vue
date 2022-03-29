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

        <main flex-grow font-sans text="gray-700 dark:gray-200">
          <n-message-provider>
            <n-dialog-provider>
              <router-view />
            </n-dialog-provider>
          </n-message-provider>
        </main>

        <the-footer />
      </div>
    </n-spin>
  </n-config-provider>
</template>

<script setup lang="ts">
import { darkTheme, dateItIT, itIT } from 'naive-ui'
import { isDark, isLoading, supabase, userId } from '~/composables'

const visibility = useDocumentVisibility()

watch(
  visibility,
  async state => {
    if (userId.value) {
      await supabase
        .from('profiles')
        .update({ online: state === 'visible' })
        .eq('user_id', userId.value)
    }
  },
)
</script>

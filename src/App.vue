<template>
  <n-config-provider :theme-overrides="overrides" :theme="isDark ? darkTheme : null" :locale="itIT" :date-locale="dateItIT">
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
import type { GlobalThemeOverrides } from 'naive-ui'
import { darkTheme, dateItIT, itIT } from 'naive-ui'
import { isDark, isLoading } from '~/composables'

const overrides: GlobalThemeOverrides = {
  Tabs: {
    tabGapSmallBar: '10px',
  },
}
</script>

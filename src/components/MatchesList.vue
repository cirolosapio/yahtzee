<template>
  <div space-y-2 m2>
    <n-list bordered>
      <n-list-item v-for="(match, idx) in matches" :key="match.id" @click="$router.push({ name: 'id', params: { id: match.id } })">
        <!--
          <template #prefix>
          <n-avatar :src="match.author.avatar_url" circle />
          </template>
        -->

        <n-page-header>
          <!--{{ useTimeAgo(match.created_at) }}-->
          <template #title>
            MATCH #{{ match.id }}
          </template>
          <template #subtitle>
            <n-avatar-group :options="match.players" />
          </template>
        </n-page-header>

        <template #suffix>
          <div flex flex-col justify-center>
            <n-button v-if="itsMe || match.author_id === userId" text @click.stop="$emit('destroy', match.id, idx)">
              <template #icon>
                <centered-icon i-carbon-close text-xl />
              </template>
            </n-button>
          </div>
        </template>
      </n-list-item>
    </n-list>
  </div>
</template>

<script setup lang="ts">
import { itsMe, userId } from '~/composables'
import type { Match } from '~/types'

defineEmits<{ (e: 'destroy', match_id: number, idx: number): void }>()
defineProps<{ matches: Match[] }>()
</script>

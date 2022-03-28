<template>
  <n-drawer :show="modelValue" width="90%" @update-show="v => $emit('update:modelValue', v)">
    <n-drawer-content closable title="Storico">
      <n-list>
        <n-list-item v-for="(shot, idx) in shots" :key="shot.id">
          <div flex space-x-2 items-center>
            <div :class="icons[shot.choise]" />
            <div flex-1>{{ shot.value }}</div>
            <div text="gray .65rem">{{ shot.result }}</div>
          </div>

          <template #prefix>
            <div flex flex-col justify-center>
              <n-avatar size="small" round :src="getAvatar(shot.user_id)" />
            </div>
          </template>

          <template v-if="can" #suffix>
            <div flex flex-col justify-center>
              <n-button text circle @click="destroyShot(shot.id, idx)">
                <template #icon>
                  <centered-icon i-ph-x />
                </template>
              </n-button>
            </div>
          </template>
        </n-list-item>
      </n-list>
    </n-drawer-content>
  </n-drawer>
</template>

<script setup lang="ts">
import { icons, supabase } from '~/composables'
import type { Profile, Shot } from '~/types'

const emit = defineEmits<{
  (e: 'update:modelValue', v: boolean): void
  (e: 'update:shots', shots: Shot[]): void
}>()

const props = defineProps<{
  users: Partial<Profile>[]
  can: boolean
  modelValue: boolean
  shots: Shot[]
}>()

const getAvatar = computed(() => (userId: string) => props.users.find(u => u.user_id === userId)?.avatar_url)

async function destroyShot (shot_id: number, idx: number) {
  await supabase.from('match_player_shot').delete().eq('id', shot_id)
  const s = [...props.shots]
  s.splice(idx, 1)
  emit('update:shots', s)
}
</script>

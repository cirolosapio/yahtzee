<template>
  <div m2>
    <div text-h3 mb2>Utenti online: {{ onlineUsers }}</div>
    <n-table size="small">
      <thead>
        <tr>
          <th style="width: 5px" />
          <th>Utenti</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.user_id">
          <td>
            <div i-ph-circle-fill :class="user.online ? 'text-green' : 'text-red'" text-xs />
          </td>
          <td>{{ user.full_name }}</td>
        </tr>
      </tbody>
    </n-table>
  </div>
</template>

<script setup lang="ts">
import type { RealtimeSubscription } from '@supabase/supabase-js'
import type { User } from '~/composables'
import { supabase, toggleLoading } from '~/composables'

const message = useMessage()

let userSub: RealtimeSubscription
const users = ref<User[]>([])

const onlineUsers = computed(() => users.value.reduce((tot, { online }) => tot + (online ? 1 : 0), 0))

async function refresh () {
  toggleLoading()
  const { data } = await supabase.from('profiles').select('user_id,full_name,online')
  if (data) users.value = data
  toggleLoading()
}

onMounted(async () => {
  refresh()

  userSub = supabase
    .from('profiles')
    .on('INSERT', payload => {
      users.value.push(payload.new)
      message.info('Nuovo utente registrato!')
    })
    .on('UPDATE', payload => {
      const idx = users.value.findIndex(user => user.user_id === payload.new.user_id)
      if (idx !== -1) {
        payload.new.online && message.info(`${users.value[idx].full_name} è tornato online!`)
        users.value[idx] = payload.new
      }
    })
    .subscribe()
})

onUnmounted(async () => {
  await supabase.removeSubscription(userSub)
})
</script>

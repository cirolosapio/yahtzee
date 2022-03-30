<template>
  <div m2>
    <div text-h3 mb2>Utenti online: {{ userStore.onlineUsersCount }}</div>
    <n-table size="small">
      <thead>
        <tr>
          <th style="width: 5px" />
          <th>Utenti</th>
          <th />
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in userStore.users" :key="user.user_id">
          <td>
            <div i-ph-circle-fill :class="user.online ? 'text-green' : 'text-red'" text-xs />
          </td>
          <td>{{ user.full_name }}</td>
          <td>{{ user.email }}</td>
        </tr>
      </tbody>
    </n-table>
  </div>
</template>

<script setup lang="ts">
import { useUsersStore } from '~/stores'

// const message = useMessage()
const userStore = useUsersStore()
</script>

import type { RealtimeSubscription } from '@supabase/supabase-js'
import { acceptHMRUpdate, defineStore } from 'pinia'
import { supabase, toggleLoading, userId } from '~/composables'
import type { Profile } from '~/types'

interface State {
  users: Profile[]
  sub?: RealtimeSubscription
}

export const useUsersStore = defineStore('users', {
  state: () => ({
    users: [],
    sub: undefined,
  }) as State,

  getters: {
    onlineUsersCount: state => state.users.reduce((tot, { online }) => tot + (online ? 1 : 0), 0),
    userLabel: state => state.users.find(u => u.user_id === userId.value)?.full_name,
  },

  actions: {
    async init () {
      toggleLoading()
      const { data } = await supabase.from<Profile>('profiles').select('user_id,full_name,email,online')
      if (data) this.users = data
      this.subscribe()
      toggleLoading()
    },
    // async unsubscribe () { this.sub && await supabase.removeSubscription(this.sub as RealtimeSubscription) },
    subscribe () {
      this.sub = supabase
        .from('profiles')
        .on('INSERT', payload => {
          this.users.push(payload.new)
          // message.info('Nuovo utente registrato!')
        })
        .on('UPDATE', payload => {
          const idx = this.users.findIndex(user => user.user_id === payload.new.user_id)
          if (idx !== -1) {
            // payload.new.online && message.info(`${users.value[idx].full_name} è tornato online!`)
            this.users[idx] = payload.new
          }
        })
        .subscribe()
    },
  },
})

import.meta.hot && import.meta.hot.accept(acceptHMRUpdate(useUsersStore, import.meta.hot))

import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { createPinia } from 'pinia'
import routes from 'virtual:generated-pages'
import App from './App.vue'
import { supabase, userId } from '~/composables'
import { useUsersStore } from '~/stores'

import '@unocss/reset/tailwind.css'
import './styles/main.css'
import 'uno.css'
import './styles/redo.css'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach(async (to, _, next) => {
  const loggedIn = !!supabase.auth.user()

  if (loggedIn && to.name === 'login') next({ name: 'index' })
  else if (loggedIn && to.name !== 'login') next()
  else if (!loggedIn && to.name !== 'login') next({ name: 'login' })
  // else if(!loggedIn && to.name === 'login') next()
  else next()
})

createApp(App)
  .use(router)
  .use(createPinia())
  .mount('#app')

const usersStore = useUsersStore()
usersStore.init().then(() => {
  watch(
    useDocumentVisibility(),
    async state => {
      if (userId.value) {
        await supabase
          .from('profiles')
          .update({ online: state === 'visible' })
          .eq('user_id', userId.value)
      }
    },
  )
})

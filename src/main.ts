import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import routes from 'virtual:generated-pages'
import App from './App.vue'
import { useAuth } from '~/composables'

import '@unocss/reset/tailwind.css'
import './styles/main.css'
import 'uno.css'
import './styles/redo.css'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach(async (to, from, next) => {
  const { loggedIn } = useAuth()

  if (loggedIn && to.name === 'login') next({ name: 'index' })
  else if (loggedIn && to.name !== 'login') next()
  else if (!loggedIn && to.name !== 'login') next({ name: 'login' })
  // else if(!loggedIn && to.name === 'login') next()
  else next()
})

createApp(App)
  .use(router)
  .mount('#app')

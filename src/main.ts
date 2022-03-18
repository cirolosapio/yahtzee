import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import routes from 'virtual:generated-pages'
import App from './App.vue'
// import { supabase } from '~/composables'

import '@unocss/reset/tailwind.css'
import './styles/main.css'
import 'uno.css'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// router.beforeEach(async (to, from, next) => {
//   const authRequired = to.matched.some(record => record.meta.requiresAuth)
//   const loggedIn = !!supabase.auth.user()

//   if (authRequired && !loggedIn) next({ name: 'login' })
//   else if (!authRequired && loggedIn && to.name !== 'all') next({ name: 'index' })
//   else next()
// })

createApp(App)
  .use(router)
  .mount('#app')

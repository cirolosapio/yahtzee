import { supabase } from '~/composables'

export interface User {
  user_id: string
  full_name: string
  avatar_url: string
  created_at: string
}

export const user = ref<User>()

export const loggedIn = computed(() => !!user.value)

supabase.auth.onAuthStateChange(async (_, session) => {
  if (session?.user?.id) {
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', session?.user?.id)
      .single()
    if (data) user.value = data
  } else user.value = undefined
})

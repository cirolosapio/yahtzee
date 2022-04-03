import { supabase } from '~/composables'

export const userId = ref<string|undefined>(supabase.auth.user()?.id)
export const loggedIn = computed(() => !!userId.value)

supabase.auth.onAuthStateChange(async (_, session) => {
  userId.value = session?.user?.id
  // if (session?.user?.id) {
  //   const { data } = await supabase
  //     .from('profiles')
  //     .select('*')
  //     .eq('user_id', session.user.id)
  //     .single()
  //   if (data) user.value = data
  // } else user.value = undefined
})

export const itsMe = computed(() => userId.value === '6904d179-4d6b-4ef6-90ab-f282292d5520')

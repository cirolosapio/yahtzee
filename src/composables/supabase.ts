import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
)

export async function refresh<T> (table: string, columns = '*'): Promise<T[]> {
  const { data } = await supabase
    .from<T>(table)
    .select(columns)
  return data ?? []
}

export async function destroy (table: string, value: number, column = 'id') {
  await supabase
    .from(table)
    .delete({ returning: 'minimal' })
    .eq(column, value)
}

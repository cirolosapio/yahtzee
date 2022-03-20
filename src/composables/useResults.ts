
import type { Ref } from 'vue'

export type Face = 1|2|3|4|5|6
export type Result = [Face, Face, Face, Face, Face]

export function useResults (result: Ref<Result>) {
  const sum = computed(() => result.value.reduce((t, val) => t + val, 0))

  const counters = computed(() =>
    result.value.reduce((res, face) => {
      res[face - 1]++
      return res
    }, Array.from({ length: 6 }, () => 0)),
  )

  const results = computed(() => ({
    face: (face: Face) => counters.value[face - 1] * face,
    tris: counters.value.some(v => v > 2) ? sum.value : 0,
    poker: counters.value.some(v => v > 3) ? sum.value : 0,
    full: (counters.value.includes(3) && counters.value.includes(2)) ? 25 : 0,
    smallStairs: counters.value.filter(v => v > 0).length > 3 ? 30 : 0,
    bigStairs: counters.value.filter(v => v > 0).length > 4 ? 40 : 0,
    sium: counters.value.filter(v => v === 0).length === 5 ? 50 : 0,
    sum: sum.value,
  }))

  return {
    results,
  }
}

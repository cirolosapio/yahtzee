import type { Face, Result } from '~/types'

export const result = ref<Result>([])

const sum = computed(() => result.value.reduce((t, val) => t + val, 0))
const sorted = computed(() => [...new Set(result.value)].sort((a, b) => a - b).join(''))
const counters = computed(() =>
  result.value.reduce((res, face) => {
    res[face - 1]++
    return res
  }, Array.from({ length: 6 }, () => 0)),
)

export const results = computed(() => ({
  face: (face: Face) => counters.value[face - 1] * face,
  tris: counters.value.some(v => v > 2) ? sum.value : 0,
  poker: counters.value.some(v => v > 3) ? sum.value : 0,
  full: (counters.value.includes(3) && counters.value.includes(2)) ? 25 : 0,
  smallStair: ['12345', '23456', '1234', '2345', '3456'].includes(sorted.value) ? 30 : 0,
  bigStair: ['12345', '23456'].includes(sorted.value) ? 40 : 0,
  sium: counters.value.filter(v => v === 0).length === 5 ? 50 : 0,
  sum: sum.value,
}))

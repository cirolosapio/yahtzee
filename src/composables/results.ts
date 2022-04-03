import type { Result } from '~/types'

const models = useStorage<Record<string, Result>>('models', {})
const pickeds = useStorage<Record<string, number[]>>('pickeds', {})
const shakeds = useStorage<Record<string, number>>('shakeds', {})

export const current = useStorage<string>('current', null)

export const model = computed({
  get: () => models.value[current.value],
  set: value => { models.value[current.value] = value },
})
export const picked = computed({
  get: () => pickeds.value[current.value],
  set: value => { pickeds.value[current.value] = value },
})
export const shaked = computed({
  get: () => shakeds.value[current.value],
  set: value => { shakeds.value[current.value] = value },
})

const sum = computed(() => model.value.reduce((t, val) => t + val, 0))
const sorted = computed(() => [...new Set(model.value)].sort((a, b) => a - b).join(''))
const counters = computed(() =>
  model.value.reduce((res, face) => {
    res[face - 1]++
    return res
  }, Array.from({ length: 6 }, () => 0)),
)

export const results = computed(() => ({
  // face: (face: Face) => counters.value[face - 1] * face,
  1: counters.value[0],
  2: counters.value[1] * 2,
  3: counters.value[2] * 3,
  4: counters.value[3] * 4,
  5: counters.value[4] * 5,
  6: counters.value[5] * 6,
  tris: counters.value.some(v => v > 2) ? sum.value : 0,
  poker: counters.value.some(v => v > 3) ? sum.value : 0,
  full: (counters.value.includes(3) && counters.value.includes(2)) ? 25 : 0,
  smallStair: ['1234', '12345', '12346', '2345', '23456', '3456'].includes(sorted.value) ? 30 : 0,
  bigStair: ['12345', '23456'].includes(sorted.value) ? 40 : 0,
  sium: (model.value.length === 5 && sorted.value.length === 1) ? 50 : 0,
  sum: sum.value,
}))

export const icons = {
  1: 'i-ph-dice-one-fill',
  2: 'i-ph-dice-two-fill',
  3: 'i-ph-dice-three-fill',
  4: 'i-ph-dice-four-fill',
  5: 'i-ph-dice-five-fill',
  6: 'i-ph-dice-six-fill',
  tris: 'i-tabler-box-multiple-3',
  poker: 'i-tabler-box-multiple-4',
  full: 'i-ph-house-fill',
  smallStair: 'i-mdi-stairs',
  bigStair: 'i-medical-icon-i-stairs',
  sium: 'i-ph-star-fill',
  sum: 'i-ph-question-fill',
}

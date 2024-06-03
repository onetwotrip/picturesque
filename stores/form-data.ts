import { onMount, onSet, task, atom } from 'nanostores'

import type { Response } from '~/api'

import { firstLoad, loading } from '~/stores/code'
import { sample } from '~/utils/sample'
import { picturesque } from '~/api'

export let verticals = [
  {
    name: 'Авиабилеты',
    value: 'avia',
  },
  {
    value: 'hotel',
    name: 'Отели',
  },
  {
    name: 'Ж/д билеты',
    value: 'railways',
  },
  {
    name: 'Автобусы',
    value: 'bus',
  },
  {
    value: 'activities',
    name: 'Экскурсии',
  },
  {
    name: 'Аренда авто',
    value: 'cars',
  },
  {
    name: 'Куда поехать',
    value: 'explore',
  },
]

export let vertical = atom(sample(verticals).value)
export let partnerName = atom(
  sample([
    'microsoft',
    'facebook',
    'netflix',
    'paypal',
    'amazon',
    'google',
    'apple',
  ]),
)
export let imageData = atom<Response['images'] | null>(null)
export let sizes = atom<Response['sizes'] | null>(null)
export let gradient = atom<string | null>(null)
export let image = atom<File | null>(null)
export let useImportant = atom(true)

onSet(image, ({ newValue, abort }) => {
  if (newValue) {
    task(async () => {
      loading.set(true)
      let response = await picturesque(newValue)
      gradient.set(response.gradient)
      imageData.set(response.images)
      sizes.set(response.sizes)
      loading.set(false)
      firstLoad.set(false)
    })
  } else {
    abort()
  }
})

onMount(image, () => {
  task(async () => {
    let response = await fetch(`/assets/${vertical.get()}.jpeg`)
    let blob = await response.blob()
    let file = new File([blob], 'default.jpg', { type: blob.type })
    image.set(file)
  })
})

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

export let gradientDirections = [
  {
    name: 'Слева направо',
    value: 'to right',
  },
  {
    name: 'Сверху вниз',
    value: 'to bottom',
  },
  {
    value: 'to right top',
    name: 'Слева вверх',
  },
  {
    value: 'to right bottom',
    name: 'Слева вниз',
  },
]

export let qualities = [65, 70, 75, 80, 85, 90, 95, 100] as const

export let vertical = atom(sample(verticals).value)
export let gradientDirection =
  atom<(typeof gradientDirections)[number]['value']>('to right')
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
export let gradients = atom<{
  [key: (typeof gradientDirections)[number]['value']]: string
} | null>(null)
export let image = atom<File | null>(null)
export let useImportant = atom(true)
export let quality = atom(80)

let getData = async (imageValue: File, qualityValue: number) => {
  loading.set(true)
  let response = await picturesque(imageValue, qualityValue)
  gradients.set(response.gradients)
  imageData.set(response.images)
  sizes.set(response.sizes)
  loading.set(false)
  firstLoad.set(false)
}

onSet(image, ({ newValue, abort }) => {
  if (newValue) {
    task(async () => {
      await getData(newValue, quality.get())
    })
  } else {
    abort()
  }
})

onSet(quality, ({ newValue }) => {
  let imageValue = image.get()
  if (imageValue) {
    task(async () => {
      await getData(imageValue, newValue)
    })
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

import { computed, task, atom } from 'nanostores'
import JSZip from 'jszip'

import { partnerName, imageData, vertical } from '~/stores/form-data'

export let loading = atom(true)

export let zip = computed(
  [vertical, partnerName, imageData],
  (verticalValue, partnerNameValue, imageDataValue) =>
    task(async () => {
      if (imageDataValue && partnerNameValue) {
        loading.set(true)
        let jszip = new JSZip()
        let folder = jszip.folder(partnerNameValue)
        let sizes = ['desktop', 'tablet', 'mobile'] as const
        sizes.forEach(size => {
          folder?.file(
            `background-${verticalValue}-${size}.webp`,
            imageDataValue.webp[size],
            { base64: true },
          )
        })
        let content = await jszip.generateAsync({ type: 'blob' })
        loading.set(false)

        return content
      }
      return null
    }),
)

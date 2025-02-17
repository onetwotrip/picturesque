import { computed, atom } from 'nanostores'

import {
  gradientDirection,
  useImportant,
  partnerName,
  gradients,
  vertical,
} from '~/stores/form-data'

let formatGradientString = (gradientValue: string): string => {
  let match = gradientValue.match(
    /(?<prefix>linear-gradient\()(?<content>.*?)\)/u,
  )

  if (!match?.groups) {
    throw new Error('Invalid gradient string')
  }

  let { content, prefix } = match.groups
  let directionAndColors = content.split(',').map(part => part.trim())

  let formattedDirectionAndColors = directionAndColors.join(',\n    ')

  return `${prefix}\n    ${formattedDirectionAndColors}\n  )`
}

export let firstLoad = atom(true)
export let loading = atom(true)

export let code = computed(
  [partnerName, vertical, useImportant, gradients, gradientDirection],
  (
    partnerNameValue,
    verticalValue,
    useImportantValue,
    gradientsValue,
    gradientDirectionValue,
    // eslint-disable-next-line typescript/max-params
  ): string => {
    let important = useImportantValue ? ' !important' : ''
    return `[data-wl-status="${verticalValue}_index"] .App__content:before {
  background-color: ${gradientsValue ? formatGradientString(gradientsValue[gradientDirectionValue]) : '#212121'}${important};
  background-image: url("https://static.onetwotrip.com/images/partners/${partnerNameValue}/background-${verticalValue}-mobile.webp")${important};
  background-repeat: no-repeat${important};
  background-position: center top${important};
  background-size: cover${important};

  @media (width >= 768px) {
    background-image: url("https://static.onetwotrip.com/images/partners/${partnerNameValue}/background-${verticalValue}-tablet.webp")${important};
  }

  @media (width >= 1200px) {
    background-image: url("https://static.onetwotrip.com/images/partners/${partnerNameValue}/background-${verticalValue}-desktop.webp")${important};
  }
}`
  },
)

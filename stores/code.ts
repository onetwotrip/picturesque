import { computed, atom } from 'nanostores'

import {
  useImportant,
  partnerName,
  vertical,
  gradient,
} from '~/stores/form-data'

let formatGradientString = (gradientValue: string): string => {
  let parts = gradientValue.match(/(linear-gradient\()(.*)(\))/)
  if (!parts) {
    throw new Error('Invalid gradient string')
  }

  let directionAndColors = parts[2].split(',').map(part => part.trim())
  let formattedDirectionAndColors = directionAndColors.join(',\n    ')

  return `${parts[1]}\n    ${formattedDirectionAndColors}\n  ${parts[3]}`
}

export let firstLoad = atom(true)
export let loading = atom(true)

export let code = computed(
  [partnerName, vertical, useImportant, gradient],
  (partnerNameValue, verticalValue, useImportantValue, gradientValue) => {
    let important = useImportantValue ? ' !important' : ''
    return `[data-wl-status="${verticalValue}_index"] .App__content:before {
  background-color: ${gradientValue ? formatGradientString(gradientValue) : '#212121'}${important};
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

import type { HighlighterCore } from 'shiki'

import { computed, onMount, atom, task } from 'nanostores'
import { getHighlighter } from 'shiki'

let shikiHighlighter = atom<HighlighterCore | null>(null)
let theme = 'ayu-dark'

export let shiki = computed([shikiHighlighter], highlighter => ({
  highlighter,
  theme,
}))

onMount(shikiHighlighter, () => {
  task(async () => {
    let highlighter = await getHighlighter({
      langs: [import('shiki/langs/scss.mjs')],
      themes: [theme],
    })

    shikiHighlighter.set(highlighter)
  })
})

import type { HighlighterCore, ThemeInput } from 'shiki'

import { createJavaScriptRegexEngine, getSingletonHighlighter } from 'shiki'
import { computed, onMount, atom, task } from 'nanostores'

import { colorTheme } from '~/stores/color-theme'
import ayuLight from '~/themes/ayu-light.json'
import ayuDark from '~/themes/ayu-dark.json'

let shikiHighlighter = atom<HighlighterCore | null>(null)
let lightTheme = 'ayu-light'
let darkTheme = 'ayu-dark'

let jsEngine = createJavaScriptRegexEngine()

export let shiki = computed(
  [shikiHighlighter, colorTheme],
  (highlighter, colorThemeValue) => ({
    theme: colorThemeValue === 'light' ? lightTheme : darkTheme,
    highlighter,
  }),
)

onMount(shikiHighlighter, () => {
  task(async () => {
    let highlighter = await getSingletonHighlighter({
      langs: [import('shiki/langs/scss.mjs')],
      engine: jsEngine,
      themes: [],
    })

    await highlighter.loadTheme(ayuLight as ThemeInput)
    await highlighter.loadTheme(ayuDark as ThemeInput)

    shikiHighlighter.set(highlighter)
  })
})

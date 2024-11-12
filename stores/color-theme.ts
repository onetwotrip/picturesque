import { persistentAtom } from '@nanostores/persistent'
import { onSet } from 'nanostores'

type Theme = 'light' | 'dark'

export let colorTheme = persistentAtom<Theme>('color-theme', 'dark')

export let toggleColorTheme = (): void => {
  colorTheme.set(colorTheme.get() === 'light' ? 'dark' : 'light')
}

let setColorTheme = (theme: Theme): void => {
  document.documentElement.dataset.theme = theme
}

onSet(colorTheme, ({ newValue }) => {
  setColorTheme(newValue)
})

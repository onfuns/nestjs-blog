import presetRemToPx from '@unocss/preset-rem-to-px'
import { presetWind } from '@unocss/preset-wind'
import { defineConfig, presetAttributify, presetIcons, presetUno } from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetWind(),
    presetIcons({ scale: 1.2, warn: true }),
    presetRemToPx({ baseFontSize: 4 }),
  ],
  shortcuts: [
    ['wh-full', 'w-full h-full'],
    ['flex-center', 'flex justify-center items-center'],
    ['flex-col', 'flex flex-col'],
    ['text-ellipsis', 'truncate'],
    ['absolute-center', 'absolute left-0 right-0 top-0 bottom-0'],
  ],
  rules: [
    [/^border-(.*)-(.*)-(.*)-(.*)$/, ([, c, d, e, f]) => ({ [`border-${c}`]: `${d}px ${e} ${f}` })],
  ],
  theme: {
    colors: {
      primary: 'var(--primary-color)',
    },
  },
})

import { extendTheme, type ThemeConfig } from '@chakra-ui/react'
import { colors } from './colors'
import { fonts, fontSizes, fontWeights } from './typography'
import { styles, shadows } from './styles'
import { components } from './components'

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
}

export const theme = extendTheme({
  config,
  colors,
  fonts,
  fontSizes,
  fontWeights,
  styles,
  shadows,
  components,
  radii: {
    '3xl': '1.5rem',
    '4xl': '2rem',
    '5xl': '2.5rem',
  },
})

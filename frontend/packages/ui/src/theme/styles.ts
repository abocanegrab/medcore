import { mode } from '@chakra-ui/theme-tools'
import type { StyleFunctionProps } from '@chakra-ui/theme-tools'

export const styles = {
  global: (props: StyleFunctionProps) => ({
    body: {
      bg: mode('bg.light', 'bg.dark')(props),
      color: mode('gray.800', 'gray.100')(props),
      fontFamily: 'body',
      backgroundImage: mode(
        'radial-gradient(at 0% 0%, hsla(211, 100%, 16%, 0.03) 0, transparent 50%), radial-gradient(at 50% 0%, hsla(211, 100%, 16%, 0.05) 0, transparent 50%), radial-gradient(at 100% 0%, hsla(350, 70%, 40%, 0.03) 0, transparent 50%)',
        'radial-gradient(at 0% 0%, hsla(211, 100%, 16%, 0.3) 0, transparent 50%), radial-gradient(at 50% 0%, hsla(211, 100%, 16%, 0.2) 0, transparent 50%), radial-gradient(at 100% 0%, hsla(350, 70%, 40%, 0.1) 0, transparent 50%)'
      )(props),
    },
    '*::placeholder': {
      color: mode('gray.400', 'gray.500')(props),
    },
    '::-webkit-scrollbar': {
      width: '5px',
      height: '5px',
    },
    '::-webkit-scrollbar-track': {
      background: 'transparent',
    },
    '::-webkit-scrollbar-thumb': {
      background: mode('#cbd5e1', '#334155')(props),
      borderRadius: '10px',
    },
  }),
}

export const shadows = {
  glass: '0 8px 32px 0 rgba(0, 39, 82, 0.10)',
  soft: '0 20px 40px -10px rgba(0, 39, 82, 0.08)',
  deep: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  glow: '0 0 20px rgba(0, 39, 82, 0.2)',
  'soft-lg': '0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -1px rgba(0,0,0,0.03)',
}

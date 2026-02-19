import { mode } from '@chakra-ui/theme-tools'
import type { StyleFunctionProps } from '@chakra-ui/theme-tools'

export const components = {
  Button: {
    baseStyle: {
      fontWeight: 'semibold',
      borderRadius: 'xl',
    },
    variants: {
      primary: (props: StyleFunctionProps) => ({
        bg: 'primary.500',
        color: 'white',
        _hover: { bg: 'primary.400' },
      }),
      accent: {
        bg: 'accent.500',
        color: 'white',
        _hover: { bg: 'accent.400' },
      },
      ghost: (props: StyleFunctionProps) => ({
        color: mode('gray.600', 'gray.300')(props),
        _hover: {
          bg: mode('gray.100', 'whiteAlpha.100')(props),
        },
      }),
      outline: (props: StyleFunctionProps) => ({
        borderColor: mode('gray.200', 'gray.600')(props),
        color: mode('gray.700', 'gray.200')(props),
        _hover: {
          bg: mode('gray.50', 'whiteAlpha.50')(props),
        },
      }),
    },
    defaultProps: {
      variant: 'primary',
    },
  },
  Badge: {
    baseStyle: {
      borderRadius: 'full',
      px: 3,
      py: 1,
      fontSize: 'xs',
      fontWeight: 'semibold',
      textTransform: 'none',
    },
  },
  Card: {
    baseStyle: (props: StyleFunctionProps) => ({
      container: {
        bg: mode('white', 'card.dark')(props),
        borderRadius: '3xl',
        shadow: 'soft',
        border: '1px solid',
        borderColor: mode('gray.100', 'gray.800')(props),
      },
    }),
  },
  Input: {
    variants: {
      glass: (props: StyleFunctionProps) => ({
        field: {
          bg: mode('glass.light', 'glass.dark')(props),
          border: '1px solid',
          borderColor: mode('glassBorder.light', 'glassBorder.dark')(props),
          backdropFilter: 'blur(20px)',
          borderRadius: 'xl',
          _focus: {
            borderColor: 'primary.400',
            boxShadow: '0 0 0 1px var(--chakra-colors-primary-400)',
          },
        },
      }),
    },
  },
  Textarea: {
    variants: {
      ghost: (props: StyleFunctionProps) => ({
        bg: 'transparent',
        border: 'none',
        _focus: {
          border: 'none',
          boxShadow: 'none',
        },
      }),
    },
  },
}

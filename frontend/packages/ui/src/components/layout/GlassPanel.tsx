import { Box, useColorModeValue } from '@chakra-ui/react'
import type { BoxProps } from '@chakra-ui/react'

export function GlassPanel({ children, ...props }: BoxProps) {
  const bg = useColorModeValue('rgba(255,255,255,0.85)', 'rgba(22,30,39,0.7)')
  const borderColor = useColorModeValue('rgba(255,255,255,0.8)', 'rgba(255,255,255,0.05)')

  return (
    <Box
      bg={bg}
      border="1px solid"
      borderColor={borderColor}
      backdropFilter="blur(20px)"
      borderRadius="3xl"
      {...props}
    >
      {children}
    </Box>
  )
}

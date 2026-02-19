import { Box, useColorModeValue } from '@chakra-ui/react'
import type { BoxProps } from '@chakra-ui/react'

export function CardFluid({ children, ...props }: BoxProps) {
  const bg = useColorModeValue('white', 'card.dark')
  const borderColor = useColorModeValue('gray.100', 'gray.800')

  return (
    <Box
      bg={bg}
      border="1px solid"
      borderColor={borderColor}
      borderRadius="2rem 1rem 2rem 1rem"
      shadow="soft"
      p={6}
      {...props}
    >
      {children}
    </Box>
  )
}

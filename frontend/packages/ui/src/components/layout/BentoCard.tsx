import { Box, useColorModeValue } from '@chakra-ui/react'
import type { BoxProps } from '@chakra-ui/react'
import { motion } from 'framer-motion'

const MotionBox = motion.create(Box) as any

export function BentoCard({ children, ...props }: BoxProps) {
  const bg = useColorModeValue('white', 'card.dark')
  const borderColor = useColorModeValue('gray.100', 'gray.800')

  return (
    <MotionBox
      bg={bg}
      border="1px solid"
      borderColor={borderColor}
      borderRadius="3xl"
      shadow="soft"
      p={6}
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.2 }}
      {...props}
    >
      {children}
    </MotionBox>
  )
}

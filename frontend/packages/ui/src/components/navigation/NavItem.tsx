import { HStack, Text, useColorModeValue, Box } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import type { IconType } from 'react-icons'
import type { ReactNode } from 'react'

const MotionHStack = motion.create(HStack)
const MotionBox = motion.create(Box)

interface NavItemProps {
  icon: IconType
  label: string
  isActive?: boolean
  isExpanded?: boolean
  onClick?: () => void
  children?: ReactNode
}

export function NavItem({ icon: Icon, label, isActive, isExpanded, onClick, children }: NavItemProps) {
  const activeBg = useColorModeValue('primary.500', 'primary.400')
  const hoverBg = useColorModeValue('gray.100', 'whiteAlpha.100')
  const activeColor = 'white'
  const color = useColorModeValue('gray.600', 'gray.400')

  return (
    <Box>
      <MotionHStack
        as="button"
        w="full"
        px={3}
        py={2.5}
        borderRadius="xl"
        bg={isActive ? activeBg : 'transparent'}
        color={isActive ? activeColor : color}
        _hover={{ bg: isActive ? activeBg : hoverBg }}
        onClick={onClick}
        spacing={3}
        cursor="pointer"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      >
        <MotionBox
          whileHover={{ scale: 1.15, rotate: 5 }}
          transition={{ duration: 0.4, ease: [0.175, 0.885, 0.32, 1.275] }}
        >
          <Icon size={20} />
        </MotionBox>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.3 }}
          >
            <Text fontSize="sm" fontWeight="medium" whiteSpace="nowrap">
              {label}
            </Text>
          </motion.div>
        )}
      </MotionHStack>
      {children}
    </Box>
  )
}

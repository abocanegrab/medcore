import { Badge, useColorModeValue } from '@chakra-ui/react'
import { motion } from 'framer-motion'

const MotionBadge = motion.create(Badge)

type StatusType = 'confirmed' | 'pending' | 'in-progress' | 'completed' | 'cancelled'

const statusConfig: Record<StatusType, { bg: string; color: string; label: string }> = {
  confirmed: { bg: 'green.50', color: 'green.600', label: 'Confirmed' },
  pending: { bg: 'yellow.50', color: 'yellow.700', label: 'Pending' },
  'in-progress': { bg: 'blue.50', color: 'blue.600', label: 'In Progress' },
  completed: { bg: 'gray.50', color: 'gray.600', label: 'Completed' },
  cancelled: { bg: 'red.50', color: 'red.600', label: 'Cancelled' },
}

interface StatusBadgeProps {
  status: StatusType
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status]
  const darkBg = useColorModeValue(config.bg, config.bg.replace('.50', '.900'))

  return (
    <MotionBadge
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      bg={darkBg}
      color={config.color}
      borderRadius="full"
      px={3}
      py={1}
      fontSize="xs"
      fontWeight="semibold"
      textTransform="none"
    >
      {config.label}
    </MotionBadge>
  )
}

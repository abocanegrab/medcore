import { Box, Flex, Text, HStack, useColorModeValue } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { LuArrowUp, LuArrowDown } from 'react-icons/lu'
import type { IconType } from 'react-icons'

const MotionBox = motion.create(Box)

interface StatCardProps {
  label: string
  value: string
  icon: IconType
  trend: {
    value: string
    direction: 'up' | 'down'
  }
  target: {
    label: string
    value: string
    progress: number
  }
  borderColor?: string
  progressColor?: string
  index?: number
}

export function StatCard({
  label,
  value,
  icon: Icon,
  trend,
  target,
  borderColor = 'rgba(0,39,82,0.6)',
  progressColor = 'primary.500',
  index = 0,
}: StatCardProps) {
  const glassBg = useColorModeValue('rgba(255,255,255,0.85)', 'rgba(22,30,39,0.7)')
  const glassBorder = useColorModeValue('rgba(255,255,255,0.8)', 'rgba(255,255,255,0.05)')
  const iconBg = useColorModeValue('gray.100', 'rgba(51,65,85,0.3)')
  const iconColor = useColorModeValue('gray.600', 'gray.300')
  const trendBg = useColorModeValue('gray.100', 'gray.800')
  const trendColor = useColorModeValue('gray.600', 'gray.400')
  const labelColor = useColorModeValue('gray.500', 'gray.400')
  const titleColor = useColorModeValue('primary.500', 'white')
  const targetLabelColor = useColorModeValue('gray.500', 'gray.500')
  const targetValueColor = useColorModeValue('gray.700', 'gray.300')
  const barBg = useColorModeValue('gray.100', 'gray.700')
  const borderTop = useColorModeValue('gray.100', 'gray.700')

  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1, type: 'spring' }}
    >
      <Box
        bg={glassBg}
        backdropFilter="blur(20px)"
        border="1px solid"
        borderColor={glassBorder}
        borderLeft="4px solid"
        borderLeftColor={borderColor}
        borderRadius="2xl"
        shadow="soft"
        p={5}
        display="flex"
        flexDir="column"
        gap={3}
        _hover={{ shadow: 'lg' }}
        transition="all 0.3s"
      >
        {/* Top: icon + trend */}
        <Flex justify="space-between" align="start">
          <Flex p={2.5} bg={iconBg} borderRadius="xl" color={iconColor}>
            <Icon size={22} />
          </Flex>
          <HStack
            bg={trendBg}
            px={2}
            py={1}
            borderRadius="md"
            spacing={1}
            fontSize="xs"
            fontWeight="semibold"
            color={trendColor}
          >
            {trend.direction === 'up' ? <LuArrowUp size={14} /> : <LuArrowDown size={14} />}
            <Text>{trend.value}</Text>
          </HStack>
        </Flex>

        {/* Label + value */}
        <Box>
          <Text fontSize="sm" fontWeight="medium" color={labelColor} mb={1}>
            {label}
          </Text>
          <Text fontSize="2xl" fontFamily="heading" fontWeight="bold" color={titleColor}>
            {value}
          </Text>
        </Box>

        {/* Target + progress */}
        <Box mt="auto" pt={3} borderTop="1px solid" borderColor={borderTop}>
          <Flex justify="space-between" align="center" fontSize="xs" color={targetLabelColor} mb={2}>
            <Text>{target.label}</Text>
            <Text fontWeight="semibold" color={targetValueColor}>
              {target.value}
            </Text>
          </Flex>
          <Box h="6px" w="full" bg={barBg} borderRadius="full" overflow="hidden">
            <Box h="full" bg={progressColor} w={`${target.progress}%`} borderRadius="full" />
          </Box>
        </Box>
      </Box>
    </MotionBox>
  )
}

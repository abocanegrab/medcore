import { Tag, useColorModeValue } from '@chakra-ui/react'

interface HistoryChipProps {
  label: string
  colorScheme?: 'red' | 'slate' | 'amber' | 'blue' | 'green'
}

const chipColors = {
  red: { bg: 'red.50', color: 'red.700', borderColor: 'red.200', darkBg: 'red.900', darkColor: 'red.200' },
  slate: { bg: 'gray.50', color: 'gray.700', borderColor: 'gray.200', darkBg: 'gray.700', darkColor: 'gray.200' },
  amber: { bg: 'orange.50', color: 'orange.700', borderColor: 'orange.200', darkBg: 'orange.900', darkColor: 'orange.200' },
  blue: { bg: 'blue.50', color: 'blue.700', borderColor: 'blue.200', darkBg: 'blue.900', darkColor: 'blue.200' },
  green: { bg: 'green.50', color: 'green.700', borderColor: 'green.200', darkBg: 'green.900', darkColor: 'green.200' },
}

export function HistoryChip({ label, colorScheme = 'slate' }: HistoryChipProps) {
  const config = chipColors[colorScheme]
  const bg = useColorModeValue(config.bg, config.darkBg)
  const color = useColorModeValue(config.color, config.darkColor)
  const borderColor = useColorModeValue(config.borderColor, 'transparent')

  return (
    <Tag
      bg={bg}
      color={color}
      border="1px solid"
      borderColor={borderColor}
      borderRadius="full"
      px={3}
      py={1}
      fontSize="xs"
      fontWeight="semibold"
      size="sm"
    >
      {label}
    </Tag>
  )
}

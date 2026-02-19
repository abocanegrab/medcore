import { HStack, Text, useColorModeValue } from '@chakra-ui/react'
import { LuChevronRight } from 'react-icons/lu'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  const color = useColorModeValue('gray.500', 'gray.400')
  const activeColor = useColorModeValue('gray.900', 'white')

  return (
    <HStack spacing={2} fontSize="sm">
      {items.map((item, i) => (
        <HStack key={i} spacing={2}>
          {i > 0 && <LuChevronRight size={14} color="var(--chakra-colors-gray-400)" />}
          <Text
            color={i === items.length - 1 ? activeColor : color}
            fontWeight={i === items.length - 1 ? 'medium' : 'normal'}
          >
            {item.label}
          </Text>
        </HStack>
      ))}
    </HStack>
  )
}

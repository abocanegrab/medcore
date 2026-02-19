import { Box, Text, HStack, Flex, Textarea, useColorModeValue } from '@chakra-ui/react'
import type { IconType } from 'react-icons'

interface TextAreaCardProps {
  title: string
  subtitle?: string
  icon: IconType
  placeholder?: string
  defaultValue?: string
  rows?: number
}

export function TextAreaCard({ title, subtitle, icon: Icon, placeholder, defaultValue, rows = 8 }: TextAreaCardProps) {
  const bg = useColorModeValue('white', 'card.dark')
  const border = useColorModeValue('gray.100', 'gray.800')
  const titleColor = useColorModeValue('primary.500', 'white')
  const subtitleColor = useColorModeValue('gray.400', 'gray.500')
  const iconBg = useColorModeValue('rgba(0,39,82,0.05)', 'rgba(0,39,82,0.15)')
  const inputBg = useColorModeValue('gray.50', 'gray.800')
  const inputBorder = useColorModeValue('gray.200', 'gray.700')
  const inputColor = useColorModeValue('gray.600', 'gray.300')

  return (
    <Box
      bg={bg}
      borderRadius="3xl"
      p={5}
      shadow="soft"
      border="1px solid"
      borderColor={border}
      transition="all 0.3s"
      _focusWithin={{ borderColor: 'rgba(0,39,82,0.3)' }}
    >
      <Flex align="center" justify="space-between" mb={4}>
        <HStack spacing={3}>
          <Flex
            w={10}
            h={10}
            borderRadius="xl"
            bg={iconBg}
            align="center"
            justify="center"
            color="primary.500"
          >
            <Icon size={20} />
          </Flex>
          <Text fontSize="lg" fontWeight="bold" color={titleColor}>
            {title}
          </Text>
        </HStack>
        {subtitle && (
          <Text fontSize="xs" color={subtitleColor}>
            {subtitle}
          </Text>
        )}
      </Flex>
      <Textarea
        placeholder={placeholder}
        defaultValue={defaultValue}
        rows={rows}
        resize="none"
        w="full"
        p={4}
        borderRadius="2xl"
        border="1px solid"
        borderColor={inputBorder}
        bg={inputBg}
        color={inputColor}
        fontSize="sm"
        _focus={{
          ring: '2px',
          ringColor: 'rgba(0,39,82,0.2)',
          borderColor: 'rgba(0,39,82,0.3)',
        }}
        transition="all 0.2s"
      />
    </Box>
  )
}

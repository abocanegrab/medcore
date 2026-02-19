import { Box, Text, Flex, useColorModeValue } from '@chakra-ui/react'
import { LuCalendar } from 'react-icons/lu'

export function DateWidget() {
  const now = new Date()
  const weekday = now.toLocaleDateString('en-US', { weekday: 'long' })
  const fullDate = now.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })
  const bg = useColorModeValue('white', 'card.dark')
  const border = useColorModeValue('gray.100', 'gray.800')
  const titleColor = useColorModeValue('primary.500', 'white')

  return (
    <Flex
      bg={bg}
      borderRadius="3xl"
      p={5}
      shadow="soft"
      align="center"
      justify="space-between"
      border="1px solid"
      borderColor={border}
    >
      <Box>
        <Text color="gray.400" fontSize="xs" fontWeight="medium" textTransform="uppercase" letterSpacing="wider">
          {weekday}
        </Text>
        <Text fontSize="xl" fontWeight="bold" color={titleColor}>
          {fullDate}
        </Text>
      </Box>
      <Flex
        w={12}
        h={12}
        borderRadius="full"
        bg={useColorModeValue('gray.50', 'gray.800')}
        align="center"
        justify="center"
        color="primary.500"
      >
        <LuCalendar size={22} />
      </Flex>
    </Flex>
  )
}

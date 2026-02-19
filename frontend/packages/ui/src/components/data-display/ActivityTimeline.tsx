import { Box, VStack, HStack, Text, Flex, useColorModeValue } from '@chakra-ui/react'
import type { IconType } from 'react-icons'
import { LuHeartPulse, LuFlaskConical, LuCalendar } from 'react-icons/lu'

interface ActivityItem {
  id: string
  text: string
  highlight?: string
  time: string
  icon: IconType
  attachment?: { name: string }
}

interface ActivityTimelineProps {
  title: string
  items: ActivityItem[]
}

export function ActivityTimeline({ title, items }: ActivityTimelineProps) {
  const bg = useColorModeValue('rgba(255,255,255,0.6)', 'rgba(22,30,39,0.6)')
  const border = useColorModeValue('rgba(255,255,255,0.5)', 'rgba(51,65,85,0.3)')
  const titleColor = useColorModeValue('primary.500', 'white')
  const lineColor = useColorModeValue('gray.200', 'gray.700')
  const circleBg = useColorModeValue('white', 'gray.800')
  const circleBorder = useColorModeValue('gray.100', 'gray.700')
  const textColor = useColorModeValue('gray.800', 'gray.200')
  const highlightColor = useColorModeValue('primary.500', 'white')
  const timeColor = useColorModeValue('gray.400', 'gray.500')

  return (
    <Box
      bg={bg}
      backdropFilter="blur(12px)"
      borderRadius="3xl"
      p={6}
      shadow="soft"
      border="1px solid"
      borderColor={border}
      flex={1}
    >
      <HStack spacing={2} mb={4}>
        <Box w={2} h={2} borderRadius="full" bg="accent.500" className="animate-pulse" />
        <Text fontSize="lg" fontWeight="bold" color={titleColor}>
          {title}
        </Text>
      </HStack>

      <VStack spacing={5} align="stretch" position="relative">
        {/* Vertical line */}
        <Box
          position="absolute"
          left="19px"
          top={2}
          bottom={2}
          w="2px"
          bg={lineColor}
        />

        {items.map((item) => (
          <HStack key={item.id} spacing={4} align="start" position="relative">
            <Flex
              w={10}
              h={10}
              borderRadius="full"
              bg={circleBg}
              border="2px solid"
              borderColor={circleBorder}
              zIndex={10}
              align="center"
              justify="center"
              flexShrink={0}
              shadow="sm"
            >
              <item.icon size={16} color="var(--chakra-colors-primary-500)" />
            </Flex>
            <Box pt={1}>
              <Text fontSize="sm" color={textColor}>
                {item.highlight ? (
                  <>
                    <Text as="span" fontWeight="bold" color={highlightColor}>{item.highlight}</Text>
                    {' '}{item.text}
                  </>
                ) : (
                  item.text
                )}
              </Text>
              {item.attachment && (
                <Flex
                  mt={2}
                  p={2}
                  bg={circleBg}
                  borderRadius="lg"
                  shadow="sm"
                  border="1px solid"
                  borderColor={circleBorder}
                  align="center"
                  gap={2}
                  maxW="max-content"
                  cursor="pointer"
                  _hover={{ borderColor: 'rgba(185,28,28,0.5)' }}
                  transition="border-color 0.2s"
                >
                  <Text color="accent.500" fontSize="sm">📄</Text>
                  <Text fontSize="xs" fontWeight="medium" color={useColorModeValue('gray.600', 'gray.300')}>
                    {item.attachment.name}
                  </Text>
                </Flex>
              )}
              <Text fontSize="xs" color={timeColor} mt={item.attachment ? 2 : 1}>
                {item.time}
              </Text>
            </Box>
          </HStack>
        ))}
      </VStack>
    </Box>
  )
}

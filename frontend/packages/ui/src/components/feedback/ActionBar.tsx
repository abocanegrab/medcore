import { HStack, Flex, Button, Box, Text, useColorModeValue } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import type { IconType } from 'react-icons'

const MotionBox = motion.create(Box)

interface ActionButton {
  label: string
  icon?: IconType
  variant?: 'primary' | 'outline' | 'ghost'
  onClick?: () => void
}

interface ActionBarProps {
  leftActions: ActionButton[]
  rightActions: ActionButton[]
}

export function ActionBar({ leftActions, rightActions }: ActionBarProps) {
  const bg = useColorModeValue('rgba(255,255,255,0.9)', 'rgba(22,30,39,0.9)')
  const border = useColorModeValue('rgba(255,255,255,0.2)', 'rgba(51,65,85,0.5)')
  const ghostColor = useColorModeValue('gray.600', 'gray.300')
  const ghostHoverBg = useColorModeValue('gray.100', 'gray.800')
  const draftBg = useColorModeValue('gray.100', 'gray.800')
  const draftColor = useColorModeValue('gray.600', 'gray.300')

  return (
    <MotionBox
      position="fixed"
      bottom={6}
      left="50%"
      zIndex={50}
      w="full"
      maxW="3xl"
      px={6}
      initial={{ y: 100, x: '-50%' }}
      animate={{ y: 0, x: '-50%' }}
      transition={{ duration: 0.5, type: 'spring' }}
    >
      <Flex
        bg={bg}
        backdropFilter="blur(40px)"
        borderRadius="2xl"
        p={2}
        shadow="2xl"
        border="1px solid"
        borderColor={border}
        align="center"
        justify="space-between"
        gap={2}
      >
        {/* Left: icon + label buttons */}
        <HStack spacing={1} pl={2}>
          {leftActions.map((action) => (
            <Flex
              key={action.label}
              as="button"
              p={3}
              borderRadius="xl"
              color={ghostColor}
              _hover={{ bg: ghostHoverBg }}
              transition="all 0.2s"
              flexDir="column"
              align="center"
              gap={1}
              role="group"
              onClick={action.onClick}
            >
              {action.icon && (
                <Box _groupHover={{ transform: 'scale(1.1)' }} transition="transform 0.2s">
                  <action.icon size={20} />
                </Box>
              )}
              <Text fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="tighter">
                {action.label}
              </Text>
            </Flex>
          ))}
        </HStack>

        {/* Right: action buttons */}
        <HStack spacing={2}>
          {rightActions.map((action) => (
            <Button
              key={action.label}
              px={6}
              py={3}
              h="auto"
              borderRadius="xl"
              fontSize="sm"
              fontWeight="bold"
              bg={action.variant === 'outline' ? draftBg : 'primary.500'}
              color={action.variant === 'outline' ? draftColor : 'white'}
              shadow={action.variant === 'outline' ? undefined : 'glow'}
              _hover={{
                bg: action.variant === 'outline'
                  ? useColorModeValue('gray.200', 'gray.700')
                  : 'accent.500',
              }}
              transition="all 0.2s"
              onClick={action.onClick}
            >
              {action.label}
            </Button>
          ))}
        </HStack>
      </Flex>
    </MotionBox>
  )
}

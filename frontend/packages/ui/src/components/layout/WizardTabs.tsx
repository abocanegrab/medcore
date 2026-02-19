import { HStack, Button, Badge, Flex, Text, useColorModeValue, Box } from '@chakra-ui/react'
import { LuCircleCheck } from 'react-icons/lu'
import type { IconType } from 'react-icons'

export interface WizardTab {
  id: string
  label: string
  icon: IconType
  badge?: number
  isComplete?: boolean
}

interface WizardTabsProps {
  tabs: WizardTab[]
  activeTab: string
  onTabChange: (id: string) => void
}

export function WizardTabs({ tabs, activeTab, onTabChange }: WizardTabsProps) {
  const activeBg = useColorModeValue('primary.500', 'primary.400')
  const inactiveBg = useColorModeValue('white', 'card.dark')
  const activeColor = 'white'
  const inactiveColor = useColorModeValue('gray.600', 'gray.300')
  const completeBg = useColorModeValue('green.50', 'rgba(34,197,94,0.15)')
  const completeColor = useColorModeValue('green.600', 'green.400')
  const borderColor = useColorModeValue('gray.100', 'gray.800')
  const activeShadow = '0 4px 12px rgba(0,39,82,0.25)'
  const iconBg = useColorModeValue('rgba(0,39,82,0.08)', 'rgba(0,39,82,0.2)')
  const activeIconBg = 'whiteAlpha.200'

  return (
    <Box
      overflowX="auto"
      pb={2}
      css={{
        '&::-webkit-scrollbar': { height: '4px' },
        '&::-webkit-scrollbar-thumb': { background: 'rgba(0,0,0,0.15)', borderRadius: '4px' },
      }}
    >
      <HStack spacing={3} minW="max-content">
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab
          const Icon = tab.icon

          return (
            <Button
              key={tab.id}
              size="md"
              px={5}
              py={3}
              h="auto"
              minH="48px"
              borderRadius="2xl"
              bg={isActive ? activeBg : tab.isComplete ? completeBg : inactiveBg}
              color={isActive ? activeColor : tab.isComplete ? completeColor : inactiveColor}
              border="1px solid"
              borderColor={isActive ? 'transparent' : tab.isComplete ? 'green.100' : borderColor}
              fontWeight="semibold"
              fontSize="sm"
              shadow={isActive ? activeShadow : 'soft'}
              _hover={{
                bg: isActive ? 'primary.400' : tab.isComplete ? 'green.100' : useColorModeValue('gray.50', 'gray.700'),
                transform: 'translateY(-2px)',
                shadow: isActive ? activeShadow : 'md',
              }}
              _active={{
                transform: 'translateY(0)',
              }}
              transition="all 0.2s"
              onClick={() => onTabChange(tab.id)}
            >
              <HStack spacing={3}>
                <Flex
                  w={8}
                  h={8}
                  borderRadius="xl"
                  bg={isActive ? activeIconBg : tab.isComplete ? 'green.100' : iconBg}
                  align="center"
                  justify="center"
                  flexShrink={0}
                >
                  {tab.isComplete ? (
                    <LuCircleCheck size={18} />
                  ) : (
                    <Icon size={18} />
                  )}
                </Flex>
                <Text>{tab.label}</Text>
                {tab.badge !== undefined && tab.badge > 0 && (
                  <Badge
                    fontSize="11px"
                    borderRadius="full"
                    bg={isActive ? 'whiteAlpha.300' : 'primary.50'}
                    color={isActive ? 'white' : 'primary.600'}
                    minW={6}
                    h={6}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    fontWeight="bold"
                  >
                    {tab.badge}
                  </Badge>
                )}
              </HStack>
            </Button>
          )
        })}
      </HStack>
    </Box>
  )
}

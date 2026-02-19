import { useState, useCallback } from 'react'
import {
  Box,
  VStack,
  HStack,
  Text,
  Flex,
  useColorModeValue,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerBody,
  useBreakpointValue,
  Collapse,
} from '@chakra-ui/react'
import {
  LuSettings,
  LuLogOut,
  LuCross,
  LuChevronRight,
} from 'react-icons/lu'
import type { IconType } from 'react-icons'
import { useTranslation } from 'react-i18next'

export interface SubOption {
  label: string
  path: string
}

export interface SidebarModule {
  id: string
  icon: IconType
  label: string
  path: string
  badge?: string
  subOptions?: SubOption[]
}

interface SidebarProps {
  currentPath: string
  onNavigate: (path: string) => void
  isDrawerOpen?: boolean
  onDrawerClose?: () => void
  modules?: SidebarModule[]
  onLogout?: () => void
}

function isModuleActive(mod: SidebarModule, currentPath: string) {
  if (mod.id === 'dashboard' && currentPath === '/dashboard') return true
  if (mod.id === 'consultas' && currentPath.startsWith('/consultation')) return true
  if (mod.id === 'appointments' && currentPath.startsWith('/consultation')) return true
  return currentPath.startsWith(mod.path) && mod.path !== '/dashboard'
}

/** Desktop floating sidebar — click-to-expand with module sub-options */
function DesktopSidebar({
  currentPath,
  onNavigate,
  modules,
  onLogout,
}: {
  currentPath: string
  onNavigate: (path: string) => void
  modules: SidebarModule[]
  onLogout?: () => void
}) {
  const { t } = useTranslation(['nav'])
  const [expandedModuleId, setExpandedModuleId] = useState<string | null>(null)
  const isExpanded = expandedModuleId !== null

  const glassBg = useColorModeValue('rgba(255,255,255,0.85)', 'rgba(22,30,39,0.7)')
  const glassBorder = useColorModeValue('rgba(255,255,255,0.6)', 'rgba(255,255,255,0.05)')
  const expandedBg = useColorModeValue('rgba(255,255,255,0.95)', 'rgba(17,25,34,0.95)')
  const activeColor = 'primary.500'
  const activeBg = useColorModeValue('rgba(0,39,82,0.05)', 'rgba(0,39,82,0.15)')
  const inactiveColor = useColorModeValue('gray.400', 'gray.400')
  const hoverBg = useColorModeValue('rgba(0,39,82,0.1)', 'rgba(255,255,255,0.05)')
  const navLabelColor = useColorModeValue('gray.600', 'gray.300')
  const navLabelHoverBg = useColorModeValue('gray.50', 'gray.800')
  const progressBg = useColorModeValue('white', 'gray.700')
  const logoColor = useColorModeValue('primary.500', 'white')
  const sectionLabel = useColorModeValue('gray.400', 'gray.500')
  const subOptionColor = useColorModeValue('gray.500', 'gray.400')
  const subOptionActiveColor = useColorModeValue('primary.500', 'white')
  const subOptionActiveBg = useColorModeValue('rgba(0,39,82,0.08)', 'rgba(0,39,82,0.2)')

  const expandedModule = modules.find((m) => m.id === expandedModuleId)

  const handleIconClick = useCallback(
    (mod: SidebarModule) => {
      if (mod.id === 'dashboard' || !mod.subOptions) {
        setExpandedModuleId(null)
        onNavigate(mod.path)
      } else if (expandedModuleId === mod.id) {
        setExpandedModuleId(null)
      } else {
        setExpandedModuleId(mod.id)
      }
    },
    [expandedModuleId, onNavigate],
  )

  const handleSubOptionClick = useCallback(
    (path: string) => {
      onNavigate(path)
      setExpandedModuleId(null)
    },
    [onNavigate],
  )

  const handleLogout = () => {
    if (onLogout) onLogout()
    onNavigate('/login')
  }

  return (
    <>
      {isExpanded && (
        <Box
          position="fixed"
          inset={0}
          zIndex={49}
          onClick={() => setExpandedModuleId(null)}
        />
      )}

      <Box
        position="fixed"
        zIndex={50}
        h="96vh"
        top="2vh"
        left={4}
        w={isExpanded ? '288px' : '80px'}
        transition="all 0.5s cubic-bezier(0.25,1,0.5,1)"
        display="flex"
        flexDir="column"
        bg={glassBg}
        backdropFilter="blur(20px)"
        border="1px solid"
        borderColor={glassBorder}
        borderRadius="3xl"
        shadow="glass"
        overflow="hidden"
      >
        {/* Icon column */}
        <Flex
          position="absolute"
          insetY={0}
          left={0}
          w="80px"
          flexDir="column"
          align="center"
          py={8}
          gap={8}
          zIndex={20}
        >
          {/* Logo */}
          <Flex
            w={10}
            h={10}
            borderRadius="xl"
            bg="primary.500"
            color="white"
            align="center"
            justify="center"
            shadow="glow"
            fontSize="lg"
          >
            <LuCross size={22} />
          </Flex>

          {/* Nav icons */}
          <VStack spacing={6} mt={4} w="full" align="center" as="nav">
            {modules.map((mod) => {
              const active = isModuleActive(mod, currentPath)
              const isSelectedModule = expandedModuleId === mod.id
              return (
                <Box key={mod.id} position="relative">
                  <Flex
                    as="button"
                    w={12}
                    h={12}
                    borderRadius="2xl"
                    align="center"
                    justify="center"
                    color={active || isSelectedModule ? activeColor : inactiveColor}
                    bg={active || isSelectedModule ? activeBg : 'transparent'}
                    _hover={{ transform: 'scale(1.1)', bg: hoverBg, color: 'primary.500' }}
                    transition="all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
                    onClick={() => handleIconClick(mod)}
                  >
                    <mod.icon size={22} />
                  </Flex>
                  {mod.badge && (
                    <Box
                      position="absolute"
                      top={2}
                      right={2}
                      w={2}
                      h={2}
                      bg="accent.500"
                      borderRadius="full"
                      ring="2px"
                      ringColor={useColorModeValue('white', 'gray.900')}
                    />
                  )}
                </Box>
              )
            })}
          </VStack>

          {/* Logout at bottom */}
          <Box mt="auto" mb={4}>
            <Flex
              as="button"
              w={10}
              h={10}
              borderRadius="full"
              align="center"
              justify="center"
              border="2px solid"
              borderColor={useColorModeValue('white', 'gray.700')}
              shadow="sm"
              color="gray.400"
              _hover={{ transform: 'scale(1.1)' }}
              transition="transform 0.2s"
              onClick={handleLogout}
            >
              <LuLogOut size={18} />
            </Flex>
          </Box>
        </Flex>

        {/* Expanded panel */}
        <Box
          position="absolute"
          inset={0}
          bg={expandedBg}
          backdropFilter="blur(40px)"
          zIndex={10}
          pl="96px"
          pr={6}
          py={8}
          borderRadius="3xl"
          display="flex"
          flexDir="column"
          opacity={isExpanded ? 1 : 0}
          transition="opacity 0.3s, clip-path 0.5s ease-in-out"
          sx={{
            clipPath: isExpanded ? 'circle(150% at 0 50%)' : 'circle(0% at 0 50%)',
          }}
        >
          <Text
            fontSize="2xl"
            fontFamily="heading"
            fontWeight="bold"
            color={logoColor}
            mb={8}
            letterSpacing="tight"
          >
            MedCore
          </Text>

          {expandedModule && (
            <Box flex={1}>
              <HStack spacing={3} mb={2}>
                <Flex
                  w={8}
                  h={8}
                  borderRadius="lg"
                  bg={activeBg}
                  align="center"
                  justify="center"
                  color="primary.500"
                >
                  <expandedModule.icon size={18} />
                </Flex>
                <Text
                  fontSize="lg"
                  fontFamily="heading"
                  fontWeight="bold"
                  color={logoColor}
                >
                  {expandedModule.label.includes(':') ? t(expandedModule.label) : expandedModule.label}
                </Text>
                {expandedModule.badge && (
                  <Text
                    bg="accent.500"
                    color="white"
                    fontSize="xs"
                    fontWeight="bold"
                    px={2}
                    py={0.5}
                    borderRadius="full"
                  >
                    {expandedModule.badge}
                  </Text>
                )}
              </HStack>

              <Text
                fontSize="2xs"
                fontWeight="semibold"
                color={sectionLabel}
                textTransform="uppercase"
                letterSpacing="wider"
                mt={6}
                mb={3}
              >
                {t('nav:options')}
              </Text>
              <VStack spacing={1} align="stretch">
                {expandedModule.subOptions?.map((sub) => {
                  const subActive = currentPath === sub.path
                  return (
                    <HStack
                      key={sub.path}
                      as="button"
                      p={3}
                      borderRadius="xl"
                      bg={subActive ? subOptionActiveBg : 'transparent'}
                      color={subActive ? subOptionActiveColor : subOptionColor}
                      fontWeight={subActive ? 'medium' : 'normal'}
                      _hover={{ bg: subActive ? undefined : navLabelHoverBg, color: navLabelColor }}
                      transition="all 0.2s"
                      spacing={3}
                      onClick={() => handleSubOptionClick(sub.path)}
                    >
                      <Box w={1.5} h={1.5} borderRadius="full" bg={subActive ? 'primary.500' : 'gray.300'} flexShrink={0} />
                      <Text fontSize="sm">{sub.label.includes(':') ? t(sub.label) : sub.label}</Text>
                    </HStack>
                  )
                })}
              </VStack>
            </Box>
          )}

          {/* System Status */}
          <Box
            mt="auto"
            bg={useColorModeValue('rgba(0,39,82,0.05)', 'rgba(0,39,82,0.15)')}
            p={4}
            borderRadius="2xl"
            border="1px solid"
            borderColor={useColorModeValue('rgba(0,39,82,0.1)', 'rgba(0,39,82,0.2)')}
          >
            <Text fontFamily="heading" fontWeight="bold" color="primary.500" fontSize="sm" mb={1}>
              {t('nav:systemStatus')}
            </Text>
            <Text fontSize="xs" color="gray.500" mb={3}>
              {t('nav:serverOptimal')}
            </Text>
            <Box h="6px" w="full" bg={progressBg} borderRadius="full" overflow="hidden">
              <Box h="full" bg="primary.500" w="75%" borderRadius="full" />
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  )
}

/** Mobile drawer sidebar with expandable modules */
function MobileSidebar({
  currentPath,
  onNavigate,
  isOpen,
  onClose,
  modules,
  onLogout,
}: {
  currentPath: string
  onNavigate: (path: string) => void
  isOpen: boolean
  onClose: () => void
  modules: SidebarModule[]
  onLogout?: () => void
}) {
  const { t } = useTranslation(['nav'])
  const [expandedMobileModule, setExpandedMobileModule] = useState<string | null>(null)
  const bg = useColorModeValue('white', 'gray.900')
  const navLabelColor = useColorModeValue('gray.600', 'gray.300')
  const navLabelHoverBg = useColorModeValue('gray.50', 'gray.800')
  const subOptionColor = useColorModeValue('gray.500', 'gray.400')
  const subOptionActiveColor = useColorModeValue('primary.500', 'white')

  const handleModuleClick = (mod: SidebarModule) => {
    if (mod.id === 'dashboard' || !mod.subOptions) {
      onNavigate(mod.path)
      onClose()
    } else if (expandedMobileModule === mod.id) {
      setExpandedMobileModule(null)
    } else {
      setExpandedMobileModule(mod.id)
    }
  }

  const handleLogout = () => {
    if (onLogout) onLogout()
    onNavigate('/login')
    onClose()
  }

  return (
    <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent maxW="280px" bg={bg}>
        <DrawerBody p={0} py={8} px={6}>
          <Text fontSize="2xl" fontFamily="heading" fontWeight="bold" color="primary.500" mb={8}>
            MedCore
          </Text>
          <VStack spacing={1} align="stretch">
            {modules.map((mod) => {
              const active = isModuleActive(mod, currentPath)
              const isExpanded = expandedMobileModule === mod.id
              const hasSubOptions = mod.subOptions && mod.subOptions.length > 0
              return (
                <Box key={mod.id}>
                  <HStack
                    as="button"
                    p={3}
                    borderRadius="xl"
                    bg={active ? 'rgba(0,39,82,0.1)' : 'transparent'}
                    color={active ? 'primary.500' : navLabelColor}
                    fontWeight={active ? 'medium' : 'normal'}
                    _hover={{ bg: active ? undefined : navLabelHoverBg }}
                    transition="all 0.2s"
                    spacing={3}
                    w="full"
                    justify="space-between"
                    onClick={() => handleModuleClick(mod)}
                  >
                    <HStack spacing={3}>
                      <mod.icon size={20} />
                      <Text fontSize="sm">{mod.label.includes(':') ? t(mod.label) : mod.label}</Text>
                    </HStack>
                    {mod.badge && (
                      <Text
                        bg="accent.500"
                        color="white"
                        fontSize="xs"
                        fontWeight="bold"
                        px={2}
                        py={0.5}
                        borderRadius="full"
                      >
                        {mod.badge}
                      </Text>
                    )}
                    {hasSubOptions && !mod.badge && (
                      <Box
                        transition="transform 0.2s"
                        transform={isExpanded ? 'rotate(90deg)' : 'rotate(0deg)'}
                      >
                        <LuChevronRight size={14} color="var(--chakra-colors-gray-300)" />
                      </Box>
                    )}
                  </HStack>
                  {hasSubOptions && (
                    <Collapse in={isExpanded} animateOpacity>
                      <VStack spacing={0} align="stretch" pl={10} pt={1} pb={2}>
                        {mod.subOptions!.map((sub) => {
                          const subActive = currentPath === sub.path
                          return (
                            <HStack
                              key={sub.path}
                              as="button"
                              py={2}
                              px={3}
                              borderRadius="lg"
                              color={subActive ? subOptionActiveColor : subOptionColor}
                              fontWeight={subActive ? 'medium' : 'normal'}
                              _hover={{ color: navLabelColor }}
                              transition="all 0.2s"
                              spacing={3}
                              onClick={() => {
                                onNavigate(sub.path)
                                onClose()
                              }}
                            >
                              <Box w={1.5} h={1.5} borderRadius="full" bg={subActive ? 'primary.500' : 'gray.300'} flexShrink={0} />
                              <Text fontSize="sm">{sub.label.includes(':') ? t(sub.label) : sub.label}</Text>
                            </HStack>
                          )
                        })}
                      </VStack>
                    </Collapse>
                  )}
                </Box>
              )
            })}
          </VStack>
          <Box mt={8}>
            <HStack as="button" p={3} borderRadius="xl" color="gray.400" spacing={3}>
              <LuSettings size={20} />
              <Text fontSize="sm">{t('nav:settings')}</Text>
            </HStack>
            <HStack as="button" p={3} borderRadius="xl" color="gray.400" spacing={3} onClick={handleLogout}>
              <LuLogOut size={20} />
              <Text fontSize="sm">{t('nav:logOut')}</Text>
            </HStack>
          </Box>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}

export function Sidebar({ currentPath, onNavigate, isDrawerOpen, onDrawerClose, modules = [], onLogout }: SidebarProps) {
  const isMobile = useBreakpointValue({ base: true, lg: false })

  if (isMobile) {
    return (
      <MobileSidebar
        currentPath={currentPath}
        onNavigate={onNavigate}
        isOpen={isDrawerOpen ?? false}
        onClose={onDrawerClose ?? (() => {})}
        modules={modules}
        onLogout={onLogout}
      />
    )
  }

  return <DesktopSidebar currentPath={currentPath} onNavigate={onNavigate} modules={modules} onLogout={onLogout} />
}

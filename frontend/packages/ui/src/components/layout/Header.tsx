import {
  HStack,
  Box,
  Text,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  useColorModeValue,
  useColorMode,
  IconButton,
  Show,
  Hide,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react'
import { LuSearch, LuBell, LuMenu, LuMoon, LuSun, LuChevronRight, LuChevronDown, LuGlobe } from 'react-icons/lu'
import { useTranslation } from 'react-i18next'

interface BreadcrumbItem {
  label: string
  isActive?: boolean
}

interface HeaderProps {
  title: string
  subtitle?: string
  breadcrumbItems: BreadcrumbItem[]
  badge?: { label: string; color: string }
  showSearch?: boolean
  onMenuClick?: () => void
  currentUser?: { name: string; initials: string; department: string }
}

export function Header({ title, breadcrumbItems, badge, showSearch = true, onMenuClick, currentUser }: HeaderProps) {
  const { t, i18n } = useTranslation(['ui', 'nav'])
  const bg = useColorModeValue('white', 'card.dark')
  const borderColor = useColorModeValue('gray.100', 'gray.800')
  const titleColor = useColorModeValue('primary.500', 'white')
  const crumbColor = useColorModeValue('gray.400', 'gray.500')
  const crumbActiveColor = useColorModeValue('primary.500', 'primary.300')
  const { colorMode, toggleColorMode } = useColorMode()
  const currentLang = i18n.language?.startsWith('es') ? 'es' : 'en'

  const userName = currentUser?.name ?? 'Dr. Ricardo Mora'
  const userInitials = currentUser?.initials ?? 'DR'
  const userDept = currentUser?.department ?? 'Cardiology Dept.'

  return (
    <Box
      position="sticky"
      top={0}
      zIndex={40}
      w="full"
      bg={bg}
      shadow="sm"
      borderBottom="1px solid"
      borderColor={borderColor}
    >
      <Flex
        pl={{ base: 4, md: '128px' }}
        pr={{ base: 4, md: 8 }}
        py={{ base: 3, md: 3.5 }}
        align="center"
        justify="space-between"
        gap={6}
        maxW="1800px"
        mx="auto"
      >
        {/* Left: breadcrumb + title */}
        <Box>
          <HStack spacing={2} mb={1}>
            <Hide above="lg">
              <IconButton
                aria-label="Open menu"
                icon={<LuMenu size={20} />}
                variant="ghost"
                size="sm"
                onClick={onMenuClick}
                mr={1}
              />
            </Hide>
            <HStack spacing={2} fontSize="xs" color={crumbColor} fontWeight="medium">
              {breadcrumbItems.map((item, i) => (
                <HStack key={i} spacing={2}>
                  {i > 0 && <LuChevronRight size={14} color="var(--chakra-colors-gray-300)" />}
                  <Text
                    color={item.isActive ? crumbActiveColor : crumbColor}
                    fontWeight={item.isActive ? 'semibold' : 'medium'}
                  >
                    {item.label}
                  </Text>
                </HStack>
              ))}
            </HStack>
          </HStack>
          <HStack spacing={2} align="center">
            <Text
              fontSize={{ base: 'xl', md: '2xl' }}
              fontFamily="heading"
              fontWeight="bold"
              color={titleColor}
              lineHeight="tight"
            >
              {title}
            </Text>
            {badge && (
              <Text
                fontSize="xs"
                bg={badge.color === 'red' ? 'rgba(185,28,28,0.1)' : badge.color === 'amber' ? 'orange.100' : 'primary.50'}
                color={badge.color === 'red' ? 'accent.500' : badge.color === 'amber' ? 'orange.700' : 'primary.500'}
                border={badge.color === 'amber' ? '1px solid' : undefined}
                borderColor={badge.color === 'amber' ? 'orange.200' : undefined}
                px={2}
                py={0.5}
                borderRadius="md"
                fontWeight="medium"
                ml={2}
              >
                {badge.label}
              </Text>
            )}
          </HStack>
        </Box>

        {/* Right: search + actions + profile */}
        <HStack spacing={4}>
          {showSearch && (
            <Show above="md">
              <Box position="relative" w="full" maxW="md" flex={1}>
                <InputGroup size="md">
                  <InputLeftElement pointerEvents="none" w={12}>
                    <LuSearch size={18} color="var(--chakra-colors-gray-400)" />
                  </InputLeftElement>
                  <Input
                    placeholder={t('ui:header.searchPlaceholder')}
                    pl={12}
                    pr={16}
                    py={2.5}
                    borderRadius="full"
                    border="1px solid"
                    borderColor={useColorModeValue('gray.200', 'gray.700')}
                    bg={useColorModeValue('gray.50', 'gray.800')}
                    fontSize="sm"
                    _focus={{
                      ring: '2px',
                      ringColor: 'rgba(0,39,82,0.2)',
                      borderColor: 'rgba(0,39,82,0.3)',
                    }}
                    _hover={{
                      bg: useColorModeValue('white', 'gray.700'),
                    }}
                  />
                </InputGroup>
                <Show above="sm">
                  <Box
                    position="absolute"
                    right={3}
                    top="50%"
                    transform="translateY(-50%)"
                    bg={useColorModeValue('gray.100', 'gray.700')}
                    color="gray.500"
                    fontSize="10px"
                    fontWeight="bold"
                    px={2}
                    py={1}
                    borderRadius="md"
                    border="1px solid"
                    borderColor={useColorModeValue('gray.200', 'gray.600')}
                  >
                    ⌘K
                  </Box>
                </Show>
              </Box>
            </Show>
          )}

          <IconButton
            aria-label="Toggle color mode"
            icon={colorMode === 'light' ? <LuMoon size={18} /> : <LuSun size={18} />}
            variant="ghost"
            size="sm"
            borderRadius="full"
            onClick={toggleColorMode}
          />

          <Menu>
            <MenuButton
              as={IconButton}
              aria-label={t('ui:header.language')}
              icon={<><LuGlobe size={18} /><Text as="span" fontSize="10px" fontWeight="bold" ml={1}>{currentLang.toUpperCase()}</Text></>}
              variant="ghost"
              size="sm"
              borderRadius="full"
            />
            <MenuList minW="140px" borderRadius="xl" shadow="lg">
              <MenuItem
                borderRadius="lg"
                fontWeight={currentLang === 'en' ? 'bold' : 'normal'}
                onClick={() => i18n.changeLanguage('en')}
              >
                {t('ui:header.english')}
              </MenuItem>
              <MenuItem
                borderRadius="lg"
                fontWeight={currentLang === 'es' ? 'bold' : 'normal'}
                onClick={() => i18n.changeLanguage('es')}
              >
                {t('ui:header.spanish')}
              </MenuItem>
            </MenuList>
          </Menu>

          <Box position="relative">
            <Flex
              as="button"
              w={10}
              h={10}
              bg={useColorModeValue('gray.50', 'gray.800')}
              borderRadius="full"
              align="center"
              justify="center"
              color="gray.500"
              border="1px solid"
              borderColor={useColorModeValue('gray.200', 'gray.700')}
              _hover={{ color: 'accent.500' }}
              transition="all 0.2s"
            >
              <LuBell size={20} />
            </Flex>
            <Box
              position="absolute"
              top="10px"
              right="10px"
              w={2}
              h={2}
              bg="accent.500"
              borderRadius="full"
              border="2px solid"
              borderColor={useColorModeValue('white', 'gray.800')}
            />
          </Box>

          {/* User profile chip */}
          <HStack
            spacing={3}
            bg={useColorModeValue('gray.50', 'gray.800')}
            pl={1.5}
            pr={4}
            py={1.5}
            borderRadius="full"
            border="1px solid"
            borderColor={useColorModeValue('gray.200', 'gray.700')}
            cursor="pointer"
            transition="all 0.2s"
          >
            <Box position="relative">
              <Flex
                w={8}
                h={8}
                borderRadius="full"
                bg="primary.500"
                color="white"
                align="center"
                justify="center"
                fontSize="xs"
                fontWeight="bold"
                border="1px solid"
                borderColor={useColorModeValue('gray.100', 'gray.700')}
              >
                {userInitials}
              </Flex>
              <Box
                position="absolute"
                bottom={0}
                right={0}
                w={2}
                h={2}
                bg="green.500"
                borderRadius="full"
                border="2px solid"
                borderColor={useColorModeValue('white', 'gray.800')}
              />
            </Box>
            <Show above="md">
              <Box mr={1}>
                <Text
                  fontSize="xs"
                  fontWeight="bold"
                  color={titleColor}
                  lineHeight="tight"
                >
                  {userName}
                </Text>
                <Text fontSize="10px" color="gray.500" fontWeight="medium">
                  {userDept.includes(':') ? t(userDept) : userDept}
                </Text>
              </Box>
              <LuChevronDown size={14} color="var(--chakra-colors-gray-400)" />
            </Show>
          </HStack>
        </HStack>
      </Flex>
    </Box>
  )
}

import { useState, useEffect } from 'react'
import {
  Box,
  Flex,
  Text,
  SimpleGrid,
  HStack,
  useColorModeValue,
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { Logo } from '@medcore/ui'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { mockUsers } from '../data/mockUsers'
import { useAuth } from '../contexts/AuthContext'
import type { MockUser } from '../data/mockUsers'

const MotionBox = motion.create(Box)
const MotionFlex = motion.create(Flex)

const roleColors: Record<string, string> = {
  recepcion: '#C5A065',
  triaje: '#2D9CDB',
  doctor: '#002752',
  farmacia: '#27AE60',
}

function UserCard({ user, index, onClick }: { user: MockUser; index: number; onClick: () => void }) {
  const { t } = useTranslation(['login', 'dashboard'])
  const cardBg = useColorModeValue(
    'linear-gradient(145deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.5) 100%)',
    'linear-gradient(145deg, rgba(22,30,39,0.9) 0%, rgba(22,30,39,0.5) 100%)',
  )
  const borderColor = useColorModeValue('rgba(255,255,255,0.8)', 'rgba(255,255,255,0.05)')
  const nameColor = useColorModeValue('primary.500', 'white')
  const deptColor = useColorModeValue('gray.500', 'gray.400')
  const color = roleColors[user.role] ?? '#002752'

  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 + index * 0.1, ease: [0.16, 1, 0.3, 1] } as any}
    >
      <Box
        as="button"
        w="full"
        bg={cardBg}
        backdropFilter="blur(20px)"
        borderRadius="2xl"
        p={6}
        border="1px solid"
        borderColor={borderColor}
        shadow="0 4px 20px -4px rgba(0,39,82,0.08)"
        cursor="pointer"
        _hover={{
          transform: 'translateY(-4px)',
          shadow: `0 12px 30px -8px ${color}40`,
          borderColor: `${color}60`,
        }}
        transition="all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
        textAlign="center"
        display="flex"
        flexDir="column"
        alignItems="center"
        gap={3}
        onClick={onClick}
      >
        {/* Avatar */}
        <Flex
          w={16}
          h={16}
          borderRadius="2xl"
          bg={color}
          color="white"
          align="center"
          justify="center"
          fontSize="xl"
          fontWeight="bold"
          fontFamily="heading"
          shadow={`0 4px 14px ${color}50`}
        >
          {user.initials}
        </Flex>

        {/* Name */}
        <Text
          fontSize="md"
          fontFamily="heading"
          fontWeight="bold"
          color={nameColor}
          lineHeight="tight"
        >
          {user.name}
        </Text>

        {/* Role badge */}
        <Text
          fontSize="xs"
          fontWeight="semibold"
          color="white"
          bg={color}
          px={3}
          py={1}
          borderRadius="full"
          textTransform="uppercase"
          letterSpacing="wider"
        >
          {t(user.roleLabel)}
        </Text>

        {/* Department */}
        <Text fontSize="xs" color={deptColor} fontWeight="medium">
          {t(user.department)}
        </Text>
      </Box>
    </MotionBox>
  )
}

export default function LoginPage() {
  const { t, i18n } = useTranslation(['login'])
  const navigate = useNavigate()
  const { login } = useAuth()
  const [clock, setClock] = useState('')
  const [date, setDate] = useState('')

  useEffect(() => {
    function updateTime() {
      const now = new Date()
      const locale = i18n.language?.startsWith('es') ? 'es-ES' : 'en-US'
      setClock(now.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit', hour12: false }))
      setDate(now.toLocaleDateString(locale, { weekday: 'long', month: 'short', day: 'numeric' }))
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  const handleSelectUser = (user: MockUser) => {
    login(user.id)
    navigate('/dashboard')
  }

  return (
    <Box
      position="relative"
      w="100vw"
      h="100vh"
      overflow="hidden"
      bg="#F8FAFC"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      {/* Mesh gradient background */}
      <Box
        position="absolute"
        inset={0}
        zIndex={0}
        bgGradient="radial(at 0% 0%, rgba(0,39,82,0.06), transparent 50%), radial(at 100% 0%, rgba(185,28,28,0.03), transparent 50%), radial(at 100% 100%, rgba(197,160,101,0.04), transparent 50%), radial(at 0% 100%, rgba(0,39,82,0.04), transparent 50%)"
      />

      {/* Animated blob */}
      <MotionBox
        position="absolute"
        inset={0}
        zIndex={0}
        bgGradient="radial(circle at 15% 50%, rgba(0,39,82,0.05), transparent 25%), radial(circle at 85% 30%, rgba(185,28,28,0.03), transparent 25%)"
        filter="blur(60px)"
        animate={{ scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' } as any}
      />

      {/* Main content */}
      <Flex
        position="relative"
        zIndex={10}
        w="full"
        maxW="7xl"
        mx="auto"
        px={6}
        h="full"
        flexDir={{ base: 'column', lg: 'row' }}
        align="center"
        justify={{ base: 'center', lg: 'space-between' }}
        gap={{ base: 8, lg: 0 }}
      >
        {/* Left side: Clock & date */}
        <MotionBox
          w={{ base: 'full', lg: '40%' }}
          p={{ base: 4, lg: 12 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] } as any}
        >
          {/* Brand logo */}
          <HStack spacing={4} mb={8}>
            <Flex
              w={14}
              h={14}
              borderRadius="2xl"
              bg="primary.500"
              color="white"
              align="center"
              justify="center"
              shadow="0 4px 14px rgba(0,39,82,0.3)"
            >
              <Logo size={36} color="white" />
            </Flex>
            <Box>
              <Text fontFamily="heading" fontWeight="bold" fontSize="lg" letterSpacing="tight" lineHeight="tight" color="primary.500">
                {t('login:appName')}
              </Text>
              <Text fontSize="xs" color="rgba(0,39,82,0.5)" textTransform="uppercase" letterSpacing="widest" fontWeight="medium">
                {t('login:portalAccess')}
              </Text>
            </Box>
          </HStack>

          {/* System operational badge */}
          <HStack
            spacing={3}
            bg="rgba(255,255,255,0.6)"
            border="1px solid"
            borderColor="rgba(0,39,82,0.1)"
            borderRadius="full"
            px={4}
            py={1.5}
            w="max-content"
            mb={6}
            backdropFilter="blur(8px)"
            shadow="sm"
          >
            <Box position="relative">
              <Box w={2.5} h={2.5} borderRadius="full" bg="green.500" />
              <Box
                position="absolute"
                inset={0}
                borderRadius="full"
                bg="green.500"
                opacity={0.75}
                className="animate-pulse"
              />
            </Box>
            <Text fontSize="xs" fontWeight="medium" textTransform="uppercase" letterSpacing="wide" color="rgba(0,39,82,0.7)">
              {t('login:systemOperational')}
            </Text>
          </HStack>

          {/* Clock */}
          <Text
            fontSize={{ base: '6rem', lg: '8rem' }}
            fontFamily="heading"
            fontWeight="200"
            lineHeight="none"
            letterSpacing="tighter"
            color="primary.500"
            userSelect="none"
          >
            {clock}
          </Text>

          {/* Date & subtitle */}
          <Box mt={2} pl={2} borderLeft="2px solid" borderColor="rgba(0,39,82,0.2)">
            <Text
              fontSize={{ base: '2xl', lg: '3xl' }}
              fontFamily="heading"
              fontWeight="300"
              color="rgba(0,39,82,0.8)"
            >
              {date}
            </Text>
            <Text fontSize="sm" color="rgba(0,39,82,0.5)" mt={1} fontFamily="mono" letterSpacing="wider">
              {t('login:gatewayVersion')}
            </Text>
          </Box>
        </MotionBox>

        {/* Right side: User picker */}
        <MotionBox
          w={{ base: 'full', lg: '55%' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] } as any}
        >
          <Box
            bg="linear-gradient(145deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.4) 100%)"
            backdropFilter="blur(20px)"
            borderRadius="3rem"
            p={{ base: 6, lg: 10 }}
            shadow="0 20px 40px -12px rgba(0,39,82,0.1), 0 0 0 1px rgba(255,255,255,0.8), inset 0 0 20px rgba(255,255,255,0.5)"
            position="relative"
            overflow="hidden"
            border="1px solid"
            borderColor="rgba(255,255,255,0.6)"
          >
            {/* Decorative blurs */}
            <Box
              position="absolute"
              top="-96px"
              right="-96px"
              w="192px"
              h="192px"
              bg="blue.100"
              borderRadius="full"
              filter="blur(48px)"
              opacity={0.6}
              pointerEvents="none"
            />
            <Box
              position="absolute"
              bottom="-96px"
              left="-96px"
              w="192px"
              h="192px"
              bg="red.50"
              borderRadius="full"
              filter="blur(48px)"
              opacity={0.6}
              pointerEvents="none"
            />

            {/* Card content */}
            <Box position="relative" zIndex={10}>
              {/* Title */}
              <Text
                fontSize="xl"
                fontFamily="heading"
                fontWeight="bold"
                color="primary.500"
                mb={2}
              >
                {t('login:selectProfile')}
              </Text>
              <Text fontSize="sm" color="gray.500" mb={6}>
                {t('login:chooseRole')}
              </Text>

              {/* User grid */}
              <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={4}>
                {mockUsers.map((user, i) => (
                  <UserCard
                    key={user.id}
                    user={user}
                    index={i}
                    onClick={() => handleSelectUser(user)}
                  />
                ))}
              </SimpleGrid>
            </Box>
          </Box>

          {/* Bottom disclaimer */}
          <Text textAlign="center" fontSize="xs" color="rgba(0,39,82,0.4)" mt={8}>
            {t('login:restrictedAccess')}<br />
            {t('login:protectedBy')}
          </Text>
        </MotionBox>
      </Flex>
    </Box>
  )
}

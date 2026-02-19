import { useState, useEffect } from 'react'
import {
  Box,
  Flex,
  Text,
  Input,
  Button,
  HStack,
  Checkbox,
  Link,
  useColorModeValue,
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { LuArrowRight, LuCross, LuFingerprint, LuQrCode, LuShield } from 'react-icons/lu'
import { motion } from 'framer-motion'

const MotionBox = motion.create(Box)
const MotionFlex = motion.create(Flex)

export default function LoginPage() {
  const navigate = useNavigate()
  const [clock, setClock] = useState('')
  const [date, setDate] = useState('')

  useEffect(() => {
    function updateTime() {
      const now = new Date()
      setClock(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }))
      setDate(now.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' }))
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
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
          w={{ base: 'full', lg: '50%' }}
          p={{ base: 4, lg: 12 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] } as any}
        >
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
              System Operational
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
              MedCore SECURE GATEWAY v4.2
            </Text>
          </Box>
        </MotionBox>

        {/* Right side: Login card */}
        <MotionBox
          w={{ base: 'full', lg: '480px' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] } as any}
        >
          <Box
            bg="linear-gradient(145deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.4) 100%)"
            backdropFilter="blur(20px)"
            borderRadius="3rem"
            p={{ base: 8, lg: 12 }}
            shadow="0 20px 40px -12px rgba(0,39,82,0.1), 0 0 0 1px rgba(255,255,255,0.8), inset 0 0 20px rgba(255,255,255,0.5)"
            position="relative"
            overflow="hidden"
            border="1px solid"
            borderColor="rgba(255,255,255,0.6)"
            _hover={{ shadow: '0 0 25px rgba(0,39,82,0.15)' }}
            transition="box-shadow 0.7s"
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
            <Box position="relative" zIndex={10} display="flex" flexDir="column" gap={8}>
              {/* Brand */}
              <HStack spacing={3} mb={4}>
                <Flex
                  w={10}
                  h={10}
                  borderRadius="xl"
                  bg="primary.500"
                  color="white"
                  align="center"
                  justify="center"
                  shadow="lg"
                >
                  <LuCross size={22} />
                </Flex>
                <Box>
                  <Text fontFamily="heading" fontWeight="bold" fontSize="lg" letterSpacing="tight" lineHeight="none" color="primary.500">
                    MedCore
                  </Text>
                  <Text fontSize="10px" color="rgba(0,39,82,0.6)" textTransform="uppercase" letterSpacing="widest">
                    Portal Access
                  </Text>
                </Box>
              </HStack>

              {/* Form */}
              <form onSubmit={handleSubmit}>
                <Box display="flex" flexDir="column" gap={6}>
                  {/* Inputs */}
                  <Box display="flex" flexDir="column" gap={8}>
                    {/* Identity ID */}
                    <Box position="relative">
                      <Input
                        variant="flushed"
                        placeholder="Identity ID"
                        fontSize="lg"
                        color="primary.500"
                        borderColor="gray.300"
                        _focus={{ borderColor: 'primary.500' }}
                        py={2.5}
                      />
                      <Box position="absolute" right={0} top="10px" color="gray.400">
                        <LuShield size={20} />
                      </Box>
                    </Box>

                    {/* Passkey */}
                    <Box position="relative">
                      <Input
                        variant="flushed"
                        placeholder="Passkey"
                        type="password"
                        fontSize="lg"
                        color="primary.500"
                        borderColor="gray.300"
                        _focus={{ borderColor: 'primary.500' }}
                        py={2.5}
                      />
                      <Box position="absolute" right={0} top="10px" color="gray.400">
                        <LuFingerprint size={20} />
                      </Box>
                    </Box>
                  </Box>

                  {/* Options row */}
                  <Flex justify="space-between" align="center" fontSize="sm" mt={2}>
                    <Checkbox size="sm" colorScheme="blue">
                      <Text color="gray.500" fontSize="sm">Keep signed in</Text>
                    </Checkbox>
                    <Link color="gray.500" fontSize="sm" _hover={{ color: 'primary.500' }}>
                      Recovery options
                    </Link>
                  </Flex>

                  {/* Submit button */}
                  <Button
                    type="submit"
                    mt={4}
                    w="full"
                    py={4}
                    h="auto"
                    bg="primary.500"
                    color="white"
                    borderRadius="full"
                    fontFamily="heading"
                    fontWeight="semibold"
                    fontSize="lg"
                    letterSpacing="wide"
                    shadow="lg"
                    _hover={{ bg: 'primary.400', transform: 'scale(1.02)' }}
                    transition="all 0.3s"
                    rightIcon={<LuArrowRight size={18} />}
                  >
                    Authenticate Access
                  </Button>
                </Box>
              </form>

              {/* Social auth divider */}
              <Box pt={6} borderTop="1px solid" borderColor="rgba(0,0,0,0.06)">
                <HStack justify="center" spacing={6}>
                  {/* Google */}
                  <Flex
                    as="button"
                    w={10}
                    h={10}
                    borderRadius="full"
                    bg="white"
                    align="center"
                    justify="center"
                    border="1px solid"
                    borderColor="gray.200"
                    shadow="sm"
                    color="primary.500"
                    _hover={{ shadow: 'md', bg: 'gray.50' }}
                    transition="all 0.2s"
                    onClick={() => navigate('/dashboard')}
                  >
                    <Text fontWeight="bold" fontSize="lg">G</Text>
                  </Flex>
                  {/* Fingerprint */}
                  <Flex
                    as="button"
                    w={10}
                    h={10}
                    borderRadius="full"
                    bg="white"
                    align="center"
                    justify="center"
                    border="1px solid"
                    borderColor="gray.200"
                    shadow="sm"
                    color="primary.500"
                    _hover={{ shadow: 'md', bg: 'gray.50' }}
                    transition="all 0.2s"
                    onClick={() => navigate('/dashboard')}
                  >
                    <LuFingerprint size={20} />
                  </Flex>
                  {/* QR */}
                  <Flex
                    as="button"
                    w={10}
                    h={10}
                    borderRadius="full"
                    bg="white"
                    align="center"
                    justify="center"
                    border="1px solid"
                    borderColor="gray.200"
                    shadow="sm"
                    color="primary.500"
                    _hover={{ shadow: 'md', bg: 'gray.50' }}
                    transition="all 0.2s"
                    onClick={() => navigate('/dashboard')}
                  >
                    <LuQrCode size={20} />
                  </Flex>
                </HStack>
              </Box>
            </Box>
          </Box>

          {/* Bottom disclaimer */}
          <Text textAlign="center" fontSize="xs" color="rgba(0,39,82,0.4)" mt={8}>
            Restricted Access. Authorized Personnel Only.<br />
            Protected by MedCore Cyber-Infrastructure.
          </Text>
        </MotionBox>
      </Flex>
    </Box>
  )
}

import {
  Box,
  SimpleGrid,
  Text,
  Flex,
  HStack,
  Input,
  Textarea,
  useColorModeValue,
} from '@chakra-ui/react'
import { useOutletContext } from 'react-router-dom'
import {
  LuWeight,
  LuRuler,
  LuThermometer,
  LuHeartPulse,
  LuClipboardList,
  LuPhone,
  LuIdCard,
  LuSend,
} from 'react-icons/lu'
import { Header, ActionBar } from '@medcore/ui'
import { triagePatient } from '../data/mockData'
import type { IconType } from 'react-icons'

interface VitalCardProps {
  icon: IconType
  label: string
  placeholder: string
  unit: string
  type?: string
  step?: string
}

function VitalCard({ icon: Icon, label, placeholder, unit, type = 'number', step }: VitalCardProps) {
  const bg = useColorModeValue('white', 'card.dark')
  const border = useColorModeValue('gray.100', 'gray.800')
  const iconBg = useColorModeValue('gray.50', 'gray.800')
  const iconColor = useColorModeValue('primary.500', 'gray.300')
  const labelColor = useColorModeValue('gray.400', 'gray.500')
  const unitBg = useColorModeValue('gray.100', 'gray.800')
  const unitColor = useColorModeValue('gray.400', 'gray.400')
  const inputColor = useColorModeValue('primary.500', 'white')

  return (
    <Box
      bg={bg}
      borderRadius="3xl"
      p={{ base: 6, md: 8 }}
      shadow="soft"
      border="1px solid"
      borderColor={border}
      display="flex"
      flexDir="column"
      alignItems="center"
      justifyContent="center"
      gap={4}
      position="relative"
      overflow="hidden"
      transition="all 0.3s"
      _focusWithin={{
        ring: '4px',
        ringColor: 'rgba(0,39,82,0.1)',
        borderColor: 'rgba(0,39,82,0.4)',
        transform: 'translateY(-2px)',
        shadow: 'lg',
      }}
    >
      {/* Icon top-left */}
      <Box position="absolute" top={4} left={4} p={2} bg={iconBg} borderRadius="xl">
        <Icon size={20} color={`var(--chakra-colors-${iconColor.replace('.', '-')})`} />
      </Box>

      {/* Label */}
      <Text
        fontSize="sm"
        fontWeight="semibold"
        color={labelColor}
        textTransform="uppercase"
        letterSpacing="widest"
        mt={6}
      >
        {label}
      </Text>

      {/* Input */}
      <Input
        variant="unstyled"
        placeholder={placeholder}
        type={type}
        step={step}
        textAlign="center"
        fontSize="5xl"
        fontFamily="heading"
        fontWeight="bold"
        color={inputColor}
        _placeholder={{ color: useColorModeValue('gray.200', 'gray.600') }}
        w="full"
      />

      {/* Unit badge */}
      <Text
        fontSize="lg"
        fontWeight="medium"
        color={unitColor}
        bg={unitBg}
        px={3}
        py={1}
        borderRadius="lg"
      >
        {unit}
      </Text>
    </Box>
  )
}

export default function TriajePage() {
  const { onMenuOpen } = useOutletContext<{ onMenuOpen: () => void }>()
  const p = triagePatient

  const cardBg = useColorModeValue('white', 'card.dark')
  const cardBorder = useColorModeValue('gray.100', 'gray.800')
  const iconBg = useColorModeValue('rgba(0,39,82,0.05)', 'rgba(0,39,82,0.15)')
  const titleColor = useColorModeValue('primary.500', 'white')
  const subtitleColor = useColorModeValue('gray.400', 'gray.500')
  const inputBg = useColorModeValue('gray.50', 'gray.800')
  const inputBorder = useColorModeValue('gray.200', 'gray.700')
  const inputColor = useColorModeValue('gray.600', 'gray.300')

  return (
    <Box pb={24}>
      <Header
        title="Patient Triage"
        breadcrumbItems={[
          { label: 'MedCore' },
          { label: 'Triage' },
          { label: p.name, isActive: true },
        ]}
        badge={{ label: 'INTAKE', color: 'amber' }}
        showSearch={false}
        onMenuClick={onMenuOpen}
      />

      <Box
        maxW="1400px"
        w="full"
        mx="auto"
        pl={{ base: 4, md: '128px' }}
        pr={{ base: 4, md: 8 }}
        py={5}
        display="flex"
        flexDir="column"
        gap={6}
      >
        {/* Patient Banner */}
        <Box
          w="full"
          bg="primary.500"
          borderRadius="2rem"
          p={6}
          color="white"
          shadow="deep"
          display="flex"
          flexDir={{ base: 'column', md: 'row' }}
          justify="space-between"
          align="center"
          gap={6}
          position="relative"
          overflow="hidden"
        >
          {/* Decorative blur */}
          <Box
            position="absolute"
            top={0}
            right={0}
            w="384px"
            h="384px"
            bg="white"
            opacity={0.05}
            borderRadius="full"
            filter="blur(48px)"
            mr={-32}
            mt={-32}
            pointerEvents="none"
          />

          {/* Patient info */}
          <HStack spacing={6} position="relative" zIndex={10}>
            {/* Avatar */}
            <Flex
              w={24}
              h={24}
              borderRadius="2xl"
              bg="whiteAlpha.100"
              backdropFilter="blur(12px)"
              align="center"
              justify="center"
              border="1px solid"
              borderColor="whiteAlpha.200"
              fontSize="2xl"
              fontWeight="bold"
              flexShrink={0}
            >
              {p.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
            </Flex>
            <Box>
              <HStack spacing={3} mb={1} flexWrap="wrap">
                <Text fontSize="3xl" fontFamily="heading" fontWeight="bold">
                  {p.name}
                </Text>
                <Text
                  bg="whiteAlpha.100"
                  px={3}
                  py={1}
                  borderRadius="full"
                  fontSize="xs"
                  fontWeight="medium"
                  border="1px solid"
                  borderColor="whiteAlpha.100"
                >
                  {p.age} Years &bull; {p.gender}
                </Text>
              </HStack>
              <HStack spacing={4} color="gray.300" fontSize="sm" mt={2}>
                <HStack spacing={1}>
                  <LuIdCard size={16} />
                  <Text>ID: {p.patientId}</Text>
                </HStack>
                <HStack spacing={1}>
                  <LuPhone size={16} />
                  <Text>{p.phone}</Text>
                </HStack>
              </HStack>
            </Box>
          </HStack>
        </Box>

        {/* Vital Input Cards */}
        <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} spacing={6}>
          <VitalCard icon={LuWeight} label="Weight" placeholder="00" unit="kg" />
          <VitalCard icon={LuRuler} label="Height" placeholder="000" unit="cm" />
          <VitalCard icon={LuThermometer} label="Temp" placeholder="00.0" unit="°C" step="0.1" />
          <VitalCard icon={LuHeartPulse} label="BP" placeholder="120/80" unit="mmHg" type="text" />
        </SimpleGrid>

        {/* Initial Observations */}
        <Box
          bg={cardBg}
          borderRadius="3xl"
          p={5}
          shadow="soft"
          border="1px solid"
          borderColor={cardBorder}
          transition="all 0.3s"
          _focusWithin={{ borderColor: 'rgba(0,39,82,0.3)' }}
        >
          <Flex align="center" gap={3} mb={4}>
            <Flex
              w={10}
              h={10}
              borderRadius="xl"
              bg={iconBg}
              align="center"
              justify="center"
              color="primary.500"
            >
              <LuClipboardList size={20} />
            </Flex>
            <Box>
              <Text fontSize="lg" fontWeight="bold" color={titleColor}>
                Initial Observations
              </Text>
              <Text fontSize="xs" color={subtitleColor}>
                Record chief complaint and visual assessment
              </Text>
            </Box>
          </Flex>
          <Textarea
            placeholder="Patient complains of..."
            rows={8}
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
      </Box>

      {/* Action Bar */}
      <ActionBar
        leftActions={[]}
        rightActions={[
          { label: 'Save Draft', variant: 'outline' },
          { label: 'Complete Triage & Send to Doctor', variant: 'primary' },
        ]}
      />
    </Box>
  )
}

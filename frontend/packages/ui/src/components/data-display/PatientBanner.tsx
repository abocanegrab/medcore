import {
  Box,
  HStack,
  VStack,
  Text,
  Flex,
  Input,
  SimpleGrid,
} from '@chakra-ui/react'
import { LuWeight, LuRuler, LuThermometer, LuHeartPulse, LuPencil } from 'react-icons/lu'
import type { IconType } from 'react-icons'

interface VitalField {
  icon: IconType
  label: string
  value: string
  unit: string
}

interface PatientBannerProps {
  name: string
  age: number
  gender: string
  patientId: string
  vitals: {
    weight: string
    height: string
    temperature: string
    bloodPressure: string
  }
}

function VitalInput({ icon: Icon, label, value, unit }: VitalField) {
  return (
    <Box
      bg="rgba(26,61,102,0.5)"
      borderRadius="2xl"
      p={4}
      backdropFilter="blur(4px)"
      border="1px solid"
      borderColor="rgba(255,255,255,0.1)"
      minW="140px"
      role="group"
      _focusWithin={{ bg: 'rgba(26,61,102,0.8)' }}
      transition="all 0.2s"
    >
      <Flex align="center" justify="space-between" gap={2} color="gray.300" mb={1}>
        <HStack spacing={2}>
          <Icon size={16} />
          <Text fontSize="xs" fontWeight="medium" textTransform="uppercase" letterSpacing="wider">
            {label}
          </Text>
        </HStack>
        <Box opacity={0} _groupHover={{ opacity: 1 }} transition="opacity 0.2s">
          <LuPencil size={12} />
        </Box>
      </Flex>
      <HStack spacing={1} align="baseline">
        <Input
          defaultValue={value}
          variant="unstyled"
          fontSize="xl"
          fontWeight="bold"
          color="white"
          p={0}
          _placeholder={{ color: 'whiteAlpha.400' }}
        />
        <Text fontSize="sm" fontWeight="normal" color="gray.400">
          {unit}
        </Text>
      </HStack>
    </Box>
  )
}

export function PatientBanner({ name, age, gender, patientId, vitals }: PatientBannerProps) {
  const initials = name.split(' ').map(n => n[0]).slice(0, 2).join('')

  return (
    <Box
      w="full"
      bg="primary.500"
      borderRadius="5xl"
      p={8}
      color="white"
      shadow="deep"
      display="flex"
      flexDir={{ base: 'column', md: 'row' }}
      justify="space-between"
      align="center"
      gap={8}
      position="relative"
      overflow="hidden"
    >
      {/* Decorative blurs */}
      <Box
        position="absolute"
        top={0}
        right={0}
        w="256px"
        h="256px"
        bg="white"
        opacity={0.05}
        borderRadius="full"
        filter="blur(48px)"
        mr={-16}
        mt={-16}
        pointerEvents="none"
      />

      {/* Left: avatar + info */}
      <HStack spacing={6} position="relative" zIndex={10}>
        <Flex
          w={20}
          h={20}
          borderRadius="3xl"
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
          {initials}
        </Flex>
        <Box>
          <HStack spacing={3} mb={1} flexWrap="wrap">
            <Text fontSize="3xl" fontFamily="heading" fontWeight="bold">
              {name}
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
              {age} Years &bull; {gender}
            </Text>
          </HStack>
          <Text color="gray.300" fontSize="sm">
            Patient ID: {patientId}
          </Text>
        </Box>
      </HStack>

      {/* Right: vitals grid */}
      <SimpleGrid
        columns={{ base: 2, md: 4 }}
        spacing={4}
        w={{ base: 'full', md: 'auto' }}
        position="relative"
        zIndex={10}
      >
        <VitalInput icon={LuWeight} label="Weight" value={vitals.weight} unit="kg" />
        <VitalInput icon={LuRuler} label="Height" value={vitals.height} unit="cm" />
        <VitalInput icon={LuThermometer} label="Temp" value={vitals.temperature} unit="°C" />
        <VitalInput icon={LuHeartPulse} label="BP" value={vitals.bloodPressure} unit="mmHg" />
      </SimpleGrid>
    </Box>
  )
}

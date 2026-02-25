import { useState } from 'react'
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
import { useOutletContext, useParams, useNavigate } from 'react-router-dom'
import {
  LuWeight,
  LuRuler,
  LuThermometer,
  LuHeartPulse,
  LuClipboardList,
  LuPhone,
  LuIdCard,
} from 'react-icons/lu'
import { Header, ActionBar } from '@medcore/ui'
import { useTranslation } from 'react-i18next'
import { usePatientQueue } from '../contexts/PatientQueueContext'
import type { IconType } from 'react-icons'

interface VitalCardProps {
  icon: IconType
  label: string
  placeholder: string
  unit: string
  type?: string
  step?: string
  value?: string
  onChange?: (val: string) => void
}

function VitalCard({ icon: Icon, label, placeholder, unit, type = 'number', step, value, onChange }: VitalCardProps) {
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
      <Box position="absolute" top={4} left={4} p={2} bg={iconBg} borderRadius="xl">
        <Icon size={20} color={`var(--chakra-colors-${iconColor.replace('.', '-')})`} />
      </Box>
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
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
      />
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
  const { t } = useTranslation(['triaje', 'common', 'nav'])
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { onMenuOpen, currentUser, onLogout } = useOutletContext<{ onMenuOpen: () => void; currentUser?: any; onLogout?: () => void }>()
  const { getPatientById, updatePatientData } = usePatientQueue()

  const patient = id ? getPatientById(id) : undefined

  const [weight, setWeight] = useState(patient?.vitals?.weight ?? '')
  const [height, setHeight] = useState(patient?.vitals?.height ?? '')
  const [temperature, setTemperature] = useState(patient?.vitals?.temperature ?? '')
  const [bloodPressure, setBloodPressure] = useState(patient?.vitals?.bloodPressure ?? '')
  const [observations, setObservations] = useState(patient?.triageObservations ?? '')

  const cardBg = useColorModeValue('white', 'card.dark')
  const cardBorder = useColorModeValue('gray.100', 'gray.800')
  const iconBg = useColorModeValue('rgba(0,39,82,0.05)', 'rgba(0,39,82,0.15)')
  const titleColor = useColorModeValue('primary.500', 'white')
  const subtitleColor = useColorModeValue('gray.400', 'gray.500')
  const inputBg = useColorModeValue('gray.50', 'gray.800')
  const inputBorder = useColorModeValue('gray.200', 'gray.700')
  const inputColor = useColorModeValue('gray.600', 'gray.300')

  if (!patient) {
    return (
      <Box p={12} textAlign="center">
        <Text fontSize="xl" color="gray.400">{t('common:notFound')}</Text>
      </Box>
    )
  }

  const handleCompleteTriage = () => {
    updatePatientData(patient.id, {
      status: 'triaged',
      vitals: { weight, height, temperature, bloodPressure },
      triageObservations: observations,
    })
    navigate('/triaje')
  }

  return (
    <Box pb={24}>
      <Header
        title={t('triaje:form.title')}
        breadcrumbItems={[
          { label: t('nav:appName') },
          { label: t('nav:triaje') },
          { label: patient.name, isActive: true },
        ]}
        badge={{ label: 'INTAKE', color: 'amber' }}
        showSearch={false}
        onMenuClick={onMenuOpen}
        currentUser={currentUser}
        onLogout={onLogout}
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

          <HStack spacing={6} position="relative" zIndex={10}>
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
              {patient.initials}
            </Flex>
            <Box>
              <HStack spacing={3} mb={1} flexWrap="wrap">
                <Text fontSize="3xl" fontFamily="heading" fontWeight="bold">
                  {patient.name}
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
                  {patient.age} {t('common:years')} &bull; {patient.gender}
                </Text>
              </HStack>
              <HStack spacing={4} color="gray.300" fontSize="sm" mt={2}>
                <HStack spacing={1}>
                  <LuIdCard size={16} />
                  <Text>ID: {patient.patientId}</Text>
                </HStack>
                <HStack spacing={1}>
                  <LuPhone size={16} />
                  <Text>{patient.phone}</Text>
                </HStack>
              </HStack>
            </Box>
          </HStack>
        </Box>

        {/* Vital Input Cards */}
        <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} spacing={6}>
          <VitalCard icon={LuWeight} label={t('triaje:form.weight')} placeholder="00" unit="kg" value={weight} onChange={setWeight} />
          <VitalCard icon={LuRuler} label={t('triaje:form.height')} placeholder="000" unit="cm" value={height} onChange={setHeight} />
          <VitalCard icon={LuThermometer} label={t('triaje:form.temp')} placeholder="00.0" unit="°C" step="0.1" value={temperature} onChange={setTemperature} />
          <VitalCard icon={LuHeartPulse} label={t('triaje:form.bp')} placeholder="120/80" unit="mmHg" type="text" value={bloodPressure} onChange={setBloodPressure} />
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
                {t('triaje:form.initialObservations')}
              </Text>
              <Text fontSize="xs" color={subtitleColor}>
                {t('triaje:form.recordChiefComplaint')}
              </Text>
            </Box>
          </Flex>
          <Textarea
            placeholder={t('triaje:form.patientComplainsOf')}
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
            value={observations}
            onChange={(e) => setObservations(e.target.value)}
          />
        </Box>
      </Box>

      {/* Action Bar */}
      <ActionBar
        leftActions={[]}
        rightActions={[
          { label: t('common:actions.saveDraft'), variant: 'outline' },
          { label: t('triaje:form.completeTriage'), variant: 'primary', onClick: handleCompleteTriage },
        ]}
      />
    </Box>
  )
}

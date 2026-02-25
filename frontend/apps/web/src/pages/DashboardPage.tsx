import {
  Box,
  SimpleGrid,
  Grid,
  GridItem,
  HStack,
  VStack,
  Text,
  Flex,
  Button,
  useColorModeValue,
  IconButton,
} from '@chakra-ui/react'
import { useNavigate, useOutletContext } from 'react-router-dom'
import { LuArrowRight, LuStar, LuVideo, LuChevronLeft, LuChevronRight, LuUser, LuUsers, LuClock, LuCircleCheck, LuPill, LuClipboardPlus } from 'react-icons/lu'
import { useTranslation } from 'react-i18next'
import {
  Header,
  StatCard,
  ScheduleTable,
  ActivityTimeline,
  DateWidget,
} from '@medcore/ui'
import { stats, nextAppointment, todaySchedule, activityItems } from '../data/mockData'
import { useAuth } from '../contexts/AuthContext'
import { usePatientQueue } from '../contexts/PatientQueueContext'

function ReceptionDashboard() {
  const { t } = useTranslation(['dashboard'])
  const navigate = useNavigate()
  const { patients } = usePatientQueue()
  const registered = patients.filter((p) => p.status === 'registered').length
  const active = patients.filter((p) => p.status !== 'completed').length
  const completed = patients.filter((p) => p.status === 'completed').length

  const cardBg = useColorModeValue('white', 'card.dark')
  const cardBorder = useColorModeValue('gray.100', 'gray.800')
  const nameColor = useColorModeValue('primary.500', 'white')

  return (
    <Box display="flex" flexDir="column" gap={6}>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
        <Box bg={cardBg} borderRadius="2xl" p={5} border="1px solid" borderColor={cardBorder} shadow="soft">
          <HStack spacing={3}>
            <Flex w={10} h={10} borderRadius="xl" bg="primary.50" align="center" justify="center" color="primary.500"><LuUsers size={20} /></Flex>
            <Box>
              <Text fontSize="2xl" fontWeight="bold" fontFamily="heading" color={nameColor}>{active}</Text>
              <Text fontSize="xs" color="gray.500">{t('dashboard:stats.activePatients')}</Text>
            </Box>
          </HStack>
        </Box>
        <Box bg={cardBg} borderRadius="2xl" p={5} border="1px solid" borderColor={cardBorder} shadow="soft">
          <HStack spacing={3}>
            <Flex w={10} h={10} borderRadius="xl" bg="orange.50" align="center" justify="center" color="orange.500"><LuClock size={20} /></Flex>
            <Box>
              <Text fontSize="2xl" fontWeight="bold" fontFamily="heading" color={nameColor}>{registered}</Text>
              <Text fontSize="xs" color="gray.500">{t('dashboard:stats.awaitingTriage')}</Text>
            </Box>
          </HStack>
        </Box>
        <Box bg={cardBg} borderRadius="2xl" p={5} border="1px solid" borderColor={cardBorder} shadow="soft">
          <HStack spacing={3}>
            <Flex w={10} h={10} borderRadius="xl" bg="green.50" align="center" justify="center" color="green.500"><LuCircleCheck size={20} /></Flex>
            <Box>
              <Text fontSize="2xl" fontWeight="bold" fontFamily="heading" color={nameColor}>{completed}</Text>
              <Text fontSize="xs" color="gray.500">{t('dashboard:stats.completedToday')}</Text>
            </Box>
          </HStack>
        </Box>
      </SimpleGrid>
      <Button
        bg="primary.500"
        color="white"
        borderRadius="xl"
        w="max-content"
        rightIcon={<LuArrowRight size={16} />}
        _hover={{ bg: 'primary.400' }}
        onClick={() => navigate('/admision')}
      >
        {t('dashboard:actions.goToAdmissions')}
      </Button>
    </Box>
  )
}

function TriageDashboard() {
  const { t } = useTranslation(['dashboard'])
  const navigate = useNavigate()
  const { getPatientsByStatus } = usePatientQueue()
  const waiting = getPatientsByStatus('registered').length
  const inTriage = getPatientsByStatus('in_triage').length

  const cardBg = useColorModeValue('white', 'card.dark')
  const cardBorder = useColorModeValue('gray.100', 'gray.800')
  const nameColor = useColorModeValue('primary.500', 'white')

  return (
    <Box display="flex" flexDir="column" gap={6}>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
        <Box bg={cardBg} borderRadius="2xl" p={5} border="1px solid" borderColor={cardBorder} shadow="soft">
          <HStack spacing={3}>
            <Flex w={10} h={10} borderRadius="xl" bg="orange.50" align="center" justify="center" color="orange.500"><LuClipboardPlus size={20} /></Flex>
            <Box>
              <Text fontSize="2xl" fontWeight="bold" fontFamily="heading" color={nameColor}>{waiting}</Text>
              <Text fontSize="xs" color="gray.500">{t('dashboard:stats.queueLength')}</Text>
            </Box>
          </HStack>
        </Box>
        <Box bg={cardBg} borderRadius="2xl" p={5} border="1px solid" borderColor={cardBorder} shadow="soft">
          <HStack spacing={3}>
            <Flex w={10} h={10} borderRadius="xl" bg="blue.50" align="center" justify="center" color="blue.500"><LuClock size={20} /></Flex>
            <Box>
              <Text fontSize="2xl" fontWeight="bold" fontFamily="heading" color={nameColor}>~12 min</Text>
              <Text fontSize="xs" color="gray.500">{t('dashboard:stats.avgWaitTime')}</Text>
            </Box>
          </HStack>
        </Box>
      </SimpleGrid>
      <Button
        bg="primary.500"
        color="white"
        borderRadius="xl"
        w="max-content"
        rightIcon={<LuArrowRight size={16} />}
        _hover={{ bg: 'primary.400' }}
        onClick={() => navigate('/triaje')}
      >
        {t('dashboard:actions.goToTriageQueue')}
      </Button>
    </Box>
  )
}

function FarmaciaDashboard() {
  const { t } = useTranslation(['dashboard'])
  const navigate = useNavigate()
  const { getPatientsByStatus, patients } = usePatientQueue()
  const pending = getPatientsByStatus('post_consultation').filter((p) => p.nextStep === 'farmacia').length
  const completed = patients.filter((p) => p.status === 'completed').length

  const cardBg = useColorModeValue('white', 'card.dark')
  const cardBorder = useColorModeValue('gray.100', 'gray.800')
  const nameColor = useColorModeValue('primary.500', 'white')

  return (
    <Box display="flex" flexDir="column" gap={6}>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
        <Box bg={cardBg} borderRadius="2xl" p={5} border="1px solid" borderColor={cardBorder} shadow="soft">
          <HStack spacing={3}>
            <Flex w={10} h={10} borderRadius="xl" bg="orange.50" align="center" justify="center" color="orange.500"><LuPill size={20} /></Flex>
            <Box>
              <Text fontSize="2xl" fontWeight="bold" fontFamily="heading" color={nameColor}>{pending}</Text>
              <Text fontSize="xs" color="gray.500">{t('dashboard:stats.pendingPrescriptions')}</Text>
            </Box>
          </HStack>
        </Box>
        <Box bg={cardBg} borderRadius="2xl" p={5} border="1px solid" borderColor={cardBorder} shadow="soft">
          <HStack spacing={3}>
            <Flex w={10} h={10} borderRadius="xl" bg="green.50" align="center" justify="center" color="green.500"><LuCircleCheck size={20} /></Flex>
            <Box>
              <Text fontSize="2xl" fontWeight="bold" fontFamily="heading" color={nameColor}>{completed}</Text>
              <Text fontSize="xs" color="gray.500">{t('dashboard:stats.dispensedToday')}</Text>
            </Box>
          </HStack>
        </Box>
      </SimpleGrid>
      <Button
        bg="primary.500"
        color="white"
        borderRadius="xl"
        w="max-content"
        rightIcon={<LuArrowRight size={16} />}
        _hover={{ bg: 'primary.400' }}
        onClick={() => navigate('/farmacia')}
      >
        {t('dashboard:actions.goToPharmacy')}
      </Button>
    </Box>
  )
}

function DoctorDashboard() {
  const { t } = useTranslation(['dashboard'])
  const navigate = useNavigate()

  return (
    <>
      {/* Performance Indicators */}
      <Box display="flex" flexDir="column" gap={4}>
        <Flex align="center" justify="space-between">
          <Text fontSize="lg" fontFamily="heading" fontWeight="bold" color={useColorModeValue('primary.500', 'white')}>
            {t('dashboard:doctor.performanceIndicators')}
          </Text>
          <HStack spacing={2}>
            <IconButton
              aria-label="Previous"
              icon={<LuChevronLeft size={20} />}
              variant="ghost"
              size="sm"
              borderRadius="lg"
              color="gray.500"
              _hover={{ bg: useColorModeValue('gray.100', 'gray.700') }}
            />
            <IconButton
              aria-label="Next"
              icon={<LuChevronRight size={20} />}
              variant="ghost"
              size="sm"
              borderRadius="lg"
              color="gray.500"
              _hover={{ bg: useColorModeValue('gray.100', 'gray.700') }}
            />
          </HStack>
        </Flex>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={4}>
          {stats.map((stat, i) => (
            <StatCard key={stat.label} {...stat} index={i} />
          ))}
        </SimpleGrid>
      </Box>

      {/* Main grid: 8/12 + 4/12 */}
      <Grid templateColumns={{ base: '1fr', xl: 'repeat(12, 1fr)' }} gap={6}>
        <GridItem colSpan={{ base: 1, xl: 8 }} display="flex" flexDir="column" gap={6}>
          {/* Next Appointment Card */}
          <Box
            position="relative"
            overflow="hidden"
            bg="primary.500"
            borderRadius={{ base: '2xl', md: '2rem 1rem 2rem 1rem' }}
            p={{ base: 4, md: 6 }}
            color="white"
            shadow="deep"
            minH={{ base: 'auto', md: '220px' }}
            display="flex"
            flexDir="column"
            justifyContent="space-between"
            _hover={{ shadow: 'glow' }}
            transition="all 0.5s"
            role="group"
          >
            <Box position="absolute" top={0} right={0} w="256px" h="256px" bg="white" opacity={0.05} borderRadius="full" filter="blur(48px)" mr={-16} mt={-16} pointerEvents="none" />
            <Box position="absolute" bottom={0} left={0} w="192px" h="192px" bg="accent.500" opacity={0.2} borderRadius="full" filter="blur(32px)" ml={-10} mb={-10} pointerEvents="none" />

            <Flex justify="space-between" align="start" position="relative" zIndex={10}>
              <Box>
                <Text display="inline-block" bg="whiteAlpha.100" backdropFilter="blur(12px)" px={3} py={1} borderRadius="full" fontSize="xs" fontWeight="medium" textTransform="uppercase" letterSpacing="wider" mb={3} border="1px solid" borderColor="whiteAlpha.100">
                  {t('dashboard:doctor.nextUp')} &bull; {nextAppointment.time}
                </Text>
                <Text fontSize={{ base: 'xl', md: '2xl' }} fontFamily="heading" fontWeight="bold" mb={1}>{nextAppointment.patientName}</Text>
                <Text color="gray.300" fontWeight="light">{nextAppointment.consultationType}</Text>
              </Box>
              <Flex w={16} h={16} borderRadius="2xl" bg="whiteAlpha.100" backdropFilter="blur(12px)" align="center" justify="center" border="1px solid" borderColor="whiteAlpha.200" flexShrink={0} display={{ base: 'none', sm: 'flex' }}>
                <LuVideo size={28} />
              </Flex>
            </Flex>

            <SimpleGrid columns={2} spacing={3} mt={5} position="relative" zIndex={10}>
              <Box bg="rgba(26,61,102,0.5)" borderRadius="xl" p={3} backdropFilter="blur(4px)" border="1px solid" borderColor="whiteAlpha.50">
                <Text fontSize="xs" color="gray.300" mb={1}>{t('dashboard:doctor.lastVisit')}</Text>
                <Text fontWeight="semibold">{nextAppointment.lastVisit}</Text>
              </Box>
              <Box bg="rgba(26,61,102,0.5)" borderRadius="xl" p={3} backdropFilter="blur(4px)" border="1px solid" borderColor="whiteAlpha.50">
                <Text fontSize="xs" color="gray.300" mb={1}>{t('dashboard:doctor.condition')}</Text>
                <Text fontWeight="semibold">{nextAppointment.condition}</Text>
              </Box>
            </SimpleGrid>

            <Button
              mt={4} w="full" py={3} h="auto" bg="white" color="primary.500" fontWeight="bold" borderRadius="xl" shadow="lg"
              _hover={{ bg: 'accent.500', color: 'white' }}
              _groupHover={{ transform: 'translateY(-2px)' }}
              transition="all 0.3s"
              rightIcon={<LuArrowRight />}
              onClick={() => navigate(`/consultation/${nextAppointment.id}`)}
              position="relative" zIndex={10}
            >
              {t('dashboard:actions.startConsultation')}
            </Button>
          </Box>

          <ScheduleTable title="Today's Schedule" rows={todaySchedule} onRowClick={(id) => navigate(`/consultation/${id}`)} />
        </GridItem>

        <GridItem colSpan={{ base: 1, xl: 4 }} display="flex" flexDir="column" gap={4}>
          <DateWidget />
          <ActivityTimeline title="Live Activity" items={activityItems} />
          <SimpleGrid columns={2} spacing={3}>
            <Box bg={useColorModeValue('primary.500', 'gray.800')} borderRadius="2xl" p={4} color="white" shadow="lg">
              <Box mb={2}><LuUser size={20} color="rgba(255,255,255,0.7)" /></Box>
              <Text fontSize="xl" fontWeight="bold">1,482</Text>
              <Text fontSize="xs" color="whiteAlpha.600">{t('dashboard:stats.totalPatients')}</Text>
            </Box>
            <Box bg={useColorModeValue('white', 'card.dark')} borderRadius="2xl" p={4} shadow="soft" border="1px solid" borderColor={useColorModeValue('gray.100', 'gray.800')}>
              <Box mb={2}><LuStar size={20} color="var(--chakra-colors-gold-500)" /></Box>
              <Text fontSize="xl" fontWeight="bold" color={useColorModeValue('primary.500', 'white')}>4.9</Text>
              <Text fontSize="xs" color="gray.400">{t('dashboard:stats.rating')}</Text>
            </Box>
          </SimpleGrid>
        </GridItem>
      </Grid>
    </>
  )
}

export default function DashboardPage() {
  const { t } = useTranslation(['dashboard', 'nav'])
  const { onMenuOpen, currentUser, onLogout } = useOutletContext<{ onMenuOpen: () => void; currentUser?: any; onLogout?: () => void }>()
  const { currentUser: authUser } = useAuth()
  const role = authUser?.role ?? 'doctor'

  const firstName = authUser?.name?.split(' ')[0] ?? ''
  const greeting = role === 'doctor'
    ? t('dashboard:greeting.helloDoctor', { name: 'Ricardo' })
    : t('dashboard:greeting.hello', { name: firstName })

  const subtitle = t(`dashboard:subtitle.${role}`)

  return (
    <Box>
      <Header
        title={t('dashboard:clinicalOverview')}
        breadcrumbItems={[
          { label: t('nav:appName') },
          { label: t('nav:dashboard'), isActive: true },
        ]}
        onMenuClick={onMenuOpen}
        currentUser={currentUser}
        onLogout={onLogout}
      />

      <Box
        maxW="1800px"
        w="full"
        mx="auto"
        pl={{ base: 4, md: '128px' }}
        pr={{ base: 4, md: 8 }}
        py={{ base: 5, md: 6 }}
        display="flex"
        flexDir="column"
        gap={6}
      >
        {/* Greeting */}
        <Box>
          <Text
            fontSize={{ base: '2xl', md: '4xl' }}
            fontFamily="heading"
            fontWeight="bold"
            color={useColorModeValue('primary.500', 'white')}
            letterSpacing="tight"
            lineHeight="tight"
          >
            <Text
              as="span"
              bgGradient="linear(to-r, primary.500, primary.400)"
              bgClip="text"
            >
              {greeting}
            </Text>
          </Text>
          <Text color={useColorModeValue('gray.500', 'gray.400')} fontSize="md" mt={1}>
            {subtitle}
          </Text>
        </Box>

        {/* Role-specific content */}
        {role === 'recepcion' && <ReceptionDashboard />}
        {role === 'triaje' && <TriageDashboard />}
        {role === 'doctor' && <DoctorDashboard />}
        {role === 'farmacia' && <FarmaciaDashboard />}
      </Box>
    </Box>
  )
}

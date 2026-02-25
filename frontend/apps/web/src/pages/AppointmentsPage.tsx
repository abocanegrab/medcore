import { useState, useMemo } from 'react'
import {
  Box,
  Grid,
  GridItem,
  Text,
  Flex,
  HStack,
  VStack,
  Button,
  Input,
  Select,
  FormControl,
  FormLabel,
  Textarea,
  useColorModeValue,
  useToast,
  Badge,
  IconButton,
} from '@chakra-ui/react'
import { useOutletContext } from 'react-router-dom'
import { LuCalendar, LuPlus, LuChevronLeft, LuChevronRight } from 'react-icons/lu'
import { Header } from '@medcore/ui'
import { useTranslation } from 'react-i18next'
import { useAppointments } from '../contexts/AppointmentContext'
import type { Appointment, AppointmentStatus } from '../data/mockAppointments'
import type { AppointmentSource } from '../data/mockPatients'
import AppointmentDetailModal from '../components/AppointmentDetailModal'

const TIME_SLOTS = [
  '07:00', '07:30', '08:00', '08:30', '09:00', '09:30',
  '10:00', '10:30', '11:00', '11:30', '12:00', '12:30',
  '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
  '17:00', '17:30',
]

const DOCTORS = [
  { id: 'doc-01', name: 'Dr. Carlos Mendoza' },
  { id: 'doc-02', name: 'Dra. Maria Lopez' },
]

const statusColors: Record<AppointmentStatus, string> = {
  scheduled: 'blue',
  confirmed: 'green',
  arrived: 'orange',
  in_progress: 'purple',
  completed: 'gray',
  cancelled: 'red',
}

export default function AppointmentsPage() {
  const { t } = useTranslation(['appointments', 'common', 'nav'])
  const { onMenuOpen, currentUser, onLogout } = useOutletContext<{ onMenuOpen: () => void; currentUser?: any; onLogout?: () => void }>()
  const { appointments, addAppointment, updateAppointment, cancelAppointment, getAppointmentsByDate } = useAppointments()
  const toast = useToast()

  const today = new Date()
  const [weekOffset, setWeekOffset] = useState(0)

  const weekStart = useMemo(() => {
    const d = new Date(today)
    d.setDate(d.getDate() - d.getDay() + 1 + weekOffset * 7)
    return d
  }, [weekOffset])

  const weekDays = useMemo(() => {
    return Array.from({ length: 6 }, (_, i) => {
      const d = new Date(weekStart)
      d.setDate(d.getDate() + i)
      return d
    })
  }, [weekStart])

  const [selectedDate, setSelectedDate] = useState(today.toISOString().split('T')[0])
  const [selectedAppt, setSelectedAppt] = useState<Appointment | null>(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)

  // Form state
  const [formPatientName, setFormPatientName] = useState('')
  const [formDoctor, setFormDoctor] = useState(DOCTORS[0].id)
  const [formDate, setFormDate] = useState(today.toISOString().split('T')[0])
  const [formTime, setFormTime] = useState('09:00')
  const [formService, setFormService] = useState('Medicina General')
  const [formReason, setFormReason] = useState('')
  const [formSource, setFormSource] = useState<AppointmentSource>('web')

  const cardBg = useColorModeValue('white', 'card.dark')
  const cardBorder = useColorModeValue('gray.100', 'gray.800')
  const titleColor = useColorModeValue('primary.500', 'white')
  const slotBg = useColorModeValue('gray.50', 'gray.800')
  const slotHover = useColorModeValue('gray.100', 'gray.700')
  const dayHeaderBg = useColorModeValue('gray.50', 'gray.800')

  const handleCreateAppointment = () => {
    if (!formPatientName || !formReason) {
      toast({ title: t('appointments:form.requiredFields'), status: 'warning', duration: 2000 })
      return
    }

    const doctor = DOCTORS.find((d) => d.id === formDoctor)!
    const newAppt: Appointment = {
      id: `apt-${Date.now()}`,
      patientId: '',
      patientName: formPatientName,
      doctorId: formDoctor,
      doctorName: doctor.name,
      date: formDate,
      timeSlot: formTime,
      reason: formReason,
      status: 'scheduled',
      serviceType: formService,
      source: formSource,
    }

    addAppointment(newAppt)
    toast({ title: t('appointments:created'), status: 'success', duration: 2000 })
    setFormPatientName('')
    setFormReason('')
  }

  const handleSlotClick = (apt: Appointment) => {
    setSelectedAppt(apt)
    setIsDetailOpen(true)
  }

  const formatDay = (d: Date) => d.toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric' })
  const formatDateStr = (d: Date) => d.toISOString().split('T')[0]

  return (
    <Box>
      <Header
        title={t('appointments:title')}
        breadcrumbItems={[
          { label: t('nav:appName') },
          { label: t('nav:citas'), isActive: true },
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
      >
        <Grid templateColumns={{ base: '1fr', lg: '8fr 4fr' }} gap={5}>
          {/* Left: Calendar Grid */}
          <GridItem>
            <Box bg={cardBg} borderRadius="2xl" border="1px solid" borderColor={cardBorder} shadow="soft" overflow="hidden">
              {/* Week Navigation */}
              <Flex p={4} justify="space-between" align="center" borderBottom="1px solid" borderColor={cardBorder}>
                <HStack spacing={3}>
                  <Flex w={10} h={10} borderRadius="xl" bg="primary.50" align="center" justify="center" color="primary.500">
                    <LuCalendar size={20} />
                  </Flex>
                  <Text fontSize="lg" fontWeight="bold" color={titleColor}>
                    {t('appointments:weeklySchedule')}
                  </Text>
                </HStack>
                <HStack spacing={2}>
                  <IconButton
                    aria-label="Previous week"
                    icon={<LuChevronLeft size={16} />}
                    size="sm"
                    variant="ghost"
                    borderRadius="lg"
                    onClick={() => setWeekOffset((w) => w - 1)}
                  />
                  <Button size="sm" variant="ghost" borderRadius="lg" onClick={() => setWeekOffset(0)}>
                    {t('appointments:today')}
                  </Button>
                  <IconButton
                    aria-label="Next week"
                    icon={<LuChevronRight size={16} />}
                    size="sm"
                    variant="ghost"
                    borderRadius="lg"
                    onClick={() => setWeekOffset((w) => w + 1)}
                  />
                </HStack>
              </Flex>

              {/* Calendar Grid */}
              <Box overflowX="auto">
                <Grid templateColumns={`80px repeat(${weekDays.length}, 1fr)`} minW="700px">
                  {/* Header row */}
                  <Box p={2} bg={dayHeaderBg} borderBottom="1px solid" borderColor={cardBorder} />
                  {weekDays.map((day) => {
                    const isToday = formatDateStr(day) === formatDateStr(today)
                    return (
                      <Box
                        key={formatDateStr(day)}
                        p={2}
                        bg={dayHeaderBg}
                        borderBottom="1px solid"
                        borderLeft="1px solid"
                        borderColor={cardBorder}
                        textAlign="center"
                      >
                        <Text
                          fontSize="xs"
                          fontWeight="bold"
                          textTransform="capitalize"
                          color={isToday ? 'primary.500' : 'gray.500'}
                        >
                          {formatDay(day)}
                        </Text>
                      </Box>
                    )
                  })}

                  {/* Time slots */}
                  {TIME_SLOTS.map((slot) => (
                    <>
                      <Box
                        key={`time-${slot}`}
                        p={2}
                        borderBottom="1px solid"
                        borderColor={cardBorder}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Text fontSize="xs" color="gray.500" fontFamily="mono">
                          {slot}
                        </Text>
                      </Box>
                      {weekDays.map((day) => {
                        const dateStr = formatDateStr(day)
                        const dayAppts = appointments.filter(
                          (a) => a.date === dateStr && a.timeSlot === slot,
                        )

                        return (
                          <Box
                            key={`${dateStr}-${slot}`}
                            p={1}
                            borderBottom="1px solid"
                            borderLeft="1px solid"
                            borderColor={cardBorder}
                            bg={slotBg}
                            _hover={{ bg: slotHover }}
                            minH="36px"
                            cursor="default"
                          >
                            {dayAppts.map((apt) => (
                              <Box
                                key={apt.id}
                                bg={`${statusColors[apt.status]}.100`}
                                color={`${statusColors[apt.status]}.800`}
                                borderRadius="md"
                                px={1.5}
                                py={0.5}
                                fontSize="10px"
                                fontWeight="semibold"
                                cursor="pointer"
                                _hover={{ opacity: 0.8 }}
                                onClick={() => handleSlotClick(apt)}
                                noOfLines={1}
                                mb={0.5}
                              >
                                {apt.patientName}
                              </Box>
                            ))}
                          </Box>
                        )
                      })}
                    </>
                  ))}
                </Grid>
              </Box>
            </Box>
          </GridItem>

          {/* Right: New Appointment Form */}
          <GridItem>
            <Box bg={cardBg} borderRadius="2xl" border="1px solid" borderColor={cardBorder} shadow="soft" p={5}>
              <HStack spacing={3} mb={5}>
                <Flex w={10} h={10} borderRadius="xl" bg="green.50" align="center" justify="center" color="green.500">
                  <LuPlus size={20} />
                </Flex>
                <Text fontSize="lg" fontWeight="bold" color={titleColor}>
                  {t('appointments:newAppointment')}
                </Text>
              </HStack>

              <VStack spacing={4}>
                <FormControl isRequired>
                  <FormLabel fontSize="sm">{t('appointments:form.patient')}</FormLabel>
                  <Input
                    value={formPatientName}
                    onChange={(e) => setFormPatientName(e.target.value)}
                    placeholder={t('appointments:form.patientPlaceholder')}
                    borderRadius="xl"
                    size="sm"
                  />
                </FormControl>

                <FormControl>
                  <FormLabel fontSize="sm">{t('appointments:form.doctor')}</FormLabel>
                  <Select value={formDoctor} onChange={(e) => setFormDoctor(e.target.value)} borderRadius="xl" size="sm">
                    {DOCTORS.map((d) => (
                      <option key={d.id} value={d.id}>{d.name}</option>
                    ))}
                  </Select>
                </FormControl>

                <HStack spacing={3} w="full">
                  <FormControl>
                    <FormLabel fontSize="sm">{t('appointments:form.date')}</FormLabel>
                    <Input
                      type="date"
                      value={formDate}
                      onChange={(e) => setFormDate(e.target.value)}
                      borderRadius="xl"
                      size="sm"
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel fontSize="sm">{t('appointments:form.time')}</FormLabel>
                    <Select value={formTime} onChange={(e) => setFormTime(e.target.value)} borderRadius="xl" size="sm">
                      {TIME_SLOTS.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </Select>
                  </FormControl>
                </HStack>

                <FormControl>
                  <FormLabel fontSize="sm">{t('appointments:form.service')}</FormLabel>
                  <Select value={formService} onChange={(e) => setFormService(e.target.value)} borderRadius="xl" size="sm">
                    <option>Medicina General</option>
                    <option>Medicina Interna</option>
                    <option>Cardiologia</option>
                    <option>Traumatologia</option>
                    <option>Pediatria</option>
                    <option>Ginecologia</option>
                  </Select>
                </FormControl>

                <FormControl>
                  <FormLabel fontSize="sm">{t('appointments:form.source')}</FormLabel>
                  <Select value={formSource} onChange={(e) => setFormSource(e.target.value as AppointmentSource)} borderRadius="xl" size="sm">
                    <option value="web">{t('appointments:sources.web')}</option>
                    <option value="phone">{t('appointments:sources.phone')}</option>
                    <option value="whatsapp">{t('appointments:sources.whatsapp')}</option>
                    <option value="callcenter">{t('appointments:sources.callcenter')}</option>
                  </Select>
                </FormControl>

                <FormControl isRequired>
                  <FormLabel fontSize="sm">{t('appointments:form.reason')}</FormLabel>
                  <Textarea
                    value={formReason}
                    onChange={(e) => setFormReason(e.target.value)}
                    placeholder={t('appointments:form.reasonPlaceholder')}
                    borderRadius="xl"
                    size="sm"
                    rows={3}
                    resize="none"
                  />
                </FormControl>

                <Button
                  w="full"
                  bg="primary.500"
                  color="white"
                  borderRadius="xl"
                  _hover={{ bg: 'primary.400' }}
                  onClick={handleCreateAppointment}
                  size="sm"
                  fontWeight="semibold"
                >
                  {t('appointments:form.save')}
                </Button>
              </VStack>
            </Box>
          </GridItem>
        </Grid>
      </Box>

      <AppointmentDetailModal
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        appointment={selectedAppt}
        onUpdateStatus={(id, status) => updateAppointment(id, { status })}
        onCancel={cancelAppointment}
      />
    </Box>
  )
}

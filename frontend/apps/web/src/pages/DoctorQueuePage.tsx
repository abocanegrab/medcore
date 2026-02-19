import { Box, Tabs, TabList, Tab, TabPanels, TabPanel } from '@chakra-ui/react'
import { useOutletContext, useNavigate } from 'react-router-dom'
import { LuStethoscope, LuArrowRight } from 'react-icons/lu'
import { Header, PatientTable } from '@medcore/ui'
import type { PatientTableRow } from '@medcore/ui'
import { useTranslation } from 'react-i18next'
import { usePatientQueue } from '../contexts/PatientQueueContext'
import { useAppointments } from '../contexts/AppointmentContext'
import { useTTS } from '../hooks'

function patientsToRows(patients: any[]): PatientTableRow[] {
  return patients.map((p, idx) => ({
    id: p.id,
    order: idx + 1,
    appointmentTime: p.appointmentTime || p.registeredAt,
    name: p.name,
    initials: p.initials,
    age: p.age,
    gender: p.gender,
    serviceType: p.serviceType,
    patientId: p.patientId,
    registeredAt: p.registeredAt,
    priority: p.priority,
  }))
}

export default function DoctorQueuePage() {
  const { t } = useTranslation(['consultation', 'common', 'ui'])
  const navigate = useNavigate()
  const { onMenuOpen, currentUser, onLogout } = useOutletContext<{ onMenuOpen: () => void; currentUser?: any; onLogout?: () => void }>()
  const { getPatientsByStatus, updatePatientStatus } = usePatientQueue()
  const { speak } = useTTS()

  const triagedPatients = getPatientsByStatus('triaged')
  const registeredPatients = getPatientsByStatus('registered')
  const allScheduled = getPatientsByStatus('registered', 'triaged', 'in_triage')

  const handleBeginConsultation = (patientId: string) => {
    updatePatientStatus(patientId, 'in_consultation')
    navigate(`/consultation/${patientId}`)
  }

  const handleSpeaker = (name: string) => {
    speak(`Paciente ${name}, por favor pasar al consultorio`)
  }

  return (
    <Box>
      <Header
        title={t('consultation:queue.title')}
        breadcrumbItems={[
          { label: 'MedCore' },
          { label: 'Consultas', isActive: true },
        ]}
        badge={triagedPatients.length > 0 ? { label: `${triagedPatients.length} ${t('ui:ready')}`, color: 'primary' } : undefined}
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
        <Tabs variant="soft-rounded" colorScheme="blue" size="sm">
          <TabList gap={2} flexWrap="wrap">
            <Tab borderRadius="xl" fontWeight="semibold" fontSize="sm">
              {t('consultation:queue.scheduledTab', 'Citados')} ({allScheduled.length})
            </Tab>
            <Tab borderRadius="xl" fontWeight="semibold" fontSize="sm">
              {t('consultation:queue.registeredTab', 'Registrados')} ({registeredPatients.length})
            </Tab>
            <Tab borderRadius="xl" fontWeight="semibold" fontSize="sm">
              {t('consultation:queue.triagedTab', 'Triados')} ({triagedPatients.length})
            </Tab>
          </TabList>

          <TabPanels mt={4}>
            <TabPanel p={0}>
              <PatientTable
                rows={patientsToRows(allScheduled)}
                title={t('consultation:queue.allScheduledTitle', 'All Scheduled Patients')}
                subtitle={t('consultation:queue.allScheduledSub', 'Registered and triaged patients for today')}
                icon={LuStethoscope}
                showSpeakerColumn
                onSpeakerClick={handleSpeaker}
                emptyMessage={t('consultation:queue.noPatientsWaiting')}
                emptySubMessage={t('consultation:queue.allSeen')}
              />
            </TabPanel>
            <TabPanel p={0}>
              <PatientTable
                rows={patientsToRows(registeredPatients)}
                title={t('consultation:queue.registeredTitle', 'Registered Patients')}
                subtitle={t('consultation:queue.registeredSub', 'Patients not yet triaged')}
                icon={LuStethoscope}
                showSpeakerColumn
                onSpeakerClick={handleSpeaker}
                emptyMessage={t('consultation:queue.noRegistered', 'No registered patients')}
              />
            </TabPanel>
            <TabPanel p={0}>
              <PatientTable
                rows={patientsToRows(triagedPatients)}
                title={t('consultation:queue.triagedPatients')}
                subtitle={t('consultation:queue.patientsWithCompletedTriage')}
                icon={LuStethoscope}
                showSpeakerColumn
                onSpeakerClick={handleSpeaker}
                emptyMessage={t('consultation:queue.noPatientsWaiting')}
                emptySubMessage={t('consultation:queue.allSeen')}
                actionColumn={{
                  label: t('consultation:queue.beginConsultation'),
                  icon: LuArrowRight,
                  onClick: handleBeginConsultation,
                  colorScheme: 'blue',
                }}
              />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  )
}

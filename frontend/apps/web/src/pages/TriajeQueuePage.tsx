import { Box } from '@chakra-ui/react'
import { useOutletContext, useNavigate } from 'react-router-dom'
import { LuClipboardPlus, LuArrowRight } from 'react-icons/lu'
import { Header, PatientTable } from '@medcore/ui'
import type { PatientTableRow } from '@medcore/ui'
import { useTranslation } from 'react-i18next'
import { usePatientQueue } from '../contexts/PatientQueueContext'
import { useTTS } from '../hooks'

export default function TriajeQueuePage() {
  const { t } = useTranslation(['triaje', 'common', 'ui'])
  const navigate = useNavigate()
  const { onMenuOpen, currentUser, onLogout } = useOutletContext<{ onMenuOpen: () => void; currentUser?: any; onLogout?: () => void }>()
  const { getPatientsByStatus, updatePatientStatus } = usePatientQueue()
  const { speak } = useTTS()

  const waitingPatients = getPatientsByStatus('registered')

  const rows: PatientTableRow[] = waitingPatients.map((p, idx) => ({
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

  const handleStartTriage = (patientId: string) => {
    updatePatientStatus(patientId, 'in_triage')
    navigate(`/triaje/${patientId}`)
  }

  const handleSpeaker = (name: string) => {
    speak(`Paciente ${name}, por favor pasar a triaje`)
  }

  return (
    <Box>
      <Header
        title={t('triaje:queue.title')}
        breadcrumbItems={[
          { label: 'MedCore' },
          { label: 'Triaje', isActive: true },
        ]}
        badge={waitingPatients.length > 0 ? { label: `${waitingPatients.length} ${t('ui:waiting')}`, color: 'amber' } : undefined}
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
        <PatientTable
          rows={rows}
          title={t('triaje:queue.patientsAwaitingTriage')}
          subtitle={t('triaje:queue.clickStartTriage')}
          icon={LuClipboardPlus}
          showSpeakerColumn
          onSpeakerClick={handleSpeaker}
          emptyMessage={t('triaje:queue.noPatientsWaiting')}
          emptySubMessage={t('triaje:queue.allTriaged')}
          actionColumn={{
            label: t('triaje:queue.startTriage'),
            icon: LuArrowRight,
            onClick: handleStartTriage,
            colorScheme: 'blue',
          }}
        />
      </Box>
    </Box>
  )
}

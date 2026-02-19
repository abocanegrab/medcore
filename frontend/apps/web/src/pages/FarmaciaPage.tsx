import { Box } from '@chakra-ui/react'
import { useOutletContext } from 'react-router-dom'
import { LuPill, LuCircleCheck } from 'react-icons/lu'
import { Header, PatientTable } from '@medcore/ui'
import type { PatientTableRow } from '@medcore/ui'
import { useTranslation } from 'react-i18next'
import { usePatientQueue } from '../contexts/PatientQueueContext'
import { useTTS } from '../hooks'

export default function FarmaciaPage() {
  const { t } = useTranslation(['farmacia', 'ui'])
  const { onMenuOpen, currentUser, onLogout } = useOutletContext<{ onMenuOpen: () => void; currentUser?: any; onLogout?: () => void }>()
  const { getPatientsByStatus, updatePatientStatus } = usePatientQueue()
  const { speak } = useTTS()

  const pharmacyPatients = getPatientsByStatus('post_consultation').filter((p) => p.nextStep === 'farmacia')

  const rows: PatientTableRow[] = pharmacyPatients.map((p, idx) => ({
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
    diagnosis: p.diagnoses?.map((d) => d.cie10Label).join(', '),
  }))

  const handleDispense = (patientId: string) => {
    updatePatientStatus(patientId, 'completed')
  }

  const handleSpeaker = (name: string) => {
    speak(`Paciente ${name}, por favor acercarse a farmacia`)
  }

  return (
    <Box>
      <Header
        title={t('farmacia:title')}
        breadcrumbItems={[
          { label: 'MedCore' },
          { label: 'Farmacia', isActive: true },
        ]}
        badge={pharmacyPatients.length > 0 ? { label: `${pharmacyPatients.length} ${t('ui:pending')}`, color: 'amber' } : undefined}
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
          title={t('farmacia:prescriptionsToDispense')}
          subtitle={t('farmacia:patientsWithActivePrescriptions')}
          icon={LuPill}
          showSpeakerColumn
          onSpeakerClick={handleSpeaker}
          emptyMessage={t('farmacia:noPending')}
          emptySubMessage={t('farmacia:allDispensed')}
          actionColumn={{
            label: t('farmacia:dispenseComplete'),
            icon: LuCircleCheck,
            onClick: handleDispense,
            colorScheme: 'green',
          }}
        />
      </Box>
    </Box>
  )
}

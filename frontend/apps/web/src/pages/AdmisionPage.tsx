import { useState } from 'react'
import {
  Box,
  Button,
  Flex,
  useToast,
} from '@chakra-ui/react'
import { useOutletContext } from 'react-router-dom'
import { LuClipboardList, LuPlus } from 'react-icons/lu'
import { Header, PatientTable } from '@medcore/ui'
import type { PatientTableRow } from '@medcore/ui'
import { useTranslation } from 'react-i18next'
import { usePatientQueue } from '../contexts/PatientQueueContext'
import { useTTS } from '../hooks'
import RegisterPatientModal from '../components/RegisterPatientModal'

export default function AdmisionPage() {
  const { t } = useTranslation(['admision', 'common', 'nav'])
  const { onMenuOpen, currentUser, onLogout } = useOutletContext<{ onMenuOpen: () => void; currentUser?: any; onLogout?: () => void }>()
  const { patients } = usePatientQueue()
  const { speak, isSpeaking } = useTTS()
  const [isRegisterOpen, setIsRegisterOpen] = useState(false)
  const toast = useToast()

  const todayPatients = patients.filter((p) => p.status !== 'completed')

  const rows: PatientTableRow[] = todayPatients.map((p, idx) => ({
    id: p.id,
    order: idx + 1,
    appointmentTime: p.appointmentTime || p.registeredAt,
    name: p.name,
    initials: p.initials,
    patientType: p.patientTypeEstablishment || undefined,
    age: p.age,
    gender: p.gender,
    serviceType: p.serviceType,
    patientId: p.patientId,
    registeredAt: p.registeredAt,
    status: p.status,
    priority: p.priority,
  }))

  const handleSpeaker = (name: string) => {
    speak(`Paciente ${name}, por favor acercarse a admision`)
  }

  return (
    <Box>
      <Header
        title={t('admision:title')}
        breadcrumbItems={[
          { label: t('nav:appName') },
          { label: t('nav:admision'), isActive: true },
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
        <Flex justify="flex-end">
          <Button
            leftIcon={<LuPlus size={18} />}
            bg="primary.500"
            color="white"
            borderRadius="xl"
            px={6}
            fontWeight="semibold"
            _hover={{ bg: 'primary.400', transform: 'translateY(-1px)' }}
            transition="all 0.2s"
            shadow="md"
            onClick={() => setIsRegisterOpen(true)}
          >
            {t('admision:registerNewPatient')}
          </Button>
        </Flex>

        <PatientTable
          rows={rows}
          title={t('admision:todaysRegistrations')}
          subtitle={t('admision:allPatientsProcessed')}
          icon={LuClipboardList}
          showSpeakerColumn
          onSpeakerClick={handleSpeaker}
          searchPlaceholder={t('admision:searchPlaceholder', 'Search patients...')}
          emptyMessage={t('admision:noPatients', 'No patients registered today')}
        />
      </Box>

      <RegisterPatientModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
      />
    </Box>
  )
}

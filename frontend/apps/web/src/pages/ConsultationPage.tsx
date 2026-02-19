import { useState, useCallback } from 'react'
import {
  Box,
  Text,
  HStack,
  Button,
  Flex,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react'
import { useOutletContext, useParams, useNavigate } from 'react-router-dom'
import {
  LuFilePenLine,
  LuActivity,
  LuFlaskConical,
  LuScanLine,
  LuPill,
  LuFileText,
  LuBedDouble,
  LuSave,
  LuShieldCheck,
} from 'react-icons/lu'
import {
  Header,
  PatientBanner,
  WizardTabs,
} from '@medcore/ui'
import type { WizardTab } from '@medcore/ui'
import { useTranslation } from 'react-i18next'
import { usePatientQueue } from '../contexts/PatientQueueContext'
import AnamnesisTab from '../components/consultation/AnamnesisTab'
import DiagnosisTab from '../components/consultation/DiagnosisTab'
import LabExamsTab from '../components/consultation/LabExamsTab'
import ImagingExamsTab from '../components/consultation/ImagingExamsTab'
import TreatmentTab from '../components/consultation/TreatmentTab'
import NotesTab from '../components/consultation/NotesTab'
import RestTab from '../components/consultation/RestTab'
import OrderPreviewModal from '../components/OrderPreviewModal'
import SigningModal from '../components/SigningModal'
import type {
  Diagnosis,
  DiagnosisType,
  PatientType,
  IllnessDurationUnit,
  MedicationOrder,
  MedicationRoute,
  RestCertificate,
} from '../data/mockPatients'
import type { CIE10Code } from '../data/catalogs'

export default function ConsultationPage() {
  const { t } = useTranslation(['consultation', 'common'])
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { onMenuOpen, currentUser, onLogout } = useOutletContext<{ onMenuOpen: () => void; currentUser?: any; onLogout?: () => void }>()
  const { getPatientById, updatePatientData } = usePatientQueue()
  const toast = useToast()

  const patient = id ? getPatientById(id) : undefined

  const [activeTab, setActiveTab] = useState('anamnesis')

  // Anamnesis state
  const [patientTypeEstablishment, setPatientTypeEstablishment] = useState<PatientType>(patient?.patientTypeEstablishment || 'N')
  const [patientTypeService, setPatientTypeService] = useState<PatientType>(patient?.patientTypeService || 'N')
  const [illnessDuration, setIllnessDuration] = useState<{ value: number; unit: IllnessDurationUnit }>(
    patient?.illnessDuration || { value: 0, unit: 'days' },
  )
  const [mainSymptom, setMainSymptom] = useState(patient?.mainSymptom || '')
  const [anamnesis, setAnamnesis] = useState(patient?.anamnesis || '')
  const [workPlan, setWorkPlan] = useState(patient?.workPlan || '')
  const [clinicalExam, setClinicalExam] = useState(patient?.clinicalExam || '')

  // Diagnosis state
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>(patient?.diagnoses || [])

  // Treatment state
  const [treatmentObservations, setTreatmentObservations] = useState(patient?.treatmentObservations || '')
  const [nextControlDate, setNextControlDate] = useState(patient?.nextControlDate || '')

  // Notes state
  const [medicalNotes, setMedicalNotes] = useState(patient?.medicalNotes || '')

  // Rest state
  const [restCertificate, setRestCertificate] = useState<RestCertificate>(
    patient?.restCertificate || { days: 0, startDate: '', reason: '' },
  )

  // Modals
  const [isSigningOpen, setIsSigningOpen] = useState(false)
  const [isOrderPreviewOpen, setIsOrderPreviewOpen] = useState(false)

  const cardBg = useColorModeValue('white', 'card.dark')
  const cardBorder = useColorModeValue('gray.100', 'gray.800')

  if (!patient) {
    return (
      <Box p={12} textAlign="center">
        <Text fontSize="xl" color="gray.400">{t('common:notFound')}</Text>
      </Box>
    )
  }

  // Diagnosis handlers
  const handleAddDiagnosis = (code: CIE10Code) => {
    const exists = diagnoses.find((d) => d.cie10Code === code.code)
    if (exists) {
      toast({ title: 'Diagnostico ya agregado', status: 'warning', duration: 2000 })
      return
    }
    const newDiag: Diagnosis = {
      id: `diag-${Date.now()}`,
      cie10Code: code.code,
      cie10Label: code.label,
      type: 'presuntivo',
      labExams: [],
      imagingExams: [],
      medications: [],
    }
    setDiagnoses((prev) => [...prev, newDiag])
  }

  const handleRemoveDiagnosis = (id: string) => {
    setDiagnoses((prev) => prev.filter((d) => d.id !== id))
  }

  const handleDiagnosisTypeChange = (id: string, type: DiagnosisType) => {
    setDiagnoses((prev) => prev.map((d) => (d.id === id ? { ...d, type } : d)))
  }

  // Lab exam handlers
  const handleToggleLabExam = (diagId: string, examId: string, examName: string, categoryName: string) => {
    setDiagnoses((prev) =>
      prev.map((d) => {
        if (d.id !== diagId) return d
        const exists = d.labExams.find((e) => e.examId === examId)
        return {
          ...d,
          labExams: exists
            ? d.labExams.filter((e) => e.examId !== examId)
            : [...d.labExams, { id: `le-${Date.now()}`, examId, examName, categoryName }],
        }
      }),
    )
  }

  // Imaging exam handlers
  const handleToggleImagingExam = (diagId: string, examId: string, examName: string, categoryName: string) => {
    setDiagnoses((prev) =>
      prev.map((d) => {
        if (d.id !== diagId) return d
        const exists = d.imagingExams.find((e) => e.examId === examId)
        return {
          ...d,
          imagingExams: exists
            ? d.imagingExams.filter((e) => e.examId !== examId)
            : [...d.imagingExams, { id: `ie-${Date.now()}`, examId, examName, categoryName }],
        }
      }),
    )
  }

  // Medication handlers
  const handleAddMedication = (diagId: string, med: MedicationOrder) => {
    setDiagnoses((prev) =>
      prev.map((d) => (d.id === diagId ? { ...d, medications: [...d.medications, med] } : d)),
    )
  }

  const handleRemoveMedication = (diagId: string, medId: string) => {
    setDiagnoses((prev) =>
      prev.map((d) =>
        d.id === diagId ? { ...d, medications: d.medications.filter((m) => m.id !== medId) } : d,
      ),
    )
  }

  const handleUpdateMedication = (diagId: string, medId: string, data: Partial<MedicationOrder>) => {
    setDiagnoses((prev) =>
      prev.map((d) =>
        d.id === diagId
          ? { ...d, medications: d.medications.map((m) => (m.id === medId ? { ...m, ...data } : m)) }
          : d,
      ),
    )
  }

  // Save draft
  const handleSaveDraft = () => {
    updatePatientData(patient.id, {
      patientTypeEstablishment,
      patientTypeService,
      illnessDuration,
      mainSymptom,
      anamnesis,
      workPlan,
      clinicalExam,
      diagnoses,
      treatmentObservations,
      nextControlDate,
      medicalNotes,
      restCertificate,
    })
    toast({ title: 'Borrador guardado', status: 'success', duration: 2000 })
  }

  // Sign and finish
  const handleSignAndFinish = () => {
    setIsSigningOpen(true)
  }

  const handleSigningComplete = () => {
    setIsSigningOpen(false)

    // Build prescription string from medications
    const prescriptionLines = diagnoses.flatMap((d) =>
      d.medications.map((m) => `${m.medicationName} x${m.quantity} - ${m.days}d - ${m.route} - ${m.indication}`),
    )

    updatePatientData(patient.id, {
      status: 'post_consultation',
      patientTypeEstablishment,
      patientTypeService,
      illnessDuration,
      mainSymptom,
      anamnesis,
      workPlan,
      clinicalExam,
      diagnoses,
      treatmentObservations,
      nextControlDate,
      medicalNotes,
      restCertificate,
      consultationSignedAt: new Date().toISOString(),
      nextStep: prescriptionLines.length > 0 ? 'farmacia' : 'salida',
      prescription: prescriptionLines.join('\n') || undefined,
    })

    setIsOrderPreviewOpen(true)
  }

  const handleOrdersConfirmed = () => {
    setIsOrderPreviewOpen(false)
    toast({ title: 'Consulta finalizada y ordenes generadas', status: 'success', duration: 3000 })
    navigate('/consultation')
  }

  // Tab definitions
  const totalLabExams = diagnoses.reduce((sum, d) => sum + d.labExams.length, 0)
  const totalImagingExams = diagnoses.reduce((sum, d) => sum + d.imagingExams.length, 0)
  const totalMedications = diagnoses.reduce((sum, d) => sum + d.medications.length, 0)

  const tabs: WizardTab[] = [
    { id: 'anamnesis', label: 'Anamnesis', icon: LuFilePenLine, isComplete: !!anamnesis },
    { id: 'diagnosis', label: 'Diagnostico', icon: LuActivity, badge: diagnoses.length, isComplete: diagnoses.length > 0 },
    { id: 'lab', label: 'Lab', icon: LuFlaskConical, badge: totalLabExams },
    { id: 'imaging', label: 'Imagen', icon: LuScanLine, badge: totalImagingExams },
    { id: 'treatment', label: 'Tratamiento', icon: LuPill, badge: totalMedications },
    { id: 'notes', label: 'Notas', icon: LuFileText, isComplete: !!medicalNotes },
    { id: 'rest', label: 'Descanso', icon: LuBedDouble, isComplete: restCertificate.days > 0 },
  ]

  return (
    <Box pb={24}>
      <Header
        title={t('consultation:form.title')}
        breadcrumbItems={[
          { label: 'MedCore' },
          { label: 'Consultas' },
          { label: patient.name, isActive: true },
        ]}
        badge={{ label: t('consultation:form.dataEntry'), color: 'red' }}
        showSearch={false}
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
        py={5}
        display="flex"
        flexDir="column"
        gap={5}
      >
        {/* Patient Banner */}
        <PatientBanner
          name={patient.name}
          age={patient.age}
          gender={patient.gender}
          patientId={patient.patientId}
          vitals={patient.vitals ?? { weight: '--', height: '--', temperature: '--', bloodPressure: '--' }}
        />

        {/* Triage observations */}
        {patient.triageObservations && (
          <Box
            bg={useColorModeValue('blue.50', 'rgba(0,39,82,0.15)')}
            borderRadius="2xl"
            p={4}
            border="1px solid"
            borderColor={useColorModeValue('blue.100', 'rgba(0,39,82,0.3)')}
          >
            <Text fontSize="10px" fontWeight="bold" color="blue.600" textTransform="uppercase" letterSpacing="wider" mb={1}>
              {t('consultation:form.triageObservations')}
            </Text>
            <Text fontSize="sm" color={useColorModeValue('gray.700', 'gray.300')}>
              {patient.triageObservations}
            </Text>
          </Box>
        )}

        {/* Wizard Tabs */}
        <WizardTabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Tab Content */}
        {activeTab === 'anamnesis' && (
          <AnamnesisTab
            patient={patient}
            patientTypeEstablishment={patientTypeEstablishment}
            onPatientTypeEstablishmentChange={setPatientTypeEstablishment}
            patientTypeService={patientTypeService}
            onPatientTypeServiceChange={setPatientTypeService}
            illnessDuration={illnessDuration}
            onIllnessDurationChange={setIllnessDuration}
            mainSymptom={mainSymptom}
            onMainSymptomChange={setMainSymptom}
            anamnesis={anamnesis}
            onAnamnesisChange={setAnamnesis}
            workPlan={workPlan}
            onWorkPlanChange={setWorkPlan}
            clinicalExam={clinicalExam}
            onClinicalExamChange={setClinicalExam}
          />
        )}
        {activeTab === 'diagnosis' && (
          <DiagnosisTab
            diagnoses={diagnoses}
            onAdd={handleAddDiagnosis}
            onRemove={handleRemoveDiagnosis}
            onTypeChange={handleDiagnosisTypeChange}
          />
        )}
        {activeTab === 'lab' && (
          <LabExamsTab
            diagnoses={diagnoses}
            onToggleExam={handleToggleLabExam}
          />
        )}
        {activeTab === 'imaging' && (
          <ImagingExamsTab
            diagnoses={diagnoses}
            onToggleExam={handleToggleImagingExam}
          />
        )}
        {activeTab === 'treatment' && (
          <TreatmentTab
            diagnoses={diagnoses}
            onAddMedication={handleAddMedication}
            onRemoveMedication={handleRemoveMedication}
            onUpdateMedication={handleUpdateMedication}
            treatmentObservations={treatmentObservations}
            onTreatmentObservationsChange={setTreatmentObservations}
            nextControlDate={nextControlDate}
            onNextControlDateChange={setNextControlDate}
          />
        )}
        {activeTab === 'notes' && (
          <NotesTab notes={medicalNotes} onNotesChange={setMedicalNotes} />
        )}
        {activeTab === 'rest' && (
          <RestTab
            restCertificate={restCertificate}
            onRestCertificateChange={setRestCertificate}
          />
        )}
      </Box>

      {/* Sticky Action Bar */}
      <Box
        position="fixed"
        bottom={0}
        left={0}
        right={0}
        bg={cardBg}
        borderTop="1px solid"
        borderColor={cardBorder}
        py={3}
        px={6}
        zIndex={10}
      >
        <Flex maxW="1800px" mx="auto" justify="flex-end" gap={3} pl={{ base: 4, md: '128px' }}>
          <Button
            leftIcon={<LuSave size={16} />}
            variant="outline"
            borderRadius="xl"
            size="sm"
            fontWeight="semibold"
            onClick={handleSaveDraft}
          >
            {t('common:actions.saveDraft')}
          </Button>
          <Button
            leftIcon={<LuShieldCheck size={16} />}
            bg="primary.500"
            color="white"
            borderRadius="xl"
            size="sm"
            fontWeight="semibold"
            _hover={{ bg: 'primary.400', transform: 'translateY(-1px)' }}
            transition="all 0.2s"
            shadow="md"
            onClick={handleSignAndFinish}
          >
            Firmar y Finalizar
          </Button>
        </Flex>
      </Box>

      {/* Signing Modal */}
      <SigningModal
        isOpen={isSigningOpen}
        onClose={() => setIsSigningOpen(false)}
        onComplete={handleSigningComplete}
      />

      {/* Order Preview Modal */}
      <OrderPreviewModal
        isOpen={isOrderPreviewOpen}
        onClose={handleOrdersConfirmed}
        diagnoses={diagnoses}
        patientName={patient.name}
      />
    </Box>
  )
}

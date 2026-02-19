import {
  Box,
  Grid,
  GridItem,
  VStack,
  HStack,
  Text,
  Flex,
  Wrap,
  WrapItem,
  RadioGroup,
  Radio,
  Input,
  Select,
  useColorModeValue,
  IconButton,
} from '@chakra-ui/react'
import { LuFilePenLine, LuClipboardList, LuStethoscope, LuHistory, LuPlus } from 'react-icons/lu'
import { TextAreaCard, HistoryChip } from '@medcore/ui'
import { useTranslation } from 'react-i18next'
import { useSTT } from '../../hooks'
import type { Patient, PatientType, IllnessDurationUnit } from '../../data/mockPatients'

interface AnamnesisTabProps {
  patient: Patient
  patientTypeEstablishment: PatientType
  onPatientTypeEstablishmentChange: (v: PatientType) => void
  patientTypeService: PatientType
  onPatientTypeServiceChange: (v: PatientType) => void
  illnessDuration: { value: number; unit: IllnessDurationUnit }
  onIllnessDurationChange: (v: { value: number; unit: IllnessDurationUnit }) => void
  mainSymptom: string
  onMainSymptomChange: (v: string) => void
  anamnesis: string
  onAnamnesisChange: (v: string) => void
  workPlan: string
  onWorkPlanChange: (v: string) => void
  clinicalExam: string
  onClinicalExamChange: (v: string) => void
}

export default function AnamnesisTab({
  patient,
  patientTypeEstablishment,
  onPatientTypeEstablishmentChange,
  patientTypeService,
  onPatientTypeServiceChange,
  illnessDuration,
  onIllnessDurationChange,
  mainSymptom,
  onMainSymptomChange,
  anamnesis,
  onAnamnesisChange,
  workPlan,
  onWorkPlanChange,
  clinicalExam,
  onClinicalExamChange,
}: AnamnesisTabProps) {
  const { t } = useTranslation(['consultation', 'common'])

  const sttAnamnesis = useSTT({ onResult: onAnamnesisChange })
  const sttWorkPlan = useSTT({ onResult: onWorkPlanChange })
  const sttClinical = useSTT({ onResult: onClinicalExamChange })
  const sttSymptom = useSTT({ onResult: onMainSymptomChange })

  const cardBg = useColorModeValue('white', 'card.dark')
  const cardBorder = useColorModeValue('gray.100', 'gray.800')
  const titleColor = useColorModeValue('primary.500', 'white')
  const sectionLabel = useColorModeValue('gray.400', 'gray.500')
  const chipSubtext = useColorModeValue('gray.400', 'gray.500')
  const addBtnBg = useColorModeValue('rgba(0,39,82,0.1)', 'rgba(0,39,82,0.3)')
  const allergyBg = useColorModeValue('red.50', 'rgba(127,29,29,0.2)')
  const allergyBorder = useColorModeValue('red.100', 'rgba(127,29,29,0.3)')
  const allergyColor = useColorModeValue('red.600', 'red.400')

  return (
    <Grid templateColumns={{ base: '1fr', lg: 'repeat(12, 1fr)' }} gap={5}>
      {/* Left Column: 8/12 */}
      <GridItem colSpan={{ base: 1, lg: 8 }} display="flex" flexDir="column" gap={5}>
        {/* Patient Type & Duration */}
        <Box bg={cardBg} borderRadius="2xl" p={5} border="1px solid" borderColor={cardBorder} shadow="soft">
          <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={4}>
            <Box>
              <Text fontSize="10px" fontWeight="bold" color={sectionLabel} textTransform="uppercase" letterSpacing="widest" mb={2}>
                Tipo paciente (Establecimiento)
              </Text>
              <RadioGroup value={patientTypeEstablishment} onChange={(v) => onPatientTypeEstablishmentChange(v as PatientType)}>
                <HStack spacing={4}>
                  <Radio value="N" size="sm" colorScheme="blue"><Text fontSize="xs">Nuevo</Text></Radio>
                  <Radio value="C" size="sm" colorScheme="blue"><Text fontSize="xs">Continuador</Text></Radio>
                  <Radio value="R" size="sm" colorScheme="blue"><Text fontSize="xs">Reingreso</Text></Radio>
                </HStack>
              </RadioGroup>
            </Box>
            <Box>
              <Text fontSize="10px" fontWeight="bold" color={sectionLabel} textTransform="uppercase" letterSpacing="widest" mb={2}>
                Tipo paciente (Servicio)
              </Text>
              <RadioGroup value={patientTypeService} onChange={(v) => onPatientTypeServiceChange(v as PatientType)}>
                <HStack spacing={4}>
                  <Radio value="N" size="sm" colorScheme="blue"><Text fontSize="xs">Nuevo</Text></Radio>
                  <Radio value="C" size="sm" colorScheme="blue"><Text fontSize="xs">Continuador</Text></Radio>
                  <Radio value="R" size="sm" colorScheme="blue"><Text fontSize="xs">Reingreso</Text></Radio>
                </HStack>
              </RadioGroup>
            </Box>
            <Box>
              <Text fontSize="10px" fontWeight="bold" color={sectionLabel} textTransform="uppercase" letterSpacing="widest" mb={2}>
                Tiempo de enfermedad
              </Text>
              <HStack spacing={2}>
                <Input
                  type="number"
                  value={illnessDuration.value}
                  onChange={(e) => onIllnessDurationChange({ ...illnessDuration, value: parseInt(e.target.value) || 0 })}
                  size="sm"
                  borderRadius="xl"
                  w="80px"
                />
                <Select
                  value={illnessDuration.unit}
                  onChange={(e) => onIllnessDurationChange({ ...illnessDuration, unit: e.target.value as IllnessDurationUnit })}
                  size="sm"
                  borderRadius="xl"
                  w="120px"
                >
                  <option value="minutes">Minutos</option>
                  <option value="hours">Horas</option>
                  <option value="days">Dias</option>
                  <option value="weeks">Semanas</option>
                </Select>
              </HStack>
            </Box>
            <Box>
              <Text fontSize="10px" fontWeight="bold" color={sectionLabel} textTransform="uppercase" letterSpacing="widest" mb={2}>
                Motivo de consulta
              </Text>
              <Input
                value={mainSymptom}
                onChange={(e) => onMainSymptomChange(e.target.value)}
                placeholder="Sintoma principal..."
                size="sm"
                borderRadius="xl"
              />
            </Box>
          </Grid>
        </Box>

        <TextAreaCard
          title={t('consultation:form.anamnesis')}
          subtitle={t('consultation:form.anamnesisSubtitle')}
          icon={LuFilePenLine}
          placeholder={t('consultation:form.anamnesisPlaceholder')}
          value={anamnesis}
          onChange={onAnamnesisChange}
          rows={6}
          showMic
          onMicToggle={sttAnamnesis.toggle}
          isMicListening={sttAnamnesis.isListening}
          isMicSupported={sttAnamnesis.isSupported}
        />

        <TextAreaCard
          title={t('consultation:form.workPlan')}
          subtitle={t('consultation:form.workPlanSubtitle')}
          icon={LuClipboardList}
          placeholder={t('consultation:form.workPlanPlaceholder')}
          value={workPlan}
          onChange={onWorkPlanChange}
          rows={4}
          showMic
          onMicToggle={sttWorkPlan.toggle}
          isMicListening={sttWorkPlan.isListening}
          isMicSupported={sttWorkPlan.isSupported}
        />

        <TextAreaCard
          title="Examen Clinico"
          subtitle="Hallazgos del examen fisico"
          icon={LuStethoscope}
          placeholder="Describa los hallazgos del examen clinico..."
          value={clinicalExam}
          onChange={onClinicalExamChange}
          rows={4}
          showMic
          onMicToggle={sttClinical.toggle}
          isMicListening={sttClinical.isListening}
          isMicSupported={sttClinical.isSupported}
        />
      </GridItem>

      {/* Right Column: 4/12 — Background History */}
      <GridItem colSpan={{ base: 1, lg: 4 }}>
        <Box
          bg={cardBg}
          borderRadius="3xl"
          p={5}
          shadow="soft"
          border="1px solid"
          borderColor={cardBorder}
          h="full"
          overflow="hidden"
          display="flex"
          flexDir="column"
        >
          <HStack spacing={3} mb={4}>
            <Flex
              w={10}
              h={10}
              borderRadius="xl"
              bg={useColorModeValue('rgba(185,28,28,0.05)', 'rgba(185,28,28,0.15)')}
              align="center"
              justify="center"
              color="accent.500"
            >
              <LuHistory size={20} />
            </Flex>
            <Text fontSize="lg" fontWeight="bold" color={titleColor}>
              {t('consultation:form.backgroundHistory')}
            </Text>
          </HStack>

          <VStack spacing={5} align="stretch" flex={1} overflowY="auto" pr={2}>
            <Box>
              <Flex align="center" justify="space-between" mb={3}>
                <Text fontSize="10px" fontWeight="bold" color={sectionLabel} textTransform="uppercase" letterSpacing="widest">
                  {t('consultation:form.medicalHistory')}
                </Text>
                <IconButton
                  aria-label="Add"
                  icon={<LuPlus size={16} />}
                  size="xs"
                  w={6} h={6} minW={6}
                  borderRadius="lg"
                  bg={addBtnBg}
                  color="primary.500"
                  _hover={{ bg: 'primary.500', color: 'white' }}
                />
              </Flex>
              <Box mb={4}>
                <Text fontSize="10px" color={chipSubtext} mb={2} fontStyle="italic">
                  {t('consultation:form.savedRecords')}
                </Text>
                <Wrap spacing={2}>
                  {patient.medicalHistory.map((item) => (
                    <WrapItem key={item.label}>
                      <HistoryChip label={item.label} colorScheme={item.color} />
                    </WrapItem>
                  ))}
                </Wrap>
              </Box>
            </Box>

            <Box>
              <Flex align="center" justify="space-between" mb={3}>
                <Text fontSize="10px" fontWeight="bold" color={sectionLabel} textTransform="uppercase" letterSpacing="widest">
                  {t('consultation:form.surgicalHistory')}
                </Text>
                <IconButton
                  aria-label="Add"
                  icon={<LuPlus size={16} />}
                  size="xs"
                  w={6} h={6} minW={6}
                  borderRadius="lg"
                  bg={addBtnBg}
                  color="primary.500"
                  _hover={{ bg: 'primary.500', color: 'white' }}
                />
              </Flex>
              <Box mb={4}>
                <Text fontSize="10px" color={chipSubtext} mb={2} fontStyle="italic">
                  {t('consultation:form.savedRecords')}
                </Text>
                <Wrap spacing={2}>
                  {patient.surgicalHistory.map((item) => (
                    <WrapItem key={item.label}>
                      <HistoryChip label={item.label} colorScheme={item.color} />
                    </WrapItem>
                  ))}
                </Wrap>
              </Box>
            </Box>

            <Box pt={4} borderTop="1px solid" borderColor={cardBorder}>
              <Text fontSize="10px" fontWeight="bold" color={sectionLabel} textTransform="uppercase" letterSpacing="widest" mb={3}>
                {t('consultation:form.allergies')}
              </Text>
              <Box p={3} bg={allergyBg} borderRadius="xl" border="1px solid" borderColor={allergyBorder}>
                <Text fontSize="sm" color={allergyColor} fontWeight="medium">
                  {patient.allergies}
                </Text>
              </Box>
            </Box>
          </VStack>
        </Box>
      </GridItem>
    </Grid>
  )
}

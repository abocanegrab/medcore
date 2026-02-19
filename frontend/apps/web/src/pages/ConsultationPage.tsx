import { useState } from 'react'
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
  useColorModeValue,
  IconButton,
} from '@chakra-ui/react'
import { useOutletContext, useParams, useNavigate } from 'react-router-dom'
import {
  LuFilePenLine,
  LuClipboardList,
  LuHistory,
  LuPlus,
  LuActivity,
  LuPill,
  LuFlaskConical,
} from 'react-icons/lu'
import {
  Header,
  PatientBanner,
  TextAreaCard,
  HistoryChip,
  ActionBar,
} from '@medcore/ui'
import { useTranslation } from 'react-i18next'
import { usePatientQueue } from '../contexts/PatientQueueContext'
import type { NextStep } from '../data/mockPatients'

export default function ConsultationPage() {
  const { t } = useTranslation(['consultation', 'common'])
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { onMenuOpen, currentUser } = useOutletContext<{ onMenuOpen: () => void; currentUser?: any }>()
  const { getPatientById, updatePatientData } = usePatientQueue()

  const patient = id ? getPatientById(id) : undefined

  const [anamnesis, setAnamnesis] = useState(patient?.anamnesis ?? '')
  const [workPlan, setWorkPlan] = useState(patient?.workPlan ?? '')

  const cardBg = useColorModeValue('white', 'card.dark')
  const cardBorder = useColorModeValue('gray.100', 'gray.800')
  const sectionLabel = useColorModeValue('gray.400', 'gray.500')
  const titleColor = useColorModeValue('primary.500', 'white')
  const chipSubtext = useColorModeValue('gray.400', 'gray.500')
  const addBtnBg = useColorModeValue('rgba(0,39,82,0.1)', 'rgba(0,39,82,0.3)')
  const allergyBg = useColorModeValue('red.50', 'rgba(127,29,29,0.2)')
  const allergyBorder = useColorModeValue('red.100', 'rgba(127,29,29,0.3)')
  const allergyColor = useColorModeValue('red.600', 'red.400')

  if (!patient) {
    return (
      <Box p={12} textAlign="center">
        <Text fontSize="xl" color="gray.400">{t('common:notFound')}</Text>
      </Box>
    )
  }

  const handleFinishConsultation = (nextStep: NextStep) => {
    updatePatientData(patient.id, {
      status: 'post_consultation',
      anamnesis,
      workPlan,
      nextStep,
      prescription: nextStep === 'farmacia' ? 'Prescribed medication (auto-generated for demo)' : undefined,
    })
    navigate('/consultation')
  }

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

        {/* Triage observations (read-only) */}
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

        <Grid templateColumns={{ base: '1fr', lg: 'repeat(12, 1fr)' }} gap={5}>
          {/* Left Column: 8/12 */}
          <GridItem colSpan={{ base: 1, lg: 8 }} display="flex" flexDir="column" gap={5}>
            <TextAreaCard
              title={t('consultation:form.anamnesis')}
              subtitle={t('consultation:form.anamnesisSubtitle')}
              icon={LuFilePenLine}
              placeholder={t('consultation:form.anamnesisPlaceholder')}
              defaultValue={anamnesis}
              rows={8}
            />
            <TextAreaCard
              title={t('consultation:form.workPlan')}
              subtitle={t('consultation:form.workPlanSubtitle')}
              icon={LuClipboardList}
              placeholder={t('consultation:form.workPlanPlaceholder')}
              defaultValue={workPlan}
              rows={5}
            />
          </GridItem>

          {/* Right Column: 4/12 */}
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
                {/* Medical History */}
                <Box>
                  <Flex align="center" justify="space-between" mb={3}>
                    <Text fontSize="10px" fontWeight="bold" color={sectionLabel} textTransform="uppercase" letterSpacing="widest">
                      {t('consultation:form.medicalHistory')}
                    </Text>
                    <IconButton
                      aria-label="Add"
                      icon={<LuPlus size={16} />}
                      size="xs"
                      w={6}
                      h={6}
                      minW={6}
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

                {/* Surgical History */}
                <Box>
                  <Flex align="center" justify="space-between" mb={3}>
                    <Text fontSize="10px" fontWeight="bold" color={sectionLabel} textTransform="uppercase" letterSpacing="widest">
                      {t('consultation:form.surgicalHistory')}
                    </Text>
                    <IconButton
                      aria-label="Add"
                      icon={<LuPlus size={16} />}
                      size="xs"
                      w={6}
                      h={6}
                      minW={6}
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

                {/* Allergies */}
                <Box pt={4} borderTop="1px solid" borderColor={cardBorder}>
                  <Flex align="center" justify="space-between" mb={3}>
                    <Text fontSize="10px" fontWeight="bold" color={sectionLabel} textTransform="uppercase" letterSpacing="widest">
                      {t('consultation:form.allergies')}
                    </Text>
                  </Flex>
                  <Box
                    p={3}
                    bg={allergyBg}
                    borderRadius="xl"
                    border="1px solid"
                    borderColor={allergyBorder}
                  >
                    <Text fontSize="sm" color={allergyColor} fontWeight="medium">
                      {patient.allergies}
                    </Text>
                  </Box>
                </Box>
              </VStack>
            </Box>
          </GridItem>
        </Grid>
      </Box>

      {/* Action Bar */}
      <ActionBar
        leftActions={[
          { label: t('consultation:form.diagnosis'), icon: LuActivity },
          { label: t('consultation:form.treatment'), icon: LuPill },
          { label: t('consultation:form.labOrders'), icon: LuFlaskConical },
        ]}
        rightActions={[
          { label: t('common:actions.saveDraft'), variant: 'outline' },
          { label: t('consultation:form.finishConsultation'), variant: 'primary', onClick: () => handleFinishConsultation('farmacia') },
        ]}
      />
    </Box>
  )
}

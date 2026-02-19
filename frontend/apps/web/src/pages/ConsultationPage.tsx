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
import { useOutletContext } from 'react-router-dom'
import {
  LuFilePenLine,
  LuClipboardList,
  LuHistory,
  LuPlus,
  LuX,
  LuPencil,
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
import { patientConsultation } from '../data/mockData'

export default function ConsultationPage() {
  const { onMenuOpen } = useOutletContext<{ onMenuOpen: () => void }>()
  const p = patientConsultation

  const cardBg = useColorModeValue('white', 'card.dark')
  const cardBorder = useColorModeValue('gray.100', 'gray.800')
  const sectionLabel = useColorModeValue('gray.400', 'gray.500')
  const titleColor = useColorModeValue('primary.500', 'white')
  const chipSubtext = useColorModeValue('gray.400', 'gray.500')
  const addBtnBg = useColorModeValue('rgba(0,39,82,0.1)', 'rgba(0,39,82,0.3)')
  const newEntryBg = useColorModeValue('rgba(0,39,82,0.05)', 'rgba(0,39,82,0.15)')
  const newEntryBorder = useColorModeValue('rgba(0,39,82,0.2)', 'rgba(0,39,82,0.4)')
  const allergyBg = useColorModeValue('red.50', 'rgba(127,29,29,0.2)')
  const allergyBorder = useColorModeValue('red.100', 'rgba(127,29,29,0.3)')
  const allergyColor = useColorModeValue('red.600', 'red.400')

  return (
    <Box pb={24}>
      <Header
        title="Patient Consultation"
        breadcrumbItems={[
          { label: 'MedCore' },
          { label: 'Appointments' },
          { label: p.name, isActive: true },
        ]}
        badge={{ label: 'DATA ENTRY', color: 'red' }}
        showSearch={false}
        onMenuClick={onMenuOpen}
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
          name={p.name}
          age={p.age}
          gender={p.gender}
          patientId={p.patientId}
          vitals={p.vitals}
        />

        <Grid templateColumns={{ base: '1fr', lg: 'repeat(12, 1fr)' }} gap={5}>
          {/* Left Column: 8/12 */}
          <GridItem colSpan={{ base: 1, lg: 8 }} display="flex" flexDir="column" gap={5}>
            <TextAreaCard
              title="Anamnesis"
              subtitle="Initial assessment and patient history"
              icon={LuFilePenLine}
              placeholder="Describe the reason for consultation and symptoms..."
              defaultValue={p.anamnesis}
              rows={8}
            />
            <TextAreaCard
              title="Work Plan"
              subtitle="Next steps and procedures"
              icon={LuClipboardList}
              placeholder="Enter the proposed medical roadmap for this patient..."
              defaultValue={p.workPlan}
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
              {/* Title */}
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
                  Background & History
                </Text>
              </HStack>

              <VStack spacing={5} align="stretch" flex={1} overflowY="auto" pr={2}>
                {/* Medical History */}
                <Box>
                  <Flex align="center" justify="space-between" mb={3}>
                    <Text fontSize="10px" fontWeight="bold" color={sectionLabel} textTransform="uppercase" letterSpacing="widest">
                      Medical History
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

                  {/* Saved Records */}
                  <Box mb={4}>
                    <Text fontSize="10px" color={chipSubtext} mb={2} fontStyle="italic">
                      Saved Records
                    </Text>
                    <Wrap spacing={2}>
                      {p.medicalHistory.map((item) => (
                        <WrapItem key={item.label}>
                          <HStack spacing={2}>
                            <HistoryChip label={item.label} colorScheme={item.color} />
                          </HStack>
                        </WrapItem>
                      ))}
                    </Wrap>
                  </Box>

                  {/* New Entry */}
                  <Box
                    p={3}
                    bg={newEntryBg}
                    borderRadius="xl"
                    border="1px dashed"
                    borderColor={newEntryBorder}
                  >
                    <Text fontSize="10px" fontWeight="bold" color="primary.500" mb={2} display="flex" alignItems="center" gap={1}>
                      NEW ENTRY
                    </Text>
                    <Wrap spacing={2}>
                      {p.newEntries.map((item) => (
                        <WrapItem key={item.label}>
                          <HStack
                            px={3}
                            py={1.5}
                            borderRadius="full"
                            fontSize="xs"
                            fontWeight="semibold"
                            bg={useColorModeValue('white', 'gray.800')}
                            color={useColorModeValue('primary.500', 'primary.300')}
                            border="1px solid"
                            borderColor={useColorModeValue('rgba(0,39,82,0.3)', 'primary.700')}
                            shadow="sm"
                            spacing={2}
                          >
                            <Text>{item.label}</Text>
                            <Box
                              as="button"
                              _hover={{ color: 'accent.500' }}
                              display="flex"
                              alignItems="center"
                            >
                              <LuX size={14} />
                            </Box>
                          </HStack>
                        </WrapItem>
                      ))}
                    </Wrap>
                  </Box>
                </Box>

                {/* Surgical History */}
                <Box>
                  <Flex align="center" justify="space-between" mb={3}>
                    <Text fontSize="10px" fontWeight="bold" color={sectionLabel} textTransform="uppercase" letterSpacing="widest">
                      Surgical History
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
                      Saved Records
                    </Text>
                    <Wrap spacing={2}>
                      {p.surgicalHistory.map((item) => (
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
                      Allergies
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
                  <Box
                    p={3}
                    bg={allergyBg}
                    borderRadius="xl"
                    border="1px solid"
                    borderColor={allergyBorder}
                  >
                    <Flex align="center" justify="space-between">
                      <Text fontSize="sm" color={allergyColor} fontWeight="medium">
                        {p.allergies}
                      </Text>
                      <Box as="button" color="red.300" _hover={{ color: 'red.600' }} transition="color 0.2s">
                        <LuPencil size={18} />
                      </Box>
                    </Flex>
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
          { label: 'Diagnosis', icon: LuActivity },
          { label: 'Treatment', icon: LuPill },
          { label: 'Lab Orders', icon: LuFlaskConical },
        ]}
        rightActions={[
          { label: 'Save Draft', variant: 'outline' },
          { label: 'Finish Consultation', variant: 'primary' },
        ]}
      />
    </Box>
  )
}

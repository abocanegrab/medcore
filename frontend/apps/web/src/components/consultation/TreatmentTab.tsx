import { useState } from 'react'
import {
  Box,
  Grid,
  GridItem,
  VStack,
  HStack,
  Text,
  Button,
  Input,
  Select,
  Textarea,
  IconButton,
  useColorModeValue,
} from '@chakra-ui/react'
import { LuPlus, LuTrash2, LuSearch } from 'react-icons/lu'
import DiagnosisSidebar from './DiagnosisSidebar'
import { medicationCatalog } from '../../data/catalogs'
import type { Diagnosis, MedicationOrder, MedicationRoute } from '../../data/mockPatients'

interface TreatmentTabProps {
  diagnoses: Diagnosis[]
  onAddMedication: (diagnosisId: string, medication: MedicationOrder) => void
  onRemoveMedication: (diagnosisId: string, medicationId: string) => void
  onUpdateMedication: (diagnosisId: string, medicationId: string, data: Partial<MedicationOrder>) => void
  treatmentObservations: string
  onTreatmentObservationsChange: (v: string) => void
  nextControlDate: string
  onNextControlDateChange: (v: string) => void
}

export default function TreatmentTab({
  diagnoses,
  onAddMedication,
  onRemoveMedication,
  onUpdateMedication,
  treatmentObservations,
  onTreatmentObservationsChange,
  nextControlDate,
  onNextControlDateChange,
}: TreatmentTabProps) {
  const [selectedDiagId, setSelectedDiagId] = useState(diagnoses[0]?.id || '')
  const [medSearch, setMedSearch] = useState('')

  const selectedDiag = diagnoses.find((d) => d.id === selectedDiagId)

  const cardBg = useColorModeValue('white', 'card.dark')
  const cardBorder = useColorModeValue('gray.100', 'gray.800')
  const inputBg = useColorModeValue('gray.50', 'gray.800')

  const filteredMeds = medSearch.length >= 2
    ? medicationCatalog.filter((m) => m.name.toLowerCase().includes(medSearch.toLowerCase()))
    : []

  const handleAddMed = (medName: string, route: MedicationRoute) => {
    if (!selectedDiagId) return
    const newMed: MedicationOrder = {
      id: `med-${Date.now()}`,
      medicationName: medName,
      quantity: 1,
      days: 7,
      route,
      indication: '',
    }
    onAddMedication(selectedDiagId, newMed)
    setMedSearch('')
  }

  return (
    <Grid templateColumns={{ base: '1fr', lg: '3fr 9fr' }} gap={5}>
      <GridItem>
        <DiagnosisSidebar
          diagnoses={diagnoses}
          selectedId={selectedDiagId}
          onSelect={setSelectedDiagId}
          countFn={(d) => d.medications.length}
          countLabel="Diagnosticos"
        />
      </GridItem>
      <GridItem>
        <VStack spacing={4} align="stretch">
          {/* Medication Search */}
          <Box bg={cardBg} borderRadius="2xl" p={4} border="1px solid" borderColor={cardBorder} shadow="soft">
            <Text fontSize="sm" fontWeight="bold" mb={2}>Agregar Medicamento</Text>
            <Box position="relative">
              <Input
                value={medSearch}
                onChange={(e) => setMedSearch(e.target.value)}
                placeholder="Buscar medicamento..."
                size="sm"
                borderRadius="xl"
                bg={inputBg}
              />
              {filteredMeds.length > 0 && (
                <Box
                  position="absolute"
                  top="100%"
                  left={0}
                  right={0}
                  zIndex={10}
                  bg={cardBg}
                  border="1px solid"
                  borderColor={cardBorder}
                  borderRadius="xl"
                  shadow="lg"
                  maxH="200px"
                  overflowY="auto"
                  mt={1}
                  py={1}
                >
                  {filteredMeds.map((m) => (
                    <Box
                      key={m.id}
                      px={3}
                      py={2}
                      cursor="pointer"
                      _hover={{ bg: inputBg }}
                      onClick={() => handleAddMed(m.name, m.defaultRoute)}
                    >
                      <HStack justify="space-between">
                        <Text fontSize="xs" fontWeight="medium">{m.name}</Text>
                        <Text fontSize="10px" color="gray.500">{m.presentation} • {m.defaultRoute}</Text>
                      </HStack>
                    </Box>
                  ))}
                </Box>
              )}
            </Box>
          </Box>

          {/* Medication list for selected diagnosis */}
          {selectedDiag && selectedDiag.medications.length > 0 ? (
            selectedDiag.medications.map((med) => (
              <Box
                key={med.id}
                bg={cardBg}
                borderRadius="2xl"
                p={4}
                border="1px solid"
                borderColor={cardBorder}
                shadow="soft"
              >
                <HStack justify="space-between" mb={3}>
                  <Text fontSize="sm" fontWeight="bold">{med.medicationName}</Text>
                  <IconButton
                    aria-label="Remove"
                    icon={<LuTrash2 size={14} />}
                    size="xs"
                    variant="ghost"
                    colorScheme="red"
                    borderRadius="lg"
                    onClick={() => onRemoveMedication(selectedDiagId, med.id)}
                  />
                </HStack>
                <Grid templateColumns="repeat(4, 1fr)" gap={2}>
                  <Box>
                    <Text fontSize="10px" color="gray.500" mb={1}>Cantidad</Text>
                    <Input
                      type="number"
                      value={med.quantity}
                      onChange={(e) => onUpdateMedication(selectedDiagId, med.id, { quantity: parseInt(e.target.value) || 0 })}
                      size="xs"
                      borderRadius="lg"
                    />
                  </Box>
                  <Box>
                    <Text fontSize="10px" color="gray.500" mb={1}>Dias</Text>
                    <Input
                      type="number"
                      value={med.days}
                      onChange={(e) => onUpdateMedication(selectedDiagId, med.id, { days: parseInt(e.target.value) || 0 })}
                      size="xs"
                      borderRadius="lg"
                    />
                  </Box>
                  <Box>
                    <Text fontSize="10px" color="gray.500" mb={1}>Via</Text>
                    <Select
                      value={med.route}
                      onChange={(e) => onUpdateMedication(selectedDiagId, med.id, { route: e.target.value as MedicationRoute })}
                      size="xs"
                      borderRadius="lg"
                    >
                      <option value="oral">Oral</option>
                      <option value="IV">IV</option>
                      <option value="IM">IM</option>
                      <option value="topical">Topica</option>
                      <option value="sublingual">Sublingual</option>
                      <option value="inhalation">Inhalacion</option>
                    </Select>
                  </Box>
                  <Box>
                    <Text fontSize="10px" color="gray.500" mb={1}>Indicacion</Text>
                    <Input
                      value={med.indication}
                      onChange={(e) => onUpdateMedication(selectedDiagId, med.id, { indication: e.target.value })}
                      placeholder="c/8h"
                      size="xs"
                      borderRadius="lg"
                    />
                  </Box>
                </Grid>
              </Box>
            ))
          ) : (
            <Box bg={cardBg} borderRadius="2xl" p={6} border="1px solid" borderColor={cardBorder} textAlign="center">
              <Text fontSize="sm" color="gray.400">
                {diagnoses.length === 0
                  ? 'Agregue diagnosticos primero'
                  : 'Sin medicamentos para este diagnostico'}
              </Text>
            </Box>
          )}

          {/* Observations & Next Control */}
          <Box bg={cardBg} borderRadius="2xl" p={4} border="1px solid" borderColor={cardBorder} shadow="soft">
            <Text fontSize="sm" fontWeight="bold" mb={2}>Observaciones del Tratamiento</Text>
            <Textarea
              value={treatmentObservations}
              onChange={(e) => onTreatmentObservationsChange(e.target.value)}
              placeholder="Observaciones adicionales..."
              size="sm"
              borderRadius="xl"
              rows={3}
              resize="none"
            />
            <HStack mt={3} spacing={3}>
              <Text fontSize="sm" fontWeight="bold">Proxima cita control:</Text>
              <Input
                type="date"
                value={nextControlDate}
                onChange={(e) => onNextControlDateChange(e.target.value)}
                size="sm"
                borderRadius="xl"
                w="180px"
              />
            </HStack>
          </Box>
        </VStack>
      </GridItem>
    </Grid>
  )
}

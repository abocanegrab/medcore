import {
  Box,
  VStack,
  HStack,
  Text,
  Flex,
  Divider,
  Badge,
  useColorModeValue,
} from '@chakra-ui/react'
import { LuFileText } from 'react-icons/lu'
import type { Patient } from '../data/mockPatients'

interface ClinicalRecordSummaryProps {
  patient: Patient
}

export default function ClinicalRecordSummary({ patient }: ClinicalRecordSummaryProps) {
  const bg = useColorModeValue('white', 'card.dark')
  const border = useColorModeValue('gray.100', 'gray.800')
  const titleColor = useColorModeValue('primary.500', 'white')
  const labelColor = useColorModeValue('gray.500', 'gray.400')
  const codeColor = useColorModeValue('primary.600', 'primary.300')

  return (
    <Box bg={bg} borderRadius="2xl" border="1px solid" borderColor={border} shadow="soft" p={6}>
      <HStack spacing={3} mb={5}>
        <Flex w={10} h={10} borderRadius="xl" bg="primary.50" align="center" justify="center" color="primary.500">
          <LuFileText size={20} />
        </Flex>
        <Box>
          <Text fontSize="lg" fontWeight="bold" color={titleColor}>
            Registro Clinico Ambulatorio
          </Text>
          <Text fontSize="xs" color={labelColor}>
            {patient.name} - {patient.patientId}
          </Text>
        </Box>
      </HStack>

      <VStack spacing={4} align="stretch">
        {/* Demographics */}
        <HStack spacing={6} fontSize="sm">
          <Text><strong>Edad:</strong> {patient.age} anios</Text>
          <Text><strong>Sexo:</strong> {patient.gender}</Text>
          <Text><strong>Servicio:</strong> {patient.serviceType || '--'}</Text>
        </HStack>

        <Divider />

        {/* Vitals */}
        {patient.vitals && (
          <>
            <Text fontSize="10px" fontWeight="bold" color={labelColor} textTransform="uppercase" letterSpacing="widest">
              Signos Vitales
            </Text>
            <HStack spacing={6} fontSize="sm">
              <Text>Peso: {patient.vitals.weight} kg</Text>
              <Text>Talla: {patient.vitals.height} cm</Text>
              <Text>Temp: {patient.vitals.temperature}°C</Text>
              <Text>PA: {patient.vitals.bloodPressure} mmHg</Text>
            </HStack>
            <Divider />
          </>
        )}

        {/* Anamnesis */}
        {patient.anamnesis && (
          <>
            <Text fontSize="10px" fontWeight="bold" color={labelColor} textTransform="uppercase" letterSpacing="widest">
              Anamnesis
            </Text>
            <Text fontSize="sm">{patient.anamnesis}</Text>
            <Divider />
          </>
        )}

        {/* Diagnoses */}
        {patient.diagnoses && patient.diagnoses.length > 0 && (
          <>
            <Text fontSize="10px" fontWeight="bold" color={labelColor} textTransform="uppercase" letterSpacing="widest">
              Diagnosticos
            </Text>
            {patient.diagnoses.map((d) => (
              <HStack key={d.id} spacing={2}>
                <Text fontSize="xs" fontWeight="bold" fontFamily="mono" color={codeColor}>
                  {d.cie10Code}
                </Text>
                <Text fontSize="sm">{d.cie10Label}</Text>
                <Badge
                  borderRadius="full"
                  fontSize="10px"
                  colorScheme={d.type === 'definitivo' ? 'green' : d.type === 'presuntivo' ? 'orange' : 'blue'}
                >
                  {d.type}
                </Badge>
              </HStack>
            ))}
            <Divider />
          </>
        )}

        {/* Signature */}
        {patient.consultationSignedAt && (
          <Box>
            <Text fontSize="10px" fontWeight="bold" color={labelColor} textTransform="uppercase" letterSpacing="widest" mb={2}>
              Firma Digital
            </Text>
            <Text fontSize="xs" fontFamily="mono" color="gray.500">
              Firmado: {new Date(patient.consultationSignedAt).toLocaleString()}
            </Text>
          </Box>
        )}
      </VStack>
    </Box>
  )
}

import {
  Box,
  VStack,
  HStack,
  Text,
  Button,
  RadioGroup,
  Radio,
  IconButton,
  useColorModeValue,
} from '@chakra-ui/react'
import { LuPlus, LuTrash2 } from 'react-icons/lu'
import CIE10Autocomplete from './CIE10Autocomplete'
import type { Diagnosis, DiagnosisType } from '../../data/mockPatients'
import type { CIE10Code } from '../../data/catalogs'

interface DiagnosisTabProps {
  diagnoses: Diagnosis[]
  onAdd: (code: CIE10Code) => void
  onRemove: (id: string) => void
  onTypeChange: (id: string, type: DiagnosisType) => void
}

export default function DiagnosisTab({ diagnoses, onAdd, onRemove, onTypeChange }: DiagnosisTabProps) {
  const cardBg = useColorModeValue('white', 'card.dark')
  const cardBorder = useColorModeValue('gray.100', 'gray.800')
  const codeColor = useColorModeValue('primary.600', 'primary.300')

  return (
    <VStack spacing={4} align="stretch">
      <Box bg={cardBg} borderRadius="2xl" p={5} border="1px solid" borderColor={cardBorder} shadow="soft">
        <Text fontSize="sm" fontWeight="bold" mb={3}>Agregar Diagnostico</Text>
        <CIE10Autocomplete
          onSelect={onAdd}
          placeholder="Buscar por codigo o descripcion CIE-10..."
        />
      </Box>

      {diagnoses.length === 0 ? (
        <Box bg={cardBg} borderRadius="2xl" p={8} border="1px solid" borderColor={cardBorder} shadow="soft" textAlign="center">
          <Text fontSize="lg" fontWeight="semibold" color="gray.400">Sin diagnosticos</Text>
          <Text fontSize="sm" color="gray.400" mt={1}>Use la busqueda de arriba para agregar diagnosticos CIE-10</Text>
        </Box>
      ) : (
        diagnoses.map((d, idx) => (
          <Box
            key={d.id}
            bg={cardBg}
            borderRadius="2xl"
            p={5}
            border="1px solid"
            borderColor={cardBorder}
            shadow="soft"
          >
            <HStack justify="space-between" mb={3}>
              <HStack spacing={3}>
                <Text fontSize="sm" fontWeight="bold" color="gray.400">
                  #{idx + 1}
                </Text>
                <Text fontSize="sm" fontWeight="bold" fontFamily="mono" color={codeColor}>
                  {d.cie10Code}
                </Text>
                <Text fontSize="sm" fontWeight="medium">
                  {d.cie10Label}
                </Text>
              </HStack>
              <IconButton
                aria-label="Remove diagnosis"
                icon={<LuTrash2 size={16} />}
                size="sm"
                variant="ghost"
                colorScheme="red"
                borderRadius="lg"
                onClick={() => onRemove(d.id)}
              />
            </HStack>
            <RadioGroup value={d.type} onChange={(v) => onTypeChange(d.id, v as DiagnosisType)}>
              <HStack spacing={4}>
                <Radio value="definitivo" size="sm" colorScheme="green">
                  <Text fontSize="xs">Definitivo</Text>
                </Radio>
                <Radio value="presuntivo" size="sm" colorScheme="orange">
                  <Text fontSize="xs">Presuntivo</Text>
                </Radio>
                <Radio value="repetitivo" size="sm" colorScheme="blue">
                  <Text fontSize="xs">Repetitivo</Text>
                </Radio>
              </HStack>
            </RadioGroup>
          </Box>
        ))
      )}
    </VStack>
  )
}

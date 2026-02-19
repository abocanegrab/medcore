import {
  Box,
  VStack,
  Text,
  HStack,
  Badge,
  useColorModeValue,
} from '@chakra-ui/react'
import type { Diagnosis } from '../../data/mockPatients'

interface DiagnosisSidebarProps {
  diagnoses: Diagnosis[]
  selectedId: string
  onSelect: (id: string) => void
  countFn: (d: Diagnosis) => number
  countLabel?: string
}

export default function DiagnosisSidebar({ diagnoses, selectedId, onSelect, countFn, countLabel }: DiagnosisSidebarProps) {
  const cardBg = useColorModeValue('white', 'card.dark')
  const cardBorder = useColorModeValue('gray.100', 'gray.800')
  const activeBg = useColorModeValue('primary.50', 'rgba(0,39,82,0.2)')
  const activeBorder = useColorModeValue('primary.200', 'primary.400')
  const codeColor = useColorModeValue('primary.600', 'primary.300')

  return (
    <Box
      bg={cardBg}
      borderRadius="2xl"
      border="1px solid"
      borderColor={cardBorder}
      shadow="soft"
      p={4}
      h="full"
    >
      <Text fontSize="10px" fontWeight="bold" color="gray.400" textTransform="uppercase" letterSpacing="widest" mb={3}>
        {countLabel || 'Diagnostics'}
      </Text>
      <VStack spacing={2} align="stretch">
        {diagnoses.length === 0 ? (
          <Text fontSize="xs" color="gray.400" textAlign="center" py={4}>
            No diagnoses yet. Add from Diagnosis tab.
          </Text>
        ) : (
          diagnoses.map((d) => {
            const isActive = d.id === selectedId
            const count = countFn(d)
            return (
              <Box
                key={d.id}
                p={3}
                borderRadius="xl"
                border="1px solid"
                borderColor={isActive ? activeBorder : 'transparent'}
                bg={isActive ? activeBg : 'transparent'}
                cursor="pointer"
                _hover={{ bg: activeBg }}
                transition="all 0.2s"
                onClick={() => onSelect(d.id)}
              >
                <HStack justify="space-between" mb={1}>
                  <Text fontSize="xs" fontWeight="bold" fontFamily="mono" color={codeColor}>
                    {d.cie10Code}
                  </Text>
                  <Badge
                    borderRadius="full"
                    fontSize="10px"
                    bg={count > 0 ? 'primary.100' : 'gray.100'}
                    color={count > 0 ? 'primary.700' : 'gray.500'}
                  >
                    {count}
                  </Badge>
                </HStack>
                <Text fontSize="xs" noOfLines={2} color="gray.500">
                  {d.cie10Label}
                </Text>
              </Box>
            )
          })
        )}
      </VStack>
    </Box>
  )
}

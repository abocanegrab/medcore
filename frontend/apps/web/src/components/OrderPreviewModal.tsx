import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Button,
  VStack,
  HStack,
  Text,
  Box,
  Flex,
  Badge,
  Divider,
  useColorModeValue,
} from '@chakra-ui/react'
import { LuFlaskConical, LuScanLine, LuPill, LuCircleCheck, LuFileOutput } from 'react-icons/lu'
import { generateOrders } from '../services/orderGenerator'
import type { Diagnosis } from '../data/mockPatients'

interface OrderPreviewModalProps {
  isOpen: boolean
  onClose: () => void
  diagnoses: Diagnosis[]
  patientName: string
}

export default function OrderPreviewModal({ isOpen, onClose, diagnoses, patientName }: OrderPreviewModalProps) {
  const bg = useColorModeValue('white', 'gray.800')
  const cardBg = useColorModeValue('gray.50', 'gray.700')
  const titleColor = useColorModeValue('primary.500', 'white')
  const codeColor = useColorModeValue('primary.600', 'primary.300')

  const { labOrders, imagingOrders, pharmacyOrders } = generateOrders(diagnoses)
  const hasOrders = labOrders.length > 0 || imagingOrders.length > 0 || pharmacyOrders.length > 0

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered scrollBehavior="inside">
      <ModalOverlay bg="blackAlpha.600" backdropFilter="blur(4px)" />
      <ModalContent bg={bg} borderRadius="2xl" mx={4}>
        <ModalHeader>
          <HStack spacing={3}>
            <Flex w={10} h={10} borderRadius="xl" bg="green.50" align="center" justify="center" color="green.500">
              <LuFileOutput size={20} />
            </Flex>
            <Box>
              <Text fontSize="lg" fontWeight="bold" color={titleColor}>
                Ordenes Generadas
              </Text>
              <Text fontSize="xs" color="gray.500">
                Paciente: {patientName}
              </Text>
            </Box>
          </HStack>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4} align="stretch">
            {!hasOrders && (
              <Box textAlign="center" py={6}>
                <Text fontSize="lg" color="gray.400">Sin ordenes para generar</Text>
                <Text fontSize="sm" color="gray.400">No se seleccionaron examenes ni medicamentos</Text>
              </Box>
            )}

            {/* Lab Orders */}
            {labOrders.length > 0 && (
              <Box>
                <HStack spacing={2} mb={3}>
                  <LuFlaskConical size={16} color="var(--chakra-colors-blue-500)" />
                  <Text fontSize="sm" fontWeight="bold" color="blue.600">
                    Ordenes de Laboratorio
                  </Text>
                  <Badge colorScheme="blue" borderRadius="full" fontSize="10px">
                    {labOrders.reduce((s, o) => s + o.exams.length, 0)}
                  </Badge>
                </HStack>
                {labOrders.map((order) => (
                  <Box key={order.diagnosisCode} bg={cardBg} borderRadius="xl" p={3} mb={2}>
                    <Text fontSize="xs" fontWeight="bold" fontFamily="mono" color={codeColor} mb={1}>
                      {order.diagnosisCode} - {order.diagnosisLabel}
                    </Text>
                    {order.exams.map((exam) => (
                      <HStack key={exam.examName} spacing={2} ml={3}>
                        <Text fontSize="xs" color="gray.500">{exam.categoryName}:</Text>
                        <Text fontSize="xs">{exam.examName}</Text>
                      </HStack>
                    ))}
                  </Box>
                ))}
              </Box>
            )}

            {/* Imaging Orders */}
            {imagingOrders.length > 0 && (
              <Box>
                <HStack spacing={2} mb={3}>
                  <LuScanLine size={16} color="var(--chakra-colors-purple-500)" />
                  <Text fontSize="sm" fontWeight="bold" color="purple.600">
                    Ordenes de Imagen
                  </Text>
                  <Badge colorScheme="purple" borderRadius="full" fontSize="10px">
                    {imagingOrders.reduce((s, o) => s + o.exams.length, 0)}
                  </Badge>
                </HStack>
                {imagingOrders.map((order) => (
                  <Box key={order.diagnosisCode} bg={cardBg} borderRadius="xl" p={3} mb={2}>
                    <Text fontSize="xs" fontWeight="bold" fontFamily="mono" color={codeColor} mb={1}>
                      {order.diagnosisCode} - {order.diagnosisLabel}
                    </Text>
                    {order.exams.map((exam) => (
                      <HStack key={exam.examName} spacing={2} ml={3}>
                        <Text fontSize="xs" color="gray.500">{exam.categoryName}:</Text>
                        <Text fontSize="xs">{exam.examName}</Text>
                      </HStack>
                    ))}
                  </Box>
                ))}
              </Box>
            )}

            {/* Pharmacy Orders */}
            {pharmacyOrders.length > 0 && (
              <Box>
                <HStack spacing={2} mb={3}>
                  <LuPill size={16} color="var(--chakra-colors-green-500)" />
                  <Text fontSize="sm" fontWeight="bold" color="green.600">
                    Receta Medica
                  </Text>
                  <Badge colorScheme="green" borderRadius="full" fontSize="10px">
                    {pharmacyOrders.reduce((s, o) => s + o.medications.length, 0)}
                  </Badge>
                </HStack>
                {pharmacyOrders.map((order) => (
                  <Box key={order.diagnosisCode} bg={cardBg} borderRadius="xl" p={3} mb={2}>
                    <Text fontSize="xs" fontWeight="bold" fontFamily="mono" color={codeColor} mb={1}>
                      {order.diagnosisCode} - {order.diagnosisLabel}
                    </Text>
                    {order.medications.map((med) => (
                      <Box key={med.name} ml={3} mb={1}>
                        <Text fontSize="xs" fontWeight="medium">{med.name}</Text>
                        <Text fontSize="10px" color="gray.500">
                          Cantidad: {med.quantity} | {med.days} dias | Via: {med.route} | {med.indication}
                        </Text>
                      </Box>
                    ))}
                  </Box>
                ))}
              </Box>
            )}

            {/* Next steps */}
            {hasOrders && (
              <>
                <Divider />
                <Box>
                  <Text fontSize="sm" fontWeight="bold" mb={2}>Proximo destino del paciente:</Text>
                  <HStack spacing={2} flexWrap="wrap">
                    {labOrders.length > 0 && (
                      <Badge colorScheme="blue" borderRadius="full" px={3} py={1}>Laboratorio</Badge>
                    )}
                    {imagingOrders.length > 0 && (
                      <Badge colorScheme="purple" borderRadius="full" px={3} py={1}>Imagenes</Badge>
                    )}
                    {pharmacyOrders.length > 0 && (
                      <Badge colorScheme="green" borderRadius="full" px={3} py={1}>Farmacia</Badge>
                    )}
                  </HStack>
                </Box>
              </>
            )}
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button
            leftIcon={<LuCircleCheck size={16} />}
            bg="primary.500"
            color="white"
            borderRadius="xl"
            _hover={{ bg: 'primary.400' }}
            onClick={onClose}
            size="sm"
            fontWeight="semibold"
          >
            Confirmar y Enviar Ordenes
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Button,
  Text,
  VStack,
  HStack,
  Flex,
  useColorModeValue,
  Badge,
} from '@chakra-ui/react'
import { LuCalendar, LuUser, LuStethoscope, LuClock } from 'react-icons/lu'
import type { Appointment, AppointmentStatus } from '../data/mockAppointments'

const statusColorMap: Record<AppointmentStatus, string> = {
  scheduled: 'blue',
  confirmed: 'green',
  arrived: 'orange',
  in_progress: 'purple',
  completed: 'gray',
  cancelled: 'red',
}

const statusLabelMap: Record<AppointmentStatus, string> = {
  scheduled: 'Programada',
  confirmed: 'Confirmada',
  arrived: 'Llegó',
  in_progress: 'En Atencion',
  completed: 'Completada',
  cancelled: 'Cancelada',
}

interface AppointmentDetailModalProps {
  isOpen: boolean
  onClose: () => void
  appointment: Appointment | null
  onUpdateStatus?: (id: string, status: AppointmentStatus) => void
  onCancel?: (id: string) => void
}

export default function AppointmentDetailModal({
  isOpen,
  onClose,
  appointment,
  onUpdateStatus,
  onCancel,
}: AppointmentDetailModalProps) {
  const bg = useColorModeValue('white', 'gray.800')
  const titleColor = useColorModeValue('primary.500', 'white')
  const labelColor = useColorModeValue('gray.500', 'gray.400')

  if (!appointment) return null

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md" isCentered>
      <ModalOverlay bg="blackAlpha.600" backdropFilter="blur(4px)" />
      <ModalContent bg={bg} borderRadius="2xl" mx={4}>
        <ModalHeader>
          <HStack spacing={3}>
            <Flex w={10} h={10} borderRadius="xl" bg="primary.50" align="center" justify="center" color="primary.500">
              <LuCalendar size={20} />
            </Flex>
            <Text fontSize="lg" fontWeight="bold" color={titleColor}>
              Detalle de Cita
            </Text>
          </HStack>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4} align="stretch">
            <HStack justify="space-between">
              <Text fontSize="sm" color={labelColor}>Estado</Text>
              <Badge colorScheme={statusColorMap[appointment.status]} borderRadius="full" px={3}>
                {statusLabelMap[appointment.status]}
              </Badge>
            </HStack>
            <HStack spacing={2}>
              <LuUser size={16} color="var(--chakra-colors-gray-400)" />
              <Text fontSize="sm" fontWeight="medium">{appointment.patientName}</Text>
            </HStack>
            <HStack spacing={2}>
              <LuStethoscope size={16} color="var(--chakra-colors-gray-400)" />
              <Text fontSize="sm">{appointment.doctorName}</Text>
            </HStack>
            <HStack spacing={2}>
              <LuClock size={16} color="var(--chakra-colors-gray-400)" />
              <Text fontSize="sm">{appointment.timeSlot} - {appointment.date}</Text>
            </HStack>
            <HStack justify="space-between">
              <Text fontSize="sm" color={labelColor}>Servicio</Text>
              <Text fontSize="sm">{appointment.serviceType}</Text>
            </HStack>
            <HStack justify="space-between">
              <Text fontSize="sm" color={labelColor}>Motivo</Text>
              <Text fontSize="sm" maxW="200px" textAlign="right">{appointment.reason}</Text>
            </HStack>
            <HStack justify="space-between">
              <Text fontSize="sm" color={labelColor}>Fuente</Text>
              <Badge variant="outline" borderRadius="full" textTransform="capitalize">
                {appointment.source}
              </Badge>
            </HStack>
          </VStack>
        </ModalBody>
        <ModalFooter gap={2}>
          {appointment.status !== 'cancelled' && appointment.status !== 'completed' && (
            <>
              {appointment.status === 'scheduled' && (
                <Button
                  size="sm"
                  colorScheme="green"
                  borderRadius="xl"
                  onClick={() => {
                    onUpdateStatus?.(appointment.id, 'confirmed')
                    onClose()
                  }}
                >
                  Confirmar
                </Button>
              )}
              {(appointment.status === 'confirmed' || appointment.status === 'scheduled') && (
                <Button
                  size="sm"
                  colorScheme="orange"
                  borderRadius="xl"
                  onClick={() => {
                    onUpdateStatus?.(appointment.id, 'arrived')
                    onClose()
                  }}
                >
                  Llegó
                </Button>
              )}
              <Button
                size="sm"
                colorScheme="red"
                variant="ghost"
                borderRadius="xl"
                onClick={() => {
                  onCancel?.(appointment.id)
                  onClose()
                }}
              >
                Cancelar Cita
              </Button>
            </>
          )}
          <Button size="sm" variant="ghost" borderRadius="xl" onClick={onClose}>
            Cerrar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

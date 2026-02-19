import { useState } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  SimpleGrid,
  VStack,
  useToast,
  useColorModeValue,
  Text,
  HStack,
  Flex,
} from '@chakra-ui/react'
import { LuUserPlus } from 'react-icons/lu'
import { useTranslation } from 'react-i18next'
import { usePatientQueue } from '../contexts/PatientQueueContext'
import { generateReceipt } from '../services/mockUPeu'
import type { Patient } from '../data/mockPatients'

interface RegisterPatientModalProps {
  isOpen: boolean
  onClose: () => void
  appointmentId?: string
  appointmentName?: string
}

export default function RegisterPatientModal({ isOpen, onClose, appointmentId, appointmentName }: RegisterPatientModalProps) {
  const { t } = useTranslation(['admision', 'common'])
  const { addPatient } = usePatientQueue()
  const toast = useToast()

  const [name, setName] = useState(appointmentName || '')
  const [age, setAge] = useState('')
  const [gender, setGender] = useState('Male')
  const [phone, setPhone] = useState('')
  const [docId, setDocId] = useState('')
  const [serviceType, setServiceType] = useState('Medicina General')
  const [isLoading, setIsLoading] = useState(false)

  const bg = useColorModeValue('white', 'gray.800')
  const titleColor = useColorModeValue('primary.500', 'white')

  const handleSubmit = async () => {
    if (!name || !age) {
      toast({ title: 'Complete required fields', status: 'warning', duration: 2000 })
      return
    }

    setIsLoading(true)
    const { receiptId, accountNumber } = await generateReceipt()

    const initials = name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
    const patientNum = String(Math.floor(Math.random() * 9000) + 1000)

    const newPatient: Patient = {
      id: `p${Date.now()}`,
      name,
      initials,
      age: parseInt(age),
      gender,
      patientId: `#MC-2024-${patientNum}`,
      phone: phone || '--',
      status: 'registered',
      priority: 'medium',
      registeredAt: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }),
      medicalHistory: [],
      surgicalHistory: [],
      allergies: 'NIEGA RAM',
      appointmentId,
      receiptId,
      accountNumber,
      serviceType,
    }

    addPatient(newPatient)
    setIsLoading(false)

    toast({
      title: t('admision:patientRegistered', 'Patient registered successfully'),
      description: `Receipt: ${receiptId} | Account: ${accountNumber}`,
      status: 'success',
      duration: 4000,
      isClosable: true,
    })

    setName('')
    setAge('')
    setGender('Male')
    setPhone('')
    setDocId('')
    setServiceType('Medicina General')
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
      <ModalOverlay bg="blackAlpha.600" backdropFilter="blur(4px)" />
      <ModalContent bg={bg} borderRadius="2xl" mx={4}>
        <ModalHeader>
          <HStack spacing={3}>
            <Flex w={10} h={10} borderRadius="xl" bg="primary.50" align="center" justify="center" color="primary.500">
              <LuUserPlus size={20} />
            </Flex>
            <Text fontSize="lg" fontWeight="bold" color={titleColor}>
              {t('admision:registerNewPatient')}
            </Text>
          </HStack>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4}>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} w="full">
              <FormControl isRequired>
                <FormLabel fontSize="sm">{t('admision:form.fullName', 'Full Name')}</FormLabel>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Maria Lopez"
                  borderRadius="xl"
                  size="sm"
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel fontSize="sm">{t('admision:form.age', 'Age')}</FormLabel>
                <Input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="e.g. 35"
                  borderRadius="xl"
                  size="sm"
                />
              </FormControl>
              <FormControl>
                <FormLabel fontSize="sm">{t('admision:form.gender', 'Gender')}</FormLabel>
                <Select value={gender} onChange={(e) => setGender(e.target.value)} borderRadius="xl" size="sm">
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel fontSize="sm">{t('admision:form.phone', 'Phone')}</FormLabel>
                <Input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+51 999 999 999"
                  borderRadius="xl"
                  size="sm"
                />
              </FormControl>
              <FormControl>
                <FormLabel fontSize="sm">{t('admision:form.documentId', 'Document ID (DNI)')}</FormLabel>
                <Input
                  value={docId}
                  onChange={(e) => setDocId(e.target.value)}
                  placeholder="e.g. 12345678"
                  borderRadius="xl"
                  size="sm"
                />
              </FormControl>
              <FormControl>
                <FormLabel fontSize="sm">{t('admision:form.serviceType', 'Service Type')}</FormLabel>
                <Select value={serviceType} onChange={(e) => setServiceType(e.target.value)} borderRadius="xl" size="sm">
                  <option>Medicina General</option>
                  <option>Medicina Interna</option>
                  <option>Cardiologia</option>
                  <option>Traumatologia</option>
                  <option>Pediatria</option>
                  <option>Ginecologia</option>
                </Select>
              </FormControl>
            </SimpleGrid>
            {appointmentId && (
              <Text fontSize="xs" color="gray.500" alignSelf="start">
                Linked to appointment: {appointmentId}
              </Text>
            )}
          </VStack>
        </ModalBody>
        <ModalFooter gap={3}>
          <Button variant="ghost" borderRadius="xl" onClick={onClose} size="sm">
            {t('common:actions.cancel')}
          </Button>
          <Button
            bg="primary.500"
            color="white"
            borderRadius="xl"
            _hover={{ bg: 'primary.400' }}
            onClick={handleSubmit}
            isLoading={isLoading}
            loadingText="Processing..."
            size="sm"
          >
            {t('admision:form.registerAndPay', 'Register & Generate Receipt')}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

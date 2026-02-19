import {
  Box,
  SimpleGrid,
  Text,
  Flex,
  HStack,
  Button,
  useColorModeValue,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from '@chakra-ui/react'
import { useOutletContext } from 'react-router-dom'
import {
  LuClipboardList,
  LuPlus,
  LuUsers,
  LuClock,
  LuCircleCheck,
} from 'react-icons/lu'
import { Header } from '@medcore/ui'
import { useTranslation } from 'react-i18next'
import { usePatientQueue } from '../contexts/PatientQueueContext'
import type { Patient, PatientStatus } from '../data/mockPatients'

const statusKeys: Record<PatientStatus, string> = {
  registered: 'common:status.registered',
  in_triage: 'common:status.in_triage',
  triaged: 'common:status.triaged',
  in_consultation: 'common:status.in_consultation',
  post_consultation: 'common:status.post_consultation',
  completed: 'common:status.completed',
}

const statusColors: Record<PatientStatus, string> = {
  registered: 'orange',
  in_triage: 'blue',
  triaged: 'cyan',
  in_consultation: 'purple',
  post_consultation: 'green',
  completed: 'gray',
}

export default function AdmisionPage() {
  const { t } = useTranslation(['admision', 'common'])
  const { onMenuOpen, currentUser } = useOutletContext<{ onMenuOpen: () => void; currentUser?: any }>()
  const { patients, addPatient } = usePatientQueue()

  const todayPatients = patients.filter((p) => p.status !== 'completed')
  const registeredCount = patients.filter((p) => p.status === 'registered').length
  const completedCount = patients.filter((p) => p.status === 'completed').length

  const cardBg = useColorModeValue('white', 'card.dark')
  const cardBorder = useColorModeValue('gray.100', 'gray.800')
  const tableBg = useColorModeValue('white', 'card.dark')
  const hoverBg = useColorModeValue('gray.50', 'gray.800')

  const handleRegisterNew = () => {
    const names = ['Patricia Lopez', 'Fernando Ruiz', 'Isabella Torres', 'Mateo Herrera', 'Valentina Cruz']
    const randomName = names[Math.floor(Math.random() * names.length)]
    const initials = randomName.split(' ').map((n) => n[0]).join('')
    const newId = `p${Date.now()}`
    const patientNum = String(Math.floor(Math.random() * 9000) + 1000)

    const newPatient: Patient = {
      id: newId,
      name: randomName,
      initials,
      age: Math.floor(Math.random() * 50) + 18,
      gender: Math.random() > 0.5 ? 'Male' : 'Female',
      patientId: `#MC-2024-${patientNum}`,
      phone: `+1 (555) ${String(Math.floor(Math.random() * 900) + 100)}-${String(Math.floor(Math.random() * 9000) + 1000)}`,
      status: 'registered',
      priority: 'medium',
      registeredAt: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }),
      medicalHistory: [],
      surgicalHistory: [],
      allergies: 'NIEGA RAM',
    }
    addPatient(newPatient)
  }

  return (
    <Box>
      <Header
        title={t('admision:title')}
        breadcrumbItems={[
          { label: 'MedCore' },
          { label: 'Admision', isActive: true },
        ]}
        onMenuClick={onMenuOpen}
        currentUser={currentUser}
      />

      <Box
        maxW="1800px"
        w="full"
        mx="auto"
        pl={{ base: 4, md: '128px' }}
        pr={{ base: 4, md: 8 }}
        py={{ base: 5, md: 6 }}
        display="flex"
        flexDir="column"
        gap={6}
      >
        {/* Stats */}
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
          <Box bg={cardBg} borderRadius="2xl" p={5} border="1px solid" borderColor={cardBorder} shadow="soft">
            <HStack spacing={3} mb={2}>
              <Flex w={10} h={10} borderRadius="xl" bg="primary.50" align="center" justify="center" color="primary.500">
                <LuUsers size={20} />
              </Flex>
              <Box>
                <Text fontSize="2xl" fontWeight="bold" fontFamily="heading" color={useColorModeValue('primary.500', 'white')}>
                  {todayPatients.length}
                </Text>
                <Text fontSize="xs" color="gray.500">{t('admision:stats.activePatients')}</Text>
              </Box>
            </HStack>
          </Box>
          <Box bg={cardBg} borderRadius="2xl" p={5} border="1px solid" borderColor={cardBorder} shadow="soft">
            <HStack spacing={3} mb={2}>
              <Flex w={10} h={10} borderRadius="xl" bg="orange.50" align="center" justify="center" color="orange.500">
                <LuClock size={20} />
              </Flex>
              <Box>
                <Text fontSize="2xl" fontWeight="bold" fontFamily="heading" color={useColorModeValue('primary.500', 'white')}>
                  {registeredCount}
                </Text>
                <Text fontSize="xs" color="gray.500">{t('admision:stats.waitingForTriage')}</Text>
              </Box>
            </HStack>
          </Box>
          <Box bg={cardBg} borderRadius="2xl" p={5} border="1px solid" borderColor={cardBorder} shadow="soft">
            <HStack spacing={3} mb={2}>
              <Flex w={10} h={10} borderRadius="xl" bg="green.50" align="center" justify="center" color="green.500">
                <LuCircleCheck size={20} />
              </Flex>
              <Box>
                <Text fontSize="2xl" fontWeight="bold" fontFamily="heading" color={useColorModeValue('primary.500', 'white')}>
                  {completedCount}
                </Text>
                <Text fontSize="xs" color="gray.500">{t('admision:stats.completedToday')}</Text>
              </Box>
            </HStack>
          </Box>
        </SimpleGrid>

        {/* Register button */}
        <Flex justify="flex-end">
          <Button
            leftIcon={<LuPlus size={18} />}
            bg="primary.500"
            color="white"
            borderRadius="xl"
            px={6}
            fontWeight="semibold"
            _hover={{ bg: 'primary.400', transform: 'translateY(-1px)' }}
            transition="all 0.2s"
            shadow="md"
            onClick={handleRegisterNew}
          >
            {t('admision:registerNewPatient')}
          </Button>
        </Flex>

        {/* Patient Table */}
        <Box
          bg={tableBg}
          borderRadius="2xl"
          border="1px solid"
          borderColor={cardBorder}
          shadow="soft"
          overflow="hidden"
        >
          <Box p={5} borderBottom="1px solid" borderColor={cardBorder}>
            <HStack spacing={3}>
              <Flex w={10} h={10} borderRadius="xl" bg="primary.50" align="center" justify="center" color="primary.500">
                <LuClipboardList size={20} />
              </Flex>
              <Box>
                <Text fontSize="lg" fontWeight="bold" fontFamily="heading" color={useColorModeValue('primary.500', 'white')}>
                  {t('admision:todaysRegistrations')}
                </Text>
                <Text fontSize="xs" color="gray.500">{t('admision:allPatientsProcessed')}</Text>
              </Box>
            </HStack>
          </Box>

          <Box overflowX="auto">
            <Table variant="simple" size="sm">
              <Thead>
                <Tr>
                  <Th>{t('admision:table.patient')}</Th>
                  <Th>{t('admision:table.id')}</Th>
                  <Th>{t('admision:table.ageGender')}</Th>
                  <Th>{t('admision:table.registered')}</Th>
                  <Th>{t('admision:table.status')}</Th>
                  <Th>{t('admision:table.priority')}</Th>
                </Tr>
              </Thead>
              <Tbody>
                {todayPatients.map((p) => (
                  <Tr key={p.id} _hover={{ bg: hoverBg }} transition="background 0.2s">
                    <Td>
                      <HStack spacing={3}>
                        <Flex
                          w={8}
                          h={8}
                          borderRadius="lg"
                          bg="primary.50"
                          color="primary.500"
                          align="center"
                          justify="center"
                          fontSize="xs"
                          fontWeight="bold"
                          flexShrink={0}
                        >
                          {p.initials}
                        </Flex>
                        <Text fontWeight="medium" fontSize="sm">{p.name}</Text>
                      </HStack>
                    </Td>
                    <Td>
                      <Text fontSize="xs" color="gray.500" fontFamily="mono">{p.patientId}</Text>
                    </Td>
                    <Td>
                      <Text fontSize="sm">{p.age}y / {p.gender}</Text>
                    </Td>
                    <Td>
                      <Text fontSize="sm" color="gray.500">{p.registeredAt}</Text>
                    </Td>
                    <Td>
                      <Text
                        display="inline-block"
                        fontSize="xs"
                        fontWeight="semibold"
                        px={2}
                        py={0.5}
                        borderRadius="full"
                        bg={`${statusColors[p.status]}.100`}
                        color={`${statusColors[p.status]}.700`}
                      >
                        {t(statusKeys[p.status])}
                      </Text>
                    </Td>
                    <Td>
                      <Text
                        display="inline-block"
                        fontSize="xs"
                        fontWeight="semibold"
                        px={2}
                        py={0.5}
                        borderRadius="full"
                        bg={p.priority === 'urgent' ? 'red.100' : p.priority === 'high' ? 'orange.100' : p.priority === 'medium' ? 'yellow.100' : 'green.100'}
                        color={p.priority === 'urgent' ? 'red.700' : p.priority === 'high' ? 'orange.700' : p.priority === 'medium' ? 'yellow.700' : 'green.700'}
                      >
                        {t(`common:priority.${p.priority}`)}
                      </Text>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

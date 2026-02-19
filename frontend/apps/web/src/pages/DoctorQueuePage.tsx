import {
  Box,
  SimpleGrid,
  Text,
  Flex,
  HStack,
  Button,
  useColorModeValue,
} from '@chakra-ui/react'
import { useOutletContext, useNavigate } from 'react-router-dom'
import {
  LuStethoscope,
  LuUsers,
  LuArrowRight,
  LuThermometer,
  LuHeartPulse,
} from 'react-icons/lu'
import { Header } from '@medcore/ui'
import { useTranslation } from 'react-i18next'
import { usePatientQueue } from '../contexts/PatientQueueContext'

export default function DoctorQueuePage() {
  const { t } = useTranslation(['consultation', 'common', 'ui'])
  const navigate = useNavigate()
  const { onMenuOpen, currentUser } = useOutletContext<{ onMenuOpen: () => void; currentUser?: any }>()
  const { getPatientsByStatus, updatePatientStatus } = usePatientQueue()

  const triagedPatients = getPatientsByStatus('triaged')

  const cardBg = useColorModeValue('white', 'card.dark')
  const cardBorder = useColorModeValue('gray.100', 'gray.800')
  const nameColor = useColorModeValue('primary.500', 'white')
  const vitalBg = useColorModeValue('gray.50', 'gray.800')
  const vitalLabel = useColorModeValue('gray.400', 'gray.500')

  const handleBeginConsultation = (patientId: string) => {
    updatePatientStatus(patientId, 'in_consultation')
    navigate(`/consultation/${patientId}`)
  }

  return (
    <Box>
      <Header
        title={t('consultation:queue.title')}
        breadcrumbItems={[
          { label: 'MedCore' },
          { label: 'Consultas', isActive: true },
        ]}
        badge={triagedPatients.length > 0 ? { label: `${triagedPatients.length} ${t('ui:ready')}`, color: 'primary' } : undefined}
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
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
          <Box bg={cardBg} borderRadius="2xl" p={5} border="1px solid" borderColor={cardBorder} shadow="soft">
            <HStack spacing={3}>
              <Flex w={10} h={10} borderRadius="xl" bg="primary.50" align="center" justify="center" color="primary.500">
                <LuUsers size={20} />
              </Flex>
              <Box>
                <Text fontSize="2xl" fontWeight="bold" fontFamily="heading" color={nameColor}>
                  {triagedPatients.length}
                </Text>
                <Text fontSize="xs" color="gray.500">{t('consultation:queue.patientsReady')}</Text>
              </Box>
            </HStack>
          </Box>
          <Box bg={cardBg} borderRadius="2xl" p={5} border="1px solid" borderColor={cardBorder} shadow="soft">
            <HStack spacing={3}>
              <Flex w={10} h={10} borderRadius="xl" bg="green.50" align="center" justify="center" color="green.500">
                <LuStethoscope size={20} />
              </Flex>
              <Box>
                <Text fontSize="2xl" fontWeight="bold" fontFamily="heading" color={nameColor}>
                  {t('consultation:queue.today')}
                </Text>
                <Text fontSize="xs" color="gray.500">{t('consultation:queue.triagedAwaiting')}</Text>
              </Box>
            </HStack>
          </Box>
        </SimpleGrid>

        {/* Section title */}
        <HStack spacing={3}>
          <Flex w={10} h={10} borderRadius="xl" bg="primary.50" align="center" justify="center" color="primary.500">
            <LuStethoscope size={20} />
          </Flex>
          <Box>
            <Text fontSize="lg" fontWeight="bold" fontFamily="heading" color={nameColor}>
              {t('consultation:queue.triagedPatients')}
            </Text>
            <Text fontSize="xs" color="gray.500">{t('consultation:queue.patientsWithCompletedTriage')}</Text>
          </Box>
        </HStack>

        {/* Patient cards */}
        {triagedPatients.length === 0 ? (
          <Box bg={cardBg} borderRadius="2xl" p={8} border="1px solid" borderColor={cardBorder} shadow="soft" textAlign="center">
            <Text fontSize="lg" fontWeight="semibold" color="gray.400">{t('consultation:queue.noPatientsWaiting')}</Text>
            <Text fontSize="sm" color="gray.400" mt={1}>{t('consultation:queue.allSeen')}</Text>
          </Box>
        ) : (
          <SimpleGrid columns={{ base: 1 }} spacing={4}>
            {triagedPatients.map((p) => (
              <Box
                key={p.id}
                bg={cardBg}
                borderRadius="2xl"
                p={5}
                border="1px solid"
                borderColor={cardBorder}
                shadow="soft"
                _hover={{ shadow: 'md', borderColor: 'primary.200' }}
                transition="all 0.2s"
              >
                <Flex
                  align={{ base: 'stretch', md: 'start' }}
                  justify="space-between"
                  flexDir={{ base: 'column', md: 'row' }}
                  gap={4}
                >
                  {/* Patient info */}
                  <HStack spacing={4} flex={1} align="start">
                    <Flex
                      w={12}
                      h={12}
                      borderRadius="xl"
                      bg="primary.50"
                      color="primary.500"
                      align="center"
                      justify="center"
                      fontSize="md"
                      fontWeight="bold"
                      fontFamily="heading"
                      flexShrink={0}
                    >
                      {p.initials}
                    </Flex>
                    <Box flex={1}>
                      <HStack spacing={2} mb={1}>
                        <Text fontSize="md" fontWeight="bold" color={nameColor}>
                          {p.name}
                        </Text>
                        <Text
                          fontSize="xs"
                          fontWeight="semibold"
                          px={2}
                          py={0.5}
                          borderRadius="full"
                          bg={p.priority === 'high' ? 'orange.100' : p.priority === 'urgent' ? 'red.100' : 'blue.100'}
                          color={p.priority === 'high' ? 'orange.700' : p.priority === 'urgent' ? 'red.700' : 'blue.700'}
                          textTransform="uppercase"
                        >
                          {p.priority}
                        </Text>
                      </HStack>
                      <HStack spacing={4} fontSize="xs" color="gray.500" mb={3}>
                        <Text>{p.patientId}</Text>
                        <Text>{p.age}y / {p.gender}</Text>
                      </HStack>

                      {/* Vitals preview */}
                      {p.vitals && (
                        <HStack spacing={3} flexWrap="wrap">
                          <HStack spacing={1} bg={vitalBg} px={2} py={1} borderRadius="lg">
                            <LuThermometer size={14} color="var(--chakra-colors-gray-400)" />
                            <Text fontSize="xs" fontWeight="medium">{p.vitals.temperature}°C</Text>
                          </HStack>
                          <HStack spacing={1} bg={vitalBg} px={2} py={1} borderRadius="lg">
                            <LuHeartPulse size={14} color="var(--chakra-colors-gray-400)" />
                            <Text fontSize="xs" fontWeight="medium">{p.vitals.bloodPressure} mmHg</Text>
                          </HStack>
                          <HStack spacing={1} bg={vitalBg} px={2} py={1} borderRadius="lg">
                            <Text fontSize="xs" color={vitalLabel}>{t('common:vitals.weight')}:</Text>
                            <Text fontSize="xs" fontWeight="medium">{p.vitals.weight} kg</Text>
                          </HStack>
                          <HStack spacing={1} bg={vitalBg} px={2} py={1} borderRadius="lg">
                            <Text fontSize="xs" color={vitalLabel}>{t('common:vitals.height')}:</Text>
                            <Text fontSize="xs" fontWeight="medium">{p.vitals.height} cm</Text>
                          </HStack>
                        </HStack>
                      )}

                      {/* Triage observations snippet */}
                      {p.triageObservations && (
                        <Text fontSize="xs" color="gray.500" mt={2} noOfLines={2} fontStyle="italic">
                          {p.triageObservations}
                        </Text>
                      )}
                    </Box>
                  </HStack>

                  {/* Action */}
                  <Button
                    rightIcon={<LuArrowRight size={16} />}
                    bg="primary.500"
                    color="white"
                    borderRadius="xl"
                    px={6}
                    size="sm"
                    fontWeight="semibold"
                    _hover={{ bg: 'primary.400', transform: 'translateY(-1px)' }}
                    transition="all 0.2s"
                    shadow="md"
                    onClick={() => handleBeginConsultation(p.id)}
                    flexShrink={0}
                    alignSelf={{ base: 'stretch', md: 'start' }}
                  >
                    {t('consultation:queue.beginConsultation')}
                  </Button>
                </Flex>
              </Box>
            ))}
          </SimpleGrid>
        )}
      </Box>
    </Box>
  )
}

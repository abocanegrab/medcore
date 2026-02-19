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
  LuClipboardPlus,
  LuUsers,
  LuClock,
  LuArrowRight,
} from 'react-icons/lu'
import { Header } from '@medcore/ui'
import { useTranslation } from 'react-i18next'
import { usePatientQueue } from '../contexts/PatientQueueContext'

export default function TriajeQueuePage() {
  const { t } = useTranslation(['triaje', 'common', 'ui'])
  const navigate = useNavigate()
  const { onMenuOpen, currentUser } = useOutletContext<{ onMenuOpen: () => void; currentUser?: any }>()
  const { getPatientsByStatus, updatePatientStatus } = usePatientQueue()

  const waitingPatients = getPatientsByStatus('registered')

  const cardBg = useColorModeValue('white', 'card.dark')
  const cardBorder = useColorModeValue('gray.100', 'gray.800')
  const nameColor = useColorModeValue('primary.500', 'white')

  const priorityConfig: Record<string, { color: string; labelKey: string }> = {
    urgent: { color: 'red', labelKey: 'common:priority.urgent' },
    high: { color: 'orange', labelKey: 'common:priority.high' },
    medium: { color: 'yellow', labelKey: 'common:priority.medium' },
    low: { color: 'green', labelKey: 'common:priority.low' },
  }

  const handleStartTriage = (patientId: string) => {
    updatePatientStatus(patientId, 'in_triage')
    navigate(`/triaje/${patientId}`)
  }

  return (
    <Box>
      <Header
        title={t('triaje:queue.title')}
        breadcrumbItems={[
          { label: 'MedCore' },
          { label: 'Triaje', isActive: true },
        ]}
        badge={waitingPatients.length > 0 ? { label: `${waitingPatients.length} ${t('ui:waiting')}`, color: 'amber' } : undefined}
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
              <Flex w={10} h={10} borderRadius="xl" bg="orange.50" align="center" justify="center" color="orange.500">
                <LuUsers size={20} />
              </Flex>
              <Box>
                <Text fontSize="2xl" fontWeight="bold" fontFamily="heading" color={nameColor}>
                  {waitingPatients.length}
                </Text>
                <Text fontSize="xs" color="gray.500">{t('triaje:queue.patientsWaiting')}</Text>
              </Box>
            </HStack>
          </Box>
          <Box bg={cardBg} borderRadius="2xl" p={5} border="1px solid" borderColor={cardBorder} shadow="soft">
            <HStack spacing={3}>
              <Flex w={10} h={10} borderRadius="xl" bg="blue.50" align="center" justify="center" color="blue.500">
                <LuClock size={20} />
              </Flex>
              <Box>
                <Text fontSize="2xl" fontWeight="bold" fontFamily="heading" color={nameColor}>
                  ~12 min
                </Text>
                <Text fontSize="xs" color="gray.500">{t('triaje:queue.avgWaitTime')}</Text>
              </Box>
            </HStack>
          </Box>
        </SimpleGrid>

        {/* Section title */}
        <HStack spacing={3}>
          <Flex w={10} h={10} borderRadius="xl" bg="primary.50" align="center" justify="center" color="primary.500">
            <LuClipboardPlus size={20} />
          </Flex>
          <Box>
            <Text fontSize="lg" fontWeight="bold" fontFamily="heading" color={nameColor}>
              {t('triaje:queue.patientsAwaitingTriage')}
            </Text>
            <Text fontSize="xs" color="gray.500">{t('triaje:queue.clickStartTriage')}</Text>
          </Box>
        </HStack>

        {/* Patient cards */}
        {waitingPatients.length === 0 ? (
          <Box bg={cardBg} borderRadius="2xl" p={8} border="1px solid" borderColor={cardBorder} shadow="soft" textAlign="center">
            <Text fontSize="lg" fontWeight="semibold" color="gray.400">{t('triaje:queue.noPatientsWaiting')}</Text>
            <Text fontSize="sm" color="gray.400" mt={1}>{t('triaje:queue.allTriaged')}</Text>
          </Box>
        ) : (
          <SimpleGrid columns={{ base: 1 }} spacing={4}>
            {waitingPatients.map((p) => {
              const priority = priorityConfig[p.priority]
              return (
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
                    align={{ base: 'stretch', md: 'center' }}
                    justify="space-between"
                    flexDir={{ base: 'column', md: 'row' }}
                    gap={4}
                  >
                    {/* Patient info */}
                    <HStack spacing={4} flex={1}>
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
                            bg={`${priority.color}.100`}
                            color={`${priority.color}.700`}
                            textTransform="uppercase"
                          >
                            {t(priority.labelKey)}
                          </Text>
                        </HStack>
                        <HStack spacing={4} fontSize="xs" color="gray.500">
                          <Text>{p.patientId}</Text>
                          <Text>{p.age}y / {p.gender}</Text>
                          <Text>{t('common:registered')}: {p.registeredAt}</Text>
                        </HStack>
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
                      onClick={() => handleStartTriage(p.id)}
                      flexShrink={0}
                    >
                      {t('triaje:queue.startTriage')}
                    </Button>
                  </Flex>
                </Box>
              )
            })}
          </SimpleGrid>
        )}
      </Box>
    </Box>
  )
}

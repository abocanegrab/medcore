import {
  Box,
  SimpleGrid,
  Text,
  Flex,
  HStack,
  Button,
  useColorModeValue,
} from '@chakra-ui/react'
import { useOutletContext } from 'react-router-dom'
import {
  LuPill,
  LuCircleCheck,
  LuFileText,
} from 'react-icons/lu'
import { Header } from '@medcore/ui'
import { useTranslation } from 'react-i18next'
import { usePatientQueue } from '../contexts/PatientQueueContext'

export default function FarmaciaPage() {
  const { t } = useTranslation(['farmacia', 'ui'])
  const { onMenuOpen, currentUser } = useOutletContext<{ onMenuOpen: () => void; currentUser?: any }>()
  const { getPatientsByStatus, updatePatientStatus, patients } = usePatientQueue()

  const pharmacyPatients = getPatientsByStatus('post_consultation').filter((p) => p.nextStep === 'farmacia')
  const completedCount = patients.filter((p) => p.status === 'completed').length

  const cardBg = useColorModeValue('white', 'card.dark')
  const cardBorder = useColorModeValue('gray.100', 'gray.800')
  const nameColor = useColorModeValue('primary.500', 'white')
  const rxBg = useColorModeValue('gray.50', 'gray.800')
  const rxBorder = useColorModeValue('gray.200', 'gray.700')

  const handleDispense = (patientId: string) => {
    updatePatientStatus(patientId, 'completed')
  }

  return (
    <Box>
      <Header
        title={t('farmacia:title')}
        breadcrumbItems={[
          { label: 'MedCore' },
          { label: 'Farmacia', isActive: true },
        ]}
        badge={pharmacyPatients.length > 0 ? { label: `${pharmacyPatients.length} ${t('ui:pending')}`, color: 'amber' } : undefined}
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
                <LuPill size={20} />
              </Flex>
              <Box>
                <Text fontSize="2xl" fontWeight="bold" fontFamily="heading" color={nameColor}>
                  {pharmacyPatients.length}
                </Text>
                <Text fontSize="xs" color="gray.500">{t('farmacia:stats.pendingPrescriptions')}</Text>
              </Box>
            </HStack>
          </Box>
          <Box bg={cardBg} borderRadius="2xl" p={5} border="1px solid" borderColor={cardBorder} shadow="soft">
            <HStack spacing={3}>
              <Flex w={10} h={10} borderRadius="xl" bg="green.50" align="center" justify="center" color="green.500">
                <LuCircleCheck size={20} />
              </Flex>
              <Box>
                <Text fontSize="2xl" fontWeight="bold" fontFamily="heading" color={nameColor}>
                  {completedCount}
                </Text>
                <Text fontSize="xs" color="gray.500">{t('farmacia:stats.dispensedToday')}</Text>
              </Box>
            </HStack>
          </Box>
        </SimpleGrid>

        {/* Section title */}
        <HStack spacing={3}>
          <Flex w={10} h={10} borderRadius="xl" bg="primary.50" align="center" justify="center" color="primary.500">
            <LuFileText size={20} />
          </Flex>
          <Box>
            <Text fontSize="lg" fontWeight="bold" fontFamily="heading" color={nameColor}>
              {t('farmacia:prescriptionsToDispense')}
            </Text>
            <Text fontSize="xs" color="gray.500">{t('farmacia:patientsWithActivePrescriptions')}</Text>
          </Box>
        </HStack>

        {/* Patient cards */}
        {pharmacyPatients.length === 0 ? (
          <Box bg={cardBg} borderRadius="2xl" p={8} border="1px solid" borderColor={cardBorder} shadow="soft" textAlign="center">
            <Text fontSize="lg" fontWeight="semibold" color="gray.400">{t('farmacia:noPending')}</Text>
            <Text fontSize="sm" color="gray.400" mt={1}>{t('farmacia:allDispensed')}</Text>
          </Box>
        ) : (
          <SimpleGrid columns={{ base: 1 }} spacing={4}>
            {pharmacyPatients.map((p) => (
              <Box
                key={p.id}
                bg={cardBg}
                borderRadius="2xl"
                p={5}
                border="1px solid"
                borderColor={cardBorder}
                shadow="soft"
                _hover={{ shadow: 'md', borderColor: 'green.200' }}
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
                      bg="green.50"
                      color="green.600"
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
                      </HStack>
                      <HStack spacing={4} fontSize="xs" color="gray.500" mb={3}>
                        <Text>{p.patientId}</Text>
                        <Text>{p.age}y / {p.gender}</Text>
                      </HStack>

                      {/* Prescription */}
                      {p.prescription && (
                        <Box
                          bg={rxBg}
                          border="1px solid"
                          borderColor={rxBorder}
                          borderRadius="xl"
                          p={3}
                        >
                          <Text fontSize="10px" fontWeight="bold" color="green.600" mb={1} textTransform="uppercase" letterSpacing="wider">
                            {t('farmacia:prescription')}
                          </Text>
                          <Text fontSize="sm" whiteSpace="pre-line" color={useColorModeValue('gray.700', 'gray.300')}>
                            {p.prescription}
                          </Text>
                        </Box>
                      )}
                    </Box>
                  </HStack>

                  {/* Action */}
                  <Button
                    leftIcon={<LuCircleCheck size={16} />}
                    bg="green.500"
                    color="white"
                    borderRadius="xl"
                    px={6}
                    size="sm"
                    fontWeight="semibold"
                    _hover={{ bg: 'green.400', transform: 'translateY(-1px)' }}
                    transition="all 0.2s"
                    shadow="md"
                    onClick={() => handleDispense(p.id)}
                    flexShrink={0}
                    alignSelf={{ base: 'stretch', md: 'start' }}
                  >
                    {t('farmacia:dispenseComplete')}
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

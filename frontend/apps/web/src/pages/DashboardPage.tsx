import {
  Box,
  SimpleGrid,
  Grid,
  GridItem,
  HStack,
  VStack,
  Text,
  Flex,
  Button,
  useColorModeValue,
  IconButton,
} from '@chakra-ui/react'
import { useNavigate, useOutletContext } from 'react-router-dom'
import { LuArrowRight, LuStar, LuVideo, LuChevronLeft, LuChevronRight, LuUser } from 'react-icons/lu'
import {
  Header,
  StatCard,
  ScheduleTable,
  ActivityTimeline,
  DateWidget,
} from '@medcore/ui'
import { stats, nextAppointment, todaySchedule, activityItems } from '../data/mockData'

export default function DashboardPage() {
  const navigate = useNavigate()
  const { onMenuOpen } = useOutletContext<{ onMenuOpen: () => void }>()
  const primaryGrad = useColorModeValue('primary.500', 'primary.400')

  return (
    <Box>
      <Header
        title="Clinical Overview"
        breadcrumbItems={[
          { label: 'MedCore' },
          { label: 'Dashboard', isActive: true },
        ]}
        onMenuClick={onMenuOpen}
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
        {/* Greeting Section */}
        <Box>
          <Text
            fontSize={{ base: '2xl', md: '4xl' }}
            fontFamily="heading"
            fontWeight="bold"
            color={useColorModeValue('primary.500', 'white')}
            letterSpacing="tight"
            lineHeight="tight"
          >
            Hello,{' '}
            <Text
              as="span"
              bgGradient="linear(to-r, primary.500, primary.400)"
              bgClip="text"
            >
              Dr. Ricardo.
            </Text>
          </Text>
          <Text color={useColorModeValue('gray.500', 'gray.400')} fontSize="md" mt={1}>
            Here's your performance overview and schedule for today.
          </Text>
        </Box>

        {/* Performance Indicators */}
        <Box display="flex" flexDir="column" gap={4}>
          <Flex align="center" justify="space-between">
            <Text fontSize="lg" fontFamily="heading" fontWeight="bold" color={useColorModeValue('primary.500', 'white')}>
              Performance Indicators
            </Text>
            <HStack spacing={2}>
              <IconButton
                aria-label="Previous"
                icon={<LuChevronLeft size={20} />}
                variant="ghost"
                size="sm"
                borderRadius="lg"
                color="gray.500"
                _hover={{ bg: useColorModeValue('gray.100', 'gray.700') }}
              />
              <IconButton
                aria-label="Next"
                icon={<LuChevronRight size={20} />}
                variant="ghost"
                size="sm"
                borderRadius="lg"
                color="gray.500"
                _hover={{ bg: useColorModeValue('gray.100', 'gray.700') }}
              />
            </HStack>
          </Flex>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={4}>
            {stats.map((stat, i) => (
              <StatCard key={stat.label} {...stat} index={i} />
            ))}
          </SimpleGrid>
        </Box>

        {/* Main grid: 8/12 + 4/12 */}
        <Grid templateColumns={{ base: '1fr', xl: 'repeat(12, 1fr)' }} gap={6}>
          {/* Left column: 8/12 */}
          <GridItem colSpan={{ base: 1, xl: 8 }} display="flex" flexDir="column" gap={6}>
            {/* Next Appointment Card */}
            <Box
              position="relative"
              overflow="hidden"
              bg="primary.500"
              borderRadius={{ base: '2xl', md: '2rem 1rem 2rem 1rem' }}
              p={{ base: 4, md: 6 }}
              color="white"
              shadow="deep"
              minH={{ base: 'auto', md: '220px' }}
              display="flex"
              flexDir="column"
              justifyContent="space-between"
              _hover={{ shadow: 'glow' }}
              transition="all 0.5s"
              role="group"
            >
              {/* Decorative blurs */}
              <Box
                position="absolute"
                top={0}
                right={0}
                w="256px"
                h="256px"
                bg="white"
                opacity={0.05}
                borderRadius="full"
                filter="blur(48px)"
                mr={-16}
                mt={-16}
                pointerEvents="none"
              />
              <Box
                position="absolute"
                bottom={0}
                left={0}
                w="192px"
                h="192px"
                bg="accent.500"
                opacity={0.2}
                borderRadius="full"
                filter="blur(32px)"
                ml={-10}
                mb={-10}
                pointerEvents="none"
              />

              {/* Top: label + avatar */}
              <Flex justify="space-between" align="start" position="relative" zIndex={10}>
                <Box>
                  <Text
                    display="inline-block"
                    bg="whiteAlpha.100"
                    backdropFilter="blur(12px)"
                    px={3}
                    py={1}
                    borderRadius="full"
                    fontSize="xs"
                    fontWeight="medium"
                    textTransform="uppercase"
                    letterSpacing="wider"
                    mb={3}
                    border="1px solid"
                    borderColor="whiteAlpha.100"
                  >
                    Next Up &bull; {nextAppointment.time}
                  </Text>
                  <Text fontSize={{ base: 'xl', md: '2xl' }} fontFamily="heading" fontWeight="bold" mb={1}>
                    {nextAppointment.patientName}
                  </Text>
                  <Text color="gray.300" fontWeight="light">
                    {nextAppointment.consultationType}
                  </Text>
                </Box>
                <Flex
                  w={16}
                  h={16}
                  borderRadius="2xl"
                  bg="whiteAlpha.100"
                  backdropFilter="blur(12px)"
                  align="center"
                  justify="center"
                  border="1px solid"
                  borderColor="whiteAlpha.200"
                  flexShrink={0}
                  display={{ base: 'none', sm: 'flex' }}
                >
                  <LuVideo size={28} />
                </Flex>
              </Flex>

              {/* Info cards */}
              <SimpleGrid columns={2} spacing={3} mt={5} position="relative" zIndex={10}>
                <Box
                  bg="rgba(26,61,102,0.5)"
                  borderRadius="xl"
                  p={3}
                  backdropFilter="blur(4px)"
                  border="1px solid"
                  borderColor="whiteAlpha.50"
                >
                  <Text fontSize="xs" color="gray.300" mb={1}>Last Visit</Text>
                  <Text fontWeight="semibold">{nextAppointment.lastVisit}</Text>
                </Box>
                <Box
                  bg="rgba(26,61,102,0.5)"
                  borderRadius="xl"
                  p={3}
                  backdropFilter="blur(4px)"
                  border="1px solid"
                  borderColor="whiteAlpha.50"
                >
                  <Text fontSize="xs" color="gray.300" mb={1}>Condition</Text>
                  <Text fontWeight="semibold">{nextAppointment.condition}</Text>
                </Box>
              </SimpleGrid>

              {/* CTA */}
              <Button
                mt={4}
                w="full"
                py={3}
                h="auto"
                bg="white"
                color="primary.500"
                fontWeight="bold"
                borderRadius="xl"
                shadow="lg"
                _hover={{ bg: 'accent.500', color: 'white' }}
                _groupHover={{ transform: 'translateY(-2px)' }}
                transition="all 0.3s"
                rightIcon={<LuArrowRight />}
                onClick={() => navigate(`/consultation/${nextAppointment.id}`)}
                position="relative"
                zIndex={10}
              >
                Start Consultation
              </Button>
            </Box>

            {/* Schedule Table */}
            <ScheduleTable
              title="Today's Schedule"
              rows={todaySchedule}
              onRowClick={(id) => navigate(`/consultation/${id}`)}
            />
          </GridItem>

          {/* Right column: 4/12 */}
          <GridItem colSpan={{ base: 1, xl: 4 }} display="flex" flexDir="column" gap={4}>
            <DateWidget />

            <ActivityTimeline title="Live Activity" items={activityItems} />

            {/* Bottom stats grid */}
            <SimpleGrid columns={2} spacing={3}>
              {/* Total Patients */}
              <Box
                bg={useColorModeValue('primary.500', 'gray.800')}
                borderRadius="2xl"
                p={4}
                color="white"
                shadow="lg"
              >
                <Box mb={2}>
                  <LuUser size={20} color="rgba(255,255,255,0.7)" />
                </Box>
                <Text fontSize="xl" fontWeight="bold">1,482</Text>
                <Text fontSize="xs" color="whiteAlpha.600">Total Patients</Text>
              </Box>

              {/* Rating */}
              <Box
                bg={useColorModeValue('white', 'card.dark')}
                borderRadius="2xl"
                p={4}
                shadow="soft"
                border="1px solid"
                borderColor={useColorModeValue('gray.100', 'gray.800')}
              >
                <Box mb={2}>
                  <LuStar size={20} color="var(--chakra-colors-gold-500)" />
                </Box>
                <Text fontSize="xl" fontWeight="bold" color={useColorModeValue('primary.500', 'white')}>
                  4.9
                </Text>
                <Text fontSize="xs" color="gray.400">Rating</Text>
              </Box>
            </SimpleGrid>
          </GridItem>
        </Grid>
      </Box>
    </Box>
  )
}

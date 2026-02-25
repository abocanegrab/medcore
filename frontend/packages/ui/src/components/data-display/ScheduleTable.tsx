import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  HStack,
  Flex,
  useColorModeValue,
  IconButton,
  Show,
  Hide,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { LuChevronLeft, LuChevronRight } from 'react-icons/lu'
import { useTranslation } from 'react-i18next'

const MotionTr = motion.create(Tr)

type StatusType = 'confirmed' | 'pending' | 'in-progress'

const statusStyles: Record<StatusType, { bg: string; color: string; darkBg: string; darkColor: string; labelKey: string }> = {
  confirmed: { bg: 'green.100', color: 'green.800', darkBg: 'rgba(6,78,59,0.3)', darkColor: 'green.400', labelKey: 'ui:schedule.confirmed' },
  pending: { bg: 'orange.100', color: 'orange.800', darkBg: 'rgba(120,53,15,0.3)', darkColor: 'orange.400', labelKey: 'ui:schedule.pending' },
  'in-progress': { bg: 'blue.100', color: 'blue.800', darkBg: 'rgba(30,58,138,0.3)', darkColor: 'blue.400', labelKey: 'ui:schedule.inProgress' },
}

interface ScheduleRow {
  id: string
  time: string
  patientName: string
  avatarUrl?: string
  reason: string
  status: StatusType
}

interface ScheduleTableProps {
  title: string
  rows: ScheduleRow[]
  onRowClick?: (id: string) => void
}

export function ScheduleTable({ title, rows, onRowClick }: ScheduleTableProps) {
  const { t } = useTranslation(['ui'])
  const glassBg = useColorModeValue('rgba(255,255,255,0.85)', 'rgba(22,30,39,0.7)')
  const glassBorder = useColorModeValue('rgba(255,255,255,0.8)', 'rgba(255,255,255,0.05)')
  const headerColor = useColorModeValue('gray.400', 'gray.500')
  const titleColor = useColorModeValue('primary.500', 'white')
  const rowBorder = useColorModeValue('gray.100', 'gray.800')
  const hoverBg = useColorModeValue('gray.50', 'rgba(30,41,59,0.3)')
  const patientColor = useColorModeValue('primary.500', 'white')
  const timeColor = useColorModeValue('gray.500', 'gray.400')
  const reasonColor = useColorModeValue('gray.500', 'gray.400')

  return (
    <Box
      bg={glassBg}
      backdropFilter="blur(20px)"
      border="1px solid"
      borderColor={glassBorder}
      borderRadius="3xl"
      shadow="soft"
      p={{ base: 3, md: 6 }}
    >
      <Flex align="center" justify="space-between" mb={4}>
        <Text fontSize="lg" fontWeight="bold" color={titleColor}>
          {title}
        </Text>
        <HStack spacing={2}>
          <IconButton
            aria-label="Previous"
            icon={<LuChevronLeft size={18} />}
            variant="ghost"
            size="sm"
            borderRadius="lg"
            color="gray.500"
          />
          <IconButton
            aria-label="Next"
            icon={<LuChevronRight size={18} />}
            variant="ghost"
            size="sm"
            borderRadius="lg"
            color="gray.500"
          />
        </HStack>
      </Flex>
      <Box overflowX="auto">
        <Table variant="unstyled" size="sm">
          <Thead>
            <Tr borderBottom="1px solid" borderColor={rowBorder}>
              <Th color={headerColor} fontWeight="semibold" fontSize="xs" textTransform="uppercase" letterSpacing="wider" px={{ base: 2, md: 3 }} py={3}>
                {t('ui:schedule.time')}
              </Th>
              <Th color={headerColor} fontWeight="semibold" fontSize="xs" textTransform="uppercase" letterSpacing="wider" px={{ base: 2, md: 3 }} py={3}>
                {t('ui:schedule.patient')}
              </Th>
              <Th color={headerColor} fontWeight="semibold" fontSize="xs" textTransform="uppercase" letterSpacing="wider" px={3} py={3} display={{ base: 'none', md: 'table-cell' }}>
                {t('ui:schedule.reason')}
              </Th>
              <Th color={headerColor} fontWeight="semibold" fontSize="xs" textTransform="uppercase" letterSpacing="wider" px={{ base: 2, md: 3 }} py={3}>
                {t('ui:schedule.status')}
              </Th>
              <Th color={headerColor} fontWeight="semibold" fontSize="xs" textTransform="uppercase" letterSpacing="wider" px={3} py={3} textAlign="right" display={{ base: 'none', lg: 'table-cell' }}>
                {t('ui:schedule.action')}
              </Th>
            </Tr>
          </Thead>
          <Tbody fontSize="sm" fontWeight="medium">
            {rows.map((row, i) => {
              const status = statusStyles[row.status]
              return (
                <MotionTr
                  key={row.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  cursor="pointer"
                  _hover={{ bg: hoverBg }}
                  role="group"
                  borderBottom="1px solid"
                  borderColor={rowBorder}
                  sx={{ '&:last-child': { borderBottom: 'none' } }}
                  onClick={() => onRowClick?.(row.id)}
                >
                  <Td px={{ base: 2, md: 3 }} py={{ base: 2.5, md: 3.5 }} color={timeColor} fontSize={{ base: 'xs', md: 'sm' }} whiteSpace="nowrap">
                    {row.time}
                  </Td>
                  <Td px={{ base: 2, md: 3 }} py={{ base: 2.5, md: 3.5 }}>
                    <HStack spacing={{ base: 2, md: 3 }}>
                      <Flex
                        w={{ base: 7, md: 8 }}
                        h={{ base: 7, md: 8 }}
                        borderRadius="full"
                        bg="primary.500"
                        color="white"
                        align="center"
                        justify="center"
                        fontSize="xs"
                        fontWeight="bold"
                        flexShrink={0}
                        ring="2px"
                        ringColor={useColorModeValue('white', 'gray.800')}
                        shadow="sm"
                      >
                        {row.patientName.split(' ').map(n => n[0]).slice(0, 2).join('')}
                      </Flex>
                      <Text color={patientColor} fontWeight="semibold" fontSize={{ base: 'xs', md: 'sm' }}>
                        {row.patientName}
                      </Text>
                    </HStack>
                  </Td>
                  <Td px={3} py={3.5} color={reasonColor} display={{ base: 'none', md: 'table-cell' }}>
                    {row.reason}
                  </Td>
                  <Td px={{ base: 2, md: 3 }} py={{ base: 2.5, md: 3.5 }}>
                    <Text
                      display="inline-flex"
                      alignItems="center"
                      px={{ base: 2, md: 3 }}
                      py={1}
                      borderRadius="full"
                      fontSize="xs"
                      fontWeight="medium"
                      bg={useColorModeValue(status.bg, status.darkBg)}
                      color={useColorModeValue(status.color, status.darkColor)}
                      border="1px solid"
                      borderColor={useColorModeValue(status.bg, `${status.darkColor.split('.')[0]}.800`)}
                    >
                      {t(status.labelKey)}
                    </Text>
                  </Td>
                  <Td px={3} py={3.5} textAlign="right" display={{ base: 'none', lg: 'table-cell' }}>
                    <Text
                      color="accent.500"
                      fontWeight="semibold"
                      fontSize="sm"
                      opacity={0}
                      _groupHover={{ opacity: 1 }}
                      transition="opacity 0.2s"
                      cursor="pointer"
                      _hover={{ color: 'red.800' }}
                    >
                      {t('ui:schedule.details')}
                    </Text>
                  </Td>
                </MotionTr>
              )
            })}
          </Tbody>
        </Table>
      </Box>
    </Box>
  )
}

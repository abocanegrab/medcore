import { useState, useMemo } from 'react'
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
  Input,
  InputGroup,
  InputLeftElement,
  IconButton,
  Button,
  useColorModeValue,
  Select,
} from '@chakra-ui/react'
import { LuSearch, LuVolume2, LuChevronLeft, LuChevronRight } from 'react-icons/lu'
import type { IconType } from 'react-icons'

export interface PatientTableRow {
  id: string
  order?: number
  appointmentTime?: string
  attentionNumber?: string
  name: string
  initials: string
  patientType?: string
  age: number
  gender: string
  serviceType?: string
  diagnosis?: string
  accountNumber?: string
  status?: string
  statusColor?: string
  priority?: string
  priorityColor?: string
  patientId?: string
  registeredAt?: string
}

interface Option { value: string; label: string }

interface PatientTableProps {
  rows: PatientTableRow[]
  onRowClick?: (id: string) => void
  onSpeakerClick?: (name: string) => void
  showSpeakerColumn?: boolean
  pageSize?: number
  searchPlaceholder?: string
  emptyMessage?: string
  emptySubMessage?: string
  filterOptions?: { statuses?: Option[]; priorities?: Option[] }
  actionColumn?: { label: string; icon?: IconType; onClick: (id: string) => void; colorScheme?: string }
  title?: string
  subtitle?: string
  icon?: IconType
}

export function PatientTable({
  rows,
  onRowClick,
  onSpeakerClick,
  showSpeakerColumn = false,
  pageSize = 10,
  searchPlaceholder = 'Search patients...',
  emptyMessage = 'No patients found',
  emptySubMessage,
  filterOptions,
  actionColumn,
  title,
  subtitle,
  icon: TitleIcon,
}: PatientTableProps) {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [priorityFilter, setPriorityFilter] = useState('')
  const [page, setPage] = useState(0)

  const cardBg = useColorModeValue('white', 'card.dark')
  const cardBorder = useColorModeValue('gray.100', 'gray.800')
  const hoverBg = useColorModeValue('gray.50', 'gray.800')
  const titleColor = useColorModeValue('primary.500', 'white')
  const inputBg = useColorModeValue('gray.50', 'gray.800')

  const filtered = useMemo(() => {
    let result = rows
    if (search) {
      const q = search.toLowerCase()
      result = result.filter(
        (r) => r.name.toLowerCase().includes(q) || r.patientId?.toLowerCase().includes(q),
      )
    }
    if (statusFilter) result = result.filter((r) => r.status === statusFilter)
    if (priorityFilter) result = result.filter((r) => r.priority === priorityFilter)
    return result
  }, [rows, search, statusFilter, priorityFilter])

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize))
  const paged = filtered.slice(page * pageSize, (page + 1) * pageSize)

  return (
    <Box
      bg={cardBg}
      borderRadius="2xl"
      border="1px solid"
      borderColor={cardBorder}
      shadow="soft"
      overflow="hidden"
    >
      {/* Header */}
      {title && (
        <Box p={5} borderBottom="1px solid" borderColor={cardBorder}>
          <HStack spacing={3}>
            {TitleIcon && (
              <Flex w={10} h={10} borderRadius="xl" bg="primary.50" align="center" justify="center" color="primary.500">
                <TitleIcon size={20} />
              </Flex>
            )}
            <Box>
              <Text fontSize="lg" fontWeight="bold" fontFamily="heading" color={titleColor}>
                {title}
              </Text>
              {subtitle && <Text fontSize="xs" color="gray.500">{subtitle}</Text>}
            </Box>
          </HStack>
        </Box>
      )}

      {/* Filters */}
      <Box p={4} borderBottom="1px solid" borderColor={cardBorder}>
        <HStack spacing={3} flexWrap="wrap">
          <InputGroup maxW="300px" size="sm">
            <InputLeftElement>
              <LuSearch size={14} color="var(--chakra-colors-gray-400)" />
            </InputLeftElement>
            <Input
              placeholder={searchPlaceholder}
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(0) }}
              borderRadius="xl"
              bg={inputBg}
              fontSize="sm"
            />
          </InputGroup>
          {filterOptions?.statuses && (
            <Select
              placeholder="All statuses"
              size="sm"
              maxW="180px"
              borderRadius="xl"
              bg={inputBg}
              value={statusFilter}
              onChange={(e) => { setStatusFilter(e.target.value); setPage(0) }}
            >
              {filterOptions.statuses.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </Select>
          )}
          {filterOptions?.priorities && (
            <Select
              placeholder="All priorities"
              size="sm"
              maxW="150px"
              borderRadius="xl"
              bg={inputBg}
              value={priorityFilter}
              onChange={(e) => { setPriorityFilter(e.target.value); setPage(0) }}
            >
              {filterOptions.priorities.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </Select>
          )}
        </HStack>
      </Box>

      {/* Table */}
      <Box overflowX="auto">
        {paged.length === 0 ? (
          <Box p={8} textAlign="center">
            <Text fontSize="lg" fontWeight="semibold" color="gray.400">{emptyMessage}</Text>
            {emptySubMessage && <Text fontSize="sm" color="gray.400" mt={1}>{emptySubMessage}</Text>}
          </Box>
        ) : (
          <Table variant="simple" size="sm">
            <Thead>
              <Tr>
                <Th w="40px">#</Th>
                <Th>Hora Cita</Th>
                {showSpeakerColumn && <Th w="50px">Llamado</Th>}
                <Th>Paciente</Th>
                <Th>Tipo</Th>
                <Th>Edad / Sexo</Th>
                <Th>Servicio</Th>
                {actionColumn && <Th w="140px"></Th>}
              </Tr>
            </Thead>
            <Tbody>
              {paged.map((row, idx) => (
                <Tr
                  key={row.id}
                  _hover={{ bg: hoverBg }}
                  transition="background 0.2s"
                  cursor={onRowClick ? 'pointer' : 'default'}
                  onClick={() => onRowClick?.(row.id)}
                >
                  <Td>
                    <Text fontSize="xs" color="gray.500" fontWeight="medium">
                      {page * pageSize + idx + 1}
                    </Text>
                  </Td>
                  <Td>
                    <Text fontSize="sm" fontWeight="medium">
                      {row.appointmentTime || row.registeredAt || '--'}
                    </Text>
                  </Td>
                  {showSpeakerColumn && (
                    <Td>
                      <IconButton
                        aria-label="Call patient"
                        icon={<LuVolume2 size={16} />}
                        size="xs"
                        variant="ghost"
                        colorScheme="blue"
                        borderRadius="lg"
                        onClick={(e) => {
                          e.stopPropagation()
                          onSpeakerClick?.(row.name)
                        }}
                      />
                    </Td>
                  )}
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
                        {row.initials}
                      </Flex>
                      <Box>
                        <Text fontWeight="medium" fontSize="sm">{row.name}</Text>
                        {row.patientId && (
                          <Text fontSize="xs" color="gray.500" fontFamily="mono">{row.patientId}</Text>
                        )}
                      </Box>
                    </HStack>
                  </Td>
                  <Td>
                    {row.patientType ? (
                      <Text
                        display="inline-block"
                        fontSize="xs"
                        fontWeight="semibold"
                        px={2}
                        py={0.5}
                        borderRadius="full"
                        bg="blue.50"
                        color="blue.700"
                      >
                        {row.patientType}
                      </Text>
                    ) : (
                      <Text fontSize="xs" color="gray.400">--</Text>
                    )}
                  </Td>
                  <Td>
                    <Text fontSize="sm">{row.age}y / {row.gender}</Text>
                  </Td>
                  <Td>
                    <Text fontSize="xs" color="gray.500">{row.serviceType || '--'}</Text>
                  </Td>
                  {actionColumn && (
                    <Td>
                      <Button
                        size="xs"
                        colorScheme={actionColumn.colorScheme || 'blue'}
                        borderRadius="lg"
                        fontWeight="semibold"
                        onClick={(e) => {
                          e.stopPropagation()
                          actionColumn.onClick(row.id)
                        }}
                        leftIcon={actionColumn.icon ? <actionColumn.icon size={14} /> : undefined}
                      >
                        {actionColumn.label}
                      </Button>
                    </Td>
                  )}
                </Tr>
              ))}
            </Tbody>
          </Table>
        )}
      </Box>

      {/* Pagination */}
      {filtered.length > pageSize && (
        <Flex justify="space-between" align="center" p={4} borderTop="1px solid" borderColor={cardBorder}>
          <Text fontSize="xs" color="gray.500">
            {filtered.length} patients total
          </Text>
          <HStack spacing={2}>
            <IconButton
              aria-label="Previous page"
              icon={<LuChevronLeft size={16} />}
              size="sm"
              variant="ghost"
              borderRadius="lg"
              isDisabled={page === 0}
              onClick={() => setPage((p) => p - 1)}
            />
            <Text fontSize="sm" fontWeight="medium">
              {page + 1} / {totalPages}
            </Text>
            <IconButton
              aria-label="Next page"
              icon={<LuChevronRight size={16} />}
              size="sm"
              variant="ghost"
              borderRadius="lg"
              isDisabled={page >= totalPages - 1}
              onClick={() => setPage((p) => p + 1)}
            />
          </HStack>
        </Flex>
      )}
    </Box>
  )
}

import { useState, useRef } from 'react'
import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  List,
  ListItem,
  Text,
  HStack,
  useColorModeValue,
  Portal,
  useOutsideClick,
} from '@chakra-ui/react'
import { LuSearch } from 'react-icons/lu'
import { cie10Catalog } from '../../data/catalogs'
import type { CIE10Code } from '../../data/catalogs'

interface CIE10AutocompleteProps {
  onSelect: (code: CIE10Code) => void
  placeholder?: string
}

export default function CIE10Autocomplete({ onSelect, placeholder = 'Search CIE-10...' }: CIE10AutocompleteProps) {
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useOutsideClick({ ref, handler: () => setIsOpen(false) })

  const filtered = query.length >= 2
    ? cie10Catalog.filter(
        (c) =>
          c.code.toLowerCase().includes(query.toLowerCase()) ||
          c.label.toLowerCase().includes(query.toLowerCase()),
      )
    : []

  const listBg = useColorModeValue('white', 'gray.700')
  const listBorder = useColorModeValue('gray.200', 'gray.600')
  const hoverBg = useColorModeValue('gray.50', 'gray.600')
  const codeColor = useColorModeValue('primary.600', 'primary.300')

  return (
    <Box position="relative" ref={ref}>
      <InputGroup size="sm">
        <InputLeftElement>
          <LuSearch size={14} color="var(--chakra-colors-gray-400)" />
        </InputLeftElement>
        <Input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setIsOpen(true)
          }}
          onFocus={() => query.length >= 2 && setIsOpen(true)}
          placeholder={placeholder}
          borderRadius="xl"
          fontSize="sm"
        />
      </InputGroup>
      {isOpen && filtered.length > 0 && (
        <List
          position="absolute"
          top="100%"
          left={0}
          right={0}
          zIndex={10}
          bg={listBg}
          border="1px solid"
          borderColor={listBorder}
          borderRadius="xl"
          shadow="lg"
          maxH="200px"
          overflowY="auto"
          mt={1}
          py={1}
        >
          {filtered.map((c) => (
            <ListItem
              key={c.code}
              px={3}
              py={2}
              cursor="pointer"
              _hover={{ bg: hoverBg }}
              onClick={() => {
                onSelect(c)
                setQuery('')
                setIsOpen(false)
              }}
            >
              <HStack spacing={2}>
                <Text fontSize="xs" fontWeight="bold" fontFamily="mono" color={codeColor}>
                  {c.code}
                </Text>
                <Text fontSize="xs">{c.label}</Text>
              </HStack>
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  )
}

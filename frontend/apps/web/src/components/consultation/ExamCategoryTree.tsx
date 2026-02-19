import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Checkbox,
  Text,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  VStack,
  Badge,
  useColorModeValue,
} from '@chakra-ui/react'
import { useState } from 'react'
import { LuSearch } from 'react-icons/lu'

interface ExamItem {
  id: string
  name: string
}

interface ExamCategory {
  id: string
  name: string
  exams: ExamItem[]
}

interface ExamCategoryTreeProps {
  categories: ExamCategory[]
  selectedIds: string[]
  onToggle: (examId: string, examName: string, categoryName: string) => void
  searchPlaceholder?: string
}

export default function ExamCategoryTree({ categories, selectedIds, onToggle, searchPlaceholder = 'Search exams...' }: ExamCategoryTreeProps) {
  const [search, setSearch] = useState('')
  const inputBg = useColorModeValue('gray.50', 'gray.800')

  const filtered = search.length >= 2
    ? categories
        .map((cat) => ({
          ...cat,
          exams: cat.exams.filter((e) => e.name.toLowerCase().includes(search.toLowerCase())),
        }))
        .filter((cat) => cat.exams.length > 0)
    : categories

  return (
    <VStack spacing={3} align="stretch">
      <InputGroup size="sm">
        <InputLeftElement>
          <LuSearch size={14} color="var(--chakra-colors-gray-400)" />
        </InputLeftElement>
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={searchPlaceholder}
          borderRadius="xl"
          bg={inputBg}
          fontSize="sm"
        />
      </InputGroup>

      <Accordion allowMultiple defaultIndex={[0]}>
        {filtered.map((cat) => {
          const selectedInCat = cat.exams.filter((e) => selectedIds.includes(e.id)).length
          return (
            <AccordionItem key={cat.id} border="none" mb={1}>
              <AccordionButton borderRadius="xl" _hover={{ bg: inputBg }} px={3} py={2}>
                <HStack flex={1} spacing={2}>
                  <Text fontSize="sm" fontWeight="semibold">{cat.name}</Text>
                  {selectedInCat > 0 && (
                    <Badge borderRadius="full" fontSize="10px" colorScheme="blue">
                      {selectedInCat}
                    </Badge>
                  )}
                </HStack>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel pb={2} px={3}>
                <VStack spacing={1} align="stretch">
                  {cat.exams.map((exam) => (
                    <Checkbox
                      key={exam.id}
                      size="sm"
                      isChecked={selectedIds.includes(exam.id)}
                      onChange={() => onToggle(exam.id, exam.name, cat.name)}
                      colorScheme="blue"
                      borderRadius="md"
                    >
                      <Text fontSize="xs">{exam.name}</Text>
                    </Checkbox>
                  ))}
                </VStack>
              </AccordionPanel>
            </AccordionItem>
          )
        })}
      </Accordion>
    </VStack>
  )
}

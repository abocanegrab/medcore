import { useState } from 'react'
import { Grid, GridItem } from '@chakra-ui/react'
import DiagnosisSidebar from './DiagnosisSidebar'
import ExamCategoryTree from './ExamCategoryTree'
import { labExamCatalog } from '../../data/catalogs'
import type { Diagnosis, LabExamOrder } from '../../data/mockPatients'

interface LabExamsTabProps {
  diagnoses: Diagnosis[]
  onToggleExam: (diagnosisId: string, examId: string, examName: string, categoryName: string) => void
}

export default function LabExamsTab({ diagnoses, onToggleExam }: LabExamsTabProps) {
  const [selectedDiagId, setSelectedDiagId] = useState(diagnoses[0]?.id || '')

  const selectedDiag = diagnoses.find((d) => d.id === selectedDiagId)
  const selectedExamIds = selectedDiag?.labExams.map((e) => e.examId) || []

  return (
    <Grid templateColumns={{ base: '1fr', lg: '3fr 9fr' }} gap={5}>
      <GridItem>
        <DiagnosisSidebar
          diagnoses={diagnoses}
          selectedId={selectedDiagId}
          onSelect={setSelectedDiagId}
          countFn={(d) => d.labExams.length}
          countLabel="Diagnosticos"
        />
      </GridItem>
      <GridItem>
        <ExamCategoryTree
          categories={labExamCatalog}
          selectedIds={selectedExamIds}
          onToggle={(examId, examName, categoryName) => {
            if (selectedDiagId) {
              onToggleExam(selectedDiagId, examId, examName, categoryName)
            }
          }}
          searchPlaceholder="Buscar examenes de laboratorio..."
        />
      </GridItem>
    </Grid>
  )
}

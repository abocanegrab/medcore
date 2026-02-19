import { useState } from 'react'
import { Grid, GridItem } from '@chakra-ui/react'
import DiagnosisSidebar from './DiagnosisSidebar'
import ExamCategoryTree from './ExamCategoryTree'
import { imagingExamCatalog } from '../../data/catalogs'
import type { Diagnosis } from '../../data/mockPatients'

interface ImagingExamsTabProps {
  diagnoses: Diagnosis[]
  onToggleExam: (diagnosisId: string, examId: string, examName: string, categoryName: string) => void
}

export default function ImagingExamsTab({ diagnoses, onToggleExam }: ImagingExamsTabProps) {
  const [selectedDiagId, setSelectedDiagId] = useState(diagnoses[0]?.id || '')

  const selectedDiag = diagnoses.find((d) => d.id === selectedDiagId)
  const selectedExamIds = selectedDiag?.imagingExams.map((e) => e.examId) || []

  return (
    <Grid templateColumns={{ base: '1fr', lg: '3fr 9fr' }} gap={5}>
      <GridItem>
        <DiagnosisSidebar
          diagnoses={diagnoses}
          selectedId={selectedDiagId}
          onSelect={setSelectedDiagId}
          countFn={(d) => d.imagingExams.length}
          countLabel="Diagnosticos"
        />
      </GridItem>
      <GridItem>
        <ExamCategoryTree
          categories={imagingExamCatalog}
          selectedIds={selectedExamIds}
          onToggle={(examId, examName, categoryName) => {
            if (selectedDiagId) {
              onToggleExam(selectedDiagId, examId, examName, categoryName)
            }
          }}
          searchPlaceholder="Buscar examenes de imagen..."
        />
      </GridItem>
    </Grid>
  )
}

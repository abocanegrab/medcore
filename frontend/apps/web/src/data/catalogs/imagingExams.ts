export interface ImagingExam {
  id: string
  name: string
}

export interface ImagingExamCategory {
  id: string
  name: string
  exams: ImagingExam[]
}

export const imagingExamCatalog: ImagingExamCategory[] = [
  {
    id: 'rx',
    name: 'Radiografia',
    exams: [
      { id: 'rx-01', name: 'Radiografia de torax PA' },
      { id: 'rx-02', name: 'Radiografia de columna lumbar' },
      { id: 'rx-03', name: 'Radiografia de rodilla AP y lateral' },
    ],
  },
  {
    id: 'eco',
    name: 'Ecografia',
    exams: [
      { id: 'eco-01', name: 'Ecografia abdominal completa' },
      { id: 'eco-02', name: 'Ecografia renal' },
      { id: 'eco-03', name: 'Ecografia pelvica' },
    ],
  },
  {
    id: 'tac',
    name: 'Tomografia',
    exams: [
      { id: 'tac-01', name: 'TAC cerebral simple' },
      { id: 'tac-02', name: 'TAC de torax' },
      { id: 'tac-03', name: 'TAC abdomino-pelvica' },
    ],
  },
  {
    id: 'rmn',
    name: 'Resonancia',
    exams: [
      { id: 'rmn-01', name: 'RMN cerebral' },
      { id: 'rmn-02', name: 'RMN de rodilla' },
      { id: 'rmn-03', name: 'RMN de columna lumbar' },
    ],
  },
  {
    id: 'endo',
    name: 'Endoscopia',
    exams: [
      { id: 'endo-01', name: 'Endoscopia digestiva alta' },
      { id: 'endo-02', name: 'Colonoscopia' },
      { id: 'endo-03', name: 'Broncoscopia' },
    ],
  },
]

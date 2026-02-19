export interface LabExam {
  id: string
  name: string
}

export interface LabExamCategory {
  id: string
  name: string
  exams: LabExam[]
}

export const labExamCatalog: LabExamCategory[] = [
  {
    id: 'hem',
    name: 'Hematologia',
    exams: [
      { id: 'hem-01', name: 'Hemograma completo' },
      { id: 'hem-02', name: 'Velocidad de sedimentacion (VSG)' },
      { id: 'hem-03', name: 'Tiempo de protrombina (TP)' },
    ],
  },
  {
    id: 'bio',
    name: 'Bioquimica',
    exams: [
      { id: 'bio-01', name: 'Glucosa en ayunas' },
      { id: 'bio-02', name: 'Perfil lipidico' },
      { id: 'bio-03', name: 'Creatinina serica' },
      { id: 'bio-04', name: 'Urea' },
    ],
  },
  {
    id: 'ori',
    name: 'Orina',
    exams: [
      { id: 'ori-01', name: 'Examen completo de orina' },
      { id: 'ori-02', name: 'Urocultivo' },
      { id: 'ori-03', name: 'Microalbuminuria' },
    ],
  },
  {
    id: 'inm',
    name: 'Inmunologia',
    exams: [
      { id: 'inm-01', name: 'Proteina C reactiva (PCR)' },
      { id: 'inm-02', name: 'Factor reumatoide' },
      { id: 'inm-03', name: 'TSH' },
    ],
  },
  {
    id: 'mic',
    name: 'Microbiologia',
    exams: [
      { id: 'mic-01', name: 'Hemocultivo' },
      { id: 'mic-02', name: 'Coprocultivo' },
      { id: 'mic-03', name: 'BK en esputo' },
    ],
  },
  {
    id: 'hep',
    name: 'Hepatico',
    exams: [
      { id: 'hep-01', name: 'TGO (AST)' },
      { id: 'hep-02', name: 'TGP (ALT)' },
      { id: 'hep-03', name: 'Bilirrubina total y fraccionada' },
    ],
  },
]

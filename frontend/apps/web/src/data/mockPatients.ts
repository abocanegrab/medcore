export type PatientStatus =
  | 'registered'
  | 'in_triage'
  | 'triaged'
  | 'in_consultation'
  | 'post_consultation'
  | 'completed'

export type NextStep = 'farmacia' | 'laboratorio' | 'salida'

export type PatientType = 'N' | 'C' | 'R'
export type DiagnosisType = 'definitivo' | 'presuntivo' | 'repetitivo'
export type IllnessDurationUnit = 'minutes' | 'hours' | 'days' | 'weeks'
export type MedicationRoute = 'oral' | 'IV' | 'IM' | 'topical' | 'sublingual' | 'inhalation'
export type AppointmentSource = 'web' | 'phone' | 'whatsapp' | 'callcenter'

export interface PatientVitals {
  weight: string
  height: string
  temperature: string
  bloodPressure: string
}

export interface LabExamOrder {
  id: string
  examId: string
  examName: string
  categoryName: string
}

export interface ImagingExamOrder {
  id: string
  examId: string
  examName: string
  categoryName: string
}

export interface MedicationOrder {
  id: string
  medicationName: string
  quantity: number
  days: number
  route: MedicationRoute
  indication: string
}

export interface Diagnosis {
  id: string
  cie10Code: string
  cie10Label: string
  type: DiagnosisType
  labExams: LabExamOrder[]
  imagingExams: ImagingExamOrder[]
  medications: MedicationOrder[]
}

export interface RestCertificate {
  days: number
  startDate: string
  reason: string
}

export interface Patient {
  id: string
  name: string
  initials: string
  age: number
  gender: string
  patientId: string
  phone: string
  status: PatientStatus
  priority: 'low' | 'medium' | 'high' | 'urgent'
  registeredAt: string
  vitals?: PatientVitals
  triageObservations?: string
  anamnesis?: string
  workPlan?: string
  prescription?: string
  nextStep?: NextStep
  medicalHistory: { label: string; color: 'red' | 'slate' | 'blue' | 'amber' }[]
  surgicalHistory: { label: string; color: 'red' | 'slate' | 'blue' | 'amber' }[]
  allergies: string
  patientTypeEstablishment?: PatientType
  patientTypeService?: PatientType
  illnessDuration?: { value: number; unit: IllnessDurationUnit }
  mainSymptom?: string
  clinicalExam?: string
  diagnoses?: Diagnosis[]
  treatmentObservations?: string
  nextControlDate?: string
  medicalNotes?: string
  restCertificate?: RestCertificate
  consultationSignedAt?: string
  appointmentId?: string
  appointmentTime?: string
  receiptId?: string
  accountNumber?: string
  serviceType?: string
}

export const initialPatients: Patient[] = [
  {
    id: 'p1',
    name: 'Ana Martinez',
    initials: 'AM',
    age: 45,
    gender: 'Female',
    patientId: '#MC-2024-0901',
    phone: '+1 (555) 111-2233',
    status: 'registered',
    priority: 'medium',
    registeredAt: '08:15 AM',
    appointmentTime: '08:30 AM',
    serviceType: 'Medicina General',
    medicalHistory: [{ label: 'Diabetes Type 2', color: 'red' }],
    surgicalHistory: [],
    allergies: 'Penicillin',
  },
  {
    id: 'p2',
    name: 'Jorge Ramirez',
    initials: 'JR',
    age: 62,
    gender: 'Male',
    patientId: '#MC-2024-0902',
    phone: '+1 (555) 222-3344',
    status: 'registered',
    priority: 'high',
    registeredAt: '08:30 AM',
    appointmentTime: '09:00 AM',
    serviceType: 'Cardiologia',
    medicalHistory: [
      { label: 'Hypertension', color: 'red' },
      { label: 'COPD', color: 'slate' },
    ],
    surgicalHistory: [{ label: 'Bypass 2019', color: 'amber' }],
    allergies: 'NIEGA RAM',
  },
  {
    id: 'p3',
    name: 'Lucia Fernandez',
    initials: 'LF',
    age: 28,
    gender: 'Female',
    patientId: '#MC-2024-0903',
    phone: '+1 (555) 333-4455',
    status: 'in_triage',
    priority: 'low',
    registeredAt: '07:45 AM',
    appointmentTime: '08:00 AM',
    serviceType: 'Medicina General',
    medicalHistory: [],
    surgicalHistory: [],
    allergies: 'NIEGA RAM',
  },
  {
    id: 'p4',
    name: 'Michael Ray',
    initials: 'MR',
    age: 35,
    gender: 'Male',
    patientId: '#MC-2024-0842',
    phone: '+1 (555) 012-3456',
    status: 'triaged',
    priority: 'medium',
    registeredAt: '07:30 AM',
    appointmentTime: '07:30 AM',
    serviceType: 'Medicina General',
    vitals: { weight: '78', height: '182', temperature: '36.5', bloodPressure: '120/80' },
    triageObservations: 'Patient complains of persistent chest pain radiating to the left arm. No fever. Vitals stable.',
    medicalHistory: [
      { label: 'Hypertension', color: 'red' },
      { label: 'IMA', color: 'slate' },
    ],
    surgicalHistory: [
      { label: 'Septoplastia', color: 'amber' },
      { label: 'Hemor.', color: 'amber' },
    ],
    allergies: 'NIEGA RAM',
  },
  {
    id: 'p5',
    name: 'Carmen Diaz',
    initials: 'CD',
    age: 50,
    gender: 'Female',
    patientId: '#MC-2024-0904',
    phone: '+1 (555) 444-5566',
    status: 'triaged',
    priority: 'high',
    registeredAt: '07:00 AM',
    appointmentTime: '07:00 AM',
    serviceType: 'Medicina Interna',
    vitals: { weight: '65', height: '160', temperature: '37.8', bloodPressure: '140/90' },
    triageObservations: 'Fever since yesterday evening. Headache and body aches. Elevated BP noted.',
    medicalHistory: [{ label: 'Migraine', color: 'blue' }],
    surgicalHistory: [],
    allergies: 'Sulfa drugs',
  },
  {
    id: 'p6',
    name: 'Roberto Vargas',
    initials: 'RV',
    age: 41,
    gender: 'Male',
    patientId: '#MC-2024-0905',
    phone: '+1 (555) 555-6677',
    status: 'in_consultation',
    priority: 'medium',
    registeredAt: '06:45 AM',
    appointmentTime: '07:00 AM',
    serviceType: 'Traumatologia',
    vitals: { weight: '90', height: '175', temperature: '36.7', bloodPressure: '130/85' },
    triageObservations: 'Recurring lower back pain. Patient reports pain level 6/10.',
    medicalHistory: [{ label: 'Lumbalgia', color: 'slate' }],
    surgicalHistory: [],
    allergies: 'NIEGA RAM',
  },
  {
    id: 'p7',
    name: 'Elena Suarez',
    initials: 'ES',
    age: 55,
    gender: 'Female',
    patientId: '#MC-2024-0906',
    phone: '+1 (555) 666-7788',
    status: 'post_consultation',
    priority: 'medium',
    registeredAt: '06:30 AM',
    appointmentTime: '06:30 AM',
    serviceType: 'Cardiologia',
    vitals: { weight: '70', height: '165', temperature: '36.4', bloodPressure: '125/82' },
    triageObservations: 'Routine follow-up. No acute complaints.',
    anamnesis: 'Follow-up for controlled hypertension. Patient reports good medication adherence.',
    workPlan: 'Continue current medication. Repeat labs in 3 months.',
    prescription: 'Losartan 50mg - 1 tablet daily\nAmlodipine 5mg - 1 tablet daily',
    nextStep: 'farmacia',
    diagnoses: [
      {
        id: 'd1',
        cie10Code: 'I10',
        cie10Label: 'Hipertension esencial (primaria)',
        type: 'definitivo',
        labExams: [
          { id: 'le1', examId: 'bio-01', examName: 'Glucosa en ayunas', categoryName: 'Bioquimica' },
          { id: 'le2', examId: 'bio-02', examName: 'Perfil lipidico', categoryName: 'Bioquimica' },
        ],
        imagingExams: [],
        medications: [
          { id: 'med1', medicationName: 'Losartan 50mg', quantity: 30, days: 30, route: 'oral', indication: '1 tableta cada 24 horas' },
          { id: 'med2', medicationName: 'Amlodipino 5mg', quantity: 30, days: 30, route: 'oral', indication: '1 tableta cada 24 horas' },
        ],
      },
    ],
    consultationSignedAt: '2024-09-01T10:30:00Z',
    medicalHistory: [{ label: 'Hypertension', color: 'red' }],
    surgicalHistory: [],
    allergies: 'NIEGA RAM',
  },
  {
    id: 'p8',
    name: 'Diego Morales',
    initials: 'DM',
    age: 38,
    gender: 'Male',
    patientId: '#MC-2024-0907',
    phone: '+1 (555) 777-8899',
    status: 'post_consultation',
    priority: 'low',
    registeredAt: '06:00 AM',
    appointmentTime: '06:00 AM',
    serviceType: 'Medicina General',
    vitals: { weight: '82', height: '178', temperature: '36.6', bloodPressure: '118/76' },
    triageObservations: 'Routine check. No issues found.',
    anamnesis: 'Annual physical exam. No complaints. All systems review unremarkable.',
    workPlan: 'Order CBC and lipid panel. Schedule follow-up in 12 months.',
    nextStep: 'laboratorio',
    diagnoses: [
      {
        id: 'd2',
        cie10Code: 'Z00.0',
        cie10Label: 'Examen medico general',
        type: 'definitivo',
        labExams: [
          { id: 'le3', examId: 'hem-01', examName: 'Hemograma completo', categoryName: 'Hematologia' },
          { id: 'le4', examId: 'bio-02', examName: 'Perfil lipidico', categoryName: 'Bioquimica' },
        ],
        imagingExams: [],
        medications: [],
      },
    ],
    medicalHistory: [],
    surgicalHistory: [],
    allergies: 'NIEGA RAM',
  },
]

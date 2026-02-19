import type { AppointmentSource } from './mockPatients'

export type AppointmentStatus = 'scheduled' | 'confirmed' | 'arrived' | 'in_progress' | 'completed' | 'cancelled'

export interface Appointment {
  id: string
  patientId: string
  patientName: string
  doctorId: string
  doctorName: string
  date: string
  timeSlot: string
  reason: string
  status: AppointmentStatus
  serviceType: string
  source: AppointmentSource
}

const today = new Date().toISOString().split('T')[0]

export const initialAppointments: Appointment[] = [
  {
    id: 'apt-001',
    patientId: 'p1',
    patientName: 'Ana Martinez',
    doctorId: 'doc-01',
    doctorName: 'Dr. Carlos Mendoza',
    date: today,
    timeSlot: '08:30',
    reason: 'Control de diabetes',
    status: 'arrived',
    serviceType: 'Medicina General',
    source: 'web',
  },
  {
    id: 'apt-002',
    patientId: 'p2',
    patientName: 'Jorge Ramirez',
    doctorId: 'doc-02',
    doctorName: 'Dra. Maria Lopez',
    date: today,
    timeSlot: '09:00',
    reason: 'Evaluacion cardiologica',
    status: 'arrived',
    serviceType: 'Cardiologia',
    source: 'phone',
  },
  {
    id: 'apt-003',
    patientId: '',
    patientName: 'Patricia Lopez',
    doctorId: 'doc-01',
    doctorName: 'Dr. Carlos Mendoza',
    date: today,
    timeSlot: '09:30',
    reason: 'Dolor de garganta persistente',
    status: 'scheduled',
    serviceType: 'Medicina General',
    source: 'whatsapp',
  },
  {
    id: 'apt-004',
    patientId: '',
    patientName: 'Fernando Ruiz',
    doctorId: 'doc-01',
    doctorName: 'Dr. Carlos Mendoza',
    date: today,
    timeSlot: '10:00',
    reason: 'Chequeo general anual',
    status: 'confirmed',
    serviceType: 'Medicina General',
    source: 'web',
  },
  {
    id: 'apt-005',
    patientId: '',
    patientName: 'Isabella Torres',
    doctorId: 'doc-02',
    doctorName: 'Dra. Maria Lopez',
    date: today,
    timeSlot: '10:00',
    reason: 'Dolor de cabeza recurrente',
    status: 'scheduled',
    serviceType: 'Medicina Interna',
    source: 'callcenter',
  },
  {
    id: 'apt-006',
    patientId: '',
    patientName: 'Mateo Herrera',
    doctorId: 'doc-01',
    doctorName: 'Dr. Carlos Mendoza',
    date: today,
    timeSlot: '10:30',
    reason: 'Dolor lumbar cronico',
    status: 'scheduled',
    serviceType: 'Medicina General',
    source: 'phone',
  },
  {
    id: 'apt-007',
    patientId: '',
    patientName: 'Valentina Cruz',
    doctorId: 'doc-02',
    doctorName: 'Dra. Maria Lopez',
    date: today,
    timeSlot: '11:00',
    reason: 'Infeccion urinaria',
    status: 'confirmed',
    serviceType: 'Medicina Interna',
    source: 'web',
  },
  {
    id: 'apt-008',
    patientId: '',
    patientName: 'Ricardo Gutierrez',
    doctorId: 'doc-01',
    doctorName: 'Dr. Carlos Mendoza',
    date: today,
    timeSlot: '11:30',
    reason: 'Gastritis',
    status: 'scheduled',
    serviceType: 'Medicina General',
    source: 'whatsapp',
  },
  {
    id: 'apt-009',
    patientId: '',
    patientName: 'Sofia Navarro',
    doctorId: 'doc-02',
    doctorName: 'Dra. Maria Lopez',
    date: today,
    timeSlot: '11:30',
    reason: 'Control de hipertension',
    status: 'cancelled',
    serviceType: 'Medicina Interna',
    source: 'phone',
  },
  {
    id: 'apt-010',
    patientId: '',
    patientName: 'Luis Paredes',
    doctorId: 'doc-01',
    doctorName: 'Dr. Carlos Mendoza',
    date: today,
    timeSlot: '14:00',
    reason: 'Tos persistente',
    status: 'scheduled',
    serviceType: 'Medicina General',
    source: 'callcenter',
  },
]

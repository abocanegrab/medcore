import { LuUsers, LuCalendarX, LuMonitor, LuThumbsUp, LuHeartPulse, LuFlaskConical, LuCalendar } from 'react-icons/lu'
import type { IconType } from 'react-icons'

export const stats = [
  {
    label: 'dashboard:doctor.stats.attritionRate',
    value: '4.2%',
    icon: LuUsers,
    trend: { value: '0.2%', direction: 'up' as const },
    target: { label: 'dashboard:doctor.stats.monthlyTarget', value: '5.0%', progress: 84 },
    borderColor: 'rgba(0,39,82,0.6)',
    progressColor: 'primary.500',
  },
  {
    label: 'dashboard:doctor.stats.missedAppointments',
    value: '8.5%',
    icon: LuCalendarX,
    trend: { value: '1.5%', direction: 'down' as const },
    target: { label: 'dashboard:doctor.stats.acceptableLimit', value: '10%', progress: 85 },
    borderColor: 'rgba(197,160,101,0.7)',
    progressColor: 'gold.500',
  },
  {
    label: 'dashboard:doctor.stats.digitalAdoption',
    value: '64.2%',
    icon: LuMonitor,
    trend: { value: '5.2%', direction: 'up' as const },
    target: { label: 'dashboard:doctor.stats.quarterlyTarget', value: '60%', progress: 100 },
    borderColor: '#002752',
    progressColor: 'primary.500',
  },
  {
    label: 'dashboard:doctor.stats.npsScore',
    value: '72',
    icon: LuThumbsUp,
    trend: { value: '1.1%', direction: 'up' as const },
    target: { label: 'dashboard:doctor.stats.industryAvg', value: '50', progress: 95 },
    borderColor: '#C5A065',
    progressColor: 'gold.500',
  },
]

export const nextAppointment = {
  id: '1',
  patientName: 'Michael Ray',
  patientInitials: 'MR',
  consultationType: 'dashboard:doctor.followUpConsultation',
  time: '10:30',
  lastVisit: '12/10/2023',
  condition: 'dashboard:doctor.conditions.hypertension',
}

export const todaySchedule = [
  {
    id: '1',
    time: '09:00',
    patientName: 'Sarah Jones',
    reason: 'dashboard:doctor.reasons.generalCheckup',
    status: 'confirmed' as const,
  },
  {
    id: '2',
    time: '11:15',
    patientName: 'Emma Watson',
    reason: 'dashboard:doctor.reasons.consultation',
    status: 'pending' as const,
  },
  {
    id: '3',
    time: '13:00',
    patientName: 'Robert Fox',
    reason: 'dashboard:doctor.reasons.cardiology',
    status: 'confirmed' as const,
  },
]

export const activityItems = [
  {
    id: '1',
    highlight: 'Enf. Joy',
    text: 'dashboard:doctor.activity.updatedVitals',
    time: 'dashboard:doctor.activity.10minsAgo',
    icon: LuHeartPulse,
  },
  {
    id: '2',
    text: 'dashboard:doctor.activity.labResultsReady',
    highlight: 'John Doe',
    time: 'dashboard:doctor.activity.45minsAgo',
    icon: LuFlaskConical,
    attachment: { name: 'hemograma.pdf' },
  },
  {
    id: '3',
    text: 'dashboard:doctor.activity.newBooking',
    highlight: 'Alice W.',
    time: 'dashboard:doctor.activity.2hoursAgo',
    icon: LuCalendar,
  },
]

export const triagePatient = {
  id: '1',
  name: 'Michael Ray',
  age: 35,
  gender: 'Male',
  patientId: '#MC-2024-0842',
  phone: '+1 (555) 012-3456',
}

export const patientConsultation = {
  id: '1',
  name: 'Michael Ray',
  initials: 'MR',
  age: 35,
  gender: 'Male',
  patientId: '#MC-2024-0842',
  vitals: {
    weight: '78',
    height: '182',
    temperature: '36.5',
    bloodPressure: '120/80',
  },
  anamnesis: '',
  workPlan: '',
  medicalHistory: [
    { label: 'Hypertension', color: 'red' as const },
    { label: 'IMA', color: 'slate' as const },
  ],
  newEntries: [
    { label: 'Type 2 Diabetes', color: 'blue' as const },
  ],
  surgicalHistory: [
    { label: 'Septoplastia', color: 'amber' as const },
    { label: 'Hemor.', color: 'amber' as const },
  ],
  allergies: 'NIEGA RAM',
}

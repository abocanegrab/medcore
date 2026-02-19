import { LuUsers, LuCalendarX, LuMonitor, LuThumbsUp, LuHeartPulse, LuFlaskConical, LuCalendar } from 'react-icons/lu'
import type { IconType } from 'react-icons'

export const stats = [
  {
    label: 'Attrition Rate',
    value: '4.2%',
    icon: LuUsers,
    trend: { value: '0.2%', direction: 'up' as const },
    target: { label: 'Monthly Target', value: '5.0%', progress: 84 },
    borderColor: 'rgba(0,39,82,0.6)',
    progressColor: 'primary.500',
  },
  {
    label: 'Missed Appointments',
    value: '8.5%',
    icon: LuCalendarX,
    trend: { value: '1.5%', direction: 'down' as const },
    target: { label: 'Acceptable Limit', value: '10%', progress: 85 },
    borderColor: 'rgba(197,160,101,0.7)',
    progressColor: 'gold.500',
  },
  {
    label: 'Digital Adoption',
    value: '64.2%',
    icon: LuMonitor,
    trend: { value: '5.2%', direction: 'up' as const },
    target: { label: 'Quarterly Target', value: '60%', progress: 100 },
    borderColor: '#002752',
    progressColor: 'primary.500',
  },
  {
    label: 'NPS Score',
    value: '72',
    icon: LuThumbsUp,
    trend: { value: '1.1%', direction: 'up' as const },
    target: { label: 'Industry Avg', value: '50', progress: 95 },
    borderColor: '#C5A065',
    progressColor: 'gold.500',
  },
]

export const nextAppointment = {
  id: '1',
  patientName: 'Michael Ray',
  patientInitials: 'MR',
  consultationType: 'Follow-up Consultation',
  time: '10:30 AM',
  lastVisit: 'Oct 12, 2023',
  condition: 'Hypertension',
}

export const todaySchedule = [
  {
    id: '1',
    time: '09:00 AM',
    patientName: 'Sarah Jones',
    reason: 'General Checkup',
    status: 'confirmed' as const,
  },
  {
    id: '2',
    time: '11:15 AM',
    patientName: 'Emma Watson',
    reason: 'Consultation',
    status: 'pending' as const,
  },
  {
    id: '3',
    time: '01:00 PM',
    patientName: 'Robert Fox',
    reason: 'Cardiology',
    status: 'confirmed' as const,
  },
]

export const activityItems = [
  {
    id: '1',
    highlight: 'Nurse Joy',
    text: 'updated vitals for Room 302.',
    time: '10 mins ago',
    icon: LuHeartPulse,
  },
  {
    id: '2',
    text: 'Lab results ready for',
    highlight: 'John Doe',
    time: '45 mins ago',
    icon: LuFlaskConical,
    attachment: { name: 'blood_work.pdf' },
  },
  {
    id: '3',
    text: 'New booking:',
    highlight: 'Alice W.',
    time: '2 hours ago',
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

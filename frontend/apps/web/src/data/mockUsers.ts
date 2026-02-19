import type { IconType } from 'react-icons'
import {
  LuClipboardList,
  LuClipboardPlus,
  LuStethoscope,
  LuPill,
} from 'react-icons/lu'

export type UserRole = 'recepcion' | 'triaje' | 'doctor' | 'farmacia'

export interface MockUser {
  id: string
  name: string
  initials: string
  role: UserRole
  roleLabel: string
  department: string
  icon: IconType
  color: string
}

export const mockUsers: MockUser[] = [
  {
    id: 'user-recepcion',
    name: 'Maria Gonzalez',
    initials: 'MG',
    role: 'recepcion',
    roleLabel: 'login:roleLabels.recepcion',
    department: 'dashboard:departments.admissions',
    icon: LuClipboardList,
    color: '#C5A065',
  },
  {
    id: 'user-triaje',
    name: 'Sofia Rodriguez',
    initials: 'SR',
    role: 'triaje',
    roleLabel: 'login:roleLabels.triaje',
    department: 'dashboard:departments.triageDept',
    icon: LuClipboardPlus,
    color: '#2D9CDB',
  },
  {
    id: 'user-doctor',
    name: 'Dr. Ricardo Mora',
    initials: 'DR',
    role: 'doctor',
    roleLabel: 'login:roleLabels.doctor',
    department: 'dashboard:departments.cardiology',
    icon: LuStethoscope,
    color: '#002752',
  },
  {
    id: 'user-farmacia',
    name: 'Carlos Mendez',
    initials: 'CM',
    role: 'farmacia',
    roleLabel: 'login:roleLabels.farmacia',
    department: 'dashboard:departments.pharmacy',
    icon: LuPill,
    color: '#27AE60',
  },
]

export function getUserById(id: string): MockUser | undefined {
  return mockUsers.find((u) => u.id === id)
}

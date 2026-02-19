import {
  LuLayoutDashboard,
  LuClipboardList,
  LuClipboardPlus,
  LuStethoscope,
  LuPill,
} from 'react-icons/lu'
import type { IconType } from 'react-icons'
import type { UserRole } from './mockUsers'

export interface SubOption {
  label: string
  path: string
}

export interface SidebarModule {
  id: string
  icon: IconType
  label: string
  path: string
  badge?: string
  subOptions?: SubOption[]
}

const allModules: SidebarModule[] = [
  {
    id: 'dashboard',
    icon: LuLayoutDashboard,
    label: 'nav:dashboard',
    path: '/dashboard',
  },
  {
    id: 'admision',
    icon: LuClipboardList,
    label: 'nav:admision',
    path: '/admision',
    subOptions: [
      { label: 'nav:subOptions.queue', path: '/admision' },
      { label: 'nav:subOptions.register', path: '/admision' },
    ],
  },
  {
    id: 'triaje',
    icon: LuClipboardPlus,
    label: 'nav:triaje',
    path: '/triaje',
    subOptions: [
      { label: 'nav:subOptions.incomingPatients', path: '/triaje' },
    ],
  },
  {
    id: 'consultas',
    icon: LuStethoscope,
    label: 'nav:consultas',
    path: '/consultation',
    subOptions: [
      { label: 'nav:subOptions.patientQueue', path: '/consultation' },
    ],
  },
  {
    id: 'farmacia',
    icon: LuPill,
    label: 'nav:farmacia',
    path: '/farmacia',
    subOptions: [
      { label: 'nav:subOptions.prescriptions', path: '/farmacia' },
    ],
  },
]

const roleModuleMap: Record<UserRole, string[]> = {
  recepcion: ['dashboard', 'admision'],
  triaje: ['dashboard', 'triaje'],
  doctor: ['dashboard', 'consultas'],
  farmacia: ['dashboard', 'farmacia'],
}

export function getModulesForRole(role: UserRole): SidebarModule[] {
  const allowedIds = roleModuleMap[role]
  return allModules.filter((m) => allowedIds.includes(m.id))
}

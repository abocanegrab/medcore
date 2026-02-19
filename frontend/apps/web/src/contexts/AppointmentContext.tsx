import { createContext, useContext, useState, useCallback } from 'react'
import type { ReactNode } from 'react'
import { initialAppointments } from '../data/mockAppointments'
import type { Appointment, AppointmentStatus } from '../data/mockAppointments'

interface AppointmentContextValue {
  appointments: Appointment[]
  getAppointmentsByDate: (date: string) => Appointment[]
  getAppointmentsByDoctor: (doctorId: string) => Appointment[]
  addAppointment: (appointment: Appointment) => void
  updateAppointment: (id: string, data: Partial<Appointment>) => void
  cancelAppointment: (id: string) => void
}

const AppointmentContext = createContext<AppointmentContextValue | null>(null)

export function AppointmentProvider({ children }: { children: ReactNode }) {
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments)

  const getAppointmentsByDate = useCallback(
    (date: string) => appointments.filter((a) => a.date === date),
    [appointments],
  )

  const getAppointmentsByDoctor = useCallback(
    (doctorId: string) => appointments.filter((a) => a.doctorId === doctorId),
    [appointments],
  )

  const addAppointment = useCallback((appointment: Appointment) => {
    setAppointments((prev) => [...prev, appointment])
  }, [])

  const updateAppointment = useCallback((id: string, data: Partial<Appointment>) => {
    setAppointments((prev) => prev.map((a) => (a.id === id ? { ...a, ...data } : a)))
  }, [])

  const cancelAppointment = useCallback((id: string) => {
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: 'cancelled' as AppointmentStatus } : a)),
    )
  }, [])

  return (
    <AppointmentContext.Provider
      value={{ appointments, getAppointmentsByDate, getAppointmentsByDoctor, addAppointment, updateAppointment, cancelAppointment }}
    >
      {children}
    </AppointmentContext.Provider>
  )
}

export function useAppointments(): AppointmentContextValue {
  const ctx = useContext(AppointmentContext)
  if (!ctx) throw new Error('useAppointments must be used within AppointmentProvider')
  return ctx
}

import { createContext, useContext, useState, useCallback } from 'react'
import type { ReactNode } from 'react'
import { initialPatients } from '../data/mockPatients'
import type { Patient, PatientStatus } from '../data/mockPatients'

interface PatientQueueContextValue {
  patients: Patient[]
  getPatientsByStatus: (...statuses: PatientStatus[]) => Patient[]
  getPatientById: (id: string) => Patient | undefined
  updatePatientStatus: (id: string, status: PatientStatus) => void
  updatePatientData: (id: string, data: Partial<Patient>) => void
  addPatient: (patient: Patient) => void
}

const PatientQueueContext = createContext<PatientQueueContextValue | null>(null)

export function PatientQueueProvider({ children }: { children: ReactNode }) {
  const [patients, setPatients] = useState<Patient[]>(initialPatients)

  const getPatientsByStatus = useCallback(
    (...statuses: PatientStatus[]) => patients.filter((p) => statuses.includes(p.status)),
    [patients],
  )

  const getPatientById = useCallback(
    (id: string) => patients.find((p) => p.id === id),
    [patients],
  )

  const updatePatientStatus = useCallback((id: string, status: PatientStatus) => {
    setPatients((prev) => prev.map((p) => (p.id === id ? { ...p, status } : p)))
  }, [])

  const updatePatientData = useCallback((id: string, data: Partial<Patient>) => {
    setPatients((prev) => prev.map((p) => (p.id === id ? { ...p, ...data } : p)))
  }, [])

  const addPatient = useCallback((patient: Patient) => {
    setPatients((prev) => [...prev, patient])
  }, [])

  return (
    <PatientQueueContext.Provider
      value={{ patients, getPatientsByStatus, getPatientById, updatePatientStatus, updatePatientData, addPatient }}
    >
      {children}
    </PatientQueueContext.Provider>
  )
}

export function usePatientQueue(): PatientQueueContextValue {
  const ctx = useContext(PatientQueueContext)
  if (!ctx) throw new Error('usePatientQueue must be used within PatientQueueProvider')
  return ctx
}

import type { Diagnosis } from '../data/mockPatients'

export interface LabOrder {
  diagnosisCode: string
  diagnosisLabel: string
  exams: { examName: string; categoryName: string }[]
}

export interface ImagingOrder {
  diagnosisCode: string
  diagnosisLabel: string
  exams: { examName: string; categoryName: string }[]
}

export interface PharmacyOrder {
  diagnosisCode: string
  diagnosisLabel: string
  medications: {
    name: string
    quantity: number
    days: number
    route: string
    indication: string
  }[]
}

export function generateOrders(diagnoses: Diagnosis[]) {
  const labOrders: LabOrder[] = []
  const imagingOrders: ImagingOrder[] = []
  const pharmacyOrders: PharmacyOrder[] = []

  for (const d of diagnoses) {
    if (d.labExams.length > 0) {
      labOrders.push({
        diagnosisCode: d.cie10Code,
        diagnosisLabel: d.cie10Label,
        exams: d.labExams.map((e) => ({ examName: e.examName, categoryName: e.categoryName })),
      })
    }
    if (d.imagingExams.length > 0) {
      imagingOrders.push({
        diagnosisCode: d.cie10Code,
        diagnosisLabel: d.cie10Label,
        exams: d.imagingExams.map((e) => ({ examName: e.examName, categoryName: e.categoryName })),
      })
    }
    if (d.medications.length > 0) {
      pharmacyOrders.push({
        diagnosisCode: d.cie10Code,
        diagnosisLabel: d.cie10Label,
        medications: d.medications.map((m) => ({
          name: m.medicationName,
          quantity: m.quantity,
          days: m.days,
          route: m.route,
          indication: m.indication,
        })),
      })
    }
  }

  return { labOrders, imagingOrders, pharmacyOrders }
}

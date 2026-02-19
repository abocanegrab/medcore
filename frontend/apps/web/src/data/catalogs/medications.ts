import type { MedicationRoute } from '../mockPatients'

export interface Medication {
  id: string
  name: string
  presentation: string
  defaultRoute: MedicationRoute
}

export const medicationCatalog: Medication[] = [
  { id: 'med-01', name: 'Amoxicilina 500mg', presentation: 'Capsula', defaultRoute: 'oral' },
  { id: 'med-02', name: 'Ibuprofeno 400mg', presentation: 'Tableta', defaultRoute: 'oral' },
  { id: 'med-03', name: 'Omeprazol 20mg', presentation: 'Capsula', defaultRoute: 'oral' },
  { id: 'med-04', name: 'Paracetamol 500mg', presentation: 'Tableta', defaultRoute: 'oral' },
  { id: 'med-05', name: 'Metformina 850mg', presentation: 'Tableta', defaultRoute: 'oral' },
  { id: 'med-06', name: 'Losartan 50mg', presentation: 'Tableta', defaultRoute: 'oral' },
  { id: 'med-07', name: 'Amlodipino 5mg', presentation: 'Tableta', defaultRoute: 'oral' },
  { id: 'med-08', name: 'Ciprofloxacino 500mg', presentation: 'Tableta', defaultRoute: 'oral' },
  { id: 'med-09', name: 'Dexametasona 4mg', presentation: 'Ampolla', defaultRoute: 'IM' },
  { id: 'med-10', name: 'Ranitidina 150mg', presentation: 'Tableta', defaultRoute: 'oral' },
  { id: 'med-11', name: 'Diclofenaco 75mg', presentation: 'Ampolla', defaultRoute: 'IM' },
  { id: 'med-12', name: 'Salbutamol 100mcg', presentation: 'Inhalador', defaultRoute: 'inhalation' },
  { id: 'med-13', name: 'Ceftriaxona 1g', presentation: 'Ampolla', defaultRoute: 'IV' },
  { id: 'med-14', name: 'Clotrimazol 1%', presentation: 'Crema', defaultRoute: 'topical' },
  { id: 'med-15', name: 'Metoclopramida 10mg', presentation: 'Tableta', defaultRoute: 'oral' },
]

export interface CIE10Code {
  code: string
  label: string
}

export const cie10Catalog: CIE10Code[] = [
  { code: 'J06.9', label: 'Infeccion aguda de las vias respiratorias superiores' },
  { code: 'I10', label: 'Hipertension esencial (primaria)' },
  { code: 'E11.9', label: 'Diabetes mellitus tipo 2 sin complicaciones' },
  { code: 'M54.5', label: 'Lumbago no especificado' },
  { code: 'K29.7', label: 'Gastritis no especificada' },
  { code: 'N39.0', label: 'Infeccion de vias urinarias, sitio no especificado' },
  { code: 'J18.9', label: 'Neumonia no especificada' },
  { code: 'R51', label: 'Cefalea' },
  { code: 'B34.9', label: 'Infeccion viral no especificada' },
  { code: 'A09', label: 'Diarrea y gastroenteritis de presunto origen infeccioso' },
  { code: 'Z00.0', label: 'Examen medico general' },
  { code: 'J02.9', label: 'Faringitis aguda no especificada' },
]

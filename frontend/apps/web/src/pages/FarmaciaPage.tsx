import { LuPill } from 'react-icons/lu'
import PlaceholderPage from './PlaceholderPage'

export default function FarmaciaPage() {
  return (
    <PlaceholderPage
      title="Farmacia"
      description="Pharmacy and prescription management"
      icon={LuPill}
      breadcrumbItems={[{ label: 'MedCore' }, { label: 'Farmacia' }]}
      features={[
        'Electronic prescriptions',
        'Drug inventory tracking',
        'Drug interaction alerts',
        'Dispensing workflow',
        'Controlled substance logs',
      ]}
    />
  )
}

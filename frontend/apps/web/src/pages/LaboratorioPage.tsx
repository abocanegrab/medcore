import { LuFlaskConical } from 'react-icons/lu'
import PlaceholderPage from './PlaceholderPage'

export default function LaboratorioPage() {
  return (
    <PlaceholderPage
      title="Laboratorio"
      description="Laboratory orders and results management"
      icon={LuFlaskConical}
      breadcrumbItems={[{ label: 'MedCore' }, { label: 'Laboratorio' }]}
      features={[
        'Lab order creation',
        'Sample tracking',
        'Results entry and validation',
        'Critical value alerts',
        'Integration with lab equipment',
      ]}
    />
  )
}

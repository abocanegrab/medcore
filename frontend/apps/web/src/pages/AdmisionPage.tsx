import { LuClipboardList } from 'react-icons/lu'
import PlaceholderPage from './PlaceholderPage'

export default function AdmisionPage() {
  return (
    <PlaceholderPage
      title="Admision"
      description="Patient admission and queue management"
      icon={LuClipboardList}
      breadcrumbItems={[{ label: 'MedCore' }, { label: 'Admision' }]}
      features={[
        'Patient registration queue',
        'Triage classification',
        'Bed assignment management',
        'Insurance verification',
        'Emergency admissions workflow',
      ]}
    />
  )
}

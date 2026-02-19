import { LuScanLine } from 'react-icons/lu'
import PlaceholderPage from './PlaceholderPage'

export default function ImagenesPage() {
  return (
    <PlaceholderPage
      title="Imagenes"
      description="Medical imaging requests and gallery"
      icon={LuScanLine}
      breadcrumbItems={[{ label: 'MedCore' }, { label: 'Imagenes' }]}
      features={[
        'Imaging study requests',
        'DICOM viewer integration',
        'Image gallery and archive',
        'Radiology report linking',
        'Study comparison tools',
      ]}
    />
  )
}

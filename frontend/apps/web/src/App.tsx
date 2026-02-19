import { Routes, Route, Navigate } from 'react-router-dom'
import { AppShell } from '@medcore/ui'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import ConsultationPage from './pages/ConsultationPage'
import TriajePage from './pages/TriajePage'
import AdmisionPage from './pages/AdmisionPage'
import FarmaciaPage from './pages/FarmaciaPage'
import LaboratorioPage from './pages/LaboratorioPage'
import ImagenesPage from './pages/ImagenesPage'

export default function App() {
  return (
    <Routes>
      <Route path="login" element={<LoginPage />} />
      <Route element={<AppShell />}>
        <Route index element={<Navigate to="/login" replace />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="consultation/:id" element={<ConsultationPage />} />
        <Route path="triaje/:id" element={<TriajePage />} />
        <Route path="triaje" element={<TriajePage />} />
        <Route path="admision" element={<AdmisionPage />} />
        <Route path="farmacia" element={<FarmaciaPage />} />
        <Route path="laboratorio" element={<LaboratorioPage />} />
        <Route path="imagenes" element={<ImagenesPage />} />
      </Route>
    </Routes>
  )
}

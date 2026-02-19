import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AppShell } from '@medcore/ui'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { PatientQueueProvider } from './contexts/PatientQueueContext'
import { getModulesForRole } from './data/roleModules'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import ConsultationPage from './pages/ConsultationPage'
import TriajePage from './pages/TriajePage'
import TriajeQueuePage from './pages/TriajeQueuePage'
import DoctorQueuePage from './pages/DoctorQueuePage'
import AdmisionPage from './pages/AdmisionPage'
import FarmaciaPage from './pages/FarmaciaPage'

function RequireAuth({ children }: { children: React.ReactNode }) {
  const { currentUser } = useAuth()
  const location = useLocation()

  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return <>{children}</>
}

function AuthenticatedShell() {
  const { currentUser, logout } = useAuth()

  const modules = currentUser ? getModulesForRole(currentUser.role) : []
  const userInfo = currentUser
    ? { name: currentUser.name, initials: currentUser.initials, department: currentUser.department }
    : undefined

  return (
    <AppShell modules={modules} currentUser={userInfo} onLogout={logout} />
  )
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="login" element={<LoginPage />} />
      <Route
        element={
          <RequireAuth>
            <AuthenticatedShell />
          </RequireAuth>
        }
      >
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="admision" element={<AdmisionPage />} />
        <Route path="triaje" element={<TriajeQueuePage />} />
        <Route path="triaje/:id" element={<TriajePage />} />
        <Route path="consultation" element={<DoctorQueuePage />} />
        <Route path="consultation/:id" element={<ConsultationPage />} />
        <Route path="farmacia" element={<FarmaciaPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <PatientQueueProvider>
        <AppRoutes />
      </PatientQueueProvider>
    </AuthProvider>
  )
}

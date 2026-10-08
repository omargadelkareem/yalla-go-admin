import { useMemo, useState } from 'react'
import { Bell, LogOut, Search } from 'lucide-react'
import Sidebar from './components/layout/Sidebar'
import DashboardPage from './pages/DashboardPage'
import LoginPage from './pages/LoginPage'
import UsersPage from './pages/UsersPage'
import CaptainsPage from './pages/CaptainsPage'
import CaptainDetailsPage from './pages/CaptainDetailsPage'
import WalletsPage from './pages/WalletsPage'
import { useAdminAuth } from './hooks/useAdminAuth'
import { useDashboardData } from './hooks/useDashboardData'
import { useOperationsData } from './hooks/useOperationsData'
import { buildDashboardMetrics } from './utils/dashboardMetrics'
import './App.css'

function AdminDashboard({ logout }) {
  const { captains, rides, loading } = useDashboardData()
  const ops = useOperationsData()
  const [page, setPage] = useState('dashboard')
  const [selectedCaptain, setSelectedCaptain] = useState(null)
  const metrics = useMemo(() => buildDashboardMetrics(captains, rides), [captains, rides])
  return <div className="shell" dir="rtl">
    <Sidebar captainCount={ops.captains.length} pendingCount={metrics.pending} page={page} onNavigate={(next) => { setSelectedCaptain(null); setPage(next) }}/>
    <main className="workspace"><header className="topbar"><div className="page-heading"><span className="eyebrow">YALLA GO • SOHAG</span><h1>لوحة تحكم Yalla Go</h1><p>كل أرقام التشغيل المهمة في مكان واحد، لحظة بلحظة.</p></div><div className="top-actions"><button className="icon-button"><Search size={18}/></button><button className="icon-button"><Bell size={18}/></button><div className="live"><i/> مباشر الآن</div><button className="icon-button logout-button" onClick={logout} title="تسجيل الخروج"><LogOut size={18}/></button></div></header>{page === 'users' ? <UsersPage users={ops.users}/> : page === 'captains' ? <CaptainsPage captains={ops.captains} onOpen={(captain) => { setSelectedCaptain(captain); setPage('captain-details') }}/> : page === 'pending' ? <CaptainsPage captains={ops.captains} pendingOnly onOpen={(captain) => { setSelectedCaptain(captain); setPage('captain-details') }}/> : page === 'wallets' ? <WalletsPage topups={ops.topups}/> : page === 'captain-details' ? <CaptainDetailsPage captain={selectedCaptain} documents={ops.documents} onBack={() => setPage('captains')}/> : <DashboardPage captains={captains} rides={rides} metrics={metrics} loading={loading}/>}</main>
  </div>
}

export default function App() {
  const { admin, checking, error, login, logout } = useAdminAuth()
  if (checking) return <div className="auth-loading">YALLA GO</div>
  if (!admin) return <LoginPage login={login} error={error}/>
  return <AdminDashboard logout={logout}/>
}

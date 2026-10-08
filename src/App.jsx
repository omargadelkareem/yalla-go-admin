import { useMemo } from 'react'
import { Bell, LogOut, Search } from 'lucide-react'
import Sidebar from './components/layout/Sidebar'
import DashboardPage from './pages/DashboardPage'
import LoginPage from './pages/LoginPage'
import { useAdminAuth } from './hooks/useAdminAuth'
import { useDashboardData } from './hooks/useDashboardData'
import { buildDashboardMetrics } from './utils/dashboardMetrics'
import './App.css'

function AdminDashboard({ logout }) {
  const { captains, rides, loading } = useDashboardData()
  const metrics = useMemo(() => buildDashboardMetrics(captains, rides), [captains, rides])
  return <div className="shell" dir="rtl">
    <Sidebar captainCount={captains.length} pendingCount={metrics.pending}/>
    <main className="workspace"><header className="topbar"><div className="page-heading"><span className="eyebrow">YALLA GO • SOHAG</span><h1>لوحة تحكم Yalla Go</h1><p>كل أرقام التشغيل المهمة في مكان واحد، لحظة بلحظة.</p></div><div className="top-actions"><button className="icon-button"><Search size={18}/></button><button className="icon-button"><Bell size={18}/></button><div className="live"><i/> مباشر الآن</div><button className="icon-button logout-button" onClick={logout} title="تسجيل الخروج"><LogOut size={18}/></button></div></header><DashboardPage captains={captains} rides={rides} metrics={metrics} loading={loading}/></main>
  </div>
}

export default function App() {
  const { admin, checking, error, login, logout } = useAdminAuth()
  if (checking) return <div className="auth-loading">YALLA GO</div>
  if (!admin) return <LoginPage login={login} error={error}/>
  return <AdminDashboard logout={logout}/>
}

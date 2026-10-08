import { useMemo } from 'react'
import Sidebar from './components/layout/Sidebar'
import DashboardPage from './pages/DashboardPage'
import { useDashboardData } from './hooks/useDashboardData'
import { buildDashboardMetrics } from './utils/dashboardMetrics'
import './App.css'

export default function App() {
  const { captains, rides, loading } = useDashboardData()
  const metrics = useMemo(() => buildDashboardMetrics(captains, rides), [captains, rides])
  return <div className="shell" dir="rtl">
    <Sidebar captainCount={captains.length} pendingCount={metrics.pending}/>
    <main>
      <header><div><p>نظرة شاملة على تشغيل Yalla Go في سوهاج</p><h1>لوحة التحكم</h1></div><div className="live"><i/> بيانات مباشرة</div></header>
      <DashboardPage captains={captains} rides={rides} metrics={metrics} loading={loading}/>
    </main>
  </div>
}

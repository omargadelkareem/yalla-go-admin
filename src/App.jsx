import { useMemo } from 'react'
import { Bell, Search } from 'lucide-react'
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
    <main className="workspace">
      <header className="topbar">
        <div className="page-heading"><span className="eyebrow">YALLA GO • SOHAG</span><h1>لوحة تحكم Yalla Go</h1><p>كل أرقام التشغيل المهمة في مكان واحد، لحظة بلحظة.</p></div>
        <div className="top-actions"><button className="icon-button"><Search size={18}/></button><button className="icon-button notification"><Bell size={18}/>{metrics.pending>0&&<i/>}</button><div className="live"><i/> مباشر الآن</div></div>
      </header>
      <DashboardPage captains={captains} rides={rides} metrics={metrics} loading={loading}/>
    </main>
  </div>
}

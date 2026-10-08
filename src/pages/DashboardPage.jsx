import { Activity, CalendarDays, Clock3, Gauge, TrendingUp, UserCheck, Users } from 'lucide-react'
import StatCard from '../components/dashboard/StatCard'
import PeriodCard from '../components/dashboard/PeriodCard'
import RideSummary from '../components/dashboard/RideSummary'
import FleetSummary from '../components/dashboard/FleetSummary'
const number = new Intl.NumberFormat('ar-EG')

export default function DashboardPage({ captains, rides, metrics, loading }) {
  if (loading) return <div className="loading">جاري تحميل بيانات Yalla Go...</div>
  return <>
    <section className="stats">
      <StatCard icon={Users} label="إجمالي الكباتن" value={number.format(captains.length)} hint="كل الحسابات المسجلة"/>
      <StatCard icon={UserCheck} label="الكباتن النشطين" value={number.format(metrics.active)} hint="معتمد ومتصل الآن" tone="green"/>
      <StatCard icon={Activity} label="غير النشطين" value={number.format(metrics.offline)} hint="معتمد وغير متصل"/>
      <StatCard icon={Clock3} label="في الانتظار" value={number.format(metrics.pending)} hint="بانتظار مراجعة الإدارة" tone="orange"/>
    </section>
    <section className="periods">
      <PeriodCard title="رحلات اليوم" rides={metrics.day.count} value={metrics.day.value} icon={CalendarDays}/>
      <PeriodCard title="هذا الأسبوع" rides={metrics.week.count} value={metrics.week.value} icon={TrendingUp}/>
      <PeriodCard title="هذا الشهر" rides={metrics.month.count} value={metrics.month.value} icon={Gauge}/>
    </section>
    <section className="grid"><RideSummary ridesCount={rides.length} metrics={metrics}/><FleetSummary metrics={metrics}/></section>
  </>
}

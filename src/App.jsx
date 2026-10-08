import { useEffect, useMemo, useState } from 'react'
import { onValue, ref } from 'firebase/database'
import { Activity, Bike, CalendarDays, Car, Clock3, Gauge, LayoutDashboard, Route, Settings, TrendingUp, UserCheck, Users, WalletCards } from 'lucide-react'
import { db } from './firebase'
import './App.css'

const money = new Intl.NumberFormat('ar-EG', { maximumFractionDigits: 0 })
const number = new Intl.NumberFormat('ar-EG')
const startOfDay = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime()
const startOfWeek = (d) => { const x = new Date(d); x.setDate(x.getDate() - ((x.getDay()+6)%7)); return startOfDay(x) }
const startOfMonth = (d) => new Date(d.getFullYear(), d.getMonth(), 1).getTime()
const rideTime = (r) => Number(r.completedAt || r.startedAt || r.createdAt || 0)
const rideFare = (r) => Number(r.finalFare ?? r.acceptedPrice ?? r.indicativePrice ?? 0)

function Stat({ icon:Icon, label, value, hint, tone='' }) {
  return <article className={'stat '+tone}><div className="stat-icon"><Icon size={21}/></div><div><span>{label}</span><strong>{value}</strong><small>{hint}</small></div></article>
}
function Period({title, rides, value, icon:Icon}) {
  return <article className="period"><div className="period-head"><div><span>{title}</span><strong>{number.format(rides)} رحلة</strong></div><div className="round"><Icon size={19}/></div></div><div className="period-value">{money.format(value)} <small>ج.م</small></div><div className="bar"><i style={{width: rides ? '72%' : '5%'}}/></div><small>إجمالي قيمة الرحلات المكتملة</small></article>
}

export default function App() {
  const [captains,setCaptains]=useState([])
  const [rides,setRides]=useState([])
  const [loading,setLoading]=useState(true)

  useEffect(()=>{
    let a=false,b=false
    const done=()=>{ if(a&&b) setLoading(false) }
    const off1=onValue(ref(db,'captains'),s=>{setCaptains(Object.entries(s.val()||{}).map(([id,v])=>({id,...v})));a=true;done()})
    const off2=onValue(ref(db,'rideRequests'),s=>{setRides(Object.entries(s.val()||{}).map(([id,v])=>({id,...v})));b=true;done()})
    return ()=>{off1();off2()}
  },[])

  const m=useMemo(()=>{
    const now=new Date(), day=startOfDay(now), week=startOfWeek(now), month=startOfMonth(now)
    const completed=rides.filter(r=>r.status==='completed')
    const group=(from)=>{const x=completed.filter(r=>rideTime(r)>=from);return {count:x.length,value:x.reduce((s,r)=>s+rideFare(r),0)}}
    const active=captains.filter(c=>c.status==='approved'&&c.isOnline)
    const pending=captains.filter(c=>c.status==='pending')
    const approved=captains.filter(c=>c.status==='approved')
    const offline=approved.filter(c=>!c.isOnline)
    const cars=captains.filter(c=>c.vehicleType==='car').length
    const bikes=captains.filter(c=>c.vehicleType==='motorcycle').length
    return {active:active.length,pending:pending.length,offline:offline.length,cars,bikes,day:group(day),week:group(week),month:group(month),
      completed:completed.length,cancelled:rides.filter(r=>r.status==='cancelled').length,searching:rides.filter(r=>r.status==='searching').length,
      totalValue:completed.reduce((s,r)=>s+rideFare(r),0)}
  },[captains,rides])

  return <div className="shell" dir="rtl">
    <aside>
      <div className="brand"><div className="mark">Y</div><div><b>Yalla Go</b><span>لوحة الإدارة</span></div></div>
      <nav>
        <a className="selected"><LayoutDashboard/> الرئيسية</a><a><Users/> الكباتن <em>{captains.length}</em></a>
        <a><Clock3/> طلبات الانتظار <em>{m.pending}</em></a><a><Route/> الرحلات</a><a><WalletCards/> المحافظ والشحن</a><a><Settings/> الإعدادات</a>
      </nav>
      <div className="admin"><div className="avatar">A</div><div><b>Yalla Go Admin</b><span>مدير النظام</span></div></div>
    </aside>
    <main>
      <header><div><p>نظرة شاملة على تشغيل Yalla Go في سوهاج</p><h1>لوحة التحكم</h1></div><div className="live"><i/> بيانات مباشرة</div></header>
      {loading ? <div className="loading">جاري تحميل بيانات Yalla Go...</div> : <>
        <section className="stats">
          <Stat icon={Users} label="إجمالي الكباتن" value={number.format(captains.length)} hint="كل الحسابات المسجلة"/>
          <Stat icon={UserCheck} label="الكباتن النشطين" value={number.format(m.active)} hint="معتمد ومتصل الآن" tone="green"/>
          <Stat icon={Activity} label="غير النشطين" value={number.format(m.offline)} hint="معتمد وغير متصل"/>
          <Stat icon={Clock3} label="في الانتظار" value={number.format(m.pending)} hint="بانتظار مراجعة الإدارة" tone="orange"/>
        </section>
        <section className="periods">
          <Period title="رحلات اليوم" rides={m.day.count} value={m.day.value} icon={CalendarDays}/>
          <Period title="هذا الأسبوع" rides={m.week.count} value={m.week.value} icon={TrendingUp}/>
          <Period title="هذا الشهر" rides={m.month.count} value={m.month.value} icon={Gauge}/>
        </section>
        <section className="grid">
          <article className="panel">
            <div className="panel-title"><div><span>أداء الرحلات</span><h2>ملخص التشغيل</h2></div><Route/></div>
            <div className="rows">
              <div><span>إجمالي الرحلات المسجلة</span><b>{number.format(rides.length)}</b></div>
              <div><span>الرحلات المكتملة</span><b>{number.format(m.completed)}</b></div>
              <div><span>جاري البحث عن كابتن</span><b>{number.format(m.searching)}</b></div>
              <div><span>الرحلات الملغاة</span><b>{number.format(m.cancelled)}</b></div>
              <div className="total"><span>إجمالي قيمة الرحلات المكتملة</span><b>{money.format(m.totalValue)} ج.م</b></div>
            </div>
          </article>
          <article className="panel">
            <div className="panel-title"><div><span>توزيع الأسطول</span><h2>المركبات والكباتن</h2></div><Car/></div>
            <div className="vehicles"><div><Car/><strong>{number.format(m.cars)}</strong><span>عربية</span></div><div><Bike/><strong>{number.format(m.bikes)}</strong><span>موتوسيكل</span></div></div>
            <div className="approval"><span>نسبة الحسابات المعتمدة</span><b>{captains.length ? Math.round(((captains.length-m.pending)/captains.length)*100) : 0}%</b></div>
          </article>
        </section>
      </>}
    </main>
  </div>
}

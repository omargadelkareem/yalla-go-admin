import { Route } from 'lucide-react'
const money = new Intl.NumberFormat('ar-EG', { maximumFractionDigits: 0 })
const number = new Intl.NumberFormat('ar-EG')
export default function RideSummary({ ridesCount, metrics }) {
  return <article className="panel"><div className="panel-title"><div><span>أداء الرحلات</span><h2>ملخص التشغيل</h2></div><Route/></div><div className="rows">
    <div><span>إجمالي الرحلات المسجلة</span><b>{number.format(ridesCount)}</b></div>
    <div><span>الرحلات المكتملة</span><b>{number.format(metrics.completed)}</b></div>
    <div><span>جاري البحث عن كابتن</span><b>{number.format(metrics.searching)}</b></div>
    <div><span>الرحلات الملغاة</span><b>{number.format(metrics.cancelled)}</b></div>
    <div className="total"><span>إجمالي قيمة الرحلات المكتملة</span><b>{money.format(metrics.totalValue)} ج.م</b></div>
  </div></article>
}

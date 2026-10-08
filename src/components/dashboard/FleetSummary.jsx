import { Bike, Car } from 'lucide-react'
const number = new Intl.NumberFormat('ar-EG')
export default function FleetSummary({ metrics }) {
  return <article className="panel"><div className="panel-title"><div><span>توزيع الأسطول</span><h2>المركبات والكباتن</h2></div><Car/></div>
    <div className="vehicles"><div><Car/><strong>{number.format(metrics.cars)}</strong><span>عربية</span></div><div><Bike/><strong>{number.format(metrics.bikes)}</strong><span>موتوسيكل</span></div></div>
    <div className="approval"><span>نسبة الحسابات المعتمدة</span><b>{metrics.approvalRate}%</b></div>
  </article>
}

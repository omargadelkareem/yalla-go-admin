const money = new Intl.NumberFormat('ar-EG', { maximumFractionDigits: 0 })
const number = new Intl.NumberFormat('ar-EG')

export default function PeriodCard({ title, rides, value, icon: Icon }) {
  return <article className="period"><div className="period-head"><div><span>{title}</span><strong>{number.format(rides)} رحلة</strong></div><div className="round"><Icon size={19}/></div></div><div className="period-value">{money.format(value)} <small>ج.م</small></div><div className="bar"><i style={{width: rides ? '72%' : '5%'}}/></div><small>إجمالي قيمة الرحلات المكتملة</small></article>
}

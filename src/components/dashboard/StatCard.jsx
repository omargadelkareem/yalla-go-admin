export default function StatCard({ icon: Icon, label, value, hint, tone = '' }) {
  return <article className={'stat ' + tone}><div className="stat-icon"><Icon size={21}/></div><div><span>{label}</span><strong>{value}</strong><small>{hint}</small></div></article>
}

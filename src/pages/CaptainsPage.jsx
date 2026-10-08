export default function CaptainsPage({ captains, onOpen, pendingOnly = false }) {
  const list = pendingOnly ? captains.filter((c) => (c.status || 'pending') === 'pending') : captains
  return <section className="ops-page">
    <div className="section-head"><div><h2>{pendingOnly ? 'طلبات الكباتن' : 'الكباتن'}</h2><p>{pendingOnly ? 'طلبات التسجيل التي تحتاج مراجعة' : 'كل الكباتن المسجلين'}</p></div><span className="section-chip">{list.length} كابتن</span></div>
    <div className="data-table"><table><thead><tr><th>الكابتن</th><th>الهاتف</th><th>المركبة</th><th>الحالة</th><th></th></tr></thead>
    <tbody>{list.map((c)=><tr key={c.id}><td><b>{c.name || '—'}</b></td><td>{c.phone || '—'}</td><td>{c.vehicleType === 'car' ? 'سيارة' : 'موتوسيكل'} • {c.vehicleModel || '—'}</td><td><span className={'status-pill ' + (c.status || 'pending')}>{c.status || 'pending'}</span></td><td><button className="table-action" onClick={()=>onOpen(c)}>عرض الملف</button></td></tr>)}</tbody></table>
    {!list.length && <div className="empty-state">لا توجد بيانات</div>}</div>
  </section>
}
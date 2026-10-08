export default function UsersPage({ users }) {
  return <section className="ops-page">
    <div className="section-head"><div><h2>المستخدمون</h2><p>المستخدمون المسجلون في تطبيق العميل</p></div><span className="section-chip">{users.length} مستخدم</span></div>
    <div className="data-table"><table><thead><tr><th>الاسم</th><th>الهاتف</th><th>الدور</th><th>تاريخ التسجيل</th></tr></thead>
    <tbody>{users.map((u)=><tr key={u.id}><td><b>{u.name || '—'}</b></td><td>{u.phone || u.phoneInternational || '—'}</td><td>عميل</td><td>{u.createdAt ? new Date(u.createdAt).toLocaleDateString('ar-EG') : '—'}</td></tr>)}</tbody></table>
    {!users.length && <div className="empty-state">لا يوجد مستخدمون حتى الآن</div>}</div>
  </section>
}
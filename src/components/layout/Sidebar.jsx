import { navigationItems } from '../../constants/navigation'

export default function Sidebar({ captainCount, pendingCount }) {
  const badge = { captains: captainCount, pending: pendingCount }
  return <aside className="sidebar">
    <div className="brand"><div className="mark">Y</div><div><b>Yalla Go</b><span>لوحة الإدارة</span></div></div>
    <nav>{navigationItems.map(({label,icon:Icon,key},index)=><a className={index===0?'selected':''} key={key}><Icon/>{label}{badge[key] !== undefined && <em>{badge[key]}</em>}</a>)}</nav>
    <div className="admin"><div className="avatar">A</div><div><b>Yalla Go Admin</b><span>مدير النظام</span></div></div>
  </aside>
}

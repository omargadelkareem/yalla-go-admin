import { ref, runTransaction, update } from 'firebase/database'
import { db } from '../config/firebase'

const receiptSrc = (value) => !value ? null : value.startsWith('data:') ? value : 'data:image/jpeg;base64,' + value

export default function WalletsPage({ topups }) {
  const review = async (request, status) => {
    if (request.status !== 'pending') return
    if (status === 'approved') {
      await runTransaction(ref(db, 'captains/' + request.captainId + '/walletBalance'), (balance) => (Number(balance) || 0) + Number(request.amount || 0))
      await update(ref(db, 'captains/' + request.captainId), { initialTopUpCompleted: true, updatedAt: Date.now() })
    }
    await update(ref(db, 'walletTopUpRequests/' + request.id), { status, reviewedAt: Date.now() })
  }

  return <section className="ops-page">
    <div className="section-head"><div><h2>المحافظ والشحن</h2><p>راجع إيصال التحويل قبل إضافة الرصيد</p></div><span className="section-chip">{topups.length} طلب</span></div>
    <div className="topup-grid">{topups.map((t) => <article className="topup-card" key={t.id}>
      <div className="topup-info"><div><span>الكابتن</span><b>{t.captainName || '—'}</b><small>{t.captainPhone || t.captainId}</small></div><strong>{Number(t.amount || 0).toLocaleString('ar-EG')} ج.م</strong></div>
      {receiptSrc(t.receiptBase64) ? <a href={receiptSrc(t.receiptBase64)} target="_blank" rel="noreferrer" className="receipt-wrap"><img src={receiptSrc(t.receiptBase64)} alt="إيصال التحويل"/></a> : <div className="missing-doc">لا يوجد إيصال مرفق</div>}
      <div className="topup-footer"><span className={'status-pill ' + (t.status || 'pending')}>{t.status || 'pending'}</span>{t.status === 'pending' && <div className="review-actions"><button className="reject-btn" onClick={()=>review(t,'rejected')}>رفض</button><button className="approve-btn" onClick={()=>review(t,'approved')}>قبول وإضافة الرصيد</button></div>}</div>
    </article>)}</div>
    {!topups.length && <div className="empty-state">لا توجد طلبات شحن حتى الآن</div>}
  </section>
}
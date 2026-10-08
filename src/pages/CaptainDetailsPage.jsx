import { ref, update } from 'firebase/database'
import { db } from '../config/firebase'

const docsList = [
  ['profileBase64','الصورة الشخصية'],
  ['nationalIdFrontBase64','البطاقة - أمام'],
  ['nationalIdBackBase64','البطاقة - خلف'],
  ['driverLicenseBase64','رخصة القيادة'],
  ['vehiclePhotoBase64','صورة المركبة'],
]

export default function CaptainDetailsPage({ captain, documents, onBack }) {
  if (!captain) return null
  const docs = documents[captain.id] || {}
  const changeStatus = (status) => update(ref(db, 'captains/' + captain.id), { status, updatedAt: Date.now() })
  const source = (value) => value?.startsWith('data:') ? value : value ? 'data:image/jpeg;base64,' + value : null

  return <section className="ops-page">
    <button className="back-btn" onClick={onBack}>→ رجوع للكباتن</button>
    <div className="captain-profile"><div><span>ملف الكابتن</span><h2>{captain.name}</h2><p>{captain.phone} • {captain.vehicleModel} • {captain.plateNumber}</p></div>
    <div className="review-actions"><button className="reject-btn" onClick={()=>changeStatus('rejected')}>رفض</button><button className="approve-btn" onClick={()=>changeStatus('approved')}>قبول الكابتن</button></div></div>
    <div className="documents-grid">{docsList.map(([key,label])=><article className="document-card" key={key}><b>{label}</b>{source(docs[key]) ? <img src={source(docs[key])} alt={label}/> : <div className="missing-doc">لم يتم رفع المستند</div>}</article>)}</div>
  </section>
}
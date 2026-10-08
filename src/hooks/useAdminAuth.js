import { useEffect, useState } from 'react'
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { get, ref, serverTimestamp, set } from 'firebase/database'
import { auth, db } from '../config/firebase'

const BOOTSTRAP_ADMIN_UID = 'q59CadHCFbeSzSPJ4NT8zt293Dt2'

export function useAdminAuth() {
  const [admin, setAdmin] = useState(null)
  const [checking, setChecking] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => onAuthStateChanged(auth, async (user) => {
    setChecking(true)
    setError('')
    if (!user) { setAdmin(null); setChecking(false); return }

    try {
      const adminRef = ref(db, `admins/${user.uid}`)
      let snapshot = await get(adminRef)

      if (!snapshot.exists() && user.uid === BOOTSTRAP_ADMIN_UID) {
        await set(adminRef, {
          active: true,
          role: 'super_admin',
          email: user.email || '',
          createdAt: serverTimestamp(),
        })
        snapshot = await get(adminRef)
      }

      const data = snapshot.val()
      if (snapshot.exists() && data?.active === true) {
        setAdmin({ user, ...data })
      } else {
        await signOut(auth)
        setAdmin(null)
        setError('هذا الحساب غير مصرح له بدخول لوحة الإدارة')
      }
    } catch (firebaseError) {
      console.error('Admin authorization failed:', firebaseError)
      setAdmin(null)
      setError('تعذر التحقق من صلاحية حساب الإدارة')
    } finally {
      setChecking(false)
    }
  }), [])

  const login = async (email, password) => {
    setError('')
    try { await signInWithEmailAndPassword(auth, email.trim(), password) }
    catch { setError('البريد الإلكتروني أو كلمة المرور غير صحيحة'); throw new Error('login-failed') }
  }

  const logout = () => signOut(auth)
  return { admin, checking, error, login, logout }
}

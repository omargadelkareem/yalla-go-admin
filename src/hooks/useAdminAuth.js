import { useEffect, useState } from 'react'
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { get, ref } from 'firebase/database'
import { auth, db } from '../config/firebase'

export function useAdminAuth() {
  const [admin, setAdmin] = useState(null)
  const [checking, setChecking] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => onAuthStateChanged(auth, async (user) => {
    setError('')
    if (!user) { setAdmin(null); setChecking(false); return }
    try {
      const snapshot = await get(ref(db, `admins/${user.uid}`))
      if (snapshot.exists() && snapshot.val()?.active !== false) setAdmin({ user, ...snapshot.val() })
      else { await signOut(auth); setAdmin(null); setError('هذا الحساب غير مصرح له بدخول لوحة الإدارة') }
    } catch {
      setAdmin(null)
      setError('تعذر التحقق من صلاحية حساب الإدارة')
    } finally { setChecking(false) }
  }), [])

  const login = async (email, password) => {
    setError('')
    try { await signInWithEmailAndPassword(auth, email.trim(), password) }
    catch { setError('البريد الإلكتروني أو كلمة المرور غير صحيحة'); throw new Error('login-failed') }
  }
  const logout = () => signOut(auth)
  return { admin, checking, error, login, logout }
}

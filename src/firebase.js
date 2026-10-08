import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: 'yalla-go-603c3.firebaseapp.com',
  databaseURL: 'https://yalla-go-603c3-default-rtdb.firebaseio.com',
  projectId: 'yalla-go-603c3',
  storageBucket: 'yalla-go-603c3.firebasestorage.app',
}

const app = initializeApp(firebaseConfig)
export const db = getDatabase(app)

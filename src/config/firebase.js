import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getDatabase } from 'firebase/database'

const firebaseConfig = {
  apiKey: 'AIzaSyD6uL241sw1JWOE-Sy4SPDSaV26rKhbGFs',
  authDomain: 'yalla-go-603c3.firebaseapp.com',
  databaseURL: 'https://yalla-go-603c3-default-rtdb.firebaseio.com',
  projectId: 'yalla-go-603c3',
  storageBucket: 'yalla-go-603c3.firebasestorage.app',
  messagingSenderId: '698417262464',
  appId: '1:698417262464:web:eb6b016cf16063cb455b65',
  measurementId: 'G-MYM26R9F5F',
}

const firebaseApp = initializeApp(firebaseConfig)
export const auth = getAuth(firebaseApp)
export const db = getDatabase(firebaseApp)

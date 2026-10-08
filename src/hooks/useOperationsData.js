import { useEffect, useState } from 'react'
import { onValue, ref } from 'firebase/database'
import { db } from '../config/firebase'

const mapSnapshot = (snapshot) =>
  Object.entries(snapshot.val() || {}).map(([id, value]) => ({ id, ...value }))

export function useOperationsData() {
  const [data, setData] = useState({
    users: [], captains: [], documents: {}, rides: [], topups: [],
  })

  useEffect(() => {
    const listen = (path, key, mapper = mapSnapshot) =>
      onValue(ref(db, path), (snapshot) =>
        setData((current) => ({ ...current, [key]: mapper(snapshot) })),
      (error) => console.error('RTDB read failed:', path, error))

    const stops = [
      listen('usersByPhone', 'users'),
      listen('captains', 'captains'),
      listen('captainDocuments', 'documents', (s) => s.val() || {}),
      listen('rideRequests', 'rides'),
      listen('walletTopUpRequests', 'topups'),
    ]
    return () => stops.forEach((stop) => stop())
  }, [])

  return data
}

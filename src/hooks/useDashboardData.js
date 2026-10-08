import { useEffect, useState } from 'react'
import { onValue, ref } from 'firebase/database'
import { db } from '../config/firebase'

const mapSnapshot = (snapshot) =>
  Object.entries(snapshot.val() || {}).map(([id, value]) => ({ id, ...value }))

export function useDashboardData() {
  const [captains, setCaptains] = useState([])
  const [rides, setRides] = useState([])
  const [loaded, setLoaded] = useState({ captains: false, rides: false })
  const [error, setError] = useState(null)

  useEffect(() => {
    const fail = (source) => (firebaseError) => {
      console.error('Yalla Go RTDB read failed:', source, firebaseError)
      setError(firebaseError)
      setLoaded((current) => ({ ...current, [source]: true }))
    }

    const stopCaptains = onValue(
      ref(db, 'captains'),
      (snapshot) => {
        setCaptains(mapSnapshot(snapshot))
        setLoaded((current) => ({ ...current, captains: true }))
      },
      fail('captains'),
    )

    const stopRides = onValue(
      ref(db, 'rideRequests'),
      (snapshot) => {
        setRides(mapSnapshot(snapshot))
        setLoaded((current) => ({ ...current, rides: true }))
      },
      fail('rides'),
    )

    return () => { stopCaptains(); stopRides() }
  }, [])

  return {
    captains,
    rides,
    error,
    loading: !loaded.captains || !loaded.rides,
  }
}

import { useEffect, useState } from 'react'
import { onValue, ref } from 'firebase/database'
import { db } from '../config/firebase'

const mapSnapshot = (snapshot) =>
  Object.entries(snapshot.val() || {}).map(([id, value]) => ({ id, ...value }))

export function useDashboardData() {
  const [captains, setCaptains] = useState([])
  const [rides, setRides] = useState([])
  const [loaded, setLoaded] = useState({ captains: false, rides: false })

  useEffect(() => {
    const stopCaptains = onValue(ref(db, 'captains'), (snapshot) => {
      setCaptains(mapSnapshot(snapshot))
      setLoaded((current) => ({ ...current, captains: true }))
    })
    const stopRides = onValue(ref(db, 'rideRequests'), (snapshot) => {
      setRides(mapSnapshot(snapshot))
      setLoaded((current) => ({ ...current, rides: true }))
    })
    return () => { stopCaptains(); stopRides() }
  }, [])

  return { captains, rides, loading: !loaded.captains || !loaded.rides }
}

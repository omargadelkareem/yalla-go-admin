const startOfDay = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime()
const startOfWeek = (d) => {
  const x = new Date(d)
  x.setDate(x.getDate() - ((x.getDay() + 6) % 7))
  return startOfDay(x)
}
const startOfMonth = (d) => new Date(d.getFullYear(), d.getMonth(), 1).getTime()

export const rideTimestamp = (ride) => Number(ride.completedAt || ride.startedAt || ride.createdAt || 0)
export const rideFare = (ride) => Number(ride.finalFare ?? ride.acceptedPrice ?? ride.indicativePrice ?? 0)

export function buildDashboardMetrics(captains, rides) {
  const now = new Date()
  const completed = rides.filter((ride) => ride.status === 'completed')
  const period = (from) => {
    const items = completed.filter((ride) => rideTimestamp(ride) >= from)
    return { count: items.length, value: items.reduce((sum, ride) => sum + rideFare(ride), 0) }
  }
  const approved = captains.filter((captain) => captain.status === 'approved')
  return {
    active: approved.filter((captain) => captain.isOnline).length,
    offline: approved.filter((captain) => !captain.isOnline).length,
    pending: captains.filter((captain) => captain.status === 'pending').length,
    cars: captains.filter((captain) => captain.vehicleType === 'car').length,
    bikes: captains.filter((captain) => captain.vehicleType === 'motorcycle').length,
    day: period(startOfDay(now)),
    week: period(startOfWeek(now)),
    month: period(startOfMonth(now)),
    completed: completed.length,
    cancelled: rides.filter((ride) => ride.status === 'cancelled').length,
    searching: rides.filter((ride) => ride.status === 'searching').length,
    totalValue: completed.reduce((sum, ride) => sum + rideFare(ride), 0),
    approvalRate: captains.length ? Math.round((approved.length / captains.length) * 100) : 0,
  }
}

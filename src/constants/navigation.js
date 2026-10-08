import { Clock3, LayoutDashboard, Route, Settings, Users, WalletCards } from 'lucide-react'

export const navigationItems = [
  { label: 'الرئيسية', icon: LayoutDashboard, key: 'dashboard' },
  { label: 'الكباتن', icon: Users, key: 'captains' },
  { label: 'طلبات الانتظار', icon: Clock3, key: 'pending' },
  { label: 'الرحلات', icon: Route, key: 'rides' },
  { label: 'المحافظ والشحن', icon: WalletCards, key: 'wallets' },
  { label: 'الإعدادات', icon: Settings, key: 'settings' },
]

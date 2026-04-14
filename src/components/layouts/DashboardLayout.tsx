import { Outlet, Link, useLocation } from 'react-router-dom'
import { useI18n } from '@/i18n/I18nProvider'
import {
  User,
  FileText,
  Package,
  HardDrive,
  Sparkles,
  Wallet,
  Receipt,
  Bell,
  HelpCircle,
  Settings,
  Archive,
  Megaphone,
  ShieldCheck,
  Crown,
} from 'lucide-react'
import { cn } from '@/lib/utils'

export function DashboardLayout() {
  const { t } = useI18n()
  const location = useLocation()

  const sidebarLinks = [
    { to: '/dashboard', label: t('dashboard.title'), icon: User, exact: true },
    { to: '/dashboard/lots', label: t('dashboard.myLots'), icon: FileText },
    { to: '/dashboard/requests', label: t('dashboard.myRequests'), icon: Package },
    { to: '/dashboard/digital-inventory', label: t('dashboard.digitalInventory'), icon: HardDrive },
    { to: '/dashboard/my-generation', label: t('dashboard.myGeneration'), icon: Sparkles },
    { to: '/dashboard/unpackings', label: t('dashboard.unpackingArchive'), icon: Archive },
    { to: '/dashboard/balance', label: t('dashboard.balance'), icon: Wallet },
    { to: '/dashboard/invoices', label: t('dashboard.invoices'), icon: Receipt },
    { to: '/dashboard/ads', label: t('dashboard.myAds'), icon: Megaphone },
    { to: '/dashboard/notifications', label: t('dashboard.notifications'), icon: Bell },
    { to: '/dashboard/support', label: t('dashboard.support'), icon: HelpCircle },
    { to: '/dashboard/verification', label: t('dashboard.verification'), icon: ShieldCheck },
    { to: '/dashboard/premium', label: t('dashboard.premium'), icon: Crown },
    { to: '/dashboard/settings', label: t('dashboard.settings'), icon: Settings },
  ]

  const isActive = (to: string, exact?: boolean) => {
    if (exact) return location.pathname === to
    return location.pathname.startsWith(to)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <aside className="lg:w-64 shrink-0">
          <nav className="space-y-1 lg:sticky lg:top-24 bg-card border rounded-xl p-3">
            {sidebarLinks.map(link => {
              const Icon = link.icon
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                    isActive(link.to, link.exact)
                      ? 'bg-primary text-primary-foreground shadow-sm shadow-primary/20'
                      : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {link.label}
                </Link>
              )
            })}
          </nav>
        </aside>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

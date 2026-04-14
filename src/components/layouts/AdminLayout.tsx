import { Outlet, Link, useLocation } from 'react-router-dom'
import { useI18n } from '@/i18n/I18nProvider'
import {
  LayoutDashboard,
  Package,
  FolderTree,
  Users,
  ShieldCheck,
  FileText,
  CreditCard,
  Plug,
  Truck,
  PenTool,
  MessageSquare,
  Heart,
  Cpu,
  Store,
  LifeBuoy,
  Languages,
  Search,
  Bell,
  Lock,
  Settings,
  Warehouse,
} from 'lucide-react'
import { cn } from '@/lib/utils'

export function AdminLayout() {
  const { t } = useI18n()
  const location = useLocation()

  const sections = [
    { label: t('admin.sectionMain'), items: [
      { to: '/admin', label: t('admin.dashboard'), icon: LayoutDashboard, exact: true },
      { to: '/admin/objects', label: t('admin.objects'), icon: Package },
      { to: '/admin/categories', label: t('admin.categories'), icon: FolderTree },
      { to: '/admin/users', label: t('admin.users'), icon: Users },
      { to: '/admin/publish-rights', label: t('admin.publishRights'), icon: ShieldCheck },
    ]},
    { label: t('admin.sectionOps'), items: [
      { to: '/admin/requests', label: t('admin.requests'), icon: FileText },
      { to: '/admin/payments', label: t('admin.payments'), icon: CreditCard },
      { to: '/admin/payment-integrations', label: t('admin.paymentIntegrations'), icon: Plug },
      { to: '/admin/delivery', label: t('admin.delivery'), icon: Truck },
      { to: '/admin/inventory', label: t('admin.inventory'), icon: Warehouse },
    ]},
    { label: t('admin.sectionContent'), items: [
      { to: '/admin/content', label: t('admin.content'), icon: PenTool },
      { to: '/admin/comments', label: t('admin.comments'), icon: MessageSquare },
      { to: '/admin/donations', label: t('admin.donations'), icon: Heart },
    ]},
    { label: t('admin.sectionServices'), items: [
      { to: '/admin/ai', label: t('admin.aiLab'), icon: Cpu },
      { to: '/admin/p2p', label: t('admin.p2p'), icon: Store },
      { to: '/admin/tickets', label: t('admin.tickets'), icon: LifeBuoy },
    ]},
    { label: t('admin.sectionSystem'), items: [
      { to: '/admin/translations', label: t('admin.translations'), icon: Languages },
      { to: '/admin/seo', label: t('admin.seo'), icon: Search },
      { to: '/admin/notifications', label: t('admin.notifications'), icon: Bell },
      { to: '/admin/security', label: t('admin.security'), icon: Lock },
      { to: '/admin/settings', label: t('admin.settings'), icon: Settings },
    ]},
  ]

  const isActive = (to: string, exact?: boolean) => {
    if (exact) return location.pathname === to
    return location.pathname.startsWith(to) && !(exact === undefined && to === '/admin' && location.pathname !== '/admin')
  }

  return (
    <div className="min-h-screen flex">
      {/* Admin Sidebar */}
      <aside className="w-64 border-r bg-sidebar shrink-0 fixed left-0 top-0 bottom-0 overflow-y-auto z-40">
        <div className="p-4 border-b">
          <Link to="/admin" className="flex items-center gap-2 font-bold text-lg">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground text-xs font-black">
              RW
            </div>
            {t('admin.title')}
          </Link>
        </div>

        <nav className="p-3 space-y-6">
          {sections.map(section => (
            <div key={section.label}>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 mb-2">
                {section.label}
              </p>
              <div className="space-y-0.5">
                {section.items.map(item => {
                  const Icon = item.icon
                  return (
                    <Link
                      key={item.to}
                      to={item.to}
                      className={cn(
                        'flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors',
                        isActive(item.to, item.exact)
                          ? 'bg-sidebar-accent text-sidebar-accent-foreground font-medium'
                          : 'text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground'
                      )}
                    >
                      <Icon className="w-4 h-4" />
                      {item.label}
                    </Link>
                  )
                })}
              </div>
            </div>
          ))}
        </nav>

        <div className="p-4 border-t mt-4">
          <Link
            to="/"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            {t('admin.backToPortal')}
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 ml-64 p-8">
        <Outlet />
      </main>
    </div>
  )
}

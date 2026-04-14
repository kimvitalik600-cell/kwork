import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useI18n } from '@/i18n/I18nProvider'
import {
  FileText, Users, Package, CreditCard, MessageSquare,
  Heart, AlertCircle, Clock,
} from 'lucide-react'

export function AdminDashboard() {
  const { t } = useI18n()

  const stats = [
    { label: t('admin.newRequests'), value: '12', icon: FileText, color: 'text-primary', bg: 'bg-primary/10' },
    { label: t('admin.unpaidInvoices'), value: '5', icon: CreditCard, color: 'text-warning', bg: 'bg-warning/10' },
    { label: t('admin.activeReserves'), value: '3', icon: Clock, color: 'text-info', bg: 'bg-info/10' },
    { label: t('admin.recentRegistrations'), value: '28', icon: Users, color: 'text-success', bg: 'bg-success/10' },
    { label: t('admin.supportTickets'), value: '7', icon: AlertCircle, color: 'text-destructive', bg: 'bg-destructive/10' },
    { label: t('admin.newComments'), value: '15', icon: MessageSquare, color: 'text-muted-foreground', bg: 'bg-muted' },
    { label: t('admin.newObjects'), value: '6', icon: Package, color: 'text-primary', bg: 'bg-primary/10' },
    { label: t('admin.newDonations'), value: '4', icon: Heart, color: 'text-destructive', bg: 'bg-destructive/10' },
  ]

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">{t('admin.dashboard')}</h1>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(stat => (
          <Card key={stat.label}>
            <CardContent className="p-4 flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg ${stat.bg} flex items-center justify-center`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <div>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle className="text-lg">{t('admin.latestRequests')}</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { id: 'REQ-045', user: 'user@email.com', amount: '2,500 UAH', status: 'waiting_payment' },
                { id: 'REQ-044', user: 'john@email.com', amount: '350 UAH', status: 'paid' },
                { id: 'REQ-043', user: 'anna@email.com', amount: '4,800 UAH', status: 'processing' },
              ].map(req => (
                <div key={req.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg text-sm">
                  <div>
                    <span className="font-medium">{req.id}</span>
                    <span className="text-muted-foreground ml-2">{req.user}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={req.status === 'paid' ? 'success' : req.status === 'processing' ? 'info' : 'warning'}>
                      {req.status}
                    </Badge>
                    <span className="font-semibold">{req.amount}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-lg">{t('admin.paymentStats')}</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { label: t('admin.today'), amount: '12,500 UAH', count: 5 },
                { label: t('admin.thisWeek'), amount: '45,200 UAH', count: 18 },
                { label: t('admin.thisMonth'), amount: '182,000 UAH', count: 67 },
              ].map(stat => (
                <div key={stat.label} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{stat.label}</p>
                    <p className="text-xs text-muted-foreground">{stat.count} {t('admin.paymentsCount')}</p>
                  </div>
                  <p className="text-lg font-bold text-primary">{stat.amount}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

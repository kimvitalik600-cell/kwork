import { useI18n } from '@/i18n/I18nProvider'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  FileText, Package, Wallet, Bell, Sparkles, HardDrive,
  ArrowRight, TrendingUp,
} from 'lucide-react'
import { Link } from 'react-router-dom'

export function DashboardHome() {
  const { t } = useI18n()

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div>
        <h1 className="text-2xl font-bold mb-1">{t('dashboard.title')}</h1>
        <p className="text-muted-foreground">Добро пожаловать! Здесь вы можете управлять заявками, инвентарем и генерациями.</p>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Баланс', value: '1,250 UAH', icon: Wallet, color: 'text-success' },
          { label: 'Credits', value: '125', icon: TrendingUp, color: 'text-primary' },
          { label: 'Токены AI', value: '50', icon: Sparkles, color: 'text-warning' },
          { label: 'Активные заявки', value: '3', icon: FileText, color: 'text-info' },
        ].map(stat => (
          <Card key={stat.label}>
            <CardContent className="p-4 flex items-center gap-3">
              <div className={`${stat.color}`}>
                <stat.icon className="w-8 h-8" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
                <p className="text-lg font-bold">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Link to="/dashboard/my-lots">
          <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
            <CardContent className="p-5 flex items-center gap-4">
              <Package className="w-10 h-10 text-primary" />
              <div>
                <h3 className="font-semibold">{t('dashboard.myLots')}</h3>
                <p className="text-sm text-muted-foreground">3 активных лота</p>
              </div>
              <ArrowRight className="w-4 h-4 ml-auto text-muted-foreground" />
            </CardContent>
          </Card>
        </Link>
        <Link to="/dashboard/digital-inventory">
          <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
            <CardContent className="p-5 flex items-center gap-4">
              <HardDrive className="w-10 h-10 text-info" />
              <div>
                <h3 className="font-semibold">{t('dashboard.digitalInventory')}</h3>
                <p className="text-sm text-muted-foreground">8 цифровых активов</p>
              </div>
              <ArrowRight className="w-4 h-4 ml-auto text-muted-foreground" />
            </CardContent>
          </Card>
        </Link>
        <Link to="/dashboard/my-generation">
          <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
            <CardContent className="p-5 flex items-center gap-4">
              <Sparkles className="w-10 h-10 text-warning" />
              <div>
                <h3 className="font-semibold">{t('dashboard.myGeneration')}</h3>
                <p className="text-sm text-muted-foreground">12 генераций</p>
              </div>
              <ArrowRight className="w-4 h-4 ml-auto text-muted-foreground" />
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Recent requests */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Последние заявки</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { id: 'REQ-001', date: '10.04.2026', status: 'paid', items: 2, amount: '7,300 UAH' },
              { id: 'REQ-002', date: '08.04.2026', status: 'processing', items: 1, amount: '350 UAH' },
              { id: 'REQ-003', date: '05.04.2026', status: 'completed', items: 3, amount: '5,400 UAH' },
            ].map(req => (
              <div key={req.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">{req.id}</p>
                    <p className="text-xs text-muted-foreground">{req.date} · {req.items} объектов</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant={req.status === 'completed' ? 'success' : req.status === 'paid' ? 'info' : 'warning'}>
                    {req.status}
                  </Badge>
                  <span className="text-sm font-semibold">{req.amount}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Notifications preview */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <Bell className="w-5 h-5" /> Уведомления
            </CardTitle>
            <Link to="/dashboard/notifications" className="text-sm text-primary hover:underline">Все</Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <p className="text-muted-foreground">• Статус заявки REQ-001 изменен на «Оплачена»</p>
            <p className="text-muted-foreground">• Новый цифровой актив доступен в инвентаре</p>
            <p className="text-muted-foreground">• Генерация AI #12 завершена</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

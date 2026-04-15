import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useI18n } from '@/i18n/I18nProvider'
import { Bell, CheckCircle, Package, FileText, Sparkles, Wallet } from 'lucide-react'

const initialNotifications = [
  { id: 1, icon: FileText, text: 'Статус заявки REQ-001 изменен на «Оплачена»', date: '10.04.2026 14:30', read: false },
  { id: 2, icon: Package, text: 'Новый цифровой актив доступен в вашем инвентаре', date: '09.04.2026 11:00', read: false },
  { id: 3, icon: Sparkles, text: 'Генерация AI #12 завершена успешно', date: '08.04.2026 18:45', read: false },
  { id: 4, icon: Wallet, text: 'Баланс пополнен на 1,200 UAH', date: '07.04.2026 09:20', read: true },
  { id: 5, icon: Bell, text: 'Специальное предложение: скидка 20% на Premium', date: '05.04.2026 12:00', read: true },
  { id: 6, icon: FileText, text: 'Заявка REQ-003 завершена — можно забрать товар', date: '05.04.2026 10:15', read: true },
]

export function NotificationsPage() {
  const { t } = useI18n()
  const [notifications, setNotifications] = useState(initialNotifications)
  const unread = notifications.filter(n => !n.read).length

  const markAllRead = () => setNotifications(prev => prev.map(n => ({ ...n, read: true })))

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold">{t('dashboard.notifications')}</h1>
          {unread > 0 && <Badge variant="destructive">{unread}</Badge>}
        </div>
        {unread > 0 && (
          <Button variant="outline" size="sm" className="gap-2" onClick={markAllRead}>
            <CheckCircle className="w-4 h-4" /> Прочитать все
          </Button>
        )}
      </div>
      <div className="space-y-2">
        {notifications.map(n => (
          <Card key={n.id} className={`transition-colors ${!n.read ? 'border-primary/30 bg-primary/5' : ''}`}>
            <CardContent className="p-4 flex items-start gap-3">
              <n.icon className={`w-5 h-5 mt-0.5 ${!n.read ? 'text-primary' : 'text-muted-foreground'}`} />
              <div className="flex-1">
                <p className={`text-sm ${!n.read ? 'font-semibold' : ''}`}>{n.text}</p>
                <p className="text-xs text-muted-foreground mt-1">{n.date}</p>
              </div>
              {!n.read && <div className="w-2 h-2 rounded-full bg-primary mt-2" />}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

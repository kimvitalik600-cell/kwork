import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useI18n } from '@/i18n/I18nProvider'
import { useAuth } from '@/hooks/useAuth'
import { Badge } from '@/components/ui/badge'
import { User, Mail, Shield, Bell, CheckCircle } from 'lucide-react'

export function DashboardSettingsPage() {
  const { t } = useI18n()
  const { user } = useAuth()
  const [name, setName] = useState(user?.name ?? '')
  const [saved, setSaved] = useState(false)

  const [notifEmail, setNotifEmail] = useState(true)
  const [notifPush, setNotifPush] = useState(true)
  const [notifMarketing, setNotifMarketing] = useState(false)
  const [notifOrders, setNotifOrders] = useState(true)
  const [notifSaved, setNotifSaved] = useState(false)

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    // Would update via auth context in a real app
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">{t('dashboard.settings')}</h1>

      {/* Profile info */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <User className="w-4 h-4" />{t('settings.profile')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSave} className="space-y-4 max-w-md">
            <div className="space-y-1.5">
              <Label htmlFor="name">{t('auth.name')}</Label>
              <Input id="name" value={name} onChange={e => setName(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="email">{t('auth.email')}</Label>
              <Input id="email" type="email" value={user?.email ?? ''} disabled className="opacity-60" />
              <p className="text-xs text-muted-foreground">{t('settings.emailHint')}</p>
            </div>
            <div className="flex items-center gap-3">
              <Button type="submit" size="sm">{t('common.save')}</Button>
              {saved && (
                <span className="flex items-center gap-1.5 text-sm text-green-600">
                  <CheckCircle className="w-4 h-4" />{t('settings.saved')}
                </span>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Account info */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Shield className="w-4 h-4" />{t('settings.account')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm">{user?.email}</span>
            </div>
            <Badge variant="secondary">{user?.role === 'admin' ? 'Admin' : 'User'}</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">{t('settings.memberSince')}</span>
            <span className="text-sm">{user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : '—'}</span>
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Bell className="w-4 h-4" />{t('settings.notifications')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 max-w-md">
            {[
              { label: 'Email-уведомления', desc: 'Получать уведомления на email', value: notifEmail, set: setNotifEmail },
              { label: 'Push-уведомления', desc: 'Уведомления в браузере', value: notifPush, set: setNotifPush },
              { label: 'Статус заказов', desc: 'Обновления по вашим заявкам и инвойсам', value: notifOrders, set: setNotifOrders },
              { label: 'Маркетинговые рассылки', desc: 'Акции, новинки и специальные предложения', value: notifMarketing, set: setNotifMarketing },
            ].map(item => (
              <label key={item.label} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                <div>
                  <p className="text-sm font-medium">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
                <button
                  type="button"
                  onClick={() => item.set(!item.value)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${item.value ? 'bg-primary' : 'bg-muted-foreground/30'}`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${item.value ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
              </label>
            ))}
            <div className="flex items-center gap-3 pt-2">
              <Button size="sm" onClick={() => { setNotifSaved(true); setTimeout(() => setNotifSaved(false), 2500) }}>
                {t('common.save')}
              </Button>
              {notifSaved && (
                <span className="flex items-center gap-1.5 text-sm text-green-600">
                  <CheckCircle className="w-4 h-4" />{t('settings.saved')}
                </span>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

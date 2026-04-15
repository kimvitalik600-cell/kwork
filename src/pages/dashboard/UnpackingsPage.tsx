import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useI18n } from '@/i18n/I18nProvider'
import { Package, Play, Eye } from 'lucide-react'

const mockUnpackings = [
  { id: 'UNP-001', title: 'Mystery Box — Streetwear Edition', date: '09.04.2026', status: 'opened', items: 5, value: '3,200 UAH' },
  { id: 'UNP-002', title: 'Digital NFT Pack', date: '02.04.2026', status: 'opened', items: 3, value: '800 UAH' },
  { id: 'UNP-003', title: 'Premium Sneaker Box', date: '25.03.2026', status: 'opened', items: 2, value: '6,500 UAH' },
  { id: 'UNP-004', title: 'Starter Accessory Pack', date: '15.03.2026', status: 'opened', items: 4, value: '1,100 UAH' },
]

export function DashboardUnpackingsPage() {
  const { t } = useI18n()
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">{t('dashboard.unpackingArchive')}</h1>
      <div className="space-y-3">
        {mockUnpackings.map(u => (
          <Card key={u.id} className="hover:shadow-sm transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Package className="w-8 h-8 text-primary" />
                  <div>
                    <p className="font-semibold">{u.title}</p>
                    <p className="text-sm text-muted-foreground">{u.id} · {u.date} · {u.items} предметов</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="success">{u.status}</Badge>
                  <span className="font-semibold text-sm">{u.value}</span>
                  <Button variant="ghost" size="sm" className="gap-1"><Play className="w-4 h-4" /></Button>
                  <Button variant="ghost" size="sm"><Eye className="w-4 h-4" /></Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

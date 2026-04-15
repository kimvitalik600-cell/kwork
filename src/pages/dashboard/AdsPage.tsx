import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useI18n } from '@/i18n/I18nProvider'
import { Megaphone, Eye, Edit, Plus } from 'lucide-react'

const mockAds = [
  { id: 'AD-001', title: 'Продаю: Vintage Jacket RAF SIMONS', status: 'active', views: 124, date: '10.04.2026', price: '2,500 UAH' },
  { id: 'AD-002', title: 'Продаю: Коллекция книг (PDF)', status: 'active', views: 56, date: '08.04.2026', price: '350 UAH' },
  { id: 'AD-003', title: 'Услуга: SMM-продвижение', status: 'paused', views: 89, date: '01.04.2026', price: '1,200 UAH' },
  { id: 'AD-004', title: 'Продаю: Smartwatch Premium', status: 'expired', views: 210, date: '15.03.2026', price: '4,800 UAH' },
]

export function AdsPage() {
  const { t } = useI18n()
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{t('dashboard.myAds')}</h1>
        <Button className="gap-2"><Plus className="w-4 h-4" /> Создать объявление</Button>
      </div>
      <div className="space-y-3">
        {mockAds.map(ad => (
          <Card key={ad.id} className="hover:shadow-sm transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Megaphone className="w-8 h-8 text-primary" />
                  <div>
                    <p className="font-semibold">{ad.title}</p>
                    <p className="text-sm text-muted-foreground">{ad.id} · {ad.date} · <Eye className="w-3 h-3 inline" /> {ad.views}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant={ad.status === 'active' ? 'success' : ad.status === 'paused' ? 'warning' : 'secondary'}>
                    {ad.status}
                  </Badge>
                  <span className="font-semibold text-sm">{ad.price}</span>
                  <Button variant="ghost" size="sm"><Edit className="w-4 h-4" /></Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

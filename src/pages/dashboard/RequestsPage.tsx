import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useI18n } from '@/i18n/I18nProvider'
import { FileText, Eye, Filter } from 'lucide-react'

const mockRequests = [
  { id: 'REQ-001', title: 'Винтажная куртка RAF SIMONS', status: 'paid', date: '10.04.2026', amount: '7,300 UAH', items: 2 },
  { id: 'REQ-002', title: 'Цифровой ключ Adobe CC', status: 'processing', date: '08.04.2026', amount: '350 UAH', items: 1 },
  { id: 'REQ-003', title: 'Коллекция аксессуаров', status: 'completed', date: '05.04.2026', amount: '5,400 UAH', items: 3 },
  { id: 'REQ-004', title: 'Пакет SMM-продвижения', status: 'completed', date: '01.04.2026', amount: '1,200 UAH', items: 1 },
  { id: 'REQ-005', title: 'NFT Art Bundle', status: 'cancelled', date: '28.03.2026', amount: '900 UAH', items: 1 },
]

export function RequestsPage() {
  const { t } = useI18n()
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{t('dashboard.myRequests')}</h1>
        <Button variant="outline" size="sm" className="gap-2"><Filter className="w-4 h-4" />{t('catalog.filter')}</Button>
      </div>
      <div className="space-y-3">
        {mockRequests.map(req => (
          <Card key={req.id} className="hover:shadow-sm transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileText className="w-8 h-8 text-muted-foreground" />
                  <div>
                    <p className="font-semibold">{req.title}</p>
                    <p className="text-sm text-muted-foreground">{req.id} · {req.date} · {req.items} шт.</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant={req.status === 'completed' ? 'success' : req.status === 'paid' ? 'info' : req.status === 'cancelled' ? 'destructive' : 'warning'}>
                    {req.status}
                  </Badge>
                  <span className="font-semibold text-sm">{req.amount}</span>
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

import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useI18n } from '@/i18n/I18nProvider'
import { FileText, Eye } from 'lucide-react'

export function MyLotsPage() {
  const { t } = useI18n()

  const lots = [
    { id: 'REQ-001', title: 'Винтажная куртка (Лот #4521)', status: 'paid', date: '10.04.2026', amount: '2,500 UAH' },
    { id: 'REQ-002', title: 'Коллекция фэнтези-книг (PDF)', status: 'completed', date: '08.04.2026', amount: '350 UAH' },
    { id: 'REQ-003', title: 'Смарт-часы (Лот #4522)', status: 'processing', date: '05.04.2026', amount: '4,800 UAH' },
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">{t('dashboard.myLots')}</h1>
      <div className="space-y-4">
        {lots.map(lot => (
          <Card key={lot.id} className="hover:shadow-sm transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileText className="w-8 h-8 text-muted-foreground" />
                  <div>
                    <p className="font-semibold">{lot.title}</p>
                    <p className="text-sm text-muted-foreground">{lot.id} · {lot.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Badge variant={lot.status === 'completed' ? 'success' : lot.status === 'paid' ? 'info' : 'warning'}>
                    {lot.status}
                  </Badge>
                  <span className="font-semibold">{lot.amount}</span>
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

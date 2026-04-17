import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useI18n } from '@/i18n/I18nProvider'
import { Package, Play, Eye, X, ChevronRight, Clock } from 'lucide-react'

const mockUnpackings = [
  { id: 'UNP-001', title: 'Mystery Box — Streetwear Edition', date: '09.04.2026', status: 'opened', items: 5, value: '3,200 UAH',
    contents: ['Vintage Jacket RAF SIMONS', 'Кожаная сумка (IT)', 'Аксессуар: Ремень', 'Шапка Beanie', 'Футболка Graphic Tee'] },
  { id: 'UNP-002', title: 'Digital NFT Pack', date: '02.04.2026', status: 'opened', items: 3, value: '800 UAH',
    contents: ['NFT Art #001', 'NFT Art #002', 'Цифровой сертификат'] },
  { id: 'UNP-003', title: 'Premium Sneaker Box', date: '25.03.2026', status: 'opened', items: 2, value: '6,500 UAH',
    contents: ['Кроссовки мужские (Лот #4545)', 'Кроссовки женские (Лот #4546)'] },
  { id: 'UNP-004', title: 'Starter Accessory Pack', date: '15.03.2026', status: 'opened', items: 4, value: '1,100 UAH',
    contents: ['Кошелёк', 'Чехол для телефона', 'Брелок', 'Повязка на голову'] },
]

export function DashboardUnpackingsPage() {
  const { t } = useI18n()
  const [viewId, setViewId] = useState<string | null>(null)
  const [playId, setPlayId] = useState<string | null>(null)

  const viewed = mockUnpackings.find(u => u.id === viewId)
  const playing = mockUnpackings.find(u => u.id === playId)

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
                  <Button variant="ghost" size="sm" className="gap-1" onClick={() => setPlayId(u.id)} title="Воспроизвести распаковку"><Play className="w-4 h-4" /></Button>
                  <Button variant="ghost" size="sm" onClick={() => setViewId(u.id)} title="Посмотреть содержимое"><Eye className="w-4 h-4" /></Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* View contents modal */}
      {viewed && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4" onClick={() => setViewId(null)}>
          <div className="bg-background rounded-xl max-w-md w-full shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between p-5 border-b">
              <h3 className="font-semibold">{viewed.title}</h3>
              <Button variant="ghost" size="sm" onClick={() => setViewId(null)}><X className="w-4 h-4" /></Button>
            </div>
            <div className="p-5 space-y-2">
              <p className="text-sm text-muted-foreground mb-3">{viewed.id} · {viewed.date} · {viewed.value}</p>
              {viewed.contents.map((item, i) => (
                <div key={i} className="flex items-center gap-2 p-2.5 bg-muted/30 rounded-lg text-sm">
                  <ChevronRight className="w-4 h-4 text-primary shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Play unpacking modal */}
      {playing && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4" onClick={() => setPlayId(null)}>
          <div className="bg-background rounded-xl max-w-md w-full shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between p-5 border-b">
              <h3 className="font-semibold">Распаковка: {playing.title}</h3>
              <Button variant="ghost" size="sm" onClick={() => setPlayId(null)}><X className="w-4 h-4" /></Button>
            </div>
            <div className="p-5">
              <div className="aspect-video bg-muted rounded-lg flex flex-col items-center justify-center mb-4">
                <Package className="w-16 h-16 text-primary/30 mb-3" />
                <p className="text-sm text-muted-foreground">Видео распаковки</p>
                <p className="text-xs text-muted-foreground mt-1">{playing.items} предметов · {playing.value}</p>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Clock className="w-3.5 h-3.5" />
                <span>Записано {playing.date}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

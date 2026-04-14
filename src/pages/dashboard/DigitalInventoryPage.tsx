import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useI18n } from '@/i18n/I18nProvider'
import { Download, BookOpen, Key, Image, Box, Info } from 'lucide-react'

export function DigitalInventoryPage() {
  const { t } = useI18n()

  const assets = [
    { id: '1', title: 'Коллекция фэнтези-книг', type: 'book', format: 'PDF/EPUB', date: '08.04.2026', icon: BookOpen },
    { id: '2', title: 'Steam ключ — Indie Game', type: 'key', format: 'Ключ активации', date: '05.04.2026', icon: Key },
    { id: '3', title: 'AI Portrait Pack #1', type: 'ai_art', format: 'PNG 4K', date: '09.04.2026', icon: Image },
    { id: '4', title: '3D Модель — Helmet', type: '3d_model', format: 'STL/OBJ', date: '03.04.2026', icon: Box },
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">{t('dashboard.digitalInventory')}</h1>
      <p className="text-muted-foreground">{t('dashboard.allDigitalAssets')}</p>

      <div className="space-y-4">
        {assets.map(asset => (
          <Card key={asset.id}>
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <asset.icon className="w-8 h-8 text-primary" />
                  <div>
                    <p className="font-semibold">{asset.title}</p>
                    <p className="text-sm text-muted-foreground">{asset.format} · {asset.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{asset.type}</Badge>
                  {asset.type === 'key' && (
                    <Button variant="outline" size="sm" className="gap-1">
                      <Info className="w-3.5 h-3.5" /> {t('dashboard.instructions')}
                    </Button>
                  )}
                  <Button size="sm" className="gap-1">
                    <Download className="w-3.5 h-3.5" /> {t('object.download')}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

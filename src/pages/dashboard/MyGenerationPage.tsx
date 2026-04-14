import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useI18n } from '@/i18n/I18nProvider'
import { Sparkles, Image, Zap } from 'lucide-react'

export function MyGenerationPage() {
  const { t } = useI18n()

  const generations = [
    { id: '1', prompt: 'Cyberpunk city at sunset', model: 'SDXL 1.0', type: 'image', status: 'completed', tokens: 5, date: '11.04.2026' },
    { id: '2', prompt: 'Medieval knight portrait', model: 'SDXL 1.0', type: 'image', status: 'completed', tokens: 5, date: '10.04.2026' },
    { id: '3', prompt: 'Abstract art pattern', model: 'DALL-E 3', type: 'image', status: 'processing', tokens: 8, date: '12.04.2026' },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{t('dashboard.myGeneration')}</h1>
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-warning" />
          <span className="font-semibold">50 {t('dashboard.tokensAvailable')}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-primary">{generations.length}</p>
            <p className="text-xs text-muted-foreground">{t('dashboard.totalGenerations')}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-success">2</p>
            <p className="text-xs text-muted-foreground">{t('dashboard.completed')}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-warning">1</p>
            <p className="text-xs text-muted-foreground">{t('dashboard.processing')}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold">18</p>
            <p className="text-xs text-muted-foreground">{t('dashboard.tokensSpent')}</p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        {generations.map(gen => (
          <Card key={gen.id}>
            <CardContent className="p-5">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center shrink-0">
                  {gen.status === 'completed' ? (
                    <Image className="w-6 h-6 text-primary" />
                  ) : (
                    <Sparkles className="w-6 h-6 text-warning animate-pulse" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-semibold">{gen.prompt}</p>
                  <p className="text-sm text-muted-foreground">{gen.model} · {gen.date} · {gen.tokens} {t('dashboard.tokensAvailable')}</p>
                </div>
                <Badge variant={gen.status === 'completed' ? 'success' : 'warning'}>
                  {gen.status === 'completed' ? t('dashboard.genCompleted') : t('dashboard.genProcessing')}
                </Badge>
                {gen.status === 'completed' && (
                  <Button variant="outline" size="sm">{t('object.download')}</Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

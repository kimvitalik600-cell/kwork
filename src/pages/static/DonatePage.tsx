import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useI18n } from '@/i18n/I18nProvider'
import { Heart } from 'lucide-react'
import { mockDonations } from '@/data/mockData'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'

export function DonatePage() {
  const { t, lang } = useI18n()
  const getText = (obj: Record<string, string>) => obj[lang] || obj.ru || ''

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">{t('donate.title')}</h1>

      <div className="space-y-6">
        {mockDonations.map(donation => {
          const pct = Math.min(100, (donation.collectedAmount / donation.goalAmount) * 100)
          return (
            <Card key={donation.id}>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Heart className="w-5 h-5 text-destructive" />
                  <h3 className="text-lg font-semibold">{getText(donation.title)}</h3>
                  {!donation.isActive && <Badge variant="secondary">{t('donate.finished')}</Badge>}
                </div>
                <p className="text-muted-foreground mb-4">{getText(donation.description)}</p>
                <Progress value={pct} className="mb-3" />
                <div className="flex justify-between text-sm mb-4">
                  <span>{t('donate.collected.prefix')}: <strong>{donation.collectedAmount.toLocaleString()} {donation.currency}</strong></span>
                  <span>{t('donate.goal.prefix')}: {donation.goalAmount.toLocaleString()} {donation.currency}</span>
                </div>
                {donation.isActive && (
                  <div className="flex items-center gap-3">
                    <Input placeholder={t('donate.amount')} type="number" className="w-32" />
                    <Button className="gap-2"><Heart className="w-4 h-4" /> {t('donate.support')}</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

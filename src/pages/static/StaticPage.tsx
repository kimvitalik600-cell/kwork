import { Card, CardContent } from '@/components/ui/card'
import { useI18n } from '@/i18n/I18nProvider'

export function StaticPage({ titleKey, contentKey }: { titleKey: string; contentKey: string }) {
  const { t } = useI18n()
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">{t(titleKey)}</h1>
      <Card>
        <CardContent className="p-8">
          <p className="text-muted-foreground leading-relaxed">{t(contentKey)}</p>
        </CardContent>
      </Card>
    </div>
  )
}

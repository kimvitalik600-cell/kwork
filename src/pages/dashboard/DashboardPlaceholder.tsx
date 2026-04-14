import { Card, CardContent } from '@/components/ui/card'
import { useI18n } from '@/i18n/I18nProvider'
import { Construction } from 'lucide-react'

export function DashboardPlaceholder({ titleKey }: { titleKey: string }) {
  const { t } = useI18n()
  const title = t(titleKey)
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">{title}</h1>
      <Card>
        <CardContent className="p-12 text-center text-muted-foreground">
          <Construction className="w-12 h-12 mx-auto mb-4 opacity-30" />
          <p className="text-lg font-medium">{title}</p>
          <p className="text-sm mt-2">{t('common.loading')}</p>
        </CardContent>
      </Card>
    </div>
  )
}

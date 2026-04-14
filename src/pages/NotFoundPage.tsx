import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { useI18n } from '@/i18n/I18nProvider'

export function NotFoundPage() {
  const { t } = useI18n()
  return (
    <div className="container mx-auto px-4 py-24 text-center">
      <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
      <p className="text-xl text-muted-foreground mb-8">{t('notFound.title')}</p>
      <Link to="/">
        <Button>{t('notFound.back')}</Button>
      </Link>
    </div>
  )
}

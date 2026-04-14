import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Send, MessageCircle, Mail, Globe } from 'lucide-react'
import { useI18n } from '@/i18n/I18nProvider'

export function ContactsPage() {
  const { t } = useI18n()
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">{t('contacts.title')}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-6 space-y-4">
            <h3 className="font-semibold text-lg">{t('contacts.reachUs')}</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary" />
                <span>support@rulwear.org</span>
              </div>
              <div className="flex items-center gap-3">
                <Send className="w-5 h-5 text-primary" />
                <span>Telegram: @rulwear_support</span>
              </div>
              <div className="flex items-center gap-3">
                <MessageCircle className="w-5 h-5 text-primary" />
                <span>Viber: +380 XX XXX XX XX</span>
              </div>
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-primary" />
                <span>rulwear.org</span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 space-y-4">
            <h3 className="font-semibold text-lg">{t('contacts.workHours')}</h3>
            <p className="text-muted-foreground">{t('contacts.supportHours')}</p>
            <p className="text-muted-foreground">{t('contacts.requestHours')}</p>
            <p className="text-muted-foreground">{t('contacts.digitalAuto')}</p>
            <Separator className="my-3" />
            <p className="text-sm text-muted-foreground">
              {t('footer.kved')}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

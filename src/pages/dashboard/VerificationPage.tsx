import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useI18n } from '@/i18n/I18nProvider'
import { useAuth } from '@/hooks/useAuth'
import { ShieldCheck, Upload, CheckCircle, Clock, AlertCircle } from 'lucide-react'

export function VerificationPage() {
  const { t } = useI18n()
  const { user } = useAuth()

  const steps = [
    { label: 'Email подтвержден', done: true },
    { label: 'Верификация документа', done: false },
    { label: 'Проверка модератором', done: false },
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">{t('dashboard.verification')}</h1>

      <Card className="border-yellow-500/30 bg-yellow-500/5">
        <CardContent className="p-6 flex items-start gap-4">
          <AlertCircle className="w-8 h-8 text-yellow-500 shrink-0" />
          <div>
            <h3 className="font-semibold mb-1">Аккаунт не верифицирован</h3>
            <p className="text-sm text-muted-foreground">Верификация позволяет продавать товары, принимать платежи и получать повышенные лимиты генерации.</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2"><ShieldCheck className="w-4 h-4" /> Этапы верификации</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {steps.map((step, i) => (
              <div key={i} className="flex items-center gap-3">
                {step.done
                  ? <CheckCircle className="w-5 h-5 text-green-500" />
                  : <Clock className="w-5 h-5 text-muted-foreground" />}
                <span className={`text-sm ${step.done ? 'line-through text-muted-foreground' : 'font-medium'}`}>
                  {step.label}
                </span>
                {step.done && <Badge variant="success" className="text-xs">Готово</Badge>}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2"><Upload className="w-4 h-4" /> Загрузить документ</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed rounded-xl p-8 text-center">
            <Upload className="w-10 h-10 text-muted-foreground/40 mx-auto mb-3" />
            <p className="text-sm text-muted-foreground mb-1">Загрузите скан паспорта или ID-карты</p>
            <p className="text-xs text-muted-foreground mb-4">JPG, PNG или PDF до 10 МБ</p>
            <Button variant="outline">Выбрать файл</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-sm">Текущий статус</p>
              <p className="text-xs text-muted-foreground">{user?.email}</p>
            </div>
            <Badge variant="warning">Не верифицирован</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

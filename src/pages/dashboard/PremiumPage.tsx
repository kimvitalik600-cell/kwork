import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useI18n } from '@/i18n/I18nProvider'
import { Crown, Sparkles, Zap, Shield, Headphones, Check } from 'lucide-react'

const plans = [
  {
    name: 'Free',
    price: '0 UAH',
    period: '/мес',
    desc: 'Базовый бесплатный доступ',
    features: ['10 AI-токенов/мес', '3 активных заявки', 'Базовый каталог', 'Email-поддержка'],
    icon: Zap,
    current: true,
  },
  {
    name: 'Pro',
    price: '299 UAH',
    period: '/мес',
    desc: 'Для активных пользователей',
    features: ['100 AI-токенов/мес', '20 активных заявок', 'Приоритетный доступ', 'Все AI модели', 'Быстрая поддержка'],
    icon: Sparkles,
    popular: true,
  },
  {
    name: 'Enterprise',
    price: '999 UAH',
    period: '/мес',
    desc: 'Максимальные возможности',
    features: ['500 AI-токенов/мес', 'Безлимитные заявки', 'API-доступ', 'Выделенный менеджер', 'SLA 99.9%', 'Белый лейбл'],
    icon: Crown,
  },
]

export function PremiumPage() {
  const { t } = useI18n()
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">{t('dashboard.premium')}</h1>
        <p className="text-muted-foreground mt-1">Выберите подходящий план для расширения возможностей</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <Card key={plan.name} className={`relative ${plan.popular ? 'border-primary shadow-lg ring-1 ring-primary/20' : ''}`}>
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <Badge className="bg-primary text-primary-foreground">Популярный</Badge>
              </div>
            )}
            <CardContent className="p-6 text-center">
              <plan.icon className={`w-10 h-10 mx-auto mb-3 ${plan.popular ? 'text-primary' : 'text-muted-foreground'}`} />
              <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
              <p className="text-sm text-muted-foreground mb-4">{plan.desc}</p>
              <p className="text-3xl font-bold mb-1">
                {plan.price}
                <span className="text-sm font-normal text-muted-foreground">{plan.period}</span>
              </p>
              <ul className="space-y-2 text-sm text-left mt-6 mb-6">
                {plan.features.map(f => (
                  <li key={f} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500 shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              {plan.current ? (
                <Button variant="outline" className="w-full" disabled>Текущий план</Button>
              ) : (
                <Button className="w-full" variant={plan.popular ? 'default' : 'outline'}>Выбрать</Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardContent className="p-6 flex items-center gap-4">
          <div className="flex items-center gap-3">
            <Shield className="w-8 h-8 text-primary" />
            <div>
              <p className="font-semibold">Нужна помощь с выбором?</p>
              <p className="text-sm text-muted-foreground">Наша команда поддержки готова помочь. Напишите нам!</p>
            </div>
          </div>
          <Button variant="outline" className="ml-auto gap-2 shrink-0"><Headphones className="w-4 h-4" /> Связаться</Button>
        </CardContent>
      </Card>
    </div>
  )
}

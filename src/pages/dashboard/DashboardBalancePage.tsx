import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useI18n } from '@/i18n/I18nProvider'
import { useAuth } from '@/hooks/useAuth'
import { Wallet, Coins, Sparkles, CreditCard, ArrowUpRight, ArrowDownLeft, Plus } from 'lucide-react'

const mockTransactions = [
  { id: 't1', type: 'credit', amount: 500, label: 'Бонус при регистрации', date: '2026-04-10', currency: 'UAH' },
  { id: 't2', type: 'debit', amount: 200, label: 'Оплата инфо-пакета', date: '2026-04-09', currency: 'UAH' },
  { id: 't3', type: 'credit', amount: 1200, label: 'Пополнение баланса', date: '2026-04-07', currency: 'UAH' },
]

export function DashboardBalancePage() {
  const { t } = useI18n()
  const { user } = useAuth()

  const balance = user?.balance ?? 0
  const credits = user?.credits ?? 0
  const aiTokens = user?.aiTokens ?? 0

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">{t('dashboard.balance')}</h1>

      {/* Balance cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
          <CardContent className="p-5">
            <div className="flex items-center gap-2 mb-3">
              <Wallet className="w-5 h-5 text-primary" />
              <span className="text-sm text-muted-foreground">{t('dashboard.mainBalance')}</span>
            </div>
            <p className="text-3xl font-bold">{balance} <span className="text-lg font-normal text-muted-foreground">UAH</span></p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center gap-2 mb-3">
              <Coins className="w-5 h-5 text-yellow-500" />
              <span className="text-sm text-muted-foreground">{t('dashboard.credits')}</span>
            </div>
            <p className="text-3xl font-bold">{credits} <span className="text-lg font-normal text-muted-foreground">{t('dashboard.creditsUnit')}</span></p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-5 h-5 text-purple-500" />
              <span className="text-sm text-muted-foreground">{t('dashboard.aiTokens')}</span>
            </div>
            <p className="text-3xl font-bold">{aiTokens} <span className="text-lg font-normal text-muted-foreground">{t('dashboard.tokensUnit')}</span></p>
          </CardContent>
        </Card>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-3">
        <Button className="gap-2">
          <Plus className="w-4 h-4" />{t('dashboard.topUp')}
        </Button>
        <Button variant="outline" className="gap-2">
          <CreditCard className="w-4 h-4" />{t('dashboard.paymentMethods')}
        </Button>
      </div>

      {/* Transaction history */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">{t('dashboard.transactionHistory')}</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y">
            {mockTransactions.map(tx => (
              <div key={tx.id} className="flex items-center justify-between px-5 py-3.5">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${tx.type === 'credit' ? 'bg-green-500/10' : 'bg-red-500/10'}`}>
                    {tx.type === 'credit'
                      ? <ArrowDownLeft className="w-4 h-4 text-green-500" />
                      : <ArrowUpRight className="w-4 h-4 text-red-500" />}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{tx.label}</p>
                    <p className="text-xs text-muted-foreground">{tx.date}</p>
                  </div>
                </div>
                <Badge variant={tx.type === 'credit' ? 'success' : 'destructive'} className="text-sm font-semibold">
                  {tx.type === 'credit' ? '+' : '-'}{tx.amount} {tx.currency}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

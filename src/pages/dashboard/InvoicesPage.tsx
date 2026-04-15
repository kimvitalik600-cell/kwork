import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useI18n } from '@/i18n/I18nProvider'
import { Receipt, Download, Eye } from 'lucide-react'

const mockInvoices = [
  { id: 'INV-2026-001', date: '10.04.2026', amount: '7,300 UAH', status: 'paid', desc: 'Заявка REQ-001 — 2 товара' },
  { id: 'INV-2026-002', date: '08.04.2026', amount: '350 UAH', status: 'pending', desc: 'Заявка REQ-002 — цифровой ключ' },
  { id: 'INV-2026-003', date: '05.04.2026', amount: '5,400 UAH', status: 'paid', desc: 'Заявка REQ-003 — аксессуары' },
  { id: 'INV-2026-004', date: '01.04.2026', amount: '1,200 UAH', status: 'paid', desc: 'Заявка REQ-004 — SMM-пакет' },
  { id: 'INV-2026-005', date: '20.03.2026', amount: '2,000 UAH', status: 'overdue', desc: 'Пополнение баланса' },
]

export function InvoicesPage() {
  const { t } = useI18n()
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">{t('dashboard.invoices')}</h1>

      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2"><Receipt className="w-4 h-4" /> Все инвойсы</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y">
            {mockInvoices.map(inv => (
              <div key={inv.id} className="flex items-center justify-between px-5 py-4">
                <div className="flex items-center gap-3">
                  <Receipt className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-semibold">{inv.id}</p>
                    <p className="text-xs text-muted-foreground">{inv.date} · {inv.desc}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant={inv.status === 'paid' ? 'success' : inv.status === 'overdue' ? 'destructive' : 'warning'}>
                    {inv.status}
                  </Badge>
                  <span className="font-semibold text-sm min-w-[100px] text-right">{inv.amount}</span>
                  <Button variant="ghost" size="sm"><Eye className="w-4 h-4" /></Button>
                  <Button variant="ghost" size="sm"><Download className="w-4 h-4" /></Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

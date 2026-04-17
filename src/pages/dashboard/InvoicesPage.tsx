import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useI18n } from '@/i18n/I18nProvider'
import { Receipt, Download, Eye, X } from 'lucide-react'

const mockInvoices = [
  { id: 'INV-2026-001', date: '10.04.2026', amount: '7,300 UAH', status: 'paid', desc: 'Заявка REQ-001 — 2 товара',
    items: [{ name: 'Vintage Jacket RAF SIMONS', qty: 1, price: '4,800 UAH' }, { name: 'Кожаная сумка (IT)', qty: 1, price: '2,500 UAH' }] },
  { id: 'INV-2026-002', date: '08.04.2026', amount: '350 UAH', status: 'pending', desc: 'Заявка REQ-002 — цифровой ключ',
    items: [{ name: 'Цифровой ключ активации', qty: 1, price: '350 UAH' }] },
  { id: 'INV-2026-003', date: '05.04.2026', amount: '5,400 UAH', status: 'paid', desc: 'Заявка REQ-003 — аксессуары',
    items: [{ name: 'Ремень кожаный', qty: 2, price: '1,200 UAH' }, { name: 'Кошелёк брендовый', qty: 1, price: '3,000 UAH' }] },
  { id: 'INV-2026-004', date: '01.04.2026', amount: '1,200 UAH', status: 'paid', desc: 'Заявка REQ-004 — SMM-пакет',
    items: [{ name: 'SMM-пакет «Стандарт»', qty: 1, price: '1,200 UAH' }] },
  { id: 'INV-2026-005', date: '20.03.2026', amount: '2,000 UAH', status: 'overdue', desc: 'Пополнение баланса',
    items: [{ name: 'Пополнение баланса', qty: 1, price: '2,000 UAH' }] },
]

export function InvoicesPage() {
  const { t } = useI18n()
  const [viewId, setViewId] = useState<string | null>(null)
  const viewed = mockInvoices.find(i => i.id === viewId)

  const handleDownload = (inv: typeof mockInvoices[0]) => {
    const text = [
      `ИНВОЙС ${inv.id}`,
      `Дата: ${inv.date}`,
      `Статус: ${inv.status}`,
      '',
      'Позиции:',
      ...inv.items.map((it, i) => `  ${i + 1}. ${it.name} × ${it.qty} — ${it.price}`),
      '',
      `ИТОГО: ${inv.amount}`,
      '',
      '— RULWEAR.ORG —',
    ].join('\n')
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${inv.id}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

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
                  <Button variant="ghost" size="sm" onClick={() => setViewId(inv.id)} title="Просмотр"><Eye className="w-4 h-4" /></Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDownload(inv)} title="Скачать"><Download className="w-4 h-4" /></Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {viewed && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4" onClick={() => setViewId(null)}>
          <div className="bg-background rounded-xl max-w-md w-full shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between p-5 border-b">
              <h3 className="font-semibold">Инвойс {viewed.id}</h3>
              <Button variant="ghost" size="sm" onClick={() => setViewId(null)}><X className="w-4 h-4" /></Button>
            </div>
            <div className="p-5 space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Дата</span>
                <span>{viewed.date}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Статус</span>
                <Badge variant={viewed.status === 'paid' ? 'success' : viewed.status === 'overdue' ? 'destructive' : 'warning'}>{viewed.status}</Badge>
              </div>
              <div className="border-t pt-3 space-y-2">
                {viewed.items.map((it, i) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span>{it.name} × {it.qty}</span>
                    <span className="font-medium">{it.price}</span>
                  </div>
                ))}
              </div>
              <div className="border-t pt-3 flex justify-between font-semibold">
                <span>Итого</span>
                <span>{viewed.amount}</span>
              </div>
              <Button className="w-full gap-2" onClick={() => { handleDownload(viewed); setViewId(null) }}>
                <Download className="w-4 h-4" /> Скачать инвойс
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

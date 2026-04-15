import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { useI18n } from '@/i18n/I18nProvider'
import { LifeBuoy, MessageCircle, Send, CheckCircle } from 'lucide-react'

const mockTickets = [
  { id: 'TK-001', subject: 'Проблема с оплатой заявки', status: 'open', date: '10.04.2026', lastReply: '10.04.2026 15:00' },
  { id: 'TK-002', subject: 'Вопрос по верификации', status: 'answered', date: '07.04.2026', lastReply: '08.04.2026 10:30' },
  { id: 'TK-003', subject: 'Ошибка при генерации AI изображения', status: 'closed', date: '02.04.2026', lastReply: '03.04.2026 09:00' },
]

export function SupportPage() {
  const { t } = useI18n()
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!subject.trim() || !message.trim()) return
    setSent(true)
    setSubject('')
    setMessage('')
    setTimeout(() => setSent(false), 3000)
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">{t('dashboard.support')}</h1>

      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2"><Send className="w-4 h-4" /> Новый тикет</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
            <div className="space-y-1.5">
              <Label htmlFor="subject">Тема</Label>
              <Input id="subject" value={subject} onChange={e => setSubject(e.target.value)} placeholder="Коротко опишите проблему" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="msg">Сообщение</Label>
              <textarea id="msg" className="w-full border rounded-lg p-3 text-sm bg-background min-h-[100px] resize-y" placeholder="Подробно опишите вашу проблему..." value={message} onChange={e => setMessage(e.target.value)} />
            </div>
            <div className="flex items-center gap-3">
              <Button type="submit" className="gap-2"><Send className="w-4 h-4" /> Отправить</Button>
              {sent && <span className="flex items-center gap-1.5 text-sm text-green-600"><CheckCircle className="w-4 h-4" /> Тикет создан!</span>}
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2"><LifeBuoy className="w-4 h-4" /> Мои тикеты</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y">
            {mockTickets.map(tk => (
              <div key={tk.id} className="flex items-center justify-between px-5 py-4">
                <div className="flex items-center gap-3">
                  <MessageCircle className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-semibold">{tk.subject}</p>
                    <p className="text-xs text-muted-foreground">{tk.id} · {tk.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant={tk.status === 'open' ? 'warning' : tk.status === 'answered' ? 'info' : 'secondary'}>
                    {tk.status}
                  </Badge>
                  <span className="text-xs text-muted-foreground hidden sm:inline">{tk.lastReply}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

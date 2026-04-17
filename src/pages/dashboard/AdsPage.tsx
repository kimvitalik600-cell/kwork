import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useI18n } from '@/i18n/I18nProvider'
import { Megaphone, Eye, Edit, Plus, X } from 'lucide-react'

const defaultAds = [
  { id: 'AD-001', title: 'Продаю: Vintage Jacket RAF SIMONS', status: 'active', views: 124, date: '10.04.2026', price: '2,500 UAH', description: 'Оригинальная винтажная куртка в отличном состоянии.' },
  { id: 'AD-002', title: 'Продаю: Коллекция книг (PDF)', status: 'active', views: 56, date: '08.04.2026', price: '350 UAH', description: 'Коллекция из 50+ книг в PDF формате.' },
  { id: 'AD-003', title: 'Услуга: SMM-продвижение', status: 'paused', views: 89, date: '01.04.2026', price: '1,200 UAH', description: 'Полный пакет SMM-продвижения на месяц.' },
  { id: 'AD-004', title: 'Продаю: Smartwatch Premium', status: 'expired', views: 210, date: '15.03.2026', price: '4,800 UAH', description: 'Смарт-часы премиум класса. Полный комплект.' },
]

type Ad = typeof defaultAds[0]

export function AdsPage() {
  const { t } = useI18n()
  const [ads, setAds] = useState(defaultAds)
  const [editAd, setEditAd] = useState<Ad | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [form, setForm] = useState({ title: '', price: '', description: '' })

  const openCreate = () => {
    setForm({ title: '', price: '', description: '' })
    setIsCreating(true)
    setEditAd(null)
  }

  const openEdit = (ad: Ad) => {
    setForm({ title: ad.title, price: ad.price, description: ad.description })
    setEditAd(ad)
    setIsCreating(false)
  }

  const handleSave = () => {
    if (!form.title.trim()) return
    if (editAd) {
      setAds(prev => prev.map(a => a.id === editAd.id ? { ...a, title: form.title, price: form.price, description: form.description } : a))
    } else {
      const newAd: Ad = {
        id: `AD-${String(ads.length + 1).padStart(3, '0')}`,
        title: form.title,
        status: 'active',
        views: 0,
        date: new Date().toLocaleDateString('uk-UA'),
        price: form.price,
        description: form.description,
      }
      setAds(prev => [newAd, ...prev])
    }
    setEditAd(null)
    setIsCreating(false)
  }

  const showForm = isCreating || editAd

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{t('dashboard.myAds')}</h1>
        <Button className="gap-2" onClick={openCreate}><Plus className="w-4 h-4" /> Создать объявление</Button>
      </div>
      <div className="space-y-3">
        {ads.map(ad => (
          <Card key={ad.id} className="hover:shadow-sm transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Megaphone className="w-8 h-8 text-primary" />
                  <div>
                    <p className="font-semibold">{ad.title}</p>
                    <p className="text-sm text-muted-foreground">{ad.id} · {ad.date} · <Eye className="w-3 h-3 inline" /> {ad.views}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant={ad.status === 'active' ? 'success' : ad.status === 'paused' ? 'warning' : 'secondary'}>
                    {ad.status}
                  </Badge>
                  <span className="font-semibold text-sm">{ad.price}</span>
                  <Button variant="ghost" size="sm" onClick={() => openEdit(ad)}><Edit className="w-4 h-4" /></Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4" onClick={() => { setIsCreating(false); setEditAd(null) }}>
          <div className="bg-background rounded-xl max-w-md w-full shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between p-5 border-b">
              <h3 className="font-semibold">{editAd ? 'Редактировать объявление' : 'Новое объявление'}</h3>
              <Button variant="ghost" size="sm" onClick={() => { setIsCreating(false); setEditAd(null) }}><X className="w-4 h-4" /></Button>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Название</label>
                <input
                  className="w-full rounded-lg border bg-background px-3 py-2 text-sm"
                  value={form.title}
                  onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                  placeholder="Продаю: ..."
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Цена</label>
                <input
                  className="w-full rounded-lg border bg-background px-3 py-2 text-sm"
                  value={form.price}
                  onChange={e => setForm(f => ({ ...f, price: e.target.value }))}
                  placeholder="1,000 UAH"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Описание</label>
                <textarea
                  className="w-full rounded-lg border bg-background px-3 py-2 text-sm min-h-[80px]"
                  value={form.description}
                  onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                  placeholder="Подробное описание..."
                />
              </div>
              <Button className="w-full" onClick={handleSave}>
                {editAd ? 'Сохранить' : 'Создать'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

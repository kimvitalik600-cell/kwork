import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useI18n } from '@/i18n/I18nProvider'
import { useInfoPackage } from '@/hooks/useInfoPackage'
import { mockObjects, mockCategories } from '@/data/mockData'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import type { ObjectType, ObjectStatus } from '@/types'
import {
  Package, BookOpen, FileText, Search, SlidersHorizontal,
  ChevronRight, X, ArrowUpDown, ShoppingBag, Megaphone, Sparkles,
} from 'lucide-react'

const typeVisuals: Record<string, { gradient: string; icon: typeof Package; emoji: string }> = {
  material: { gradient: 'from-blue-500/20 to-cyan-500/20', icon: ShoppingBag, emoji: '👕' },
  digital: { gradient: 'from-purple-500/20 to-pink-500/20', icon: BookOpen, emoji: '📱' },
  service: { gradient: 'from-green-500/20 to-emerald-500/20', icon: Megaphone, emoji: '🚀' },
  ai_content: { gradient: 'from-orange-500/20 to-yellow-500/20', icon: Sparkles, emoji: '🎨' },
}

const categoryVisuals: Record<string, string> = {
  'cat-1': '🧥', // material assets
  'cat-2': '📚', // digital books
  'cat-3': '🔑', // keys/promo
  'cat-4': '👤', // accounts
  'cat-5': '📢', // promo services
  'cat-6': '🧊', // 3d models
  'cat-7': '🖼️', // ai arts
  'cat-8': '✨', // user content
}

export function CatalogPage() {
  const { t, lang } = useI18n()
  const { addItem, hasItem } = useInfoPackage()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedType, setSelectedType] = useState<ObjectType | ''>('')
  const [selectedStatus, setSelectedStatus] = useState<ObjectStatus | ''>('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [showFilters, setShowFilters] = useState(true)
  const [sortBy, setSortBy] = useState<'date' | 'compensation' | 'views' | 'comments'>('date')

  const getText = (obj: Record<string, string>) => obj[lang] || obj.ru || ''

  const filteredObjects = useMemo(() => {
    let result = [...mockObjects]
    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      result = result.filter(o =>
        getText(o.title).toLowerCase().includes(q) ||
        getText(o.shortDescription).toLowerCase().includes(q)
      )
      // When searching, skip category filter so results span all categories
    } else {
      if (selectedCategory) result = result.filter(o => o.categoryId === selectedCategory)
    }
    if (selectedType) result = result.filter(o => o.type === selectedType)
    if (selectedStatus) result = result.filter(o => o.status === selectedStatus)

    result.sort((a, b) => {
      switch (sortBy) {
        case 'compensation': return b.compensation - a.compensation
        case 'views': return b.viewCount - a.viewCount
        case 'comments': return b.commentCount - a.commentCount
        default: return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      }
    })
    return result
  }, [searchQuery, selectedType, selectedStatus, selectedCategory, sortBy, lang])

  const statusBadge = (status: string) => {
    const variants: Record<string, 'success' | 'warning' | 'info' | 'secondary'> = {
      available: 'success', reserved: 'warning', verified: 'info', extracted: 'secondary',
    }
    return <Badge variant={variants[status] || 'secondary'}>{t(`status.${status}`)}</Badge>
  }

  const objectTypes: { value: ObjectType; label: string }[] = [
    { value: 'material', label: t('type.material') },
    { value: 'digital', label: t('type.digital') },
    { value: 'service', label: t('type.service') },
    { value: 'ai_content', label: t('type.aiContent') },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-1 text-sm text-muted-foreground mb-6">
        <Link to="/" className="hover:text-foreground">{t('nav.home')}</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-foreground font-medium">{t('catalog.title')}</span>
      </nav>

      <h1 className="text-3xl font-bold mb-6">{t('catalog.title')}</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters sidebar */}
        {showFilters && (
          <aside className="lg:w-72 shrink-0 space-y-6">
            <Card>
              <CardContent className="p-4 space-y-5">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold flex items-center gap-2">
                    <SlidersHorizontal className="w-4 h-4" />
                    {t('catalog.filters')}
                  </h3>
                  <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setShowFilters(false)}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>

                {/* Search */}
                <div>
                  <Label className="text-xs mb-1.5 block">{t('common.search')}</Label>
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
                    <Input
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      placeholder={t('common.search')}
                      className="pl-9"
                    />
                  </div>
                </div>

                {/* Category */}
                <div>
                  <Label className="text-xs mb-1.5 block">{t('catalog.category')}</Label>
                  <div className="space-y-1">
                    <button
                      onClick={() => setSelectedCategory('')}
                      className={`w-full text-left px-3 py-1.5 rounded text-sm ${!selectedCategory ? 'bg-primary text-primary-foreground' : 'hover:bg-accent'}`}
                    >
                      {t('common.all')}
                    </button>
                    {mockCategories.map(cat => (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`w-full text-left px-3 py-1.5 rounded text-sm ${selectedCategory === cat.id ? 'bg-primary text-primary-foreground' : 'hover:bg-accent'}`}
                      >
                        {getText(cat.name)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Object type */}
                <div>
                  <Label className="text-xs mb-1.5 block">{t('catalog.objectType')}</Label>
                  <div className="space-y-1">
                    <button
                      onClick={() => setSelectedType('')}
                      className={`w-full text-left px-3 py-1.5 rounded text-sm ${!selectedType ? 'bg-primary text-primary-foreground' : 'hover:bg-accent'}`}
                    >
                      {t('common.all')}
                    </button>
                    {objectTypes.map(ot => (
                      <button
                        key={ot.value}
                        onClick={() => setSelectedType(ot.value)}
                        className={`w-full text-left px-3 py-1.5 rounded text-sm ${selectedType === ot.value ? 'bg-primary text-primary-foreground' : 'hover:bg-accent'}`}
                      >
                        {ot.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Status */}
                <div>
                  <Label className="text-xs mb-1.5 block">{t('catalog.status')}</Label>
                  <div className="space-y-1">
                    <button
                      onClick={() => setSelectedStatus('')}
                      className={`w-full text-left px-3 py-1.5 rounded text-sm ${!selectedStatus ? 'bg-primary text-primary-foreground' : 'hover:bg-accent'}`}
                    >
                      {t('common.all')}
                    </button>
                    {(['available', 'verified', 'reserved', 'extracted'] as ObjectStatus[]).map(s => (
                      <button
                        key={s}
                        onClick={() => setSelectedStatus(s)}
                        className={`w-full text-left px-3 py-1.5 rounded text-sm ${selectedStatus === s ? 'bg-primary text-primary-foreground' : 'hover:bg-accent'}`}
                      >
                        {t(`status.${s}`)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Clear filters */}
                <Button variant="outline" size="sm" className="w-full" onClick={() => {
                  setSearchQuery(''); setSelectedType(''); setSelectedStatus(''); setSelectedCategory('')
                }}>
                  {t('catalog.resetFilters')}
                </Button>
              </CardContent>
            </Card>
          </aside>
        )}

        {/* Object list */}
        <div className="flex-1">
          {/* Sort bar */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-muted-foreground">
              {t('catalog.found')}: <span className="font-medium text-foreground">{filteredObjects.length}</span> {t('catalog.objectsCount')}
            </p>
            <div className="flex items-center gap-2">
              {!showFilters && (
                <Button variant="outline" size="sm" onClick={() => setShowFilters(true)} className="lg:hidden gap-1">
                  <SlidersHorizontal className="w-4 h-4" /> {t('catalog.filters')}
                </Button>
              )}
              <div className="flex items-center gap-1">
                <ArrowUpDown className="w-4 h-4 text-muted-foreground" />
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value as typeof sortBy)}
                  className="text-sm bg-background border rounded px-2 py-1"
                >
                  <option value="date">{t('catalog.sortByDate')}</option>
                  <option value="compensation">{t('catalog.sortByCompensation')}</option>
                  <option value="views">{t('catalog.sortByViews')}</option>
                  <option value="comments">{t('catalog.sortByComments')}</option>
                </select>
              </div>
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredObjects.map(obj => (
              <Card key={obj.id} className="group card-hover overflow-hidden">
                <div className={`aspect-[4/3] relative bg-gradient-to-br ${typeVisuals[obj.type]?.gradient || 'from-muted to-muted/50'}`}>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-5xl mb-2">{categoryVisuals[obj.categoryId] || typeVisuals[obj.type]?.emoji || '📦'}</span>
                    {(() => { const Icon = typeVisuals[obj.type]?.icon || Package; return <Icon className="w-8 h-8 text-foreground/10" /> })()}
                  </div>
                  <div className="absolute top-2 left-2 flex gap-1">
                    {statusBadge(obj.status)}
                  </div>
                  <div className="absolute top-2 right-2">
                    <Badge variant="outline" className="bg-background/80 backdrop-blur">
                      {t(`type.${obj.type}`)}
                    </Badge>
                  </div>
                  {obj.boxLabel && (
                    <div className="absolute bottom-2 left-2">
                      <Badge variant="secondary" className="text-xs">
                        {obj.boxLabel}
                      </Badge>
                    </div>
                  )}
                </div>
                <CardContent className="p-4">
                  <p className="text-xs text-muted-foreground mb-1">ID: {obj.id}</p>
                  <h3 className="font-semibold text-sm mb-1 line-clamp-2 group-hover:text-primary transition-colors">
                    <Link to={`/object/${obj.slug}`}>{getText(obj.title)}</Link>
                  </h3>
                  <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{getText(obj.shortDescription)}</p>

                  <Separator className="my-3" />

                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="text-xs text-muted-foreground">{t('term.compensation')}</p>
                      <span className="font-bold text-primary">{obj.compensation} {obj.currency}</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      {obj.hasPdfProtocol && (
                        <span className="flex items-center gap-1" title={t('catalog.hasPdf')}>
                          <FileText className="w-3.5 h-3.5" /> PDF
                        </span>
                      )}
                      {obj.hasUnpacking && (
                        <span className="flex items-center gap-1" title={t('catalog.hasUnpacking')}>
                          <BookOpen className="w-3.5 h-3.5" />
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Link to={`/object/${obj.slug}`} className="flex-1">
                      <Button variant="outline" size="sm" className="w-full text-xs gap-1">
                        {t('catalog.details')} <ChevronRight className="w-3 h-3" />
                      </Button>
                    </Link>
                    {obj.hasPdfProtocol && (
                      <Button variant="ghost" size="sm" className="text-xs" title={t('catalog.viewProtocol')}>
                        <FileText className="w-4 h-4" />
                      </Button>
                    )}
                    <Button
                      size="sm"
                      className="text-xs"
                      disabled={hasItem(obj.id)}
                      onClick={() => addItem(obj)}
                      title={t('term.addToInfoPackage')}
                    >
                      {hasItem(obj.id) ? '✓' : '+'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredObjects.length === 0 && (
            <div className="text-center py-16 text-muted-foreground">
              <Package className="w-12 h-12 mx-auto mb-4 opacity-30" />
              <p>{t('catalog.noResults')}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

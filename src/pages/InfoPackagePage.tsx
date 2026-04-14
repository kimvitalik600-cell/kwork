import { Link } from 'react-router-dom'
import { useI18n } from '@/i18n/I18nProvider'
import { useInfoPackage } from '@/hooks/useInfoPackage'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Package, Trash2, ChevronRight, ShoppingBag, ArrowLeft } from 'lucide-react'

export function InfoPackagePage() {
  const { t, lang } = useI18n()
  const { items, removeItem, clearPackage, totalCompensation } = useInfoPackage()

  const getText = (obj: Record<string, string>) => obj[lang] || obj.ru || ''

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <Package className="w-16 h-16 mx-auto mb-4 text-muted-foreground/30" />
        <h1 className="text-2xl font-bold mb-2">{t('infoPackage.title')}</h1>
        <p className="text-muted-foreground mb-6">{t('infoPackage.empty')}</p>
        <Link to="/catalog">
          <Button className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            {t('infoPackage.continueBrowsing')}
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-1 text-sm text-muted-foreground mb-6">
        <Link to="/" className="hover:text-foreground">{t('nav.home')}</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-foreground font-medium">{t('infoPackage.title')}</span>
      </nav>

      <h1 className="text-3xl font-bold mb-8">{t('infoPackage.title')}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Items list */}
        <div className="lg:col-span-2 space-y-4">
          {items.map(item => (
            <Card key={item.objectId} className="overflow-hidden">
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <div className="w-24 h-24 bg-muted rounded-lg flex items-center justify-center shrink-0">
                    <Package className="w-8 h-8 text-muted-foreground/30" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <Link to={`/object/${item.object.slug}`} className="font-semibold hover:text-primary transition-colors">
                          {getText(item.object.title)}
                        </Link>
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-1">
                          {getText(item.object.shortDescription)}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="outline">{t(`type.${item.object.type}`)}</Badge>
                          <Badge variant={item.object.status === 'available' ? 'success' : 'secondary'}>
                            {t(`status.${item.object.status}`)}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="font-bold text-primary">{item.object.compensation} {item.object.currency}</p>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="mt-1 text-destructive hover:text-destructive"
                          onClick={() => removeItem(item.objectId)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Summary */}
        <div>
          <Card className="sticky top-24">
            <CardContent className="p-6 space-y-4">
              <h3 className="font-semibold text-lg">{t('infoPackage.title')}</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t('infoPackage.itemCount')}</span>
                  <span className="font-medium">{items.length}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-base">
                  <span className="font-medium">{t('infoPackage.total')}</span>
                  <span className="font-bold text-primary">{totalCompensation} UAH</span>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <Link to="/request/checkout">
                  <Button className="w-full gap-2" size="lg">
                    <ShoppingBag className="w-4 h-4" />
                    {t('infoPackage.submitRequest')}
                  </Button>
                </Link>
                <Link to="/catalog">
                  <Button variant="outline" className="w-full gap-2">
                    <ArrowLeft className="w-4 h-4" />
                    {t('infoPackage.continueBrowsing')}
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  className="w-full text-destructive hover:text-destructive"
                  onClick={clearPackage}
                >
                  {t('infoPackage.clear')}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

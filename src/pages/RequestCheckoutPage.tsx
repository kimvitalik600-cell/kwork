import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useI18n } from '@/i18n/I18nProvider'
import { useInfoPackage } from '@/hooks/useInfoPackage'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Package, ChevronRight, CheckCircle } from 'lucide-react'

export function RequestCheckoutPage() {
  const { t, lang } = useI18n()
  const { items, totalCompensation } = useInfoPackage()
  const [offerAccepted, setOfferAccepted] = useState(false)
  const [country, setCountry] = useState('UA')

  const getText = (obj: Record<string, string>) => obj[lang] || obj.ru || ''

  const hasPhysical = items.some(i => i.object.type === 'material')

  return (
    <div className="container mx-auto px-4 py-8">
      <nav className="flex items-center gap-1 text-sm text-muted-foreground mb-6">
        <Link to="/" className="hover:text-foreground">{t('nav.home')}</Link>
        <ChevronRight className="w-3 h-3" />
        <Link to="/info-package" className="hover:text-foreground">{t('infoPackage.title')}</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-foreground font-medium">{t('request.title')}</span>
      </nav>

      <h1 className="text-3xl font-bold mb-8">{t('request.title')}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Contact info */}
          <Card>
            <CardHeader><CardTitle>{t('request.contactInfo')}</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label>{t('request.email')} *</Label>
                  <Input type="email" placeholder="your@email.com" />
                </div>
                <div>
                  <Label>{t('request.telegram')}</Label>
                  <Input placeholder="@username" />
                </div>
                <div>
                <Label>{t('request.viber')}</Label>
                  <Input placeholder="+380..." />
                </div>
                <div>
                  <Label>{t('request.phone')}</Label>
                  <Input placeholder="+380..." />
                </div>
              </div>
              <div>
                <Label>{t('request.preferredContact')}</Label>
                <select className="w-full mt-1 border rounded-md px-3 py-2 text-sm bg-background">
                  <option>Email</option>
                  <option>Telegram</option>
                  <option>Viber</option>
                  <option>{t('request.phone')}</option>
                </select>
              </div>
            </CardContent>
          </Card>

          {/* Delivery (only for physical) */}
          {hasPhysical && (
            <Card>
              <CardHeader><CardTitle>{t('request.delivery')}</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label>{t('request.country')} *</Label>
                    <select
                      className="w-full mt-1 border rounded-md px-3 py-2 text-sm bg-background"
                      value={country}
                      onChange={e => setCountry(e.target.value)}
                    >
                      <option value="UA">{t('request.ukraine')}</option>
                      <option value="PL">{t('request.poland')}</option>
                      <option value="DE">{t('request.germany')}</option>
                      <option value="US">{t('request.usa')}</option>
                      <option value="other">{t('request.otherCountry')}</option>
                    </select>
                  </div>
                  <div>
                    <Label>{t('request.city')}</Label>
                    <Input placeholder={t('request.cityPlaceholder')} />
                  </div>
                </div>

                {country === 'UA' && (
                  <div>
                    <Label>{t('request.deliveryMethod')} *</Label>
                    <div className="space-y-2 mt-2">
                      {['Нова пошта', 'Укрпошта', 'Meest'].map(m => (
                        <label key={m} className="flex items-center gap-3 p-3 border rounded-md cursor-pointer hover:bg-accent transition-colors">
                          <input type="radio" name="delivery" value={m} className="accent-primary" />
                          <span className="text-sm">{m}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {country !== 'UA' && (
                  <div className="space-y-4">
                    <div>
                      <Label>{t('request.fullAddress')}</Label>
                      <Input placeholder="Full address" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>{t('request.postalCode')}</Label>
                        <Input placeholder="Postal code" />
                      </div>
                      <div>
                        <Label>{t('request.recipientName')}</Label>
                        <Input placeholder="Full name" />
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Payment */}
          <Card>
            <CardHeader><CardTitle>{t('request.paymentMethod')}</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              {[
                { value: 'betatransfer', label: 'Betatransfer' },
                { value: 'balance', label: t('request.internalBalance') },
                { value: 'crypto', label: t('request.crypto') },
                { value: 'manual', label: t('request.manualConfirm') },
              ].map(pm => (
                <label key={pm.value} className="flex items-center gap-3 p-3 border rounded-md cursor-pointer hover:bg-accent transition-colors">
                  <input type="radio" name="payment" value={pm.value} className="accent-primary" />
                  <span className="text-sm">{pm.label}</span>
                </label>
              ))}
            </CardContent>
          </Card>

          {/* Comment */}
          <Card>
            <CardHeader><CardTitle>{t('request.comment')}</CardTitle></CardHeader>
            <CardContent>
              <textarea
                className="w-full border rounded-md p-3 text-sm bg-background min-h-[100px] resize-y"
                placeholder={t('request.commentPlaceholder')}
              />
            </CardContent>
          </Card>
        </div>

        {/* Summary */}
        <div>
          <Card className="sticky top-24">
            <CardContent className="p-6 space-y-4">
              <h3 className="font-semibold">{t('request.summary')}</h3>
              <div className="space-y-3">
                {items.map(item => (
                  <div key={item.objectId} className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-muted rounded flex items-center justify-center shrink-0">
                      <Package className="w-4 h-4 text-muted-foreground/40" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium line-clamp-1">{getText(item.object.title)}</p>
                      <p className="text-xs text-primary font-semibold">{item.object.compensation} {item.object.currency}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Separator />
              <div className="flex justify-between font-semibold">
                <span>{t('infoPackage.total')}</span>
                <span className="text-primary">{totalCompensation} UAH</span>
              </div>

              {/* Offer consent */}
              <label className="flex items-start gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={offerAccepted}
                  onChange={e => setOfferAccepted(e.target.checked)}
                  className="accent-primary mt-1"
                />
                <span className="text-xs text-muted-foreground">
                  {t('request.offerConsent')}{' '}
                  <Link to="/offer" className="text-primary hover:underline">{t('request.offer')}</Link>
                </span>
              </label>

              <Button className="w-full gap-2" size="lg" disabled={!offerAccepted}>
                <CheckCircle className="w-4 h-4" />
                {t('infoPackage.submitRequest')}
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                {t('request.paymentPurpose')}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

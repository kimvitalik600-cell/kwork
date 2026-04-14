import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useI18n } from '@/i18n/I18nProvider'
import { Store, Shield, Users, Megaphone, ChevronRight, ArrowRight, ShoppingBag, Star, Lock } from 'lucide-react'

export function MarketPage() {
  const { t } = useI18n()
  const [activeCard, setActiveCard] = useState<number | null>(null)

  const features = [
    {
      icon: Users,
      title: 'P2P',
      desc: t('market.p2pDesc'),
      details: t('market.p2pDetails'),
      badge: t('market.badgeSoon'),
    },
    {
      icon: Shield,
      title: t('market.moderation'),
      desc: t('market.moderationDesc'),
      details: t('market.moderationDetails'),
      badge: t('market.badgeActive'),
    },
    {
      icon: Megaphone,
      title: t('market.promotion'),
      desc: t('market.promotionDesc'),
      details: t('market.promotionDetails'),
      badge: t('market.badgeCredits'),
    },
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
            <Store className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">{t('market.title')}</h1>
            <p className="text-muted-foreground">{t('market.desc')}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 my-8">
          {[
            { icon: ShoppingBag, value: '0', label: t('market.activeListings') },
            { icon: Star, value: '—', label: t('market.completedDeals') },
            { icon: Lock, value: '100%', label: t('market.safeDeals') },
          ].map((stat, i) => (
            <Card key={i}>
              <CardContent className="p-4 flex items-center gap-3">
                <stat.icon className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-xl font-bold">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {features.map((item, i) => (
            <Card
              key={i}
              className={`card-hover cursor-pointer transition-all ${activeCard === i ? 'ring-2 ring-primary shadow-lg' : ''}`}
              onClick={() => setActiveCard(activeCard === i ? null : i)}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <item.icon className="w-8 h-8 text-primary" />
                  <Badge variant={i === 1 ? 'success' : 'secondary'}>{item.badge}</Badge>
                </div>
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">{item.desc}</p>
                {activeCard === i && (
                  <div className="pt-3 border-t animate-in fade-in">
                    <p className="text-sm text-muted-foreground">{item.details}</p>
                  </div>
                )}
                <div className="flex items-center gap-1 text-primary text-sm mt-3">
                  {t('home.details')} <ChevronRight className="w-4 h-4" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <Card className="bg-gradient-to-r from-primary/5 to-accent/10 border-primary/20">
          <CardContent className="p-8 text-center">
            <h3 className="text-xl font-bold mb-2">{t('market.ctaTitle')}</h3>
            <p className="text-muted-foreground mb-4 max-w-lg mx-auto">{t('market.ctaDesc')}</p>
            <Button size="lg" className="gap-2">
              {t('market.ctaButton')} <ArrowRight className="w-4 h-4" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

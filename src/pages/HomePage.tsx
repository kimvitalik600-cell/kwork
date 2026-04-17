import { Link } from 'react-router-dom'
import { useI18n } from '@/i18n/I18nProvider'
import { useInfoPackage } from '@/hooks/useInfoPackage'
import { mockObjects, mockBlogPosts, mockDonations, mockComments } from '@/data/mockData'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import {
  ArrowRight,
  Package,
  BookOpen,
  Cpu,
  UserPlus,
  Box,
  Key,
  UserCircle,
  Megaphone,
  Sparkles,
  Users,
  Heart,
  FileText,
  Eye,
  MessageCircle,
  ChevronRight,
  Zap,
  Shield,
  Clock,
  Store,
  Search,
  Lock,
  Globe,
  TrendingUp,
  CheckCircle2,
} from 'lucide-react'

export function HomePage() {
  const { t, lang } = useI18n()
  const { addItem, hasItem } = useInfoPackage()

  const getText = (obj: Record<string, string>) => obj[lang] || obj.ru || ''

  const latestObjects = mockObjects.slice(0, 4)
  const latestPosts = mockBlogPosts.filter(p => p.type === 'unpacking').slice(0, 3)
  const latestNews = mockBlogPosts.filter(p => p.type === 'news' || p.type === 'guide').slice(0, 3)
  const activeDonations = mockDonations.filter(d => d.isActive)

  const categories = [
    { icon: <Package className="w-6 h-6" />, label: t('categories.material'), to: '/catalog?type=material' },
    { icon: <BookOpen className="w-6 h-6" />, label: t('categories.digitalBooks'), to: '/catalog?cat=digital-books' },
    { icon: <Key className="w-6 h-6" />, label: t('categories.keys'), to: '/catalog?cat=keys-promo' },
    { icon: <UserCircle className="w-6 h-6" />, label: t('categories.accounts'), to: '/catalog?cat=accounts' },
    { icon: <Megaphone className="w-6 h-6" />, label: t('categories.services'), to: '/catalog?cat=services' },
    { icon: <Box className="w-6 h-6" />, label: t('categories.3dModels'), to: '/catalog?cat=3d-models' },
    { icon: <Sparkles className="w-6 h-6" />, label: t('categories.aiArts'), to: '/catalog?cat=ai-arts' },
    { icon: <Users className="w-6 h-6" />, label: t('categories.userContent'), to: '/catalog?cat=user-content' },
  ]

  const howItWorksSteps = [
    { num: 1, text: t('howItWorks.step1'), icon: <Eye className="w-5 h-5" /> },
    { num: 2, text: t('howItWorks.step2'), icon: <Package className="w-5 h-5" /> },
    { num: 3, text: t('howItWorks.step3'), icon: <FileText className="w-5 h-5" /> },
    { num: 4, text: t('howItWorks.step4'), icon: <Zap className="w-5 h-5" /> },
    { num: 5, text: t('howItWorks.step5'), icon: <Shield className="w-5 h-5" /> },
  ]

  const statusBadge = (status: string) => {
    const map: Record<string, { label: string; variant: 'success' | 'warning' | 'info' | 'secondary' }> = {
      available: { label: t('status.available'), variant: 'success' },
      reserved: { label: t('status.reserved'), variant: 'warning' },
      verified: { label: t('status.verified'), variant: 'info' },
      extracted: { label: t('status.extracted'), variant: 'secondary' },
    }
    const s = map[status] || { label: status, variant: 'secondary' as const }
    return <Badge variant={s.variant}>{s.label}</Badge>
  }

  const typeBadge = (type: string) => {
    const map: Record<string, string> = {
      material: t('type.material'),
      digital: t('type.digital'),
      service: t('type.service'),
      ai_content: t('type.aiContent'),
    }
    return <Badge variant="outline">{map[type] || type}</Badge>
  }

  const serviceHighlights = [
    { icon: Search, label: t('home.serviceSearch'), color: 'from-blue-500 to-cyan-500', to: '/catalog' },
    { icon: Shield, label: t('home.serviceVerification'), color: 'from-emerald-500 to-green-500', to: '/dashboard/verification' },
    { icon: Cpu, label: t('home.serviceAI'), color: 'from-violet-500 to-purple-500', to: '/ai' },
    { icon: Store, label: t('home.serviceMarket'), color: 'from-orange-500 to-amber-500', to: '/market' },
  ]

  const trustMetrics = [
    { value: '500+', label: t('home.trustObjects') },
    { value: '4', label: t('home.trustLangs') },
    { value: '24/7', label: t('home.trustAccess') },
    { value: '100%', label: t('home.trustSafe') },
  ]

  return (
    <div>
      {/* === Hero === */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        {/* Background */}
        <div className="absolute inset-0 -z-10 grid-pattern">
          <div className="absolute top-[-10%] left-[10%] w-[500px] h-[500px] bg-primary/8 rounded-full blur-[100px] animate-pulse-slow" />
          <div className="absolute bottom-[-10%] right-[10%] w-[400px] h-[400px] bg-info/8 rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: '2s' }} />
          <div className="absolute top-[30%] right-[30%] w-[300px] h-[300px] bg-accent/20 rounded-full blur-[80px]" />
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: text */}
            <div className="animate-slide-up">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary border border-primary/20 rounded-full px-4 py-1.5 text-sm font-medium mb-6">
                <Globe className="w-4 h-4" />
                {t('home.heroBadge')}
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-[1.1]">
                <span className="gradient-text glow-text">{t('hero.title')}</span>
              </h1>
              <p className="text-lg lg:text-xl text-muted-foreground mb-8 max-w-xl leading-relaxed">
                {t('hero.subtitle')}
              </p>
              <div className="flex flex-wrap gap-3 mb-10">
                <Link to="/catalog">
                  <Button size="xl" className="gap-2 shadow-lg shadow-primary/25">
                    <Package className="w-5 h-5" />
                    {t('hero.catalog')}
                  </Button>
                </Link>
                <Link to="/ai">
                  <Button size="xl" variant="outline" className="gap-2">
                    <Cpu className="w-5 h-5" />
                    {t('hero.aiAccess')}
                  </Button>
                </Link>
              </div>

              {/* Trust metrics */}
              <div className="grid grid-cols-4 gap-4">
                {trustMetrics.map((m, i) => (
                  <div key={i} className="text-center">
                    <p className="text-2xl font-extrabold text-foreground">{m.value}</p>
                    <p className="text-xs text-muted-foreground">{m.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: service dashboard mockup */}
            <div className="hidden lg:block animate-fade-in">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-info/20 rounded-3xl blur-2xl" />
                <Card className="relative border-border/50 shadow-2xl overflow-hidden">
                  <div className="bg-gradient-to-r from-primary to-primary/80 p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-white/30" />
                      <div className="w-3 h-3 rounded-full bg-white/30" />
                      <div className="w-3 h-3 rounded-full bg-white/30" />
                      <span className="text-white/80 text-sm ml-2 font-medium">RULWEAR.ORG</span>
                    </div>
                  </div>
                  <CardContent className="p-6 space-y-4">
                    {/* Mock service grid */}
                    <div className="grid grid-cols-2 gap-3">
                      {serviceHighlights.map((s, i) => (
                        <Link key={i} to={s.to} className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 border border-border/50 hover:bg-muted/80 hover:border-primary/30 transition-all cursor-pointer">
                          <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center`}>
                            <s.icon className="w-5 h-5 text-white" />
                          </div>
                          <span className="text-sm font-medium">{s.label}</span>
                        </Link>
                      ))}
                    </div>
                    {/* Mock stats */}
                    <div className="space-y-3 pt-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">{t('home.trustObjects')}</span>
                        <div className="flex items-center gap-1 text-success font-medium"><TrendingUp className="w-3.5 h-3.5" /> +12%</div>
                      </div>
                      <Progress value={72} className="h-2" />
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">{t('home.serviceVerification')}</span>
                        <div className="flex items-center gap-1 text-success font-medium"><CheckCircle2 className="w-3.5 h-3.5" /> 100%</div>
                      </div>
                      <Progress value={100} className="h-2" />
                    </div>
                    {/* Mock recent item */}
                    <div className="flex items-center gap-3 p-3 rounded-xl border bg-card animate-float">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Package className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{latestObjects[0] ? getText(latestObjects[0].title) : 'Object #1'}</p>
                        <p className="text-xs text-muted-foreground">{t('status.available')}</p>
                      </div>
                      <Badge variant="success" className="shrink-0">{t('status.verified')}</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* === Key Services === */}
      <section className="relative py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <Badge variant="outline" className="mb-3">{t('home.servicesLabel')}</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold mb-3">{t('home.servicesTitle')}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">{t('home.servicesSubtitle')}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Package, title: t('home.svcCatalog'), desc: t('home.svcCatalogDesc'), to: '/catalog', color: 'from-blue-500/10 to-cyan-500/10', border: 'border-blue-500/20', iconColor: 'text-blue-500' },
              { icon: BookOpen, title: t('home.svcUnpackings'), desc: t('home.svcUnpackingsDesc'), to: '/unpackings', color: 'from-emerald-500/10 to-green-500/10', border: 'border-emerald-500/20', iconColor: 'text-emerald-500' },
              { icon: Cpu, title: t('home.svcAI'), desc: t('home.svcAIDesc'), to: '/ai', color: 'from-violet-500/10 to-purple-500/10', border: 'border-violet-500/20', iconColor: 'text-violet-500' },
              { icon: Store, title: t('home.svcMarket'), desc: t('home.svcMarketDesc'), to: '/market', color: 'from-orange-500/10 to-amber-500/10', border: 'border-orange-500/20', iconColor: 'text-orange-500' },
            ].map((svc, i) => (
              <Link key={i} to={svc.to}>
                <Card className={`h-full card-hover cursor-pointer bg-gradient-to-br ${svc.color} ${svc.border} border`}>
                  <CardContent className="p-6">
                    <div className={`w-14 h-14 rounded-2xl service-icon flex items-center justify-center mb-4 ${svc.iconColor}`}>
                      <svc.icon className="w-7 h-7" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">{svc.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">{svc.desc}</p>
                    <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                      {t('home.learnMore')} <ArrowRight className="w-4 h-4" />
                    </span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* === How It Works === */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-14">
          <h2 className="text-3xl lg:text-4xl font-bold mb-3">{t('howItWorks.title')}</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {howItWorksSteps.map((step, idx) => (
            <div key={step.num} className="text-center group relative">
              {idx < howItWorksSteps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-[60%] w-[80%] h-px bg-border" />
              )}
              <div className="relative z-10 w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary/70 text-primary-foreground flex items-center justify-center mx-auto mb-4 text-lg font-bold shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
                {step.num}
              </div>
              <div className="flex justify-center mb-2 text-muted-foreground">{step.icon}</div>
              <p className="text-sm font-medium">{step.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* === Latest Objects === */}
      <section className="bg-muted/30 py-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold">{t('home.latestObjects')}</h2>
              <p className="text-muted-foreground mt-1">{t('home.latestObjectsDesc')}</p>
            </div>
            <Link to="/catalog" className="hidden sm:flex items-center gap-1 text-primary hover:underline text-sm font-medium">
              {t('home.allObjects')} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {latestObjects.map(obj => (
              <Card key={obj.id} className="group card-hover overflow-hidden">
                <div className="aspect-[4/3] bg-gradient-to-br from-muted to-muted/50 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                    <Package className="w-12 h-12 opacity-20" />
                  </div>
                  <div className="absolute top-3 left-3 flex gap-1.5">
                    {statusBadge(obj.status)}
                  </div>
                  <div className="absolute top-3 right-3">
                    {typeBadge(obj.type)}
                  </div>
                </div>
                <CardContent className="p-5">
                  <h3 className="font-semibold mb-1.5 line-clamp-2 group-hover:text-primary transition-colors">
                    <Link to={`/object/${obj.slug}`}>{getText(obj.title)}</Link>
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{getText(obj.shortDescription)}</p>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-lg font-bold text-primary">{obj.compensation} {obj.currency}</span>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      {obj.hasPdfProtocol && <FileText className="w-4 h-4" />}
                      {obj.hasUnpacking && <BookOpen className="w-4 h-4" />}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Link to={`/object/${obj.slug}`} className="flex-1">
                      <Button variant="outline" size="sm" className="w-full gap-1">
                        {t('home.details')} <ChevronRight className="w-3.5 h-3.5" />
                      </Button>
                    </Link>
                    <Button
                      size="sm"
                      disabled={hasItem(obj.id)}
                      onClick={() => addItem(obj)}
                    >
                      {hasItem(obj.id) ? '✓' : '+'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8 sm:hidden">
            <Link to="/catalog">
              <Button variant="outline" className="gap-2">
                {t('home.allObjects')} <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* === Popular Categories === */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-10">
          <h2 className="text-3xl lg:text-4xl font-bold mb-3">{t('home.popularCategories')}</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {categories.map((cat, i) => (
            <Link key={i} to={cat.to}>
              <Card className="card-hover text-center group cursor-pointer border-transparent hover:border-primary/20">
                <CardContent className="p-5 flex flex-col items-center gap-3">
                  <div className="w-12 h-12 rounded-xl service-icon flex items-center justify-center text-muted-foreground group-hover:text-primary transition-colors">
                    {cat.icon}
                  </div>
                  <span className="text-xs font-medium">{cat.label}</span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* === Latest Unpackings + News side-by-side === */}
      <section className="bg-muted/30 py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Unpackings */}
            <div>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold">{t('home.latestUnpackings')}</h2>
                <Link to="/unpackings" className="text-primary hover:underline flex items-center gap-1 text-sm font-medium">
                  {t('home.allUnpackings')} <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="space-y-4">
                {latestPosts.map(post => (
                  <Card key={post.id} className="group hover:shadow-md transition-all overflow-hidden">
                    <CardContent className="p-5 flex gap-4">
                      <div className="w-24 h-24 shrink-0 rounded-xl bg-gradient-to-br from-primary/10 to-accent/20 flex items-center justify-center">
                        <BookOpen className="w-8 h-8 text-primary/40" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs text-muted-foreground mb-1">
                          {new Date(post.publishedAt || post.createdAt).toLocaleDateString(lang === 'uk' ? 'uk-UA' : lang === 'en' ? 'en-US' : lang === 'pl' ? 'pl-PL' : 'ru-RU')}
                        </p>
                        <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors line-clamp-1">
                          <Link to={`/blog/${post.slug}`}>{getText(post.title)}</Link>
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">{getText(post.excerpt)}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* News */}
            <div>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold">{t('home.latestNews')}</h2>
                <Link to="/news" className="text-primary hover:underline flex items-center gap-1 text-sm font-medium">
                  {t('home.allNews')} <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="space-y-4">
                {latestNews.map(post => (
                  <Card key={post.id} className="group hover:shadow-md transition-all">
                    <CardContent className="p-5">
                      <p className="text-xs text-muted-foreground mb-1">
                        {new Date(post.publishedAt || post.createdAt).toLocaleDateString()}
                      </p>
                      <h3 className="font-semibold mb-1">
                        <Link to={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
                          {getText(post.title)}
                        </Link>
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">{getText(post.excerpt)}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* === AI Laboratory Promo === */}
      <section className="container mx-auto px-4 py-20">
        <Card className="bg-gradient-to-br from-primary/5 via-card to-info/5 border-primary/10 overflow-hidden relative glow-primary">
          <CardContent className="p-8 lg:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div>
                <Badge variant="default" className="mb-4">AI-Powered</Badge>
                <h2 className="text-3xl lg:text-4xl font-bold mb-4">AI Laboratory</h2>
                <p className="text-muted-foreground mb-6 text-lg">
                  {t('home.aiDesc')}
                </p>
                <ul className="space-y-3 text-sm mb-8">
                  {[t('home.aiFeature1'), t('home.aiFeature2'), t('home.aiFeature3'), t('home.aiFeature4'), t('home.aiFeature5')].map((f, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <Sparkles className="w-3.5 h-3.5 text-primary" />
                      </div>
                      <span className="text-muted-foreground">{f}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/ai">
                  <Button size="lg" className="gap-2 shadow-lg shadow-primary/25">
                    <Cpu className="w-5 h-5" />
                    {t('home.goToAI')}
                  </Button>
                </Link>
              </div>
              <div className="relative">
                <div className="aspect-square max-w-sm mx-auto relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-info/20 rounded-full blur-3xl" />
                  <div className="relative w-full h-full rounded-3xl bg-gradient-to-br from-primary/10 to-info/10 border border-primary/10 flex items-center justify-center">
                    <Cpu className="w-24 h-24 text-primary/30 animate-float" />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* === Comments === */}
      <section className="bg-muted/30 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl lg:text-4xl font-bold mb-3">{t('home.latestComments')}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mockComments.map(comment => (
              <Card key={comment.id} className="card-hover">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-primary-foreground text-sm font-bold">
                      {comment.userName.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium">{comment.userName}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(comment.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-3">{comment.content}</p>
                  <p className="text-xs text-muted-foreground mt-3 flex items-center gap-1">
                    <MessageCircle className="w-3 h-3" />
                    {comment.targetType === 'object' ? t('home.toObject') : t('home.toArticle')}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* === Donations === */}
      {activeDonations.length > 0 && (
        <section className="container mx-auto px-4 py-20">
          <div className="text-center mb-10">
            <h2 className="text-3xl lg:text-4xl font-bold mb-3">{t('donate.title')}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {activeDonations.map(donation => {
              const percentage = Math.min(100, (donation.collectedAmount / donation.goalAmount) * 100)
              return (
                <Card key={donation.id} className="card-hover">
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-1">
                      <Heart className="w-5 h-5 text-destructive" />
                      <CardTitle className="text-lg">{getText(donation.title)}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">{getText(donation.description)}</p>
                    <Progress value={percentage} className="mb-3" />
                    <div className="flex items-center justify-between text-sm mb-4">
                      <span className="text-muted-foreground">
                        {t('donate.collected')}: <span className="font-semibold text-foreground">{donation.collectedAmount.toLocaleString()} {donation.currency}</span>
                      </span>
                      <span className="text-muted-foreground">
                        {t('donate.goal')}: {donation.goalAmount.toLocaleString()} {donation.currency}
                      </span>
                    </div>
                    {donation.deadline && (
                      <p className="text-xs text-muted-foreground flex items-center gap-1 mb-4">
                        <Clock className="w-3 h-3" />
                        {t('home.deadline')} {new Date(donation.deadline).toLocaleDateString()}
                      </p>
                    )}
                    <Button className="gap-2">
                      <Heart className="w-4 h-4" />
                      {t('donate.support')}
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </section>
      )}

      {/* === CTA Banner === */}
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80" />
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="container mx-auto px-4 text-center relative">
          <Lock className="w-10 h-10 text-primary-foreground/80 mx-auto mb-4" />
          <h2 className="text-3xl lg:text-4xl font-bold text-primary-foreground mb-3">{t('home.ctaTitle')}</h2>
          <p className="text-primary-foreground/80 max-w-xl mx-auto mb-8 text-lg">{t('home.ctaSubtitle')}</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link to="/register">
              <Button size="xl" variant="secondary" className="gap-2 shadow-lg">
                <UserPlus className="w-5 h-5" />
                {t('hero.loginRegister')}
              </Button>
            </Link>
            <Link to="/about">
              <Button size="xl" variant="ghost" className="gap-2 text-primary-foreground hover:text-primary-foreground hover:bg-white/10">
                {t('home.learnMore')} <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

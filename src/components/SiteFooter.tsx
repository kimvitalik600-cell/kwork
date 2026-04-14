import { Link } from 'react-router-dom'
import { useI18n } from '@/i18n/I18nProvider'
import { Separator } from '@/components/ui/separator'
import { Send, MessageCircle, Mail } from 'lucide-react'

export function SiteFooter() {
  const { t } = useI18n()

  return (
    <footer className="border-t bg-muted/30 mt-auto">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2.5 font-bold text-xl mb-4 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-primary-foreground text-sm font-black shadow-lg shadow-primary/20">
                R
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-base font-extrabold tracking-tight">RULWEAR</span>
                <span className="text-[10px] text-muted-foreground font-medium tracking-widest">.ORG</span>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t('footer.desc')}
            </p>
            <div className="flex items-center gap-3 mt-4">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Send className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <MessageCircle className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-semibold mb-4">{t('footer.nav')}</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/catalog" className="text-muted-foreground hover:text-foreground transition-colors">{t('nav.catalog')}</Link></li>
              <li><Link to="/blog" className="text-muted-foreground hover:text-foreground transition-colors">{t('nav.blog')}</Link></li>
              <li><Link to="/news" className="text-muted-foreground hover:text-foreground transition-colors">{t('nav.news')}</Link></li>
              <li><Link to="/unpackings" className="text-muted-foreground hover:text-foreground transition-colors">{t('nav.unpackings')}</Link></li>
              <li><Link to="/ai" className="text-muted-foreground hover:text-foreground transition-colors">{t('nav.ai')}</Link></li>
              <li><Link to="/market" className="text-muted-foreground hover:text-foreground transition-colors">{t('nav.market')}</Link></li>
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="font-semibold mb-4">{t('footer.info')}</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">{t('nav.about')}</Link></li>
              <li><Link to="/contacts" className="text-muted-foreground hover:text-foreground transition-colors">{t('nav.contacts')}</Link></li>
              <li><Link to="/faq" className="text-muted-foreground hover:text-foreground transition-colors">{t('footer.faq')}</Link></li>
              <li><Link to="/delivery" className="text-muted-foreground hover:text-foreground transition-colors">{t('footer.delivery')}</Link></li>
              <li><Link to="/payments-info" className="text-muted-foreground hover:text-foreground transition-colors">{t('footer.payments')}</Link></li>
              <li><Link to="/donate" className="text-muted-foreground hover:text-foreground transition-colors">{t('donate.title')}</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">{t('footer.legal')}</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/offer" className="text-muted-foreground hover:text-foreground transition-colors">{t('footer.offer')}</Link></li>
              <li><Link to="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">{t('footer.privacy')}</Link></li>
              <li><Link to="/terms" className="text-muted-foreground hover:text-foreground transition-colors">{t('footer.terms')}</Link></li>
              <li><Link to="/support" className="text-muted-foreground hover:text-foreground transition-colors">{t('nav.support')}</Link></li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>{t('footer.rights')}</p>
          <p>{t('footer.kved')}</p>
        </div>
      </div>
    </footer>
  )
}

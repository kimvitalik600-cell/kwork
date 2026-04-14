import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useI18n } from '@/i18n/I18nProvider'
import { useInfoPackage } from '@/hooks/useInfoPackage'
import { useTheme } from '@/hooks/useTheme'
import type { Lang } from '@/i18n/translations'
import {
  Menu,
  X,
  Package,
  User,
  Globe,
  ChevronDown,
  Briefcase,
  BookOpen,
  Newspaper,
  Box,
  Cpu,
  Store,
  Info,
  Mail,
  HelpCircle,
  Sun,
  Moon,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const languages: { code: Lang; label: string; flag: string }[] = [
  { code: 'ru', label: 'Русский', flag: '🇷🇺' },
  { code: 'uk', label: 'Українська', flag: '🇺🇦' },
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'pl', label: 'Polski', flag: '🇵🇱' },
]

export function SiteHeader() {
  const { t, lang, setLang } = useI18n()
  const { itemCount } = useInfoPackage()
  const { theme, toggleTheme } = useTheme()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const location = useLocation()

  const navLinks = [
    { to: '/', label: t('nav.home'), icon: <Briefcase className="w-4 h-4" /> },
    { to: '/catalog', label: t('nav.catalog'), icon: <Box className="w-4 h-4" /> },
    { to: '/blog', label: t('nav.blog'), icon: <BookOpen className="w-4 h-4" /> },
    { to: '/news', label: t('nav.news'), icon: <Newspaper className="w-4 h-4" /> },
    { to: '/unpackings', label: t('nav.unpackings'), icon: <Package className="w-4 h-4" /> },
    { to: '/ai', label: t('nav.ai'), icon: <Cpu className="w-4 h-4" /> },
    { to: '/market', label: t('nav.market'), icon: <Store className="w-4 h-4" /> },
  ]

  const currentLang = languages.find(l => l.code === lang) || languages[0]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 glass">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 font-bold text-xl group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-primary-foreground text-sm font-black shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform">
            R
          </div>
          <div className="hidden sm:flex flex-col leading-none">
            <span className="text-base font-extrabold tracking-tight">RULWEAR</span>
            <span className="text-[10px] text-muted-foreground font-medium tracking-widest">.ORG</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground ${
                location.pathname === link.to
                  ? 'bg-accent text-accent-foreground'
                  : 'text-muted-foreground'
              }`}
            >
              {link.icon}
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right section */}
        <div className="flex items-center gap-2">
          {/* Theme toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="w-9 h-9"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </Button>

          {/* Language selector */}
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLangOpen(!langOpen)}
              className="gap-1"
            >
              <Globe className="w-4 h-4" />
              <span className="hidden sm:inline">{currentLang.flag}</span>
              <ChevronDown className="w-3 h-3" />
            </Button>
            {langOpen && (
              <div className="absolute right-0 top-full mt-1 bg-popover border rounded-md shadow-lg py-1 min-w-[140px] z-50">
                {languages.map(l => (
                  <button
                    key={l.code}
                    onClick={() => {
                      setLang(l.code)
                      setLangOpen(false)
                    }}
                    className={`w-full text-left px-3 py-2 text-sm hover:bg-accent flex items-center gap-2 ${
                      lang === l.code ? 'bg-accent font-medium' : ''
                    }`}
                  >
                    <span>{l.flag}</span>
                    {l.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info Package */}
          <Link to="/info-package">
            <Button variant="ghost" size="sm" className="relative gap-1">
              <Package className="w-4 h-4" />
              <span className="hidden sm:inline">{t('nav.infoPackage')}</span>
              {itemCount > 0 && (
                <Badge variant="default" className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                  {itemCount}
                </Badge>
              )}
            </Button>
          </Link>

          {/* Account */}
          <Link to="/dashboard">
            <Button variant="ghost" size="sm" className="gap-1">
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">{t('nav.login')}</span>
            </Button>
          </Link>

          {/* Mobile menu toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="lg:hidden border-t bg-card">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-1">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-md text-sm font-medium transition-colors hover:bg-accent ${
                  location.pathname === link.to
                    ? 'bg-accent text-accent-foreground'
                    : 'text-muted-foreground'
                }`}
              >
                {link.icon}
                {link.label}
              </Link>
            ))}
            <div className="border-t my-2" />
            <Link
              to="/about"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-2 px-3 py-2.5 rounded-md text-sm text-muted-foreground hover:bg-accent"
            >
              <Info className="w-4 h-4" />
              {t('nav.about')}
            </Link>
            <Link
              to="/contacts"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-2 px-3 py-2.5 rounded-md text-sm text-muted-foreground hover:bg-accent"
            >
              <Mail className="w-4 h-4" />
              {t('nav.contacts')}
            </Link>
            <Link
              to="/support"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-2 px-3 py-2.5 rounded-md text-sm text-muted-foreground hover:bg-accent"
            >
              <HelpCircle className="w-4 h-4" />
              {t('nav.support')}
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}

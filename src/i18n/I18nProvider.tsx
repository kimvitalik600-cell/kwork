import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react'
import { translations, type Lang } from './translations'

interface I18nContextType {
  lang: Lang
  setLang: (lang: Lang) => void
  t: (key: string, params?: Record<string, string>) => string
}

const I18nContext = createContext<I18nContextType | null>(null)

const STORAGE_KEY = 'rulwear-lang'

function getInitialLang(): Lang {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored && ['ru', 'uk', 'en', 'pl'].includes(stored)) {
    return stored as Lang
  }
  const browserLang = navigator.language.slice(0, 2)
  const langMap: Record<string, Lang> = { ru: 'ru', uk: 'uk', en: 'en', pl: 'pl' }
  return langMap[browserLang] || 'ru'
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(getInitialLang)

  const setLang = useCallback((newLang: Lang) => {
    setLangState(newLang)
    localStorage.setItem(STORAGE_KEY, newLang)
    document.documentElement.lang = newLang
  }, [])

  useEffect(() => {
    document.documentElement.lang = lang

    const handleStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        setLangState(e.newValue as Lang)
      }
    }
    window.addEventListener('storage', handleStorage)
    return () => window.removeEventListener('storage', handleStorage)
  }, [lang])

  const t = useCallback((key: string, params?: Record<string, string>): string => {
    const entry = translations[key]
    if (!entry) return key
    let text = entry[lang] || entry.ru || key
    if (params) {
      Object.entries(params).forEach(([k, v]) => {
        text = text.replace(`{${k}}`, v)
      })
    }
    return text
  }, [lang])

  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (!context) throw new Error('useI18n must be used within I18nProvider')
  return context
}

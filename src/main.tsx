import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { I18nProvider } from '@/i18n/I18nProvider'
import { InfoPackageProvider } from '@/hooks/useInfoPackage'
import { ThemeProvider } from '@/hooks/useTheme'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <I18nProvider>
        <InfoPackageProvider>
          <App />
        </InfoPackageProvider>
      </I18nProvider>
    </ThemeProvider>
  </StrictMode>,
)

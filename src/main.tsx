import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { I18nProvider } from '@/i18n/I18nProvider'
import { InfoPackageProvider } from '@/hooks/useInfoPackage'
import { ThemeProvider } from '@/hooks/useTheme'
import { AuthProvider } from '@/hooks/useAuth'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <I18nProvider>
          <InfoPackageProvider>
            <App />
          </InfoPackageProvider>
        </I18nProvider>
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>,
)

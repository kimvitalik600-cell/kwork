import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useI18n } from '@/i18n/I18nProvider'
import { useAuth } from '@/hooks/useAuth'
import { LogIn, UserPlus, Eye, EyeOff } from 'lucide-react'

function PasswordInput({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder?: string }) {
  const [show, setShow] = useState(false)
  return (
    <div className="relative">
      <Input
        type={show ? 'text' : 'password'}
        placeholder={placeholder || '••••••••'}
        value={value}
        onChange={e => onChange(e.target.value)}
        className="pr-10"
      />
      <button
        type="button"
        onClick={() => setShow(!show)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
      >
        {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
      </button>
    </div>
  )
}

export function LoginPage() {
  const { t } = useI18n()
  const { login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!email || !password) { setError(t('auth.fillAllFields')); return }
    setLoading(true)
    setTimeout(() => {
      const result = login(email, password)
      setLoading(false)
      if (result.success) navigate('/dashboard')
      else setError(result.error || t('auth.fillAllFields'))
    }, 400)
  }

  return (
    <div className="container mx-auto px-4 py-16 flex items-center justify-center min-h-[60vh]">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center pb-4">
          <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
            <LogIn className="w-7 h-7 text-primary" />
          </div>
          <CardTitle className="text-2xl">{t('nav.login')}</CardTitle>
          <p className="text-sm text-muted-foreground mt-1">{t('auth.loginSubtitle')}</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label>Email</Label>
              <Input type="email" placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)} className="mt-1" />
            </div>
            <div>
              <Label>{t('auth.password')}</Label>
              <div className="mt-1">
                <PasswordInput value={password} onChange={setPassword} />
              </div>
            </div>
            {error && <p className="text-sm text-destructive bg-destructive/10 px-3 py-2 rounded-md">{error}</p>}
            <Button className="w-full" type="submit" disabled={loading}>
              {loading ? '...' : t('nav.login')}
            </Button>
            <p className="text-center text-sm text-muted-foreground">
              {t('auth.noAccount')} <Link to="/register" className="text-primary hover:underline font-medium">{t('nav.register')}</Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export function RegisterPage() {
  const { t } = useI18n()
  const { register } = useAuth()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [accept, setAccept] = useState(false)

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!name || !email || !password || !confirm) { setError(t('auth.fillAllFields')); return }
    if (password !== confirm) { setError(t('auth.passwordMismatch')); return }
    if (!accept) { setError(t('auth.acceptOffer')); return }
    if (password.length < 6) { setError(t('auth.passwordTooShort')); return }
    setLoading(true)
    setTimeout(() => {
      const result = register(name, email, password)
      setLoading(false)
      if (result.success) navigate('/dashboard')
      else setError(result.error || t('auth.fillAllFields'))
    }, 400)
  }

  return (
    <div className="container mx-auto px-4 py-16 flex items-center justify-center min-h-[60vh]">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center pb-4">
          <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
            <UserPlus className="w-7 h-7 text-primary" />
          </div>
          <CardTitle className="text-2xl">{t('nav.register')}</CardTitle>
          <p className="text-sm text-muted-foreground mt-1">{t('auth.registerSubtitle')}</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <Label>{t('auth.name')}</Label>
              <Input placeholder={t('auth.namePlaceholder')} value={name} onChange={e => setName(e.target.value)} className="mt-1" />
            </div>
            <div>
              <Label>Email</Label>
              <Input type="email" placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)} className="mt-1" />
            </div>
            <div>
              <Label>{t('auth.password')}</Label>
              <div className="mt-1">
                <PasswordInput value={password} onChange={setPassword} />
              </div>
            </div>
            <div>
              <Label>{t('auth.confirmPassword')}</Label>
              <div className="mt-1">
                <PasswordInput value={confirm} onChange={setConfirm} />
              </div>
            </div>
            <div className="flex items-start gap-2">
              <input type="checkbox" id="accept" checked={accept} onChange={e => setAccept(e.target.checked)} className="mt-1 accent-primary" />
              <label htmlFor="accept" className="text-sm text-muted-foreground">
                {t('auth.acceptText')} <Link to="/offer" className="text-primary hover:underline">{t('auth.offerLink')}</Link>
              </label>
            </div>
            {error && <p className="text-sm text-destructive bg-destructive/10 px-3 py-2 rounded-md">{error}</p>}
            <Button className="w-full" type="submit" disabled={loading}>
              {loading ? '...' : t('nav.register')}
            </Button>
            <p className="text-center text-sm text-muted-foreground">
              {t('auth.hasAccount')} <Link to="/login" className="text-primary hover:underline font-medium">{t('nav.login')}</Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

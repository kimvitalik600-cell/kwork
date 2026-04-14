import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useI18n } from '@/i18n/I18nProvider'

export function LoginPage() {
  const { t } = useI18n()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!email || !password) {
      setError(t('auth.fillAllFields'))
      return
    }
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      localStorage.setItem('rulwear-user', JSON.stringify({ email, name: email.split('@')[0] }))
      navigate('/dashboard')
    }, 800)
  }

  return (
    <div className="container mx-auto px-4 py-16 flex items-center justify-center min-h-[60vh]">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">{t('nav.login')}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label>Email</Label>
              <Input type="email" placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div>
              <Label>{t('auth.password')}</Label>
              <Input type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button className="w-full" type="submit" disabled={loading}>
              {loading ? '...' : t('nav.login')}
            </Button>
            <p className="text-center text-sm text-muted-foreground">
              {t('auth.noAccount')} <Link to="/register" className="text-primary hover:underline">{t('nav.register')}</Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export function RegisterPage() {
  const { t } = useI18n()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!name || !email || !password || !confirm) {
      setError(t('auth.fillAllFields'))
      return
    }
    if (password !== confirm) {
      setError(t('auth.passwordMismatch'))
      return
    }
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      localStorage.setItem('rulwear-user', JSON.stringify({ email, name }))
      navigate('/dashboard')
    }, 800)
  }

  return (
    <div className="container mx-auto px-4 py-16 flex items-center justify-center min-h-[60vh]">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">{t('nav.register')}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <Label>{t('auth.name')}</Label>
              <Input placeholder={t('auth.name')} value={name} onChange={e => setName(e.target.value)} />
            </div>
            <div>
              <Label>Email</Label>
              <Input type="email" placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div>
              <Label>{t('auth.password')}</Label>
              <Input type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} />
            </div>
            <div>
              <Label>{t('auth.confirmPassword')}</Label>
              <Input type="password" placeholder="••••••••" value={confirm} onChange={e => setConfirm(e.target.value)} />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button className="w-full" type="submit" disabled={loading}>
              {loading ? '...' : t('nav.register')}
            </Button>
            <p className="text-center text-sm text-muted-foreground">
              {t('auth.hasAccount')} <Link to="/login" className="text-primary hover:underline">{t('nav.login')}</Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { useI18n } from '@/i18n/I18nProvider'
import { Cpu, Sparkles, Image, FileText, ArrowUpRight, Zap } from 'lucide-react'

type AITab = 'overview' | 'image' | 'text' | 'upscale' | 'variation' | 'history' | 'subscription'

export function AILaboratoryPage() {
  const { t } = useI18n()
  const [activeTab, setActiveTab] = useState<AITab>('overview')

  const sections = [
    { id: 'image' as const, icon: Image, title: t('ai.imageGen'), desc: t('ai.imageGenDesc') },
    { id: 'text' as const, icon: FileText, title: t('ai.textGen'), desc: t('ai.textGenDesc') },
    { id: 'upscale' as const, icon: ArrowUpRight, title: t('ai.upscale'), desc: t('ai.upscaleDesc') },
    { id: 'variation' as const, icon: Sparkles, title: t('ai.variations'), desc: t('ai.variationsDesc') },
    { id: 'history' as const, icon: Zap, title: t('ai.history'), desc: t('ai.historyDesc') },
    { id: 'subscription' as const, icon: Cpu, title: t('ai.subscription'), desc: t('ai.subscriptionDesc') },
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <Cpu className="w-8 h-8 text-primary" />
          <h1 className="text-3xl font-bold">{t('ai.title')}</h1>
        </div>
        <p className="text-muted-foreground mb-8 text-lg max-w-3xl">{t('ai.desc')}</p>

        {/* Tab buttons */}
        <div className="flex flex-wrap gap-2 mb-8">
          <Button
            variant={activeTab === 'overview' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveTab('overview')}
          >
            {t('common.all')}
          </Button>
          {sections.map(s => (
            <Button
              key={s.id}
              variant={activeTab === s.id ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveTab(s.id)}
              className="gap-1.5"
            >
              <s.icon className="w-4 h-4" />
              {s.title}
            </Button>
          ))}
        </div>

        {/* Overview grid */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {sections.map(section => (
              <Card
                key={section.id}
                className="hover:shadow-lg hover:border-primary/30 transition-all cursor-pointer h-full group"
                onClick={() => setActiveTab(section.id)}
              >
                <CardContent className="p-6">
                  <section.icon className="w-8 h-8 text-primary mb-3 group-hover:scale-110 transition-transform" />
                  <h3 className="font-semibold mb-2">{section.title}</h3>
                  <p className="text-sm text-muted-foreground">{section.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Image generation tab */}
        {activeTab === 'image' && (
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">{t('ai.imageGen')}</h3>
              <div className="space-y-4">
                <div>
                  <Label>{t('ai.prompt')}</Label>
                  <textarea className="w-full border rounded-lg p-3 text-sm bg-background min-h-[120px] resize-y mt-1" placeholder={t('ai.promptPlaceholder')} />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div>
                    <Label>{t('ai.model')}</Label>
                    <select className="w-full mt-1 border rounded-lg px-3 py-2 text-sm bg-background">
                      <option>SDXL 1.0</option>
                      <option>DALL-E 3</option>
                      <option>Midjourney v6</option>
                    </select>
                  </div>
                  <div>
                    <Label>{t('ai.size')}</Label>
                    <select className="w-full mt-1 border rounded-lg px-3 py-2 text-sm bg-background">
                      <option>1024x1024</option>
                      <option>1024x768</option>
                      <option>768x1024</option>
                    </select>
                  </div>
                  <div>
                    <Label>{t('ai.style')}</Label>
                    <select className="w-full mt-1 border rounded-lg px-3 py-2 text-sm bg-background">
                      <option>{t('ai.styleRealistic')}</option>
                      <option>{t('ai.styleAnime')}</option>
                      <option>{t('ai.stylePainting')}</option>
                      <option>{t('ai.styleMinimal')}</option>
                    </select>
                  </div>
                  <div>
                    <Label>{t('ai.quantity')}</Label>
                    <select className="w-full mt-1 border rounded-lg px-3 py-2 text-sm bg-background">
                      <option>1</option>
                      <option>2</option>
                      <option>4</option>
                    </select>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <Zap className="w-4 h-4 text-warning" /> {t('ai.cost', { n: '5' })}
                  </p>
                  <Button className="gap-2" size="lg">
                    <Sparkles className="w-4 h-4" /> {t('ai.generate')}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Text generation tab */}
        {activeTab === 'text' && (
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">{t('ai.textGen')}</h3>
              <div className="space-y-4">
                <div>
                  <Label>{t('ai.prompt')}</Label>
                  <textarea className="w-full border rounded-lg p-3 text-sm bg-background min-h-[120px] resize-y mt-1" placeholder={t('ai.promptPlaceholder')} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>{t('ai.model')}</Label>
                    <select className="w-full mt-1 border rounded-lg px-3 py-2 text-sm bg-background">
                      <option>GPT-4o</option>
                      <option>Claude 3.5</option>
                      <option>Gemini</option>
                    </select>
                  </div>
                  <div>
                    <Label>{t('ai.style')}</Label>
                    <select className="w-full mt-1 border rounded-lg px-3 py-2 text-sm bg-background">
                      <option>Neutral</option>
                      <option>Creative</option>
                      <option>Professional</option>
                      <option>Casual</option>
                    </select>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <Zap className="w-4 h-4 text-warning" /> {t('ai.cost', { n: '3' })}
                  </p>
                  <Button className="gap-2" size="lg">
                    <Sparkles className="w-4 h-4" /> {t('ai.generate')}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Upscale tab */}
        {activeTab === 'upscale' && (
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">{t('ai.upscale')}</h3>
              <div className="border-2 border-dashed rounded-xl p-12 text-center">
                <ArrowUpRight className="w-12 h-12 text-muted-foreground/40 mx-auto mb-4" />
                <p className="text-muted-foreground mb-4">{t('ai.upscaleDesc')}</p>
                <Button variant="outline">{t('ai.generate')}</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Variations tab */}
        {activeTab === 'variation' && (
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">{t('ai.variations')}</h3>
              <div className="border-2 border-dashed rounded-xl p-12 text-center">
                <Sparkles className="w-12 h-12 text-muted-foreground/40 mx-auto mb-4" />
                <p className="text-muted-foreground mb-4">{t('ai.variationsDesc')}</p>
                <Button variant="outline">{t('ai.generate')}</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* History tab */}
        {activeTab === 'history' && (
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">{t('ai.history')}</h3>
              <div className="space-y-3">
                {[
                  { type: 'image', prompt: 'Futuristic cityscape at sunset', tokens: 5, date: '2026-04-12', status: 'done' },
                  { type: 'text', prompt: 'Product description for vintage jacket', tokens: 3, date: '2026-04-11', status: 'done' },
                  { type: 'image', prompt: 'Abstract geometric patterns', tokens: 5, date: '2026-04-10', status: 'done' },
                ].map((gen, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                    <div className="flex items-center gap-3">
                      {gen.type === 'image' ? <Image className="w-5 h-5 text-primary" /> : <FileText className="w-5 h-5 text-primary" />}
                      <div>
                        <p className="text-sm font-medium">{gen.prompt}</p>
                        <p className="text-xs text-muted-foreground">{gen.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="success">{gen.status}</Badge>
                      <span className="text-xs text-muted-foreground">{gen.tokens} tokens</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Subscription tab */}
        {activeTab === 'subscription' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'Free', tokens: 10, price: '0 UAH', features: ['10 tokens/month', 'SDXL 1.0', 'Basic styles'] },
              { name: 'Pro', tokens: 100, price: '299 UAH', features: ['100 tokens/month', 'All models', 'All styles', 'Priority queue'] },
              { name: 'Enterprise', tokens: 500, price: '999 UAH', features: ['500 tokens/month', 'All models', 'API access', 'Dedicated support'] },
            ].map((plan, i) => (
              <Card key={plan.name} className={i === 1 ? 'border-primary shadow-lg' : ''}>
                <CardContent className="p-6 text-center">
                  {i === 1 && <Badge className="mb-3">Popular</Badge>}
                  <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-3xl font-bold text-primary mb-4">{plan.price}<span className="text-sm text-muted-foreground font-normal">/mo</span></p>
                  <ul className="space-y-2 text-sm text-muted-foreground mb-6">
                    {plan.features.map(f => (
                      <li key={f} className="flex items-center gap-2 justify-center">
                        <Sparkles className="w-3 h-3 text-primary" /> {f}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full" variant={i === 1 ? 'default' : 'outline'}>{t('term.getAccess')}</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

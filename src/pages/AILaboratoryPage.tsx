import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { useI18n } from '@/i18n/I18nProvider'
import { Cpu, Sparkles, Image, FileText, ArrowUpRight, Zap, Loader2, Download, Copy, Check } from 'lucide-react'
import { generateAIImage } from '@/utils/productImages'

type AITab = 'overview' | 'image' | 'text' | 'upscale' | 'variation' | 'history' | 'subscription'

interface GenerationResult {
  id: string
  type: 'image' | 'text'
  prompt: string
  tokens: number
  date: string
  model: string
}

function mockGenerateText(prompt: string): string {
  const p = prompt.toLowerCase()
  if (p.includes('сказк') || p.includes('fairy') || p.includes('tale'))
    return 'В далёком-далёком королевстве, за высокими горами и глубокими реками, жил-был маленький дракончик по имени Огонёк. Он был не похож на других драконов — вместо огня он выдыхал радужные пузыри.\n\nОднажды в королевство пришла великая тьма. Все рыцари пытались её победить мечами и копьями, но ничего не помогало. И тогда маленький Огонёк вышел вперёд.\n\nОн набрал побольше воздуха и выдохнул самый большой радужный пузырь, который когда-либо видел свет. Пузырь поднялся высоко-высоко и лопнул, окрасив всё небо в яркие цвета. Тьма отступила, ведь она не могла существовать там, где столько красок.\n\nС тех пор Огонёк стал самым знаменитым драконом в королевстве, а все поняли, что иногда самая необычная способность может стать самой ценной.'
  if (p.includes('описани') || p.includes('product') || p.includes('товар'))
    return '**Премиальное качество. Безупречный стиль.**\n\nПредставляем вашему вниманию уникальный продукт, сочетающий в себе передовые технологии и элегантный дизайн. Каждая деталь продумана до мельчайших подробностей.\n\n✅ Высококачественные материалы\n✅ Современный дизайн\n✅ Долговечность и надёжность\n✅ Полная гарантия качества\n\nИдеально подходит как для повседневного использования, так и для особых случаев.'
  if (p.includes('стих') || p.includes('poem'))
    return 'Среди цифровых миров и кода строк,\nГде данные летят быстрей, чем ветерок,\nРождается мечта из единиц и нулей —\nМечта о будущем, что станет всё светлей.\n\nМы строим мосты из алгоритмов и идей,\nСоединяя разум с чередой огней,\nИ каждый символ, каждый байт в строке\nНесёт надежду миру налегке.'
  if (p.includes('код') || p.includes('code') || p.includes('функци'))
    return '```typescript\ninterface DataProcessor<T> {\n  process(input: T): Promise<T>;\n  validate(data: T): boolean;\n}\n\nclass SmartProcessor implements DataProcessor<Record<string, unknown>> {\n  async process(input: Record<string, unknown>) {\n    const validated = this.validate(input);\n    if (!validated) throw new Error(\'Invalid data\');\n    return Object.entries(input).reduce((acc, [key, value]) => {\n      acc[key] = typeof value === \'string\' ? value.trim() : value;\n      return acc;\n    }, {} as Record<string, unknown>);\n  }\n  validate(data: Record<string, unknown>) {\n    return data !== null && Object.keys(data).length > 0;\n  }\n}\n```\n\nЭтот код демонстрирует паттерн обработки данных с валидацией и типизацией в TypeScript.'
  return `Результат генерации по запросу: "${prompt}"\n\nЭто текст, сгенерированный AI на основе вашего промпта. В полной версии платформы здесь будет результат от настоящей языковой модели (GPT-4o, Claude, Gemini и др.).\n\nДля получения более качественных результатов:\n• Используйте подробные описания\n• Указывайте желаемый стиль и формат\n• Добавляйте контекст и примеры`
}

export function AILaboratoryPage() {
  const { t } = useI18n()
  const [activeTab, setActiveTab] = useState<AITab>('overview')
  const [imgPrompt, setImgPrompt] = useState('')
  const [imgModel, setImgModel] = useState('SDXL 1.0')
  const [imgSize, setImgSize] = useState('1024x1024')
  const [imgStyle, setImgStyle] = useState('realistic')
  const [imgQty, setImgQty] = useState(1)
  const [imgLoading, setImgLoading] = useState(false)
  const [imgResults, setImgResults] = useState<string[]>([])
  const [textPrompt, setTextPrompt] = useState('')
  const [textModel, setTextModel] = useState('GPT-4o')
  const [textStyle, setTextStyle] = useState('Neutral')
  const [textLoading, setTextLoading] = useState(false)
  const [textResult, setTextResult] = useState('')
  const [copied, setCopied] = useState(false)
  const [history, setHistory] = useState<GenerationResult[]>([
    { id: 'h1', type: 'image', prompt: 'Futuristic cityscape at sunset', tokens: 5, date: '2026-04-12', model: 'SDXL 1.0' },
    { id: 'h2', type: 'text', prompt: 'Product description for vintage jacket', tokens: 3, date: '2026-04-11', model: 'GPT-4o' },
    { id: 'h3', type: 'image', prompt: 'Abstract geometric patterns', tokens: 5, date: '2026-04-10', model: 'DALL-E 3' },
  ])

  const handleImageGenerate = () => {
    if (!imgPrompt.trim()) return
    setImgLoading(true); setImgResults([])
    setTimeout(() => {
      const r: string[] = []
      for (let i = 0; i < imgQty; i++) r.push(generateAIImage(imgPrompt + (i > 0 ? ` v${i+1}` : '')))
      setImgResults(r); setImgLoading(false)
      setHistory(prev => [{ id: `g-${Date.now()}`, type: 'image', prompt: imgPrompt, tokens: imgQty * 5, date: new Date().toISOString().split('T')[0], model: imgModel }, ...prev])
    }, 1500 + Math.random() * 1500)
  }
  const handleTextGenerate = () => {
    if (!textPrompt.trim()) return
    setTextLoading(true); setTextResult('')
    setTimeout(() => {
      setTextResult(mockGenerateText(textPrompt)); setTextLoading(false)
      setHistory(prev => [{ id: `g-${Date.now()}`, type: 'text', prompt: textPrompt, tokens: 3, date: new Date().toISOString().split('T')[0], model: textModel }, ...prev])
    }, 800 + Math.random() * 1200)
  }
  const handleCopy = () => { navigator.clipboard.writeText(textResult); setCopied(true); setTimeout(() => setCopied(false), 2000) }

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

        <div className="flex flex-wrap gap-2 mb-8">
          <Button variant={activeTab === 'overview' ? 'default' : 'outline'} size="sm" onClick={() => setActiveTab('overview')}>{t('common.all')}</Button>
          {sections.map(s => (
            <Button key={s.id} variant={activeTab === s.id ? 'default' : 'outline'} size="sm" onClick={() => setActiveTab(s.id)} className="gap-1.5">
              <s.icon className="w-4 h-4" />{s.title}
            </Button>
          ))}
        </div>

        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {sections.map(section => (
              <Card key={section.id} className="hover:shadow-lg hover:border-primary/30 transition-all cursor-pointer h-full group" onClick={() => setActiveTab(section.id)}>
                <CardContent className="p-6">
                  <section.icon className="w-8 h-8 text-primary mb-3 group-hover:scale-110 transition-transform" />
                  <h3 className="font-semibold mb-2">{section.title}</h3>
                  <p className="text-sm text-muted-foreground">{section.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Image generation */}
        {activeTab === 'image' && (
          <div className="space-y-6">
            <Card><CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">{t('ai.imageGen')}</h3>
              <div className="space-y-4">
                <div>
                  <Label>{t('ai.prompt')}</Label>
                  <textarea className="w-full border rounded-lg p-3 text-sm bg-background min-h-[120px] resize-y mt-1" placeholder={t('ai.promptPlaceholder')} value={imgPrompt} onChange={e => setImgPrompt(e.target.value)} />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div><Label>{t('ai.model')}</Label><select className="w-full mt-1 border rounded-lg px-3 py-2 text-sm bg-background" value={imgModel} onChange={e => setImgModel(e.target.value)}><option>SDXL 1.0</option><option>DALL-E 3</option><option>Midjourney v6</option></select></div>
                  <div><Label>{t('ai.size')}</Label><select className="w-full mt-1 border rounded-lg px-3 py-2 text-sm bg-background" value={imgSize} onChange={e => setImgSize(e.target.value)}><option>1024x1024</option><option>1024x768</option><option>768x1024</option></select></div>
                  <div><Label>{t('ai.style')}</Label><select className="w-full mt-1 border rounded-lg px-3 py-2 text-sm bg-background" value={imgStyle} onChange={e => setImgStyle(e.target.value)}><option value="realistic">{t('ai.styleRealistic')}</option><option value="anime">{t('ai.styleAnime')}</option><option value="painting">{t('ai.stylePainting')}</option><option value="minimal">{t('ai.styleMinimal')}</option></select></div>
                  <div><Label>{t('ai.quantity')}</Label><select className="w-full mt-1 border rounded-lg px-3 py-2 text-sm bg-background" value={imgQty} onChange={e => setImgQty(Number(e.target.value))}><option value={1}>1</option><option value={2}>2</option><option value={4}>4</option></select></div>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <p className="text-sm text-muted-foreground flex items-center gap-1"><Zap className="w-4 h-4 text-warning" /> {t('ai.cost', { n: String(imgQty * 5) })}</p>
                  <Button className="gap-2" size="lg" onClick={handleImageGenerate} disabled={imgLoading || !imgPrompt.trim()}>
                    {imgLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                    {imgLoading ? t('ai.generating') : t('ai.generate')}
                  </Button>
                </div>
              </div>
            </CardContent></Card>
            {imgResults.length > 0 && (
              <Card><CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">{t('ai.result')}</h3>
                <div className={`grid gap-4 ${imgResults.length === 1 ? 'grid-cols-1 max-w-md mx-auto' : 'grid-cols-2'}`}>
                  {imgResults.map((src, i) => (
                    <div key={i} className="relative group/img rounded-xl overflow-hidden border">
                      <img src={src} alt={`Generated ${i + 1}`} className="w-full aspect-square object-cover" />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                        <a href={src} download={`ai-gen-${i}.svg`}><Button size="sm" variant="secondary" className="gap-2"><Download className="w-4 h-4" />{t('ai.download')}</Button></a>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent></Card>
            )}
          </div>
        )}

        {/* Text generation */}
        {activeTab === 'text' && (
          <div className="space-y-6">
            <Card><CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">{t('ai.textGen')}</h3>
              <div className="space-y-4">
                <div>
                  <Label>{t('ai.prompt')}</Label>
                  <textarea className="w-full border rounded-lg p-3 text-sm bg-background min-h-[120px] resize-y mt-1" placeholder={t('ai.promptPlaceholder')} value={textPrompt} onChange={e => setTextPrompt(e.target.value)} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div><Label>{t('ai.model')}</Label><select className="w-full mt-1 border rounded-lg px-3 py-2 text-sm bg-background" value={textModel} onChange={e => setTextModel(e.target.value)}><option>GPT-4o</option><option>Claude 3.5</option><option>Gemini</option></select></div>
                  <div><Label>{t('ai.style')}</Label><select className="w-full mt-1 border rounded-lg px-3 py-2 text-sm bg-background" value={textStyle} onChange={e => setTextStyle(e.target.value)}><option>Neutral</option><option>Creative</option><option>Professional</option><option>Casual</option></select></div>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <p className="text-sm text-muted-foreground flex items-center gap-1"><Zap className="w-4 h-4 text-warning" /> {t('ai.cost', { n: '3' })}</p>
                  <Button className="gap-2" size="lg" onClick={handleTextGenerate} disabled={textLoading || !textPrompt.trim()}>
                    {textLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                    {textLoading ? t('ai.generating') : t('ai.generate')}
                  </Button>
                </div>
              </div>
            </CardContent></Card>
            {textResult && (
              <Card><CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">{t('ai.result')}</h3>
                  <Button size="sm" variant="outline" className="gap-2" onClick={handleCopy}>
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    {copied ? t('ai.copied') : t('ai.copy')}
                  </Button>
                </div>
                <div className="bg-muted/30 rounded-xl p-5 whitespace-pre-wrap text-sm leading-relaxed">{textResult}</div>
              </CardContent></Card>
            )}
          </div>
        )}

        {activeTab === 'upscale' && (
          <Card><CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">{t('ai.upscale')}</h3>
            <div className="border-2 border-dashed rounded-xl p-12 text-center">
              <ArrowUpRight className="w-12 h-12 text-muted-foreground/40 mx-auto mb-4" />
              <p className="text-muted-foreground mb-2">{t('ai.upscaleDesc')}</p>
              <p className="text-sm text-muted-foreground mb-4">{t('ai.dragOrClick')}</p>
              <Button variant="outline">{t('ai.uploadImage')}</Button>
            </div>
          </CardContent></Card>
        )}

        {activeTab === 'variation' && (
          <Card><CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">{t('ai.variations')}</h3>
            <div className="border-2 border-dashed rounded-xl p-12 text-center">
              <Sparkles className="w-12 h-12 text-muted-foreground/40 mx-auto mb-4" />
              <p className="text-muted-foreground mb-2">{t('ai.variationsDesc')}</p>
              <p className="text-sm text-muted-foreground mb-4">{t('ai.dragOrClick')}</p>
              <Button variant="outline">{t('ai.uploadImage')}</Button>
            </div>
          </CardContent></Card>
        )}

        {activeTab === 'history' && (
          <Card><CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">{t('ai.history')}</h3>
            {history.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">{t('ai.noHistory')}</p>
            ) : (
              <div className="space-y-3">
                {history.map(gen => (
                  <div key={gen.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                    <div className="flex items-center gap-3">
                      {gen.type === 'image' ? <Image className="w-5 h-5 text-primary" /> : <FileText className="w-5 h-5 text-primary" />}
                      <div>
                        <p className="text-sm font-medium">{gen.prompt.length > 50 ? gen.prompt.slice(0, 50) + '...' : gen.prompt}</p>
                        <p className="text-xs text-muted-foreground">{gen.date} • {gen.model}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="success">done</Badge>
                      <span className="text-xs text-muted-foreground">{gen.tokens} tokens</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent></Card>
        )}

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
                    {plan.features.map(f => <li key={f} className="flex items-center gap-2 justify-center"><Sparkles className="w-3 h-3 text-primary" /> {f}</li>)}
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

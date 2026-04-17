import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useI18n } from '@/i18n/I18nProvider'
import { useInfoPackage } from '@/hooks/useInfoPackage'
import { mockObjects, mockComments } from '@/data/mockData'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Package, ChevronRight, FileText, BookOpen, Eye, MessageCircle, Calendar,
  Globe, Truck, Tag, Shield, Cpu, Heart, Download, CheckCircle, Send, User,
} from 'lucide-react'
import { getObjectImage } from '@/utils/productImages'

export function ObjectDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const { t, lang } = useI18n()
  const { addItem, hasItem } = useInfoPackage()

  const getText = (obj: Record<string, string>) => obj[lang] || obj.ru || ''

  const object = mockObjects.find(o => o.slug === slug)

  const [actionDone, setActionDone] = useState<string | null>(null)
  const [commentText, setCommentText] = useState('')
  const [localComments, setLocalComments] = useState(mockComments.filter(c => c.targetType === 'object'))

  const handleAction = (action: string) => {
    setActionDone(action)
    setTimeout(() => setActionDone(null), 3000)
  }

  const handleAddComment = () => {
    if (!commentText.trim()) return
    const newComment = {
      id: `com-local-${Date.now()}`,
      userId: 'current-user',
      userName: 'Вы',
      content: commentText,
      targetType: 'object' as const,
      targetId: object?.id ?? '',
      createdAt: new Date().toISOString(),
    }
    setLocalComments(prev => [...prev, newComment])
    setCommentText('')
  }

  if (!object) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <Package className="w-16 h-16 mx-auto mb-4 text-muted-foreground/30" />
        <h1 className="text-2xl font-bold mb-2">{t('object.notFound')}</h1>
        <p className="text-muted-foreground mb-6">{t('object.notFoundDesc')}</p>
        <Link to="/catalog"><Button>{t('object.backToCatalog')}</Button></Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-1 text-sm text-muted-foreground mb-6 flex-wrap">
        <Link to="/" className="hover:text-foreground">{t('nav.home')}</Link>
        <ChevronRight className="w-3 h-3" />
        <Link to="/catalog" className="hover:text-foreground">{t('nav.catalog')}</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-foreground font-medium line-clamp-1">{getText(object.title)}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left — Gallery */}
        <div className="lg:col-span-2 space-y-6">
          {/* Main image */}
          <Card className="overflow-hidden">
            <div className="aspect-video bg-muted flex items-center justify-center">
              <img src={getObjectImage(object.id, object.type, object.categoryId)} alt={getText(object.title)} className="w-full h-full object-cover" />
            </div>
          </Card>

          {/* Tabs: Description, Unpacking, Documents, History, Comments */}
          <Tabs defaultValue="description">
            <TabsList className="w-full justify-start flex-wrap h-auto gap-1 p-1">
              <TabsTrigger value="description">{t('object.description')}</TabsTrigger>
              <TabsTrigger value="characteristics">{t('object.characteristics')}</TabsTrigger>
              {object.hasUnpacking && <TabsTrigger value="unpacking">{t('object.unpacking')}</TabsTrigger>}
              {object.hasPdfProtocol && <TabsTrigger value="documents">{t('object.documents')}</TabsTrigger>}
              <TabsTrigger value="history">{t('object.historyTab')}</TabsTrigger>
              <TabsTrigger value="comments">{t('object.commentsTab')} ({object.commentCount})</TabsTrigger>
            </TabsList>

            <TabsContent value="description">
              <Card>
                <CardContent className="p-6 prose prose-sm max-w-none">
                  <h3 className="text-lg font-semibold mb-3">{t('object.mainInfo')}</h3>
                  <p className="text-muted-foreground">{getText(object.shortDescription)}</p>
                  {getText(object.fullDescription) && (
                    <>
                      <h4 className="text-md font-semibold mt-4 mb-2">{t('object.fullDescription')}</h4>
                      <p className="text-muted-foreground">{getText(object.fullDescription)}</p>
                    </>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="characteristics">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">{t('object.objectCharacteristics')}</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <InfoRow label={t('object.objectType')} value={t(`type.${object.type}`)} />
                    <InfoRow label={t('object.status')} value={t(`status.${object.status}`)} />
                    <InfoRow label={t('object.deliveryType')} value={object.deliveryType === 'auto' ? t('object.autoDelivery') : t('object.manualDelivery')} />
                    {object.countryOfOrigin && <InfoRow label={t('object.countryOfOrigin')} value={object.countryOfOrigin} />}
                    <InfoRow label={t('object.internationalShipping')} value={object.internationalShipping ? t('common.yes') : t('common.no')} />
                    {object.boxLabel && <InfoRow label={t('object.boxLabel')} value={object.boxLabel} />}
                    <InfoRow label={t('object.views')} value={String(object.viewCount)} />
                    <InfoRow label={t('object.comments')} value={String(object.commentCount)} />
                    <InfoRow label={t('object.addedDate')} value={new Date(object.createdAt).toLocaleDateString()} />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {object.hasUnpacking && (
              <TabsContent value="unpacking">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">{t('object.unpacking')}</h3>
                    <div className="bg-muted/50 rounded-lg p-6 text-center">
                      <BookOpen className="w-12 h-12 mx-auto mb-3 text-muted-foreground/40" />
                      <p className="text-muted-foreground mb-3">{t('object.unpackingReport')}</p>
                      <Badge variant="success">{t('object.verified')}</Badge>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            )}

            {object.hasPdfProtocol && (
              <TabsContent value="documents">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">{t('object.documents')}</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                        <FileText className="w-8 h-8 text-primary" />
                        <div className="flex-1">
                          <p className="font-medium text-sm">{t('object.protocol')}</p>
                          <p className="text-xs text-muted-foreground">{t('object.protocolDesc')}</p>
                        </div>
                        <Button variant="outline" size="sm" className="gap-1">
                          <Download className="w-3.5 h-3.5" /> {t('object.download')}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            )}

            <TabsContent value="history">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">{t('object.objectHistory')}</h3>
                  <div className="space-y-4">
                    <HistoryItem date={object.createdAt} event={t('object.eventAdded')} />
                    <HistoryItem date={object.updatedAt} event={t('object.eventVerified')} />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="comments">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">{t('object.commentsTab')}</h3>
                  <div className="space-y-4 mb-6">
                    {localComments.filter(c => c.targetId === object.id).length === 0 ? (
                      <p className="text-muted-foreground text-sm">{t('object.commentsEmpty')}</p>
                    ) : (
                      localComments.filter(c => c.targetId === object.id).map(c => (
                        <div key={c.id} className="flex gap-3 p-3 bg-muted/30 rounded-lg">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                            <User className="w-4 h-4 text-primary" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-sm font-medium">{c.userName}</span>
                              <span className="text-xs text-muted-foreground">{new Date(c.createdAt).toLocaleDateString()}</span>
                            </div>
                            <p className="text-sm text-muted-foreground">{c.content}</p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                  <div className="flex gap-2">
                    <input
                      className="flex-1 rounded-lg border bg-background px-3 py-2 text-sm"
                      placeholder="Написать комментарий..."
                      value={commentText}
                      onChange={e => setCommentText(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && handleAddComment()}
                    />
                    <Button size="sm" className="gap-1" onClick={handleAddComment} disabled={!commentText.trim()}>
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Right — Actions sidebar */}
        <div className="space-y-6">
          {/* Main info card */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2 flex-wrap mb-2">
                <Badge variant={object.status === 'available' ? 'success' : 'secondary'}>
                  {t(`status.${object.status}`)}
                </Badge>
                <Badge variant="outline">{t(`type.${object.type}`)}</Badge>
              </div>
              <CardTitle className="text-xl">{getText(object.title)}</CardTitle>
              <p className="text-xs text-muted-foreground mt-1">ID: {object.id} {object.externalId && `/ ${object.externalId}`}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Compensation */}
              <div className="bg-muted/50 rounded-lg p-4">
                <p className="text-xs text-muted-foreground mb-1">{t('term.compensation')}</p>
                <p className="text-3xl font-bold text-primary">{object.compensation} {object.currency}</p>
                {object.compensationCredits && (
                  <p className="text-sm text-muted-foreground mt-1">
                    или {object.compensationCredits} {t('term.credits')}
                  </p>
                )}
              </div>

              {/* Action buttons */}
              <div className="space-y-2">
                {actionDone && (
                  <div className="flex items-center gap-2 p-3 bg-green-500/10 text-green-600 rounded-lg text-sm">
                    <CheckCircle className="w-4 h-4" />
                    {actionDone === 'claim' && 'Заявка на получение актива отправлена!'}
                    {actionDone === 'access' && 'Запрос на доступ отправлен!'}
                    {actionDone === 'support' && 'Спасибо за поддержку обработки!'}
                    {actionDone === 'materialize' && 'Запрос на материализацию создан!'}
                  </div>
                )}
                <Button className="w-full gap-2" size="lg" onClick={() => handleAction('claim')}>
                  <Shield className="w-4 h-4" />
                  {t('term.claimAsset')}
                </Button>
                <Button
                  variant="outline"
                  className="w-full gap-2"
                  onClick={() => addItem(object)}
                  disabled={hasItem(object.id)}
                >
                  <Package className="w-4 h-4" />
                  {hasItem(object.id) ? t('object.alreadyInPackage') : t('term.addToInfoPackage')}
                </Button>
                <Button variant="secondary" className="w-full gap-2" onClick={() => handleAction('access')}>
                  <FileText className="w-4 h-4" />
                  {t('term.getAccess')}
                </Button>
                <Button variant="ghost" className="w-full gap-2" onClick={() => handleAction('support')}>
                  <Heart className="w-4 h-4" />
                  {t('object.supportProcessing')}
                </Button>
                {object.type !== 'material' && (
                  <Button variant="ghost" className="w-full gap-2" onClick={() => handleAction('materialize')}>
                    <Cpu className="w-4 h-4" />
                    {t('term.materialize')}
                  </Button>
                )}
              </div>

              <Separator />

              {/* Quick info */}
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Tag className="w-4 h-4" />
                  <span>{t(`type.${object.type}`)}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Truck className="w-4 h-4" />
                  <span>{object.deliveryType === 'auto' ? t('object.autoDeliveryFull') : t('object.manualDeliveryFull')}</span>
                </div>
                {object.countryOfOrigin && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Globe className="w-4 h-4" />
                    <span>{t('object.originPrefix')}: {object.countryOfOrigin}</span>
                  </div>
                )}
                {object.internationalShipping && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Globe className="w-4 h-4" />
                    <span>{t('object.internationalShipping')}</span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Eye className="w-4 h-4" />
                  <span>{object.viewCount} {t('object.viewsCount')}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MessageCircle className="w-4 h-4" />
                  <span>{object.commentCount} {t('object.commentsCount')}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span>{t('object.addedDate')}: {new Date(object.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Related objects */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">{t('object.relatedObjects')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockObjects.filter(o => o.id !== object.id && o.categoryId === object.categoryId).slice(0, 3).map(o => (
                  <Link key={o.id} to={`/object/${o.slug}`} className="flex items-center gap-3 hover:bg-accent rounded-md p-2 transition-colors">
                    <div className="w-12 h-12 bg-muted rounded flex items-center justify-center shrink-0">
                      <Package className="w-5 h-5 text-muted-foreground/40" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium line-clamp-1">{getText(o.title)}</p>
                      <p className="text-xs text-primary font-semibold">{o.compensation} {o.currency}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-2 px-3 bg-muted/30 rounded text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  )
}

function HistoryItem({ date, event }: { date: string; event: string }) {
  return (
    <div className="flex gap-3">
      <div className="flex flex-col items-center">
        <div className="w-2.5 h-2.5 rounded-full bg-primary mt-1.5" />
        <div className="w-px flex-1 bg-border" />
      </div>
      <div className="pb-4">
        <p className="text-xs text-muted-foreground">{new Date(date).toLocaleDateString()}</p>
        <p className="text-sm">{event}</p>
      </div>
    </div>
  )
}

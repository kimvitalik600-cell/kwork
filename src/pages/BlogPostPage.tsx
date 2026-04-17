import { useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useI18n } from '@/i18n/I18nProvider'
import { mockBlogPosts, mockObjects, mockComments } from '@/data/mockData'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowLeft, Calendar, MessageCircle, Tag, ExternalLink, Send, User } from 'lucide-react'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { getBlogImage } from '@/utils/productImages'

export function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>()
  const { t, lang } = useI18n()
  const navigate = useNavigate()
  const getText = (obj: Record<string, string>) => obj[lang] || obj.ru || ''

  const post = mockBlogPosts.find(p => p.slug === slug)
  if (!post) return <NotFoundPage />

  const [commentText, setCommentText] = useState('')
  const [localComments, setLocalComments] = useState(mockComments.filter(c => c.targetType === 'blog_post' && c.targetId === post.id))

  const handleAddComment = () => {
    if (!commentText.trim()) return
    setLocalComments(prev => [...prev, {
      id: `com-local-${Date.now()}`,
      userId: 'current-user',
      userName: 'Вы',
      content: commentText,
      targetType: 'blog_post' as const,
      targetId: post.id,
      createdAt: new Date().toISOString(),
    }])
    setCommentText('')
  }

  const typeLabel: Record<string, string> = {
    unpacking: t('blog.typeUnpacking'),
    news: t('blog.typeNews'),
    guide: t('blog.typeGuide'),
  }

  const relatedObjects = mockObjects.filter(o => post.relatedObjectIds.includes(o.id))
  const content = getText(post.content)
  const excerpt = getText(post.excerpt)
  const displayContent = content || excerpt

  const dateStr = new Date(post.publishedAt || post.createdAt).toLocaleDateString(
    lang === 'uk' ? 'uk-UA' : lang === 'en' ? 'en-US' : lang === 'pl' ? 'pl-PL' : 'ru-RU',
    { year: 'numeric', month: 'long', day: 'numeric' }
  )

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      {/* Back button */}
      <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="gap-2 text-muted-foreground mb-6">
        <ArrowLeft className="w-4 h-4" />
        {t('common.back')}
      </Button>

      {/* Cover */}
      <div className="aspect-video rounded-xl overflow-hidden mb-8 relative">
        <img src={getBlogImage(post.type)} alt={getText(post.title)} className="w-full h-full object-cover" />
        <div className="absolute top-4 left-4">
          <Badge variant="secondary" className="text-sm">{typeLabel[post.type] || post.type}</Badge>
        </div>
        {post.isPinned && (
          <div className="absolute top-4 right-4">
            <Badge variant="default" className="text-sm">📌 {t('blog.pinned')}</Badge>
          </div>
        )}
      </div>

      {/* Meta */}
      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
        <span className="flex items-center gap-1.5">
          <Calendar className="w-4 h-4" />{dateStr}
        </span>
        <span className="flex items-center gap-1.5">
          <MessageCircle className="w-4 h-4" />{post.commentCount} {t('blog.comments')}
        </span>
      </div>

      {/* Title */}
      <h1 className="text-3xl font-bold mb-4">{getText(post.title)}</h1>

      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          <Tag className="w-4 h-4 text-muted-foreground" />
          {post.tags.map(tag => (
            <Badge key={tag} variant="outline" className="text-xs">#{tag}</Badge>
          ))}
        </div>
      )}

      {/* Content */}
      <div className="prose prose-sm dark:prose-invert max-w-none mb-10">
        {displayContent ? (
          <p className="text-base text-muted-foreground leading-relaxed whitespace-pre-line">{displayContent}</p>
        ) : (
          <p className="text-muted-foreground italic">{t('blog.noContent')}</p>
        )}
      </div>

      {/* Related objects */}
      {relatedObjects.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold mb-4">{t('blog.relatedObjects')}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {relatedObjects.map(obj => (
              <Card key={obj.id} className="group hover:shadow-md transition-all">
                <CardContent className="p-4">
                  <p className="font-medium text-sm mb-1 group-hover:text-primary transition-colors line-clamp-2">
                    {getText(obj.title)}
                  </p>
                  <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{getText(obj.shortDescription)}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-primary">{obj.compensation} {obj.currency}</span>
                    <Link to={`/object/${obj.slug}`}>
                      <Button variant="ghost" size="sm" className="gap-1 text-xs h-7">
                        {t('catalog.details')} <ExternalLink className="w-3 h-3" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* Comments section */}
      <section className="mt-10 mb-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <MessageCircle className="w-5 h-5" /> {t('blog.comments')} ({localComments.length})
        </h2>
        <div className="space-y-4 mb-6">
          {localComments.length === 0 ? (
            <p className="text-sm text-muted-foreground">Пока нет комментариев. Будьте первым!</p>
          ) : (
            localComments.map(c => (
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
      </section>

      {/* Navigation */}
      <div className="mt-12 pt-6 border-t flex items-center justify-between">
        <Button variant="outline" onClick={() => navigate(-1)} className="gap-2">
          <ArrowLeft className="w-4 h-4" />{t('common.back')}
        </Button>
        <Link to="/blog">
          <Button variant="ghost" className="gap-2">
            {t('blog.allPosts')}
          </Button>
        </Link>
      </div>
    </div>
  )
}

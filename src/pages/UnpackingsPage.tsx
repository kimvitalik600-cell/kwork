import { Link } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useI18n } from '@/i18n/I18nProvider'
import { mockBlogPosts } from '@/data/mockData'
import { ChevronRight, MessageCircle, Package } from 'lucide-react'
import { getBlogImage } from '@/utils/productImages'

export function UnpackingsPage() {
  const { t, lang } = useI18n()
  const getText = (obj: Record<string, string>) => obj[lang] || obj.ru || ''
  const unpackings = mockBlogPosts.filter(p => p.type === 'unpacking')

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">{t('unpackings.title')}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {unpackings.map(post => (
          <Card key={post.id} className="group hover:shadow-lg transition-all overflow-hidden">
            <div className="aspect-video relative overflow-hidden">
              <img src={getBlogImage('unpacking')} alt={getText(post.title)} className="w-full h-full object-cover" />
              {post.relatedObjectIds && post.relatedObjectIds.length > 0 && (
                <div className="absolute bottom-3 left-3">
                  <Badge variant="info" className="gap-1"><Package className="w-3 h-3" /> {post.relatedObjectIds.length} {t('term.object').toLowerCase()}</Badge>
                </div>
              )}
            </div>
            <CardContent className="p-5">
              <p className="text-xs text-muted-foreground mb-2">
                {new Date(post.publishedAt || post.createdAt).toLocaleDateString(lang === 'uk' ? 'uk-UA' : lang === 'en' ? 'en-US' : lang === 'pl' ? 'pl-PL' : 'ru-RU')}
              </p>
              <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                {getText(post.title)}
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-3 mb-4">{getText(post.excerpt)}</p>
              <div className="flex items-center justify-between">
                <Link to={`/blog/${post.slug}`}>
                  <Button variant="outline" size="sm" className="gap-1">
                    {t('home.viewReport')} <ChevronRight className="w-4 h-4" />
                  </Button>
                </Link>
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <MessageCircle className="w-3 h-3" /> {post.commentCount}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

import { Link } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useI18n } from '@/i18n/I18nProvider'
import { mockBlogPosts } from '@/data/mockData'
import { ChevronRight, MessageCircle } from 'lucide-react'

export function NewsPage() {
  const { t, lang } = useI18n()
  const getText = (obj: Record<string, string>) => obj[lang] || obj.ru || ''
  const newsPosts = mockBlogPosts.filter(p => p.type === 'news' || p.type === 'guide')

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">{t('news.title')}</h1>
      <div className="space-y-6">
        {newsPosts.map(post => (
          <Card key={post.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-start gap-4">
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground mb-2">
                    {new Date(post.publishedAt || post.createdAt).toLocaleDateString(lang === 'uk' ? 'uk-UA' : lang === 'en' ? 'en-US' : lang === 'pl' ? 'pl-PL' : 'ru-RU')}
                  </p>
                  <h3 className="font-semibold text-lg mb-2">{getText(post.title)}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{getText(post.excerpt)}</p>
                  <div className="flex items-center gap-4">
                    <Link to={`/blog/${post.slug}`}>
                      <Button variant="outline" size="sm" className="gap-1">
                        {t('blog.readMore')} <ChevronRight className="w-4 h-4" />
                      </Button>
                    </Link>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <MessageCircle className="w-3 h-3" /> {post.commentCount}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

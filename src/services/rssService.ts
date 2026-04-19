import { XMLParser } from 'fast-xml-parser'
import type { NewsArticle, NewsSource } from '../types'

export const RSS_SOURCES: NewsSource[] = [
  {
    name: 'Hacker News',
    category: 'Tech',
    url: 'https://news.ycombinator.com/rss',
    color: '#ff6600',
  },
  {
    name: 'BBC Tech',
    category: 'Tech',
    url: 'https://feeds.bbc.co.uk/news/technology/rss.xml',
    color: '#222222',
  },
  {
    name: 'BBC Business',
    category: 'Business',
    url: 'https://feeds.bbc.co.uk/news/business/rss.xml',
    color: '#222222',
  },
  {
    name: 'TechCrunch',
    category: 'Tech',
    url: 'https://techcrunch.com/feed/',
    color: '#25252d',
  },
]

const CORS_PROXIES = [
  'https://api.allorigins.win/raw?url=',
  'https://corsproxy.io/?',
]

const FALLBACK_ARTICLES: NewsArticle[] = [
  {
    id: 'fallback-tech-1',
    title: 'AI 인프라 투자 심리가 이어지며 대형 기술주 변동성이 확대되고 있습니다.',
    summary: '실시간 RSS 연결이 불안정할 때도 대시보드를 확인할 수 있도록 준비된 예비 카드입니다.',
    url: 'https://news.ycombinator.com/',
    author: 'Wave Tree Desk',
    published: new Date('2026-04-19T08:00:00+09:00'),
    source: 'Hacker News',
    category: 'Tech',
  },
  {
    id: 'fallback-tech-2',
    title: '반도체와 클라우드 수요가 동반 회복 조짐을 보이며 성장 섹터 관심이 유지됩니다.',
    summary: '외부 피드 응답이 없을 때 화면이 비어 보이지 않도록 보조 기사 데이터를 노출합니다.',
    url: 'https://techcrunch.com/',
    author: 'Wave Tree Desk',
    published: new Date('2026-04-19T07:30:00+09:00'),
    source: 'TechCrunch',
    category: 'Tech',
  },
  {
    id: 'fallback-business-1',
    title: '금리 경로 불확실성 속에서 경기 민감주와 방어주의 순환이 짧아지는 흐름입니다.',
    summary: '네트워크 상태가 불안정한 환경에서도 핵심 레이아웃과 상호작용은 유지됩니다.',
    url: 'https://www.bbc.com/news/business',
    author: 'Wave Tree Desk',
    published: new Date('2026-04-19T07:00:00+09:00'),
    source: 'BBC Business',
    category: 'Business',
  },
  {
    id: 'fallback-tech-3',
    title: '플랫폼 기업들은 광고 회복 속도보다 비용 효율성과 AI 제품화 성과를 더 강하게 점검받고 있습니다.',
    summary: '실시간 데이터가 복구되면 예비 카드 대신 최신 기사 목록으로 자동 전환됩니다.',
    url: 'https://www.bbc.com/news/technology',
    author: 'Wave Tree Desk',
    published: new Date('2026-04-19T06:30:00+09:00'),
    source: 'BBC Tech',
    category: 'Tech',
  },
  {
    id: 'fallback-business-2',
    title: '원자재와 에너지 가격 움직임이 기업 실적 전망에 다시 반영되며 업종별 체감 온도가 갈리고 있습니다.',
    summary: '사용자 입장에서는 빈 화면보다 명확한 상태와 대체 데이터가 더 중요하도록 처리했습니다.',
    url: 'https://www.bbc.com/news/business',
    author: 'Wave Tree Desk',
    published: new Date('2026-04-19T06:00:00+09:00'),
    source: 'BBC Business',
    category: 'Business',
  },
  {
    id: 'fallback-tech-4',
    title: '스타트업 투자 시장은 선별적 회복 국면으로, 매출 가시성과 현금흐름 방어력이 다시 중요해지고 있습니다.',
    summary: '앱 동작 안정성을 우선해 네트워크 실패 시에도 카드, 필터, 모달이 계속 동작합니다.',
    url: 'https://techcrunch.com/',
    author: 'Wave Tree Desk',
    published: new Date('2026-04-19T05:30:00+09:00'),
    source: 'TechCrunch',
    category: 'Tech',
  },
]

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: '@_',
})

const stripHtml = (value: string): string => {
  return value.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
}

const normalizeItems = (parsed: Record<string, unknown>): Record<string, unknown>[] => {
  const rssChannel = (parsed.rss as Record<string, unknown> | undefined)?.channel as
    | Record<string, unknown>
    | undefined
  if (rssChannel?.item) {
    return (Array.isArray(rssChannel.item) ? rssChannel.item : [rssChannel.item]).filter(
      (item): item is Record<string, unknown> => typeof item === 'object' && item !== null,
    )
  }

  const atomFeed = parsed.feed as Record<string, unknown> | undefined
  if (atomFeed?.entry) {
    return (Array.isArray(atomFeed.entry) ? atomFeed.entry : [atomFeed.entry]).filter(
      (item): item is Record<string, unknown> => typeof item === 'object' && item !== null,
    )
  }

  return []
}

const getItemLink = (item: Record<string, unknown>): string => {
  const link = item.link

  if (typeof link === 'string') {
    return link
  }

  if (Array.isArray(link)) {
    const firstHref = link.find(
      (candidate) => typeof candidate === 'object' && candidate !== null && '@_href' in candidate,
    ) as Record<string, unknown> | undefined
    return (firstHref?.['@_href'] as string) || '#'
  }

  if (typeof link === 'object' && link !== null) {
    return (link as Record<string, unknown>)['@_href'] as string
  }

  return '#'
}

const fetchFeedXml = async (feedUrl: string): Promise<string> => {
  let lastError: Error | null = null

  for (const proxy of CORS_PROXIES) {
    const proxiedUrl = `${proxy}${encodeURIComponent(feedUrl)}`

    try {
      const response = await fetch(proxiedUrl)

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`)
      }

      const body = await response.text()
      const trimmed = body.trim()

      if (!trimmed.startsWith('<')) {
        throw new Error('Non-XML response')
      }

      return body
    } catch (error) {
      lastError = error instanceof Error ? error : new Error('Unknown RSS fetch error')
    }
  }

  throw lastError ?? new Error('RSS fetch failed')
}

const parseRssFeed = async (feedUrl: string, source: NewsSource): Promise<NewsArticle[]> => {
  const xml = await fetchFeedXml(feedUrl)
  const parsed = parser.parse(xml) as Record<string, unknown>

  const items = normalizeItems(parsed)
  if (items.length === 0) {
    return []
  }

  return items
    .slice(0, 5)
    .map((item) => ({
      id: `${source.name}-${String(getItemLink(item) || (item.title as string) || 'news')}`,
      title: (item.title as string) || '제목 없음',
      summary: stripHtml(((item.description as string) || (item.summary as string) || '')).substring(0, 120),
      url: getItemLink(item),
      author: (item.author as string) || source.name,
      published: new Date(
        (item.pubDate as string) ||
          (item.published as string) ||
          (item.updated as string) ||
          Date.now(),
      ),
      source: source.name,
      category: source.category,
    }))
    .filter((article) => article.url !== '#')
}

export const fetchAllFeeds = async (sources: NewsSource[]): Promise<NewsArticle[]> => {
  const allArticles: NewsArticle[] = []

  for (const source of sources) {
    try {
      const articles = await parseRssFeed(source.url, source)
      allArticles.push(...articles)
    } catch {
      console.error(`Failed to fetch ${source.name}:`, source.url)
    }
  }

  return allArticles.sort((a, b) => b.published.getTime() - a.published.getTime())
}

export const getCategories = (sources: NewsSource[]): string[] => {
  return Array.from(new Set(sources.map((s) => s.category)))
}

export const getFallbackArticles = (sources: NewsSource[]): NewsArticle[] => {
  const sourceNames = new Set(sources.map((source) => source.name))

  return FALLBACK_ARTICLES.filter((article) => sourceNames.has(article.source))
}

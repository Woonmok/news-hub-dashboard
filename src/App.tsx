import { useMemo, useState } from 'react'
import './App.css'
import { useRssNews } from './hooks/useRssNews'
import { RSS_SOURCES, getCategories } from './services/rssService'
import type { NewsArticle } from './types'

const trendSignals = [
  { name: '반도체', score: '+18%', tone: '상승 가속' },
  { name: '에너지', score: '+11%', tone: '정책 모멘텀' },
  { name: '플랫폼', score: '-4%', tone: '광고 둔화' },
  { name: '바이오', score: '+7%', tone: '임상 기대' },
]

const regionalWatch = [
  {
    region: '서울',
    note: '원화 강세와 외국인 매수 유입으로 대형 성장주 체력이 회복되는 흐름입니다.',
  },
  {
    region: '도쿄',
    note: '엔저 완화에도 수출주 선호가 유지되며 장비·자동화 섹터가 상대 강세입니다.',
  },
  {
    region: '뉴욕',
    note: '빅테크 실적 가이던스 경계감이 남아 있으나 AI 인프라 수요는 여전히 견조합니다.',
  },
]

const editorQueue = [
  { time: '07:40', headline: '오프닝 브리프', status: '배포 준비' },
  { time: '08:10', headline: '시장 온도 체크', status: '데이터 반영 중' },
  { time: '09:00', headline: '섹터 플로우 리포트', status: '헤드라인 확정' },
  { time: '10:30', headline: '실적 속보 패널', status: '대기' },
]

const formatDateLabel = (date: Date | null): string => {
  if (!date) {
    return '업데이트 준비 중'
  }

  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(date)
}

function App() {
  const {
    articles,
    isLoading,
    error,
    selectedSources,
    selectedCategories,
    toggleSource,
    toggleCategory,
    refresh,
    autoRefreshSeconds,
    setAutoRefreshSeconds,
    newArticleCount,
    clearNewArticleCount,
    lastUpdated,
  } = useRssNews()

  const [activeArticle, setActiveArticle] = useState<NewsArticle | null>(null)

  const categories = useMemo(() => getCategories(RSS_SOURCES), [])
  const topArticle = articles[0]
  const updatedLabel = formatDateLabel(lastUpdated)
  const activeIndex = activeArticle
    ? articles.findIndex((article) => article.id === activeArticle.id)
    : -1
  const hasPrevArticle = activeIndex > 0
  const hasNextArticle = activeIndex >= 0 && activeIndex < articles.length - 1

  const handleManualRefresh = () => {
    clearNewArticleCount()
    void refresh()
  }

  const handleOpenArticle = (article: NewsArticle) => {
    clearNewArticleCount()
    setActiveArticle(article)
  }

  const handleCloseArticle = () => {
    setActiveArticle(null)
  }

  const handlePrevArticle = () => {
    if (!hasPrevArticle) {
      return
    }

    setActiveArticle(articles[activeIndex - 1])
  }

  const handleNextArticle = () => {
    if (!hasNextArticle) {
      return
    }

    setActiveArticle(articles[activeIndex + 1])
  }

  return (
    <main className="dashboard-shell">
      <section className="hero-panel">
        <div className="masthead">
          <div>
            <p className="eyebrow">Wave Tree News Hub</p>
            <h1>오늘의 시장을 한 장으로 읽는 뉴스 대시보드</h1>
          </div>
          <p className="timestamp">{updatedLabel} KST 업데이트</p>
        </div>

        <div className="hero-grid">
          <article className="lead-story story-card feature-story">
            <div className="story-meta">
              <span className="story-tag hot">Top Focus</span>
              <span>{isLoading ? 'RSS 동기화 중' : 'RSS 동기화 완료'}</span>
            </div>
            <h2>{topArticle?.title ?? '뉴스 로딩 중...'}</h2>
            <p>
              {topArticle?.author ?? 'Wave Tree'} · {topArticle?.source ?? '뉴스허브'}
            </p>
            <div className="metric-row">
              {[
                {
                  label: '활성 피드',
                  value: String(selectedSources.size).padStart(2, '0'),
                  detail: '선택된 RSS 소스',
                },
                {
                  label: '수집 기사',
                  value: String(articles.length).padStart(2, '0'),
                  detail: 'RSS 필터 완료',
                },
                {
                  label: '활성 카테고리',
                  value: String(selectedCategories.size).padStart(2, '0'),
                  detail: '필터 적용 중',
                },
              ].map((metric) => (
                <div key={metric.label} className="metric-card">
                  <span>{metric.label}</span>
                  <strong>{metric.value}</strong>
                  <small>{metric.detail}</small>
                </div>
              ))}
            </div>
          </article>

          <aside className="side-panel glass-panel">
            <div className="story-meta">
              <span className="story-tag">Filters</span>
              <button onClick={handleManualRefresh} className="refresh-btn" title="새로고침">
                ↻
              </button>
            </div>

            <div className="filter-section">
              <p className="filter-label">자동 새로고침</p>
              <div className="refresh-select-wrap">
                <select
                  className="refresh-select"
                  value={autoRefreshSeconds}
                  onChange={(event) => {
                    setAutoRefreshSeconds(Number(event.target.value) as 0 | 30 | 60)
                  }}
                >
                  <option value={0}>끔</option>
                  <option value={30}>30초</option>
                  <option value={60}>60초</option>
                </select>
                {newArticleCount > 0 ? (
                  <button className="new-articles-badge" onClick={clearNewArticleCount}>
                    신규 {newArticleCount}
                  </button>
                ) : null}
              </div>
            </div>

            <div className="filter-section">
              <p className="filter-label">카테고리</p>
              <div className="filter-buttons">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => toggleCategory(cat)}
                    className={`filter-btn ${selectedCategories.has(cat) ? 'active' : ''}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="filter-section">
              <p className="filter-label">뉴스 소스</p>
              <div className="source-list">
                {RSS_SOURCES.map((src) => (
                  <label key={src.name} className="source-checkbox">
                    <input
                      type="checkbox"
                      checked={selectedSources.has(src.name)}
                      onChange={() => toggleSource(src.name)}
                    />
                    {src.name}
                  </label>
                ))}
              </div>
            </div>

            <div className="signal-bars" aria-hidden="true">
              <span style={{ height: '68%' }}></span>
              <span style={{ height: '88%' }}></span>
              <span style={{ height: '54%' }}></span>
              <span style={{ height: '96%' }}></span>
              <span style={{ height: '72%' }}></span>
              <span style={{ height: '84%' }}></span>
            </div>
          </aside>
        </div>
      </section>

      <section className="content-grid">
        <div className="stack-column">
          <section className="section-card">
            <div className="section-heading">
              <div>
                <p className="section-kicker">Headline Radar</p>
                <h3>주요 뉴스 카드</h3>
              </div>
              <div className="headline-status-wrap">
                <span className="section-badge">RSS {articles.length}건</span>
                {newArticleCount > 0 ? <span className="section-badge live">+{newArticleCount} NEW</span> : null}
              </div>
            </div>
            {error ? <p className="status-note">{error}</p> : null}
            {isLoading ? <p className="status-note">RSS 피드 로딩 중...</p> : null}
            <div className="headline-grid">
              {articles.slice(0, 6).map((article) => (
                <article key={article.id} className="story-card compact-story">
                  <span className="story-tag">{article.category}</span>
                  <h4>
                    <button className="headline-button" onClick={() => handleOpenArticle(article)}>
                      {article.title}
                    </button>
                  </h4>
                  <p>{article.summary}</p>
                  <div className="article-meta-row">
                    <small>{article.source}</small>
                    <a href={article.url} target="_blank" rel="noreferrer" className="headline-link">
                      원문 보기
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="section-card warm-panel">
            <div className="section-heading">
              <div>
                <p className="section-kicker">Regional Watch</p>
                <h3>지역별 시장 온도</h3>
              </div>
              <span className="section-badge">아시아 · 미국</span>
            </div>
            <div className="region-list">
              {regionalWatch.map((item) => (
                <article key={item.region} className="region-card">
                  <h4>{item.region}</h4>
                  <p>{item.note}</p>
                </article>
              ))}
            </div>
          </section>
        </div>

        <div className="stack-column narrow-column">
          <section className="section-card dark-panel">
            <div className="section-heading">
              <div>
                <p className="section-kicker">Momentum</p>
                <h3>섹터 트렌드 신호</h3>
              </div>
            </div>
            <div className="trend-list">
              {trendSignals.map((signal) => (
                <div key={signal.name} className="trend-row">
                  <div>
                    <strong>{signal.name}</strong>
                    <p>{signal.tone}</p>
                  </div>
                  <span>{signal.score}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="section-card">
            <div className="section-heading">
              <div>
                <p className="section-kicker">Editorial Queue</p>
                <h3>배포 대기 기사</h3>
              </div>
            </div>
            <div className="queue-list">
              {editorQueue.map((item) => (
                <div key={`${item.time}-${item.headline}`} className="queue-row">
                  <span>{item.time}</span>
                  <div>
                    <strong>{item.headline}</strong>
                    <p>{item.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </section>

      {newArticleCount > 0 ? (
        <div className="new-articles-toast" role="status" aria-live="polite">
          <span>새 기사 {newArticleCount}건 도착</span>
          <button onClick={clearNewArticleCount}>확인</button>
        </div>
      ) : null}

      {activeArticle ? (
        <div className="modal-overlay" role="presentation" onClick={handleCloseArticle}>
          <div className="article-modal" role="dialog" aria-modal="true" onClick={(event) => event.stopPropagation()}>
            <div className="article-modal-header">
              <span className="story-tag">{activeArticle.category}</span>
              <div className="modal-actions">
                <button className="modal-nav-btn" onClick={handlePrevArticle} disabled={!hasPrevArticle}>
                  이전
                </button>
                <button className="modal-nav-btn" onClick={handleNextArticle} disabled={!hasNextArticle}>
                  다음
                </button>
                <button className="modal-close-btn" onClick={handleCloseArticle} aria-label="닫기">
                  닫기
                </button>
              </div>
            </div>
            <h3>{activeArticle.title}</h3>
            <p>{activeArticle.summary || '요약 정보가 없습니다.'}</p>
            <div className="article-modal-meta">
              <span>{activeArticle.source}</span>
              <span>{activeArticle.author}</span>
              <span>{new Intl.DateTimeFormat('ko-KR').format(activeArticle.published)}</span>
            </div>
            <a href={activeArticle.url} target="_blank" rel="noreferrer" className="modal-source-link">
              원문 기사 열기
            </a>
          </div>
        </div>
      ) : null}
    </main>
  )
}

export default App

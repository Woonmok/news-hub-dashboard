import { useCallback, useEffect, useRef, useState } from 'react'
import { fetchAllFeeds, getCategories, getFallbackArticles, RSS_SOURCES } from '../services/rssService'
import type { NewsArticle } from '../types'

export const useRssNews = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedSources, setSelectedSources] = useState<Set<string>>(
    new Set(RSS_SOURCES.map((s) => s.name)),
  )
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(
    new Set(getCategories(RSS_SOURCES)),
  )
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)
  const [autoRefreshSeconds, setAutoRefreshSeconds] = useState<0 | 30 | 60>(30)
  const [newArticleCount, setNewArticleCount] = useState(0)

  const previousArticleIdsRef = useRef<Set<string>>(new Set())

  const loadNews = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const filteredSources = RSS_SOURCES.filter((s) => selectedSources.has(s.name))
      const allArticles = await fetchAllFeeds(filteredSources)
      const filteredLive = allArticles.filter((a) => selectedCategories.has(a.category))
      const filtered =
        filteredLive.length > 0
          ? filteredLive
          : getFallbackArticles(filteredSources).filter((article) => selectedCategories.has(article.category))

      if (filteredLive.length === 0 && filteredSources.length > 0) {
        setError('실시간 RSS 연결이 불안정해 예비 뉴스 카드로 표시 중입니다.')
      }

      const currentIds = new Set(filtered.map((article) => article.id))
      const previousIds = previousArticleIdsRef.current

      if (previousIds.size > 0) {
        const nextCount = filtered.filter((article) => !previousIds.has(article.id)).length
        setNewArticleCount(nextCount)
      }

      previousArticleIdsRef.current = currentIds
      setArticles(filtered)
      setLastUpdated(new Date())
    } catch {
      setError('뉴스 피드 로드에 실패했습니다.')
    } finally {
      setIsLoading(false)
    }
  }, [selectedSources, selectedCategories])

  useEffect(() => {
    void loadNews()
  }, [loadNews])

  useEffect(() => {
    if (autoRefreshSeconds === 0) {
      return
    }

    const timerId = window.setInterval(() => {
      void loadNews()
    }, autoRefreshSeconds * 1000)

    return () => window.clearInterval(timerId)
  }, [autoRefreshSeconds, loadNews])

  // 매일 오전 8시 자동 새로고침
  useEffect(() => {
    const lastDailyRefreshKey = 'wave_tree_last_daily_refresh'

    const scheduleDailyRefresh = () => {
      const now = new Date()
      const next8am = new Date(now)
      next8am.setHours(8, 0, 0, 0)
      if (now >= next8am) {
        next8am.setDate(next8am.getDate() + 1)
      }
      return next8am.getTime() - now.getTime()
    }

    const checkAndRefresh = () => {
      const today = new Date().toDateString()
      const lastRefresh = localStorage.getItem(lastDailyRefreshKey)
      if (lastRefresh !== today) {
        localStorage.setItem(lastDailyRefreshKey, today)
        void loadNews()
      }
    }

    const msUntil8am = scheduleDailyRefresh()
    const firstTimer = window.setTimeout(() => {
      checkAndRefresh()
      const dailyTimer = window.setInterval(checkAndRefresh, 24 * 60 * 60 * 1000)
      return () => window.clearInterval(dailyTimer)
    }, msUntil8am)

    return () => window.clearTimeout(firstTimer)
  }, [loadNews])

  const toggleSource = (sourceName: string) => {
    const next = new Set(selectedSources)
    if (next.has(sourceName)) {
      next.delete(sourceName)
    } else {
      next.add(sourceName)
    }
    setSelectedSources(next)
  }

  const toggleCategory = (category: string) => {
    const next = new Set(selectedCategories)
    if (next.has(category)) {
      next.delete(category)
    } else {
      next.add(category)
    }
    setSelectedCategories(next)
  }

  const clearNewArticleCount = () => {
    setNewArticleCount(0)
  }

  return {
    articles,
    isLoading,
    error,
    selectedSources,
    selectedCategories,
    toggleSource,
    toggleCategory,
    refresh: loadNews,
    autoRefreshSeconds,
    setAutoRefreshSeconds,
    newArticleCount,
    clearNewArticleCount,
    lastUpdated,
  }
}

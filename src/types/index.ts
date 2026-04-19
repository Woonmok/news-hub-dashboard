export type NewsArticle = {
  id: string
  title: string
  summary: string
  url: string
  author: string
  published: Date
  source: NewsSource['name']
  category: string
  imageUrl?: string
}

export type NewsSource = {
  name: string
  category: string
  url: string
  color?: string
}

export type FilterState = {
  selectedSources: Set<string>
  selectedCategories: Set<string>
}

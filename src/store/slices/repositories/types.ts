/** Тип стейта repositoriesSlice */
export type InitialState = {
  /** Параметры запроса */
  params: SearchParamsObj
  /** Результат поискового запроса */
  result: SearchResult | null
  /** Данные репозитория, выбранные пользователем в таблице */
  selectedRepo: Repository | null
  /** Статус поискового запроса */
  isLoading: boolean
  /** Текстовое сообщение из ошибки, возникшей при поисковом запросе */
  errorMsg?: string
}

/** Тип объекта параметров запроса */
export type SearchParamsObj = {
  /** Название репозитория */
  q: string
  /** Поля объекта репозитория (Repository) по которым возможна сортировка */
  sort?: 'stars' | 'forks' | 'updated'
  /** Напрвление сортировки */
  order?: 'asc' | 'desc'
  /** Количество репозиториев отображаемых на одной странице */
  per_page: number
  /** Номер текущей страницы. Для запроса нужно увеличить значение на 1 (так работает MUI пагинация таблиц) */
  page: number
}

/** Тип объекта результата поискового запроса */
export type SearchResult = {
  /** Общее количество репозиториев удовлетворяющих поисковый запрос */
  total_count: number,
  /** В приложении не используется */
  incomplete_results: boolean,
  /** Массив найденных репозиториев для текущей страницы */
  items: Array<Repository>
}

/** Тип объекта репозитория */
export type Repository = {
  /** Уникальный идентификатор репозитория */
  id: number
  /** Название репозитория */
  name: string
  /** Язык программирования, который используется в проекте репозитория */
  language: string
  /** Количество звезд репозитория */
  stargazers_count: number
  /** Основные темы репозитория */
  topics: Array<string>
  /** Количество форков */
  forks_count: number
  /** Описание лицензии */
  license: License | null
  /** ISO дата последних изменений */
  updated_at: string
  /** В приложении не используется */
  node_id: string
  /** В приложении не используется */
  full_name: string
  /** В приложении не используется */
  private: boolean
  /** В приложении не используется */
  owner: Owner
  /** В приложении не используется */
  html_url: string
  /** В приложении не используется */
  description: string
  /** В приложении не используется */
  fork: boolean
  /** В приложении не используется */
  url: string
  /** В приложении не используется */
  forks_url: string
  /** В приложении не используется */
  keys_url: string
  /** В приложении не используется */
  collaborators_url: string
  /** В приложении не используется */
  teams_url: string
  /** В приложении не используется */
  hooks_url: string
  /** В приложении не используется */
  issue_events_url: string
  /** В приложении не используется */
  events_url: string
  /** В приложении не используется */
  assignees_url: string
  /** В приложении не используется */
  branches_url: string
  /** В приложении не используется */
  tags_url: string
  /** В приложении не используется */
  blobs_url: string
  /** В приложении не используется */
  git_tags_url: string
  /** В приложении не используется */
  git_refs_url: string
  /** В приложении не используется */
  trees_url: string
  /** В приложении не используется */
  statuses_url: string
  /** В приложении не используется */
  languages_url: string
  /** В приложении не используется */
  stargazers_url: string
  /** В приложении не используется */
  contributors_url: string
  /** В приложении не используется */
  subscribers_url: string
  /** В приложении не используется */
  subscription_url: string
  /** В приложении не используется */
  commits_url: string
  /** В приложении не используется */
  git_commits_url: string
  /** В приложении не используется */
  comments_url: string
  /** В приложении не используется */
  issue_comment_url: string
  /** В приложении не используется */
  contents_url: string
  /** В приложении не используется */
  compare_url: string
  /** В приложении не используется */
  merges_url: string
  /** В приложении не используется */
  archive_url: string
  /** В приложении не используется */
  downloads_url: string
  /** В приложении не используется */
  issues_url: string
  /** В приложении не используется */
  pulls_url: string
  /** В приложении не используется */
  milestones_url: string
  /** В приложении не используется */
  notifications_url: string
  /** В приложении не используется */
  labels_url: string
  /** В приложении не используется */
  releases_url: string
  /** В приложении не используется */
  deployments_url: string
  /** В приложении не используется */
  created_at: string
  /** В приложении не используется */
  pushed_at: string
  /** В приложении не используется */
  git_url: string
  /** В приложении не используется */
  ssh_url: string
  /** В приложении не используется */
  clone_url: string
  /** В приложении не используется */
  svn_url: string
  /** В приложении не используется */
  homepage: string
  /** В приложении не используется */
  size: number
  /** В приложении не используется */
  watchers_count: number
  /** В приложении не используется */
  has_issues: boolean
  /** В приложении не используется */
  has_projects: boolean
  /** В приложении не используется */
  has_downloads: boolean
  /** В приложении не используется */
  has_wiki: boolean
  /** В приложении не используется */
  has_pages: boolean
  /** В приложении не используется */
  has_discussions: boolean
  /** В приложении не используется */
  mirror_url: string
  /** В приложении не используется */
  archived: boolean
  /** В приложении не используется */
  disabled: boolean
  /** В приложении не используется */
  open_issues_count: number
  /** В приложении не используется */
  allow_forking: boolean
  /** В приложении не используется */
  is_template: boolean
  /** В приложении не используется */
  web_commit_signoff_required: boolean
  /** В приложении не используется */
  visibility: string
  /** В приложении не используется */
  forks: number
  /** В приложении не используется */
  open_issues: number
  /** В приложении не используется */
  watchers: number
  /** В приложении не используется */
  default_branch: string
  /** В приложении не используется */
  score: number
}

/** Тип объекта описания лицензии */
type License = {
  /** Название лицензии */
  name: string
  /** В приложении не используется */
  key: string
  /** В приложении не используется */
  spdx_id: string
  /** В приложении не используется */
  url: string
  /** В приложении не используется */
  node_id: string
}

/** Тип объекта владельца репозитория */
type Owner = {
  /** В приложении не используется */
  login: string
  /** В приложении не используется */
  id: number
  /** В приложении не используется */
  node_id: string
  /** В приложении не используется */
  avatar_url: string
  /** В приложении не используется */
  gravatar_id: string
  /** В приложении не используется */
  url: string
  /** В приложении не используется */
  html_url: string
  /** В приложении не используется */
  followers_url: string
  /** В приложении не используется */
  following_url: string
  /** В приложении не используется */
  gists_url: string
  /** В приложении не используется */
  starred_url: string
  /** В приложении не используется */
  subscriptions_url: string
  /** В приложении не используется */
  organizations_url: string
  /** В приложении не используется */
  repos_url: string
  /** В приложении не используется */
  events_url: string
  /** В приложении не используется */
  received_events_url: string
  /** В приложении не используется */
  type: string
  /** В приложении не используется */
  site_admin: boolean
}

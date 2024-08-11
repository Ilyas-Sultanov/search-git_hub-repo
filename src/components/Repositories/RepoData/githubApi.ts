import { baseApi } from '../../../api/baseApi'

type Params = {
  q: string
  sort: 'stars' | 'forks' | 'updated'
  order: 'asc' | 'desc'
  per_page: number
  page: number
}

export const githubApi = baseApi.injectEndpoints({
  endpoints(build) {
    return {
      getRepos: build.query<Promise<void>, Params>({
        query(params) {
          params.q = params.q + ' in:name'
          return {
            url: '/search/repositories',
            method: 'GET',
            params,
          }
        },
      })
    }
  },
  overrideExisting: true,
})

// ?q=test-lab in:name&sort=stars&order=desc&per_page=1&page=2

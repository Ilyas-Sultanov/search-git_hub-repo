import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import type  { SearchResult, SearchParamsObj, InitialState, Repository } from './types'
import { AppState } from '@/store/store'

const initialState: InitialState = {
  params: {
    q: '',
    sort: undefined,
    order: undefined,
    per_page: 4,
    page: 0,
  },
  result: null,
  selectedRepo: null,
  isLoading: false,
  errorMsg: undefined,
}

export const repositoriesSlice = createSlice({
  name: 'repositories',
  initialState,
  selectors: {
    selectSearchParams: (state) => state.params,
    selectResult: (state) => state.result,
    selectSelectedRepo: (state) => state.selectedRepo,
  },
  reducers: {
    setRepoSearchParams(state, action: PayloadAction<Partial<SearchParamsObj>>) {
      const payload = action.payload
      if (payload.q) {
        payload.q = `${payload.q} in:name`
      }
      state.params = { ...state.params, ...payload }
    },
    removeSortFromSearchParams(state) {
      delete state.params.sort
      delete state.params.order
    },
    setSelectedRepo(state, { payload }: PayloadAction<Repository | null>) {
      state.selectedRepo = payload
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchRepos.pending, (state) => {
        state.isLoading = true
        state.errorMsg = ''
      })
      .addCase(fetchRepos.rejected, (state, action) => {
        state.isLoading = false
        state.errorMsg = action.payload
      })
      .addCase(fetchRepos.fulfilled, (state, action) => {
        state.isLoading = false
        state.errorMsg = ''
        state.result = action.payload
      })
  },
})

const baseUrl = 'https://api.github.com'

/** 
 * Асинхронный thunk для поиска репозиториев
 * @param params SearchParamsObj.
 * @returns SearchResult.
 */
export const fetchRepos = createAsyncThunk<SearchResult, SearchParamsObj, { rejectValue: string, state: AppState }>(
  'repositories/fetch',
  async (params, thunkAPI) => {
    try{
      const searchParams: Record<string, string> = {
        q: params.q,
        page: String(params.page + 1),
        per_page: String(params.per_page),
      }
      if (params.sort && params.order) {
        searchParams.sort = String(params.sort)
        searchParams.order = String(params.order)
      }
      const response = await fetch(
        `${baseUrl}/search/repositories?${new URLSearchParams(searchParams).toString()}`,
        {method: 'GET'}
      )
      if (!response.ok) {
        throw new Error(`Что-то пошло не так, статус - ${response.status}`)
      }
      const data: SearchResult = await response.json()
      return data
    } catch (err) {
      const errMsg = (err as Error).message
      return thunkAPI.rejectWithValue(errMsg)
    }
  }
)

export const { setRepoSearchParams, removeSortFromSearchParams, setSelectedRepo } = repositoriesSlice.actions
export const repositoriesReducer = repositoriesSlice.reducer

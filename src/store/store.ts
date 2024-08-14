import { configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector, useStore } from 'react-redux'
import { repositoriesReducer } from './slices/repositories/repositoriesSlice'

/** Redux store приложения */
export const store = configureStore({
  reducer: {
    repositories: repositoriesReducer,
  },
})

/** Тип стейта приложения */
export type AppState = ReturnType<typeof store.getState>
/** Тип функции dispatch приложения */
export type AppDispatch = typeof store.dispatch

export const useAppSelector = useSelector.withTypes<AppState>()
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppStore = useStore.withTypes<typeof store>

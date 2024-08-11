import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouteObject, RouterProvider } from 'react-router-dom'
import App from './App.tsx'
import { Provider } from 'react-redux'
import { store } from './store/store.ts'
import './index.scss'

const routes: Array<RouteObject> = [
  {
    path: '/',
    element: <App />,
  },
]

export const router = createBrowserRouter(routes)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
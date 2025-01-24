
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './app/store.ts'
import ProductPage from './pages/ProductPage.tsx'

const rootElement = document.getElementById('root') as HTMLElement
const root = ReactDOM.createRoot(rootElement)

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ProductPage />
    </Provider>
  </React.StrictMode>
)

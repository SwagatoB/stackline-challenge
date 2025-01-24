
import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks.ts'
import { fetchProducts, selectProducts } from '../features/productSlice.ts'
import Header from '../components/Header.tsx'
import ProductInfo from '../components/ProductInfo.tsx'
import SalesChart from '../components/SalesChart.tsx'
import SalesTable from '../components/SalesTable.tsx'
import '../styles/ProductPage.css'

const ProductPage: React.FC = () => {
  const dispatch = useAppDispatch()
  const products = useAppSelector(selectProducts)

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  const product = products.length ? products[0] : null

  if (!product) {
    return <div>Loading product...</div>
  }

  return (
    <div className="page-container">
      <Header />
      <div className="content-wrapper">
        <aside className="sidebar">
          <ProductInfo
            title={product.title}
            brand={product.brand}
            subtitle={product.subtitle}
            image={product.image}
            tags={product.tags}
          />
        </aside>

        <main className="main-panel">
          <section className="card chart-card">
            <h2>Retail Sales</h2>
            <SalesChart sales={product.sales} />
          </section>

          <section className="card table-card">
            <SalesTable sales={product.sales} />
          </section>
        </main>
      </div>
    </div>
  )
}

export default ProductPage

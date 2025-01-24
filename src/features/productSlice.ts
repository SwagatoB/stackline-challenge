
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../app/store'

// Types
export interface Sale {
  weekEnding: string
  retailSales: number
  wholesaleSales: number
  unitsSold: number
  retailerMargin: number
}

export interface Review {
  customer: string
  review: string
  score: number
}

export interface Product {
  id: string
  title: string
  image: string
  subtitle: string
  brand: string
  retailer: string
  tags: string[]
  details: string[]
  sales: Sale[]
  reviews: Review[]
}

interface ProductState {
  products: Product[]
  loading: boolean
  error: string | null
}

const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
}

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {

  const { default: productsData } = await import('../data/stackline_frontend_assessment_data_2021.json')
  return productsData as Product[]
})

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.loading = false
        state.products = action.payload
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message ?? 'Failed to fetch products'
      })
  },
})

export default productSlice.reducer

export const selectProducts = (state: RootState) => state.product.products

import React from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { parseISO } from 'date-fns'
import { Sale } from '../features/productSlice'


function shortCurrencyFormatter(value: number): string {
  if (value >= 1_000_000) {
    return `$${(value / 1_000_000).toFixed(1)}M`
  } else if (value >= 1_000) {
    return `$${(value / 1_000)}K`
  } else {
    return `$${value.toFixed(0)}`
  }
}

interface SalesChartProps {
  sales: Sale[]
}

const SalesChart: React.FC<SalesChartProps> = ({ sales }) => {
  // weekly => monthly
  const monthlyData = React.useMemo(() => {
    const monthMap: Record<string, { retailSales: number; wholesaleSales: number; timeValue: number }> = {}
    sales.forEach((sale) => {
      const date = parseISO(sale.weekEnding)
      const y = date.getFullYear()
      const m = date.getMonth()
      const key = `${y}-${String(m + 1).padStart(2, '0')}`
      if (!monthMap[key]) {
        monthMap[key] = { retailSales: 0, wholesaleSales: 0, timeValue: new Date(y, m, 1).getTime() }
      }
      monthMap[key].retailSales += sale.retailSales
      monthMap[key].wholesaleSales += sale.wholesaleSales
    })

    const arr = Object.entries(monthMap).map(([k, v]) => {
      const [yyyy, mm] = k.split('-')
      const dateObj = new Date(Number(yyyy), Number(mm) - 1, 1)
      const label = dateObj.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
      return {
        month: label,
        retailSales: v.retailSales,
        wholesaleSales: v.wholesaleSales,
        timeValue: v.timeValue,
      }
    })

    arr.sort((a, b) => a.timeValue - b.timeValue)
    return arr
  }, [sales])

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={monthlyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis tickFormatter={shortCurrencyFormatter} />        
        <Tooltip
          formatter={(value: any, name: string) => {
            
            if (typeof value === 'number') {
              return shortCurrencyFormatter(value)
            }
            return value
          }}
        />
        
        <Legend />
        <Line
          type="monotone"
          dataKey="retailSales"
          stroke="#8884d8"
          name="Retail Sales"
        />
        <Line
          type="monotone"
          dataKey="wholesaleSales"
          stroke="#82ca9d"
          name="Wholesale Sales"
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default SalesChart

import React from 'react'
import { Sale } from '../features/productSlice'
import './SalesTable.css'

interface SalesTableProps {
  sales: Sale[]
}

// Arrow component that flips if direction='desc'
const SortArrow: React.FC<{ direction: 'asc' | 'desc' }> = ({ direction }) => {
  return (
    <img
      src="arrow.svg"
      alt="Sort Arrow"
      style={{
        marginLeft: '0.3rem',
        width: '12px',
        height: '12px',
        transition: 'transform 0.2s',
        transform: direction === 'desc' ? 'rotate(180deg)' : 'none',
        transformOrigin: 'center',
      }}
    />
  )
}

const SalesTable: React.FC<SalesTableProps> = ({ sales }) => {
  // 1) By default, let's sort the 'weekEnding' column ascending
  const [sortColumn, setSortColumn] = React.useState<keyof Sale>('weekEnding')
  const [sortDirection, setSortDirection] = React.useState<'asc' | 'desc'>('asc')

  // 2) Sort the data whenever sales, sortColumn, or sortDirection change
  const sortedSales = React.useMemo(() => {
    if (!sales) return []
    const copy = [...sales]
    copy.sort((a, b) => {
      const valA = a[sortColumn]
      const valB = b[sortColumn]

      if (typeof valA === 'string' && typeof valB === 'string') {
        // Compare strings
        return sortDirection === 'asc'
          ? valA.localeCompare(valB)
          : valB.localeCompare(valA)
      } else {
        // Compare numbers
        const numA = Number(valA)
        const numB = Number(valB)
        return sortDirection === 'asc' ? numA - numB : numB - numA
      }
    })
    return copy
  }, [sales, sortColumn, sortDirection])

  // 3) On header click: 
  // if it's already the sorted column, toggle asc/desc
  // otherwise, set to that column & default asc
  const handleSort = (column: keyof Sale) => {
    if (column === sortColumn) {
      setSortDirection(prev => (prev === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortColumn(column)
      setSortDirection('asc')
    }
  }

  // 4) We ALWAYS render an arrow for each column. 
  // If it's the active column, use sortDirection. 
  // Otherwise, default to 'asc'.
  const getArrowDirection = (column: keyof Sale): 'asc' | 'desc' => {
    return column === sortColumn ? sortDirection : 'asc'
  }

  if (!sortedSales.length) {
    return <p className="no-data-msg">No sales data to display.</p>
  }

  return (
    <div className="sales-table-container">
      <table className="sales-table">
        <thead>
          <tr>
            <th onClick={() => handleSort('weekEnding')}>
              Week Ending
              <SortArrow direction={getArrowDirection('weekEnding')} />
            </th>
            <th onClick={() => handleSort('retailSales')}>
              Retail Sales
              <SortArrow direction={getArrowDirection('retailSales')} />
            </th>
            <th onClick={() => handleSort('wholesaleSales')}>
              Wholesale Sales
              <SortArrow direction={getArrowDirection('wholesaleSales')} />
            </th>
            <th onClick={() => handleSort('unitsSold')}>
              Units Sold
              <SortArrow direction={getArrowDirection('unitsSold')} />
            </th>
            <th onClick={() => handleSort('retailerMargin')}>
              Retailer Margin
              <SortArrow direction={getArrowDirection('retailerMargin')} />
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedSales.map(sale => (
            <tr key={sale.weekEnding}>
              <td>{sale.weekEnding}</td>
              <td>{sale.retailSales.toLocaleString()}</td>
              <td>{sale.wholesaleSales.toLocaleString()}</td>
              <td>{sale.unitsSold.toLocaleString()}</td>
              <td>{sale.retailerMargin.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default SalesTable

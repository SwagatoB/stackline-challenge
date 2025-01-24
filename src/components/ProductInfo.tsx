
import React from 'react'

interface ProductInfoProps {
  title: string
  brand: string
  subtitle: string
  image: string
  tags: string[]
}

const ProductInfo: React.FC<ProductInfoProps> = ({ title, brand, subtitle, image, tags }) => {
  return (
    <div>
      <img src={image} alt={title} style={{ maxWidth: '100%', marginBottom: '1rem' }} />
      <h2 style={{ marginBottom: '0.5rem' }}>{title}</h2>
      <h4 style={{ color: '#888', marginBottom: '1rem' }}>{brand}</h4>
      <p style={{ marginBottom: '1rem' }}>{subtitle}</p>

      <div className="tags">
        {tags.map((tag) => (
          <span className="tag" key={tag}>
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}

export default ProductInfo

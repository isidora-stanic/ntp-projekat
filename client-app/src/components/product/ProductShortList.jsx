import React, { useEffect, useState } from 'react'
import ProductShort from './ProductShort'

const ProductShortList = ({products}) => {
  return (
    <div style={{display: 'inline-block',
      margin: '3rem', 
      border: 'solid 0.2rem lightblue', borderRadius: '0.2rem', width: '50rem',
      padding: '1rem', overflowWrap: 'break-word'}}>
      {products.map(p => <ProductShort key={p.id} product={p}/>)}
    </div>
  )
}

export default ProductShortList

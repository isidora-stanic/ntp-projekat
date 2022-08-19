import React from 'react'
import ShortImage from '../util/ShortImage'

const ProductShort = ({product}) => {
  return (
    <div style={{
        display: 'inline-block', margin: '1rem', 
        border: 'solid 0.2rem lightblue', borderRadius: '0.2rem', width: '17rem',
        padding: '1rem'}}>
      {/* {JSON.stringify(product)} */}
      <ShortImage key={"img_"+product.id} src={product.image} alt={product.name} />
      <h3 style={{overflowWrap: 'break-word', padding: '1rem'}}>{product.name}</h3>
      <h3>{product.price} RSD/m<sup>2</sup></h3>
    </div>
  )
}

export default ProductShort

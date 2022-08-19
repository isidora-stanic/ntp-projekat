import React from 'react'

const ProductFilter = ({filterOptions, selectedOptions, setSelectedOptions}) => {
  return (
    <div style={{display: 'inline-block', 
    border: 'solid 0.2rem lightblue', borderRadius: '0.2rem', width: '25rem',
    padding: '1rem', overflowWrap: 'break-word'}}>
      {filterOptions.map(f => <div style={{display: 'block'}}><h1 key={f.name}>{f.name}</h1>{f.opts.map(o => <div style={{display: 'block'}}><input key={o} type='checkbox'/><label>{o}</label></div>)}</div>)}
    </div>
  )
}

export default ProductFilter

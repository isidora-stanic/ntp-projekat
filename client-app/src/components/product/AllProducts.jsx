import React, { useEffect, useState } from "react"
import ProductFilter from "./ProductFilter"
import ProductShortList from "./ProductShortList"
import axios from 'axios'

const AllProducts = () => {
    const [filterOptions, setFilterOptions] = useState([
        {name: 'brand', opts: ["Zorka", "Kanjiza"]},
        {name: 'dimensions', opts: []},
        {name: 'type', opts: []},
        {name: 'finish', opts: []},
        {name: 'purpose', opts: []},
        {name: 'color', opts: []},
        {name: 'series', opts: []}
    ])
    const [selectedOptions, setSelectedOptions] = useState({})
    const [products, setProducts] = useState([])

    useEffect(() => {
        axios.get("http://localhost:9091/api/products").then(
            r => {
                setProducts(r.data)
            }
        ).catch(err => console.error(err))
    }, [])

    // useEffect(() => {
    //     let brands = []
    //     products.map(p => brands.push(p.brand))
    //     //setFilterOptions((before) => ({...before, brand: brands}))
    // }, [products])
    
  return (
    <div>
      <ProductFilter filterOptions={filterOptions} 
        selectedOptions={selectedOptions} setSelectedOptions={setSelectedOptions}/>
      <ProductShortList products={products}/>
      <div style={{display: 'inline-block', 
    width: '25rem',
    padding: '1rem', overflowWrap: 'break-word'}}>
    </div>
    </div>
  );
};

export default AllProducts;

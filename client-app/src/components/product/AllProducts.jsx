import React, { useEffect, useState } from "react"
import ProductFilters from "./ProductFilters"
import ProductShortList from "./ProductShortList"
import ProductService, { getFilterOptions } from "../../services/ProductService";
import { Grid } from "@mui/material";

const AllProducts = () => {
    const [filterOptions, setFilterOptions] = useState([])
    const [selectedOptions, setSelectedOptions] = useState({lowerPrice: 0, upperPrice: 10000, brand: [], dimensions: [], type: [], finish: [], purpose: [], color: [], serie: []})
    const [products, setProducts] = useState([])
    const [pageNum, setPageNum] = useState(1)
    const [pageSize, setPageSize] = useState(2)
    const [total, setTotal] = useState(0)

    useEffect(() => {
        ProductService.getFilteredPaginated(pageNum, pageSize, setProducts, setTotal, selectedOptions)
    }, [])

    useEffect(()=>{
      getFilterOptions(setFilterOptions, products)
    }, [products])

    useEffect(() => {
      console.log(selectedOptions)
    }, [selectedOptions])

    useEffect(() => {
      ProductService.getFilteredPaginated(pageNum, pageSize, setProducts, setTotal, selectedOptions)
  }, [pageNum, pageSize])
    
  return (
    <Grid container spacing={1}>
      <Grid item xs={4}>
      <ProductFilters filterOptions={filterOptions} 
        selectedOptions={selectedOptions} setSelectedOptions={setSelectedOptions} pageNum={pageNum} pageSize={pageSize} setProducts={setProducts} setTotal={setTotal}/>
      </Grid>
      <Grid item xs={8}>
      <ProductShortList products={products} total={total} pageSize={pageSize} pageNum={pageNum} setPageNum={setPageNum} />
      </Grid>
      <div style={{display: 'inline-block',
          width: '20%',
          padding: '1rem', overflowWrap: 'break-word'}}>
    </div>
    </Grid>
  );
};

export default AllProducts;

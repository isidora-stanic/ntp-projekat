import React, { useEffect, useState } from "react"
import ProductFilters from "./ProductFilters"
import ProductShortList from "./ProductShortList"
import ProductService, { getFilterOptions } from "../../services/ProductService";
import { Container, Grid } from "@mui/material";
import { Box } from "@mui/system";
import SortByCombo from "./SortByCombo";
import SearchInput from "./SearchInput";
import PriceFilter from "./PriceFilter";

const AllProducts = () => {
    const [filterOptions, setFilterOptions] = useState([])
    const [selectedOptions, setSelectedOptions] = useState({
      // lowerPrice: 0, upperPrice: 10000, 
      brand: [], dimensions: [], p_type: [], finish: [], purpose: [], color: [], serie: [], material: []
    })
    const [products, setProducts] = useState([])
    const [pageNum, setPageNum] = useState(1)
    const [pageSize, setPageSize] = useState(5)
    const [total, setTotal] = useState(0)

    const [prices, setPrices] = useState([0, 100000])

    const [searchQuery, setSearchQuery] = useState("")
    const [sortBy, setSortBy] = useState("id asc")

    useEffect(() => {
        console.log("excuse me", searchQuery, sortBy)
        ProductService.getFilteredPaginated(pageNum, pageSize, setProducts, setTotal, selectedOptions, searchQuery, sortBy, prices)
    }, [])

    useEffect(()=>{
      getFilterOptions(setFilterOptions, products)
    }, [products])

    useEffect(() => {
      console.log(selectedOptions)
    }, [selectedOptions])

    useEffect(() => {
      console.log("excuse me", searchQuery, sortBy)
      ProductService.getFilteredPaginated(pageNum, pageSize, setProducts, setTotal, selectedOptions, searchQuery, sortBy, prices)
  }, [pageNum, pageSize])
    
  return (
    <Grid container spacing={1}>
    <Grid item xs={4}>
      <Container sx={{ my: 5, px: 5 }}>
        <SortByCombo sortBy={sortBy} setSortBy={setSortBy} />
      </Container>
    </Grid>
      <Grid item xs={8}>
        <Container sx={{my: 5}}>
        <SearchInput searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        </Container>
      </Grid>
      <Grid item xs={4}>
        {/* <SearchInput searchQuery={searchQuery} setSearchQuery={setSearchQuery} /> */}
      {/* <SortByCombo sortBy={sortBy} setSortBy={setSortBy} /> */}
      
      <ProductFilters filterOptions={filterOptions} prices={prices} setPrices={setPrices}
        selectedOptions={selectedOptions} sortBy={sortBy} searchQuery={searchQuery} setSelectedOptions={setSelectedOptions} pageNum={pageNum} pageSize={pageSize} setProducts={setProducts} setTotal={setTotal}/>
        
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

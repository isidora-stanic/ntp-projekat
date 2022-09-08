import axios from 'axios'

const ProductService = {

    getAll : (setProducts) => {
        axios.get("http://localhost:9091/api/products").then(
            r => {
                setProducts(r.data.map(p => ({...p, delete_id: p.id, edit_id: p.id, edit_img_id: p.id})))
            }
        ).catch(err => console.error(err))
    },

    getOne : (id, setProduct) => {
        axios.get("http://localhost:9091/api/products/"+id).then(
            r => {
                setProduct(r.data)
            }
        ).catch(err => console.error(err))
    },

    getSubscription : (pid, email, setSub) => {
        axios.get("http://localhost:9091/api/products/sub/"+pid+"/"+email).then(
            r => {
                setSub(r.data)
                // console.log(r.data)
            }
        ).catch(
            err => {
                if (err.response.status == 404) {
                    return
                }
                console.error(err)
        })
    },

    create : (product) => {
        axios.post("http://localhost:9091/api/products", product).then(
            r => {
                console.log(r)
            }
        ).catch(err => console.error(err))
    },

    update : (id, product) => {
        axios.put("http://localhost:9091/api/products/"+id, product).then(
            r => {
                console.log(r)
            }
        ).catch(err => console.error(err))
    },

    subscribe : (pid, email, getSub) => {
        axios.put("http://localhost:9091/api/products/sub/"+pid + "/"+email, {}).then(
            r => {
                console.log(r)
                getSub()
            }
        ).catch(err => console.error(err))
    },

    unsubscribe : (sid, getSub) => {
        axios.put("http://localhost:9091/api/products/unsub/"+sid, {}).then(
            r => {
                console.log(r)
                getSub()
            }
        ).catch(err => console.error(err))
    },

    delete : (id) => {
        axios.delete("http://localhost:9091/api/products/"+id).then(
            r => {
                console.log(r)
            }
        ).catch(err => console.error(err))
    },

    getFilteredPaginated : (pageNum, pageSize, setProducts, setTotal, filters, searchQuery, sortBy, prices) => {
        console.log(pageSize, pageNum)
        let newFilters = {...filters, search_query: searchQuery, sort_by: sortBy, lowerPrice: prices[0], upperPrice: prices[1]}
        console.log('sending...', (newFilters))
        axios.post("http://localhost:9091/api/products/filter", newFilters, {params: {page: pageNum, page_size: pageSize}}).then(
            r => {
                console.log(r.data)
                setProducts(r.data.list)
                setTotal(r.data.total)
            }
        ).catch(err => console.error(err))
    }
}

export const getFilterOptions = (setFilterOptions, products) => {
    const filters = [
        {name: "Brand", opts: products.map(p => p.brand).filter((value, index, self) => {
            return self.indexOf(value) === index;
          })},
        {name: "Dimensions", opts: products.map(p => p.dimensions).filter((value, index, self) => {
            return self.indexOf(value) === index;
          })},
        {name: "Type", opts: products.map(p => p.p_type).filter((value, index, self) => {
            return self.indexOf(value) === index;
          })},
        {name: "Material", opts: products.map(p => p.material).filter((value, index, self) => {
            return self.indexOf(value) === index;
        })},
        {name: "Finish", opts: products.map(p => p.finish).filter((value, index, self) => {
            return self.indexOf(value) === index;
          })},
        {name: "Purpose", opts: products.map(p => p.purpose).filter((value, index, self) => {
            return self.indexOf(value) === index;
          })},
        {name: "Color", opts: products.map(p => p.color).filter((value, index, self) => {
            return self.indexOf(value) === index;
          })},
        {name: "Series", opts: products.map(p => p.serie).filter((value, index, self) => {
            return self.indexOf(value) === index;
          })},
        // {name: "Sort By", opts: [{label: "Name", value: "name"}, {label: "Price", value: "price"}, {label: "Brand", value: "brand"}, {label: "Color", value: "color"}]},
        // {name: "Search", opts: [""]},
    ]

    setFilterOptions(filters)
}

export default ProductService
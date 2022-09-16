import axios from 'axios'

const RecommendationService = {

    getAll : (setParams) => {
        axios.get("http://localhost:9091/api/recommendations").then(
            r => {
                setParams(r.data.map(p => ({...p, delete_id: p.id, edit_id: p.id})))
            }
        ).catch(err => console.error(err))
    },

    getOne : (id, setParam) => {
        axios.get("http://localhost:9091/api/recommendations/"+id).then(
            r => {
                setParam(r.data)
            }
        ).catch(err => console.error(err))
    },

    getRecommendByAttrs : (product, setProducts) => {
        axios.post("http://localhost:9091/api/recommendations/recommend-by-attributes", product).then(
            r => {
                // console.log(r.data)
                setProducts(r.data)
            }
        ).catch(err => console.error(err))
    },

    getRecommendById : (product, setProducts) => {
        axios.get("http://localhost:9091/api/recommendations/recommend-by-id/"+product.id).then(
            r => {
                // console.log(r.data)
                setProducts(r.data)
            }
        ).catch(err => console.error(err))
    },

    getSimilar : (product, setProducts) => {
        axios.get("http://localhost:9091/api/recommendations/smilar/"+product.id).then(
            r => {
                // console.log(r.data)
                setProducts(r.data)
            }
        ).catch(err => console.error(err))
    },

    create : (rec) => {
        axios.post("http://localhost:9091/api/recommendations", rec).then(
            r => {
                console.log(r.data)
                //setProducts(r.data)
            }
        ).catch(err => console.error(err))
    },

    update : (id, rec) => {
        axios.put("http://localhost:9091/api/recommendations/"+id, rec).then(
            r => {
                console.log(r.data)
                //setProducts(r.data)
            }
        ).catch(err => console.error(err))
    },

    delete : (id) => {
        axios.delete("http://localhost:9091/api/recommendations/"+id).then(
            r => {
                console.log(r.data)
            }
        ).catch(err => console.error(err))
    },
}

export default RecommendationService;

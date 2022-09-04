import axios from 'axios'

const RecommendationService = {

    getAll : (setProducts) => {
        axios.get("http://localhost:9091/api/recommendations").then(
            r => {
                setProducts(r.data.map(p => ({...p, delete_id: p.id, edit_id: p.id, edit_img_id: p.id})))
            }
        ).catch(err => console.error(err))
    },

    getRecommendations : (product, setProducts) => {
        axios.post("http://localhost:9091/api/recommendations/recommend", product).then(
            r => {
                // console.log(r.data)
                setProducts(r.data)
            }
        ).catch(err => console.error(err))
    },
}

export default RecommendationService;

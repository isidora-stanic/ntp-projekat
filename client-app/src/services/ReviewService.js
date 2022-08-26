import axios from "axios";

const ReviewService = {
    
    getAll : (setReviews) => {
        axios.get("http://localhost:9091/api/reviews").then(
            r => {
                setReviews(JSON.parse(r.data).map(p => ({...p, delete_id: p.id})))
            }
        ).catch(err => console.error(err))
    },

    getForProduct : (id, setReviews) => {
        axios.get("http://localhost:9091/api/reviews/product/"+id).then(
            r => {
                console.log(r.data)
                setReviews(JSON.parse(r.data))
            }
        ).catch(err => console.error(err))
    },

    getByUser : (id, setReviews) => {
        axios.get("http://localhost:9091/api/reviews/user/"+id).then(
            r => {
                setReviews(JSON.parse(r.data))
            }
        ).catch(err => console.error(err))
    },

    userCanLeaveComment : (uid, pid, setCanComment) => {
        axios.get("http://localhost:9091/api/reviews/user/"+uid+"/product/"+pid).then(
            r => {
                if (JSON.parse(r.data).length > 0) {
                    console.log('you already commented on this product')
                    setCanComment(false)
                } else {
                    setCanComment(true)
                }
            }
        ).catch(err => console.error(err))
    },

    getRatingForProduct : (id, setRating) => {
        axios.get("http://localhost:9091/api/reviews/rating/"+id).then(
            r => {
                setRating(JSON.parse(r.data))
            }
        ).catch(err => console.error(err))
    },

    create : (review) => {
        axios.post("http://localhost:9091/api/reviews", review).then(
            r => {
                console.log(r)
            }
        ).catch(err => console.error(err))
    },

    delete : (id) => {
        axios.delete("http://localhost:9091/api/reviews/"+id).then(
            r => {
                console.log(r)
            }
        ).catch(err => console.error(err))
    }
}

export default ReviewService
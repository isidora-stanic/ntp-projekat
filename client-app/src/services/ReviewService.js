import axios from "axios";

const ReviewService = {
    
    getAll : (setReviews) => {
        axios.get("http://localhost:9091/api/reviews").then(
            r => {
                setReviews(r.data.map(p => ({...p, delete_id: p.id})))
            }
        ).catch(err => console.error(err))
    },

    getForProduct : (id, setReviews) => {
        axios.get("http://localhost:9091/api/reviews/product/"+id).then(
            r => {
                // console.log(r.data)
                setReviews(r.data)
            }
        ).catch(err => console.error(err))
    },

    getByUser : (id, setReviews) => {
        axios.get("http://localhost:9091/api/reviews/user/"+id).then(
            r => {
                setReviews(r.data)
            }
        ).catch(err => console.error(err))
    },

    userCanLeaveComment : (uid, pid, setCanComment) => {
        axios.get("http://localhost:9091/api/reviews/user/"+uid+"/product/"+pid).then(
            r => {
                if (r.data.length > 0) {
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
                setRating(r.data)
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

    delete : (id, reason) => {
        let email = ""
        axios.get("http://localhost:9091/api/users/"+id).then(
            r => {
                console.log(r.data)
                email = r.data.email
            }
        ).catch(err => console.error(err))

        axios.delete("http://localhost:9091/api/reviews/"+id).then(
            r => {
                console.log(r)
                if (r.status === 200) {
                    axios.post("http://localhost:9093/api/email/send", 
                        {from: "admin@mail.com", to: email, subject: "Deleted review", msg: "Your review has been deleted because: \n" + reason})
                        .then(
                            r => {
                                console.log(r)
                            }
                        ).catch(err => console.error(err))
                }
            }
        ).catch(err => console.error(err))
    }
}

export default ReviewService
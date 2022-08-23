import axios from 'axios'

const UserService = {

    getAll : (setUsers) => {
        axios.get("http://localhost:9091/api/users").then(
            r => {
                setUsers(r.data.map(p => ({...p, delete_id: p.id, edit_id: p.id, banned_id: p.id})))
                console.log(r.data)
            }
        ).catch(err => console.error(err))
    },

    getOne : (id, setUser) => {
        axios.get("http://localhost:9091/api/users/"+id).then(
            r => {
                setUser(r.data)
            }
        ).catch(err => console.error(err))
    },

    create : (user) => {
        axios.post("http://localhost:9091/api/users", user).then(
            r => {
                console.log(r)
            }
        ).catch(err => console.error(err))
    },

    update : (id, user) => {
        axios.put("http://localhost:9091/api/users/"+id, user).then(
            r => {
                console.log(r)
            }
        ).catch(err => console.error(err))
    },

    delete : (id) => {
        axios.delete("http://localhost:9091/api/users/"+id).then(
            r => {
                console.log(r)
            }
        ).catch(err => console.error(err))
    },

    getPaginated : (pageSize, pageNum, setUsers, setTotal) => {
        console.log(pageSize, pageNum)
        axios.post("http://localhost:9091/api/users/paginated", {params: {page: pageNum, page_size: pageSize}}).then(
            r => {
                console.log(r.data)
                setUsers(r.data.list)
                setTotal(r.data.total)
            }
        ).catch(err => console.error(err))
    },

    register : (data) => {
        axios.post("http://localhost:9091/api/users/register", data).then(
            r => {
                console.log(r)
            }
        ).catch(err => console.error(err))
    },

    login : (data, setToken) => {
        axios.post("http://localhost:9091/api/users/login", data).then(
            r => {
                // console.log(r.data)
                localStorage.setItem('token', r.data.token)
            }
        ).catch(err => console.error(err))
    },

    ban : (id) => {
        axios.get("http://localhost:9091/api/users/"+id+"/ban").then(
            r => {
                console.log(r)
            }
        ).catch(err => console.error(err))
    },

    permit : (id) => {
        axios.get("http://localhost:9091/api/users/"+id+"/permit").then(
            r => {
                console.log(r)
            }
        ).catch(err => console.error(err))
    },
}

export default UserService
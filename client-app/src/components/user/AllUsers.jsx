import React, {useState, useEffect} from 'react'
import UserFilters from './UserFilters'
import UserShortList from './UserShortList'
import UserService from '../../services/UserService'

const AllUsers = () => {
    const [users, setUsers] = useState([])
    // const [pageNum, setPageNum] = useState(0)
    // const [pageSize, setPageSize] = useState(2)
    const [total, setTotal] = useState(0)

    useEffect(() => {
        //UserService.getAll(setUsers)
        UserService.getAll(setUsers)
    }, [])

    // useEffect(() => {
    //     UserService.getPaginated(pageNum, pageSize, setUsers, setTotal)
    // }, [pageNum, pageSize])
    
    return (
        <div>
        <UserShortList users={users} total={total} pageSize={0} pageNum={0} setPageNum={(a)=>console.log(a)} />
        <div style={{display: 'inline-block',
            width: '20%',
            padding: '1rem', overflowWrap: 'break-word'}}>
        </div>
        </div>
    )
}

export default AllUsers

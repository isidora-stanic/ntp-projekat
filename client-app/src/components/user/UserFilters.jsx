import React from 'react'
import FilterGroup from '../product/FilterGroup'
import UserService from '../../services/UserService'

const UserFilters = ({filterOptions, selectedOptions, setSelectedOptions, pageNum, pageSize, setUsers, setTotal}) => {
    const handleClick = () => {
      console.log('sending...', JSON.stringify(selectedOptions))
      UserService.getFilteredPaginated(pageNum, pageSize, setUsers, setTotal, selectedOptions)
    }
    return (
      <div style={{display: 'inline-block', 
      border: 'solid 0.2rem lightblue', borderRadius: '0.2rem', width: '20%',
      padding: '1rem', overflowWrap: 'break-word'}}>
        <button onClick={handleClick}>Apply</button>
        {filterOptions.map(f => <FilterGroup key={f.name} filter={f} selectedOptions={selectedOptions} setSelectedOptions={setSelectedOptions}/>)}
      </div>
    )
}
  

export default UserFilters
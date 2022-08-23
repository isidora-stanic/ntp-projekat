import React from 'react'
import { FormControlLabel, Checkbox } from '@mui/material'

const FilterOption = ({filtername, option, selectedOptions, setSelectedOptions}) => {
    const handleToggle = (e) => {
        console.log(e.target)
        if (e.target.checked) {
            switch(filtername) {
                case 'Brand':
                    setSelectedOptions((previos) => ({
                        ...previos, brand: [...previos.brand, option]
                    }))
                    break;
                case 'Dimension':
                    setSelectedOptions((previos) => ({
                        ...previos, dimensions: [...previos.dimensions, option]
                    }))
                    break;
                case 'Type':
                    setSelectedOptions((previos) => ({
                        ...previos, type: [...previos.type, option]
                    }))
                    break;
                case 'Finish':
                    setSelectedOptions((previos) => ({
                        ...previos, finish: [...previos.finish, option]
                    }))
                    break;
                case 'Purpose':
                    setSelectedOptions((previos) => ({
                        ...previos, purpose: [...previos.purpose, option]
                    }))
                    break;
                case 'Color':
                    setSelectedOptions((previos) => ({
                        ...previos, color: [...previos.color, option]
                    }))
                    break;
                case 'Series':
                    setSelectedOptions((previos) => ({
                        ...previos, serie: [...previos.serie, option]
                    }))
                    break;
                ///////////////////////////////////////////////////////////
                case 'Role':
                    setSelectedOptions((previos) => ({
                        ...previos, role: [...previos.role, option]
                    }))
                    break;
                case 'Banned':
                    setSelectedOptions((previos) => ({
                        ...previos, banned: [...previos.banned, option]
                    }))
                    break;
                default:
                  console.log('dont know what filter you selected')
            } 
            
        } else {
            switch(filtername) {
                case 'Brand':
                    setSelectedOptions((previos) => ({
                        ...previos, brand: previos.brand.filter(i => i !== option)
                    }))
                    break;
                case 'Dimension':
                    setSelectedOptions((previos) => ({
                        ...previos, dimensions: previos.dimensions.filter(i => i !== option)
                    }))
                    break;
                case 'Type':
                    setSelectedOptions((previos) => ({
                        ...previos, type: previos.type.filter(i => i !== option)
                    }))
                    break;
                case 'Finish':
                    setSelectedOptions((previos) => ({
                        ...previos, finish: previos.finish.filter(i => i !== option)
                    }))
                    break;
                case 'Purpose':
                    setSelectedOptions((previos) => ({
                        ...previos, purpose: previos.purpose.filter(i => i !== option)
                    }))
                    break;
                case 'Color':
                    setSelectedOptions((previos) => ({
                        ...previos, color: previos.color.filter(i => i !== option)
                    }))
                    break;
                case 'Series':
                    setSelectedOptions((previos) => ({
                        ...previos, serie: previos.serie.filter(i => i !== option)
                    }))
                    break;
                ////////////////////////////////////////////////////////////////////
                case 'Role':
                    setSelectedOptions((previos) => ({
                        ...previos, role: previos.role.filter(i => i !== option)
                    }))
                    break;
                case 'Banned':
                    setSelectedOptions((previos) => ({
                        ...previos, banned: previos.banned.filter(i => i !== option)
                    }))
                    break;
                default:
                  console.log('dont know what filter you selected')
            } 
        }
    }
  return (
    <FormControlLabel control={<Checkbox onChange={handleToggle} />} label={option} />
  )
}

export default FilterOption

import { Box, Divider, InputLabel, Slider } from '@mui/material';
import React from 'react'


function valuetext(value) {
    return `${value} RSD`;
  }

const PriceFilter = ({prices, setPrices}) => {

    const handleChange = (event, newValue) => {
        setPrices(newValue);
    };
  
    return (
      <Box sx={{ width: 'auto', m: 2 }}>
        <Divider/>
        <InputLabel sx={{mt: 2, color: 'secondary.dark'}}>Price range (RSD)</InputLabel>
        <Slider
          getAriaLabel={() => 'Price range'}
          value={prices}
          onChange={handleChange}
          valueLabelDisplay="auto"
          getAriaValueText={valuetext}
          min={0}
          max={100000}
        />
      </Box>
    );
}

export default PriceFilter

import React from "react"
import FilterOption from "./FilterOption"
import { FormGroup, FormControlLabel, Checkbox, FormLabel, Divider, Typography, Box } from "@mui/material";

const FilterGroup = ({ filter, selectedOptions, setSelectedOptions }) => {
  return (
    <>
      <Divider fullWidth sx={{m: 2}} />
      <Box display="flex" justifyContent="flex-start">
      <FormGroup>
      <Box display="flex" justifyContent="flex-start">
        <Typography variant="h6" color='secondary.dark'>{filter.name}</Typography>
        </Box>
        {filter.opts.map((o) => (
          <FilterOption key={o} option={o} selectedOptions={selectedOptions} setSelectedOptions={setSelectedOptions} filtername={filter.name}/>
        ))}
      </FormGroup>
      
    </Box>
    </>
  );
}

export default FilterGroup;

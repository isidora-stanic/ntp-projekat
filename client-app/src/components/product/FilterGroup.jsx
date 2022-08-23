import React from "react"
import FilterOption from "./FilterOption"
import { FormGroup, FormControlLabel, Checkbox, FormLabel } from "@mui/material";

const FilterGroup = ({ filter, selectedOptions, setSelectedOptions }) => {
  return (
    <FormGroup>
      <FormLabel>{filter.name}</FormLabel>
      {filter.opts.map((o) => (
        <FilterOption key={o} option={o} selectedOptions={selectedOptions} setSelectedOptions={setSelectedOptions} filtername={filter.name}/>
      ))}
    {/* </div> */}
    </FormGroup>
  );
}

export default FilterGroup;

import { Button, TableCell, TableRow } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const StatCountRow = ({ i, prodStat }) => {
  let navigate = useNavigate();
  
  return (
      <TableRow>
        <TableCell><b>{i}.</b></TableCell>
        <TableCell>{prodStat.product}</TableCell>
        <TableCell>{prodStat.stat_count}</TableCell>
        <TableCell>
          <Button variant='outlined'
           onClick={() => navigate("/product/" + prodStat.product_id)}>
            View Product
          </Button>
        </TableCell>
      </TableRow>
  );
};

export default StatCountRow;

import { Button, Card, Grid, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import StatisticsService from "../../services/StatisticsService";
import StatCountRow from "./StatCountRow";

const TypeStatistics = ({ type, titles }) => {
  const [prodStats, setProdStats] = useState([]);
  const [topProdStats, setTopProdStats] = useState([]);
  const [showRest, setShowRest] = useState(false);

  const [t1, setT1] = useState('')
  const [t2, setT2] = useState('')
  useEffect(() => {
    // console.log(t1, t2)
  }, [t1,t2])

  useEffect(() => {
    // get log count for the given type
    StatisticsService.getCountByTypeForAllProducts(type, setProdStats, setTopProdStats)
  }, []);

  const handleClick = () => {
      // get log count for the given type and time
      if (t1.trim() !== '' && t2.trim() !== '')
        StatisticsService.getCountByTypeForAllProductsInterval(type, t1, t2, setProdStats, setTopProdStats)
  }

  return (
    <div>
          <Card sx={{p: 5, mx: 5, my:3}}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField fullWidth type='date' name='t1' id='t1' 
              // label='Start Date'
              value={t1} onChange={(e) => setT1(e.target.value)} />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth type='date' name='t2' id='t2' 
              // label='End Date'
              value={t2} onChange={(e) => setT2(e.target.value)} />
            </Grid>
            <Grid item xs={12}>
              <Button onClick={handleClick} variant='contained' size='large'>{titles[2]}</Button>
            </Grid>
          </Grid>
          </Card>
      <Typography variant='h4'>{showRest ? titles[1] : titles[0]}</Typography>
      <Table>
        <TableHead>
            <TableRow>
                <TableCell><b>No</b></TableCell>
                <TableCell><b>Product</b></TableCell>
                <TableCell><b>{type[0]}{type.substring(1).toLowerCase()}s</b></TableCell>
                <TableCell><b>Page</b></TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
          {showRest ? prodStats.map((ps, i) => 
            <StatCountRow key={type + "_" + ps.product_id} prodStat={ps} i={i+1} />
          ) : topProdStats.map((ps, i) => 
            <StatCountRow key={type + "_" + ps.product_id} prodStat={ps} i={i+1} />
          )}
        </TableBody>
      </Table>
      <Button onClick={() => setShowRest(!showRest)}>Toggle all</Button>
    </div>
  );
};

export default TypeStatistics;

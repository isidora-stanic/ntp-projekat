import { Paper, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material'
import React from 'react'

const TechInfo = ({brand, dimensions, color, p_type, serie, producer, purpose, material, box_size}) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableBody>
          <TableRow>
            <TableCell variant='head'><b>Brand</b></TableCell>
            <TableCell>{brand}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant='head'><b>Dimensions</b></TableCell>
            <TableCell>{dimensions}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant='head'><b>Color</b></TableCell>
            <TableCell>{color}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant='head'><b>Type and model</b></TableCell>
            <TableCell>{p_type}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant='head'><b>Purpose</b></TableCell>
            <TableCell>{purpose}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant='head'><b>Producer</b></TableCell>
            <TableCell>{producer}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant='head'><b>Series</b></TableCell>
            <TableCell>{serie}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant='head'><b>Box Size</b></TableCell>
            <TableCell>{box_size}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant='head'><b>Material</b></TableCell>
            <TableCell>{material}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default TechInfo

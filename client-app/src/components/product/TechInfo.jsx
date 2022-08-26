import { Paper, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material'
import React from 'react'

const TechInfo = ({brand, dimensions, color, type, serie, producer, purpose, boxSize}) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableBody>
          <TableRow>
            <TableCell variant='head'>Brand</TableCell>
            <TableCell>{brand}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant='head'>Dimensions</TableCell>
            <TableCell>{dimensions}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant='head'>Color</TableCell>
            <TableCell>{color}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant='head'>Type and model</TableCell>
            <TableCell>{type}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant='head'>Purpose</TableCell>
            <TableCell>{purpose}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant='head'>Producer</TableCell>
            <TableCell>{producer}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant='head'>Series</TableCell>
            <TableCell>{serie}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant='head'>Box Size</TableCell>
            <TableCell>{boxSize}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default TechInfo

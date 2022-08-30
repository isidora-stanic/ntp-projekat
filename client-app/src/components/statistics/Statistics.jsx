import { Button, Card, Container, Grid, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import TypeStatistics from './TypeStatistics'

const Statistics = () => {
  
  return (
    <div style={{marginTop: 25}}>
      <Grid container spacing={10}>
        <Grid item xs={4}>
          <TypeStatistics type={'VISIT'} titles={['Top 10 most viewed products', 'All product views count', 'See views for this period']} />
        </Grid>
        <Grid item xs={4}>
          <TypeStatistics type={'COMMENT'} titles={['Top 10 most commented products', 'All product comments count', 'See comments for this period']} />
        </Grid>
        <Grid item xs={4}>
          <TypeStatistics type={'SAVE'} titles={['Top 10 most saved products', 'All product saves count', 'See saves for this period']} />
        </Grid>
      </Grid>
    </div>
  )
}

export default Statistics

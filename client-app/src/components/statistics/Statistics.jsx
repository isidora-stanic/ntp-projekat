import { Box, Button, Card, Container, Grid, Tab, Table, TableBody, TableCell, TableHead, TableRow, Tabs, TextField, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TabPanel from '../util/TabPanel'
import TypeStatistics from './TypeStatistics'

const Statistics = () => {
  let navigate = useNavigate()

  const [subs, setSubs] = useState([])
  const [comms, setComms] = useState([])
  const [ratings, setRatings] = useState([])
  const [views, setViews] = useState([])

  useEffect(() => {
    axios.get("http://localhost:9091/api/statistics/statistics-for-all/VISIT")
      .then(r => {
        // console.log(r.data)
        setViews(r.data)
      }).catch(e => console.log(e))
    axios.get("http://localhost:9091/api/statistics/subscriptions")
      .then(r => {
        // console.log(r.data)
        setSubs(r.data)
      }).catch(e => console.log(e))
      axios.get("http://localhost:9091/api/statistics/comments")
      .then(r => {
        // console.log(r.data)
        setComms(r.data)
      }).catch(e => console.log(e))
      axios.get("http://localhost:9091/api/statistics/ratings")
      .then(r => {
        // console.log(r.data)
        setRatings(r.data)
      }).catch(e => console.log(e))
  }, [])

  const [selectedTab, setSelectedTab] = React.useState(1);

    const handleChangeTab = (event, newValue) => {
      setSelectedTab(newValue);
    };
  
  return (
    <div style={{marginTop: 25}}>
      <Container >
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={selectedTab}
            onChange={handleChangeTab}
            textColor="primary"
            indicatorColor="primary"
            aria-label="secondary tabs example"
          >
            <Tab value={1} label="Visits" />
            <Tab value={2} label="Subscriptions" />
            <Tab value={3} label="Comments" />
            <Tab value={4} label="Ratings" />
          </Tabs>
          </Box>
          <TabPanel value={selectedTab} index={1}>
          <Typography variant='h4'>Views</Typography>
          <Table>
            <TableHead>
                <TableRow>
                    <TableCell><b>No</b></TableCell>
                    <TableCell><b>Product</b></TableCell>
                    <TableCell><b>Visits</b></TableCell>
                    <TableCell><b>Page</b></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
              {views.map((ps, i) => 
                <TableRow key={"visits_"+i}>
                <TableCell><b>{i}.</b></TableCell>
                <TableCell>{ps.product}</TableCell>
                <TableCell>{ps.stat_count}</TableCell>
                <TableCell>
                  <Button variant='outlined'
                   onClick={() => navigate("/product/" + ps.product_id)}>
                    View Product
                  </Button>
                </TableCell>
              </TableRow>
              )}
            </TableBody>
          </Table>
          </TabPanel>
          <TabPanel value={selectedTab} index={2}>
          <Typography variant='h4'>Subscriptions</Typography>
          <Table>
            <TableHead>
                <TableRow>
                    <TableCell><b>No</b></TableCell>
                    <TableCell><b>Product</b></TableCell>
                    <TableCell><b>Subscriptions</b></TableCell>
                    <TableCell><b>Page</b></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
              {subs.map((ps, i) => 
                <TableRow key={"subs_"+i}>
                <TableCell><b>{i+1}.</b></TableCell>
                <TableCell>{ps[0].name}</TableCell>
                <TableCell>{ps[1]}</TableCell>
                <TableCell>
                  <Button variant='outlined'
                  onClick={() => navigate("/product/" + ps[0].id)}>
                    View Product
                  </Button>
                </TableCell>
              </TableRow>
              )}
            </TableBody>
          </Table>
          </TabPanel>
          <TabPanel value={selectedTab} index={3}>
          <Typography variant='h4'>Comments</Typography>
          <Table>
            <TableHead>
                <TableRow>
                    <TableCell><b>No</b></TableCell>
                    <TableCell><b>Product</b></TableCell>
                    <TableCell><b>Comments</b></TableCell>
                    <TableCell><b>Page</b></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
              {comms.map((ps, i) => 
                <TableRow key={"comments_"+i}>
                <TableCell><b>{i+1}.</b></TableCell>
                <TableCell>{ps[0].name}</TableCell>
                <TableCell>{ps[1]}</TableCell>
                <TableCell>
                  <Button variant='outlined'
                  onClick={() => navigate("/product/" + ps[0].id)}>
                    View Product
                  </Button>
                </TableCell>
              </TableRow>
              )}
            </TableBody>
          </Table>
          </TabPanel>
          <TabPanel value={selectedTab} index={4}>
          <Typography variant='h4'>Ratings</Typography>
          <Table>
            <TableHead>
                <TableRow>
                    <TableCell><b>No</b></TableCell>
                    <TableCell><b>Product</b></TableCell>
                    <TableCell><b>Rating</b></TableCell>
                    <TableCell><b>Page</b></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
              {ratings.map((ps, i) => 
                <TableRow key={"rate_"+i}>
                <TableCell><b>{i+1}.</b></TableCell>
                <TableCell>{ps[0].name}</TableCell>
                <TableCell>{ps[1]}</TableCell>
                <TableCell>
                  <Button variant='outlined'
                  onClick={() => navigate("/product/" + ps[0].id)}>
                    View Product
                  </Button>
                </TableCell>
              </TableRow>
              )}
            </TableBody>
          </Table>
          </TabPanel>
          </Container>
      <Grid container spacing={10}>
        <Grid item xs={6}>
          {/* <TypeStatistics type={'VISIT'} titles={['Top 10 most viewed products', 'All product views count', 'See views for this period']} /> */}
          
        </Grid>
        {/* <Grid item xs={4}>
          <TypeStatistics type={'COMMENT'} titles={['Top 10 most commented products', 'All product comments count', 'See comments for this period']} />
        </Grid>
        <Grid item xs={4}>
          <TypeStatistics type={'SAVE'} titles={['Top 10 most saved products', 'All product saves count', 'See saves for this period']} />
        </Grid> */}
        <Grid item xs={6}>
          
        </Grid>

        <Grid item xs={6}>
          
        </Grid>
        
        <Grid item xs={6}>
          
        </Grid>
      </Grid>
    </div>
  )
}

export default Statistics

import { Box, Container, Tab, Tabs, Typography } from '@mui/material'
import React from 'react'
import ReviewsList from '../review/ReviewsList'
import TabPanel from '../util/TabPanel'
import TechInfo from './TechInfo'

const ProductTabs = ({product, reviews}) => {
    const [selectedTab, setSelectedTab] = React.useState(1);

    const handleChangeTab = (event, newValue) => {
      setSelectedTab(newValue);
    };
  return (
    <Container >
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={selectedTab}
            onChange={handleChangeTab}
            textColor="primary"
            indicatorColor="primary"
            aria-label="secondary tabs example"
          >
            <Tab value={1} label="Description" />
            <Tab value={2} label="Technical info" />
            <Tab value={3} label="Reviews" />
          </Tabs>
          </Box>
          <TabPanel value={selectedTab} index={1}>
            <Typography>{product.description}</Typography>
          </TabPanel>
          <TabPanel value={selectedTab} index={2}>
            <TechInfo {...product}></TechInfo>
          </TabPanel>
          <TabPanel value={selectedTab} index={3}>
            <ReviewsList reviews={reviews} product={product}/>
          </TabPanel>
          </Container>
  )
}

export default ProductTabs

import React from 'react'
import StickyFooter from './StickyFooter'
import Navbar from './Navbar'
import Box from '@mui/material/Box';
import ScrollTop from '../util/ScrollTop';
import { Fab, Avatar } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const Layout = ({children}) => {
  return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        <Navbar  />
      {children}
      <ScrollTop>
        <Fab size="small" aria-label="scroll back to top">
        <Avatar sx={{ m: 1, bgcolor: "primary.light" }}>
          <KeyboardArrowUpIcon />
        </Avatar>
        </Fab>
      </ScrollTop>
      {/* <StickyFooter /> */}
      </Box>
  )
}

export default Layout

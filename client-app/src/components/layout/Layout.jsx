import React from 'react'
import StickyFooter from './StickyFooter'
import Navbar from './Navbar'
import Box from '@mui/material/Box';

const Layout = ({children}) => {
  return (
    <div style={{minHeight: '100%', height: '100%'}}>
      {/* <Navbar /> */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
      {children}
      <StickyFooter />
      </Box>
    </div>
  )
}

export default Layout

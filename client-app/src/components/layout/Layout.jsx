import React from 'react'
import AllProducts from '../product/AllProducts'
import Footer from './Footer'
import Navbar from './Navbar'

const Layout = () => {
  return (
    <div style={{minHeight: '100%', height: '100%'}}>
      <Navbar />
      <AllProducts />
      <Footer />
    </div>
  )
}

export default Layout

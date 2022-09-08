import React from 'react'

const ShortImage = ({src, alt, height, width}) => {
  return (
    <img src={src} alt={alt} height='250rem' width='250rem'/>
  )
}

export default ShortImage

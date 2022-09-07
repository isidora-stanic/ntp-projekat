import { Typography } from '@mui/material'
import React from 'react'
import AdbIcon from '@mui/icons-material/Adb';
import { Link, useNavigate } from 'react-router-dom';

const Logo = () => {
  let navigate = useNavigate()
  return (
    <>
    <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, cursor: 'pointer' }} />
          <Typography
            variant="h6"
            noWrap
            onClick={() => navigate('/')}
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
              cursor: 'pointer',
            }}
          >
            HOME
          </Typography>
          </>
  )
}

export default Logo

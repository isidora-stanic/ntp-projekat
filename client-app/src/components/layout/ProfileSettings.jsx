import { Avatar, Divider, IconButton, Menu, MenuItem, Tooltip, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react'
import { useNavigate } from 'react-router-dom';

const ProfileSettings = ({user}) => {
    const settings = ['Sign Out'];
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    let navigate = useNavigate()

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLogout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("wishlist")
        navigate("/signin")
        setAnchorElUser(null);
    }
    
  return (
    <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={user.name || 'P'} src="" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
                <Box sx={{m: 2}}>
                <Typography variant='p' textAlign="center">{user.name}</Typography>
                <br/>
                <Typography variant='p' textAlign="center">{user.email}</Typography>
                </Box>
                <Divider/>
              {settings.map((setting) => (
                <MenuItem sx={{mt: 1}} key={setting} onClick={handleLogout}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
  )
}

export default ProfileSettings

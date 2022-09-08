import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import { Link, useNavigate } from 'react-router-dom';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import ProfileSettings from './ProfileSettings';
import Logo from './Logo';
import Logo2 from './Logo2';
import { Avatar, Badge, Button } from '@mui/material';
import ViewInArIcon from '@mui/icons-material/ViewInAr';
import { useWishlist } from '../../contexts/WishListContext';

const pagesAdmin = ['Room setups', 'Products', 'Users', 'Reviews', 'Statistics', 'Recommendations'];
const pagesRegUser = ['Room setups'];
const pagesUnauth = ['Sign In'];
const settings = ['Sign Out'];

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  let user = useCurrentUser().getCurrentUser()
  console.log(user)

  let navigate = useNavigate()

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  let {wishlist, setWishlist, addProduct, removeProduct, checkIfProductInWishlist} = useWishlist()

  return (
    <AppBar position="static" >
      <Container maxWidth='xl'>
        <Toolbar disableGutters id="back-to-top-anchor">
          <Logo />

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none'} }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none'},
              }}
            >
              {user ? user.role === 'ADMIN' ? pagesAdmin.map((page) => (
                <MenuItem key={page} onClick={() => navigate('/'+page.toLowerCase().replace(/\s/g, ""))}>
                  <Button
                key={page}
                disableRipple 
                sx={{ my: 0, color: 'primary', display: 'flex', "&:hover": {backgroundColor: 'transparent'} }}
                fullWidth
              >
                {page}
              </Button>
                </MenuItem>
              )) : user.role === 'REGUSER' ?
              pagesRegUser.map((page) => (
                <MenuItem key={page} onClick={() => navigate('/'+page.toLowerCase().replace(/\s/g, ""))}>
                  <Button
                key={page}
                disableRipple 
                sx={{ my: 0, color: 'primary', display: 'flex', "&:hover": {backgroundColor: 'transparent'} }}
                fullWidth
              >
                {page}
              </Button>
                </MenuItem>
              )) : <></> :
              pagesUnauth.map((page) => (
                <MenuItem key={page} onClick={() => navigate('/'+page.toLowerCase().replace(/\s/g, ""))}>
                  <Button
                key={page}
                disableRipple 
                sx={{ my: 0, color: 'primary', display: 'flex', "&:hover": {backgroundColor: 'transparent'} }}
                fullWidth
              >
                {page}
              </Button>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Logo2 />
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {user ? user.role === 'ADMIN' ? pagesAdmin.map((page) => (
              <Button
                key={page}
                onClick={() => navigate('/'+page.toLowerCase().replace(/\s/g, ""))}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            )) : user.role === 'REGUSER' ? 
            pagesRegUser.map((page) => (
              <Button
                key={page}
                onClick={() => navigate('/'+page.toLowerCase().replace(/\s/g, ""))}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            )) : <></> :
            pagesUnauth.map((page) => (
              <Button
                key={page}
                onClick={() => navigate('/'+page.toLowerCase().replace(/\s/g, ""))}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>
              <IconButton onClick={() => navigate('/v3d')} sx={{ p: 0 }}>
              <Badge badgeContent={wishlist.length} color="warning" sx={{mx:3}}>
                <Avatar variant='circular' sx={{ m: -1, bgcolor: "secondary.main" }}>
                  <ViewInArIcon  />
                </Avatar>
                </Badge>
              </IconButton>
          {user ? <ProfileSettings user={user}/> : <></>}
          
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar

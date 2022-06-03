import React,{useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import authService from '../services/auth-service';



const  DashboardNav = () => {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [currentUser, setCurrentUser] = useState(undefined)

    useEffect(()=>{
      const user= authService.getCurrentUser();
      if(user){
        setCurrentUser(user)
      }
    },[])
  
  
    const logOut = ()=>{
      authService.logout();
      window.location.reload();
    }
    
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="sticky" sx={{background:' rgba(45,21,21,255)'}}>
    <Container maxWidth="xl">
      <Toolbar disableGutters>
        <Typography
          variant="h6"
          noWrap
          component="a"
          href="/"
          sx={{
            mr: 5,
            display: { xs: 'none', md: 'flex' },
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.3rem',
            color: 'rgba(245, 245, 220, 0.76)',
            boxShadow:'16px 15px #7f0000',
            textDecoration: 'none',
          }}
        >
         VINOTECA
        </Typography>

        <Box sx={{flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
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
              display: { xs: 'block', md: 'none' },
            }}
          >
              <MenuItem >
                <Button href='/products' textalign="center">Productos</Button>
              </MenuItem>
              <MenuItem >
                <Button href='/about' textalign="center">Compras</Button>
              </MenuItem>
              <MenuItem >
                <Button href='/admin/users' textalign="center">Usuarios</Button>
              </MenuItem>
            
          </Menu>
        </Box>
        <Typography
          variant="h5"
          noWrap
          component="a"
          href="/"
          sx={{
            mr: 2,
            display: { xs: 'flex', md: 'none' },
            flexGrow: 1,
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.3rem',
            color: 'rgba(245, 245, 220, 0.76)',
            textDecoration: 'none',
          }}
        >
          VINOTECA
        </Typography>
        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Button
              href='/admin'
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: 'rgba(245, 245, 220, 0.76)', display: 'block'}}
            >
             Productos
            </Button>
            <Button
              href='/admin/'
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: 'rgba(245, 245, 220, 0.76)', display: 'block'}}
            >
             Compras
            </Button>
            <Button
              href='/admin/users'
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: 'rgba(245, 245, 220, 0.76)', display: 'block'}}
            >
             Usuarios
            </Button>
        </Box>
          <Box>
        <IconButton sx={{mr:'20px'}}>
        <Link to='/shoppingCar' style={{color:'grey'}}><AddShoppingCartIcon fontSize='large'/></Link>
        </IconButton>
        </Box>
          {currentUser?(
        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
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
              <MenuItem  onClick={handleCloseUserMenu}>
                <Typography textalign="center"  component="a" href='/'>Perfil</Typography>
              </MenuItem>
              <MenuItem  onClick={handleCloseUserMenu}>
                <Typography textalign="center" textDecoratin='none' component="a" href='/admin/'>DashBoard</Typography>
              </MenuItem>
              <MenuItem >
              <Typography textaling='center' onClick={logOut}> Logout</Typography>
              </MenuItem>
          </Menu>
        </Box>
      ):(
        <div>
          <li>
            <Link  className='letters' to={'/Login'}> Login </Link>  
          </li>
          {/* <li>
            <Link className='letters' to ={'/register'}> Register </Link></li> */}
        </div>
      )}
      </Toolbar>
    </Container>
  </AppBar>
  );
};

export default DashboardNav;
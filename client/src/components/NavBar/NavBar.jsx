import React,{useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import authService from '../services/auth-service';
import DashboardNav from '../AdminDashboard/DashboardNav';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';


export const NavBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [currentUser, setCurrentUser] = useState(undefined)

  useEffect(()=>{
    const user = authService.getCurrentUser();
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

  return  currentUser?.user.role === 'ADMIN_ROLE' ? ( 
    <DashboardNav/>
  ):(
    <AppBar position="sticky" sx={{background:'white'}}>
    <Container maxWidth="xl">
      <Toolbar disableGutters>
        <Link to='/' style={{textDecoration:'none'}}>
        <Typography
          variant="h6"
          noWrap
          component="a"
          sx={{
            mr: 5,
            display: { xs: 'none', md: 'flex' },
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.3rem',
            color: 'gray',
            boxShadow:'14px 12px #7f0000',
            textDecoration: 'none',
          }}
        >
         VINOTECA
        </Typography>
        </Link>

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
                <Link to='/products' style={{textDecoration:'none'}}><Button textalign="center">Productos</Button></Link>
              </MenuItem>
              <MenuItem >
                <Link to='/about' style={{textDecoration:'none'}}><Button textalign="center">Nosotros</Button></Link>
              </MenuItem>
              <MenuItem >
                <Link to='/contact' style={{textDecoration:'none'}}><Button textalign="center">Contacto</Button></Link>
              </MenuItem>
            
          </Menu>
        </Box>
        <Link to='/' style={{textDecoration:'none'}}>
        <Typography
          variant="h5"
          noWrap
          component="a"
          sx={{
            mr: 2,
            display: { xs: 'flex', md: 'none' },
            flexGrow: 1,
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.3rem',
            fontSize:'20px',
            color: 'gray',
            textDecoration: 'none',
          }}
        >
          VINOTECA
        </Typography>
        </Link>
        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Link style={{textDecoration:'none'}} to='/products'>
              <Button
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: 'black', display: 'block'}}
              >
             Productos
              </Button>
            </Link>
            <Link style={{textDecoration:'none'}} to='/about'>
            <Button
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: 'black', display: 'block'}}
            >
             Nosotros
            </Button>
            </Link>
            <Link style={{textDecoration:'none'}} to='/contact'>
            <Button
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: 'black', display: 'block'}}
            >
             Contacto
            </Button>
            </Link>
        </Box>
          <Box>
        <IconButton sx={{mr:'4px',mt:'1px',p:'6px 6px 1px 6px'}}>
        <Link to='/shoppingCar' style={{color:'grey'}}><AddShoppingCartIcon fontSize='large'/></Link>
        </IconButton>
        </Box>
          {currentUser?(
        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar src={currentUser?.user?.img || "/broken-image.jpg"} />
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
                <Link to='/userProfile' style={{textDecoration:'none',color:'black'}}><Typography textalign="center">Perfil</Typography></Link>
              </MenuItem>
              <MenuItem >
                <Link to='/userFavorites' style={{textDecoration:'none',color:'black'}}><Typography textaling='center'>Favorites</Typography></Link>
              </MenuItem>
              <MenuItem >
                <Typography sx={{display:'flex',justifyContent:'center',alignItems:'center'}}onClick={logOut}>Logout <LogoutIcon sx={{ml:'5px'}}/></Typography>
              </MenuItem>
          </Menu>
        </Box>
      ):(
            <Link style={{textDecoration:'none'}}  to={'/Login'}><Button > Login <LoginIcon fontSize='medium' /></Button></Link>  
      )}
      </Toolbar>
    </Container>
  </AppBar>
  );
};

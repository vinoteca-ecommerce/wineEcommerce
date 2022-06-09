import React,{useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
import authService from '../services/auth-service';
import LogoutIcon from '@mui/icons-material/Logout';



const  DashboardNav = () => {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [currentUser, setCurrentUser] = useState(undefined)
    const navigate = useNavigate()
    useEffect(()=>{
      const user= authService.getCurrentUser();
      if(user){
        setCurrentUser(user)
      }
    },[])
  
  
    const logOut = ()=>{
      authService.logout();
      navigate('/');
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
      <Link to="/" style={{ textDecoration: "none" }}>
        <Typography
          variant="h6"
          noWrap
          // component="a"
          sx={{
            mr: 5,
            display: { xs: 'none', md: 'flex' },
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.3rem',
            color: 'rgba(245, 245, 220, 0.76)',
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
                <Link to="/admin" style={{ textDecoration: "none" }}>
                  <Button textalign="center">Productos</Button>
                </Link>
              </MenuItem>
              <MenuItem >
                <Link to="/admin/purchase" style={{ textDecoration: "none" }}>
                  <Button textalign="center">Compras</Button>
                </Link>
              </MenuItem>
              <MenuItem >
                <Link to="/admin/users" style={{ textDecoration: "none" }}>
                  <Button textalign="center">Usuarios</Button>
                </Link>
              </MenuItem>
              <MenuItem >
                <Link to="/admin/post" style={{ textDecoration: "none" }}>
                  <Button textalign="center">Agregar Vinos</Button>
                </Link>
              </MenuItem>
          </Menu>
        </Box>
        <Link to="/" style={{ textDecoration: "none" }}>
        <Typography
          variant="h5"
          noWrap
          // component="a"
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
        </Link>

        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          <Link to="/admin" style={{ textDecoration: "none" }}>
            <Button
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: 'rgba(245, 245, 220, 0.76)', display: 'block'}}
            >
             Productos
            </Button>
          </Link>
          <Link to="/admin/purchase" style={{ textDecoration: "none" }}>
            <Button
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: 'rgba(245, 245, 220, 0.76)', display: 'block'}}
            >
             Compras
            </Button>
            </Link>
            <Link to="/admin/users" style={{ textDecoration: "none" }}>
            <Button
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: 'rgba(245, 245, 220, 0.76)', display: 'block'}}
            >
             Usuarios
            </Button>
            </Link>
            <Link to="/admin/post" style={{ textDecoration: "none" }}>
            <Button
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: 'rgba(245, 245, 220, 0.76)', display: 'block'}}
            >
             Agregar vinos
            </Button>
            </Link>
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
            <MenuItem>
           <Link to={'/userprofile'}><Typography 
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}> Perfil </Typography> </Link> 
            </MenuItem>
              <MenuItem >
              <Typography sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }} onClick={logOut}> Logout <LogoutIcon sx={{ ml: "5px" }} /></Typography>
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
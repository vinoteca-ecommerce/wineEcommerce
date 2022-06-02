import React,{useEffect, useState} from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import MuiDrawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import { DashboardTable } from '../AdminDashboard/TableDashboard';
import authService from '../services/auth-service'





export const Dashboard=()=> {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const logOut = ()=>{
    authService.logout();
    window.location.reload();
  }
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };


  return (
      <Box sx={{ display: 'flex' }}>
      <CssBaseline />
        <AppBar   sx={{backgroundColor:'rgba(45,21,21,255)', color:'rgba(245, 245, 220, 0.76)'}} >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            DashBoard
          </Typography>
        <Box sx={{ flexGrow: 0, ml:'70rem' }}>
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
                  <Typography textalign="center">Perfil</Typography>
                </MenuItem>
                <MenuItem >
                <Typography textaling='center' onClick={logOut}> Logout</Typography>
                </MenuItem>
            </Menu>
          </Box>
            </Toolbar>
      </AppBar>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <DashboardTable/>
      </Box>
    </Box>
  );
}
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { CssBaseline } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import SiteHeader from './SiteHeader';
import DropdownMenu from './Dropdown';


export default function SiteNavBar() {

  const yonlendir = useNavigate()
  const navigateLogin = () => {

    yonlendir("/login")

  }

  return (
    <>
    <Box sx={{ position: "sticky", top: "0", zIndex: 99, flexGrow: 1 }}>
        <CssBaseline></CssBaseline>
      <AppBar position="sticky">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
       
          </IconButton>
          <Typography  variant="h6" component="div" sx={{ flexGrow: 1 }}>


            <Box display="flex" alignItems="center" gap="10px"> 
                    <img className='app-nav-logo' src="./Wlogo.jpg" alt="Warmerise Logo" />
                    <Link className='app-nav-logo-text' to="/">Warmerise</Link>
            </Box>

   
          </Typography>

          <DropdownMenu></DropdownMenu>

          <Button onClick={navigateLogin} color="inherit">Are you KAA Member?</Button>
        </Toolbar>
      </AppBar>
    </Box>

     <SiteHeader></SiteHeader>
    </>
  );
}
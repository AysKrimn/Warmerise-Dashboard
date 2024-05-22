import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Avatar, Box } from '@mui/material';

export default function DropdownMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button sx={{ color: "white"}}
        id="demo-positioned-button"
        aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}

      > Latest Requests</Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem onClick={handleClose}>

        <Box component="div">

            <Box display="flex" flexWrap="wrap" gap="5px" alignItems="center">
                    <Avatar src='./w_soldier.jpg'></Avatar>

                     <p className='w-username'>
                     <a href="#">Phantasma</a> has request to join clan
                     </p>

                     <p>Status: <span style={{ color: "red"}}>Rejected</span> </p>
           
            </Box>


            <Box display="flex" flexWrap="wrap" gap="5px" alignItems="center">
                     <Avatar src='./w_soldier.jpg'></Avatar>

                     <p className='w-username'>
                     <a href="#">Hanzo160 </a> has request to join clan
                     </p>

                     <p>Status: <span style={{ color: "red"}}>Rejected</span> </p>
           
            </Box>


  
        </Box>

        </MenuItem>
      </Menu>
    </div>
  );
}
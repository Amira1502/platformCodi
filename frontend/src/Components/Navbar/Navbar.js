// ïmport package react
import React, { useState, useEffect } from 'react';
import { Link , useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';
import { toast } from 'react-toast'


//
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ManageAccountsRoundedIcon from '@mui/icons-material/ManageAccountsRounded';
import MoreVertIcon from '@material-ui/icons/MoreVert';

// import google & github login 
import { GoogleLogin } from 'react-google-login';
import LoginGithub from 'react-login-github';


// import axios
import axios from 'axios';

import { authenticate, isAuth } from '../../helpers/auth';
import {LOGOUT} from '../../JS/actionsTypes/actionAuth';

import {dispatchLogin, dispatchGetUser} from '../../JS/actions/actionAuth'



// import CSS
import { AppBar, Typography, Toolbar, Avatar, Button, IconButton } from '@material-ui/core'
import './Navbar.css'
import useStyles from './styles';

// import logo
import logo from "../../Assets/logo.png"


const Navbar =  ()  => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const classes = useStyles();
      //
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
       
  const logout = () => {
    localStorage.clear();

    history.push('/');

    setUser(null);
  };

// useEffect
useEffect(() => {
  const token = user?.token;

  if (token) {
    const decodedToken = decode(token);

    if (decodedToken.exp * 1000 < new Date().getTime()) logout();
  }

  setUser(JSON.parse(localStorage.getItem('profile')));
}, [location]);

    return (
        <div>
      <AppBar color="white">
  {/*logo */}
  <img  component={Link} to="/" src={logo} alt="logo" className="logo"></img>
 {/*button signin  logout */}
 <div className='buttons'>
 <Toolbar className={classes.toolbar}>
        {user?.result ? (
          <div className={classes.profile}>
            <Avatar className={classes.purple} alt={user?.result.name} src={user?.result.imageUrl}>{user?.result.name.charAt(0)}</Avatar>
            
            <Typography className={classes.userName} variant="h6">{user?.result.login}</Typography>
            <Typography className={classes.userName} variant="h6">{user?.result.name}</Typography>

            <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
<Menu
  id="simple-menu"
  anchorEl={anchorEl}
  keepMounted
  open={Boolean(anchorEl)}
  onClose={handleClose}
>
  <MenuItem onClick={handleClose} component={Link} to="/profile">Profile</MenuItem>
  <MenuItem onClick={handleClose}>My account</MenuItem>
  <MenuItem onClick={logout}>Logout</MenuItem>
</Menu>
          </div>
        ) : (
          <Button
          id="basic-button"
          aria-controls="basic-menu"
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
<Button variant="outlined" endIcon={<ManageAccountsRoundedIcon />}>
  
</Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem onClick={handleClose} component={Link} to="/auth"  >Sign in</MenuItem>
          <MenuItem onClick={handleClose} component={Link} to="/freelancers" >Find Freelancers</MenuItem>
          <MenuItem onClick={handleClose} component={Link} to="/customers" >Find Customers</MenuItem>
          <MenuItem onClick={handleClose} component={Link} to="/support" >Support</MenuItem>

        </Menu>
        
                </Button>
                

        )}
      </Toolbar>
        
        </div> 
       
          


        </AppBar> 

        </div>
    )
}

export default Navbar

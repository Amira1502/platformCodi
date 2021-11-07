import React, { useState, useEffect } from 'react';
import { AppBar, Typography, Toolbar, Avatar, Button } from '@material-ui/core';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';

import { GoogleLogin } from 'react-google-login';
import axios from 'axios';


import * as actionType from '../../JS/actionsTypes/actionAuth';
import {AUTH} from '../../JS/actionsTypes/actionAuth';

import useStyles from './styles';

const Nav = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const classes = useStyles();

  // send google token
  const sendGoogleToken = tokenId => {
    axios
      .post(`http://localhost:7000/api/googlelogin`, {
        idToken: tokenId
      })
      .then(res => {
        console.log(res.data);
        history.push('/project')
      })
      .catch(error => {
        console.log('GOOGLE SIGNIN ERROR', error.response);
      });
  };


  const googleSuccess = res => {
    const result = res?.profileObj;
    const token = res?.tokenId;


        sendGoogleToken(res.token);
        console.log(res);

      dispatch({ type: AUTH, data: { result, token } });
    

      history.push('/project');

  };

  const googleError = () => console.log('Google Sign In was unsuccessful. Try again later');

  const logout = () => {
    dispatch({ type: actionType.LOGOUT });

    history.push('/');

    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location]);

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
    
      <Toolbar className={classes.toolbar}>
        {user?.result ? (
          <div className={classes.profile}>
            <Avatar className={classes.purple} alt={user?.result.name} src={user?.result.imageUrl}>{user?.result.name.charAt(0)}</Avatar>
            <Typography className={classes.userName} variant="h6">{user?.result.name}</Typography>
            <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
          </div>
        ) : (
          <Button component={Link} to="/project" variant="contained" color="primary">
                          <GoogleLogin
          clientId="998922049920-3bhfhk05ff2nb9ivp1h811hhin6ilkgk.apps.googleusercontent.com"
          onSuccess={googleSuccess}
          onFailure={googleError}
          
/>  
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Nav;
// ïmport package react
import React, { useState, useEffect } from 'react';
import { Link , useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import ReactDOM from 'react-dom';
// or
// import google & github login 
import GoogleLogin from 'react-google-login';
import GithubLogin from 'react-login-github';

// import helper
import { authenticate, isAuth } from '../../helpers/auth';

import { AUTH } from '../../JS/actionsTypes/actionAuth';


// import axios
import axios from 'axios';

// import CSS
import Card from '@mui/material/Card';
import './Auth.css'


// import logo
import logo from "../../Assets/logo.png"



const Auth = () => {

  const dispatch = useDispatch();
  const history = useHistory();

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
  const informParent = response => {
    authenticate(response, () => {
      isAuth() && isAuth().role === 'admin'
        ? history.push('/admin')
        : history.push('/private');
    });
  };

// send github token
const sendGithubToken = (client_id, code, client_secret) => {
  axios
    .post(`http://localhost:7000/api/githublogin`, {
      client_id, 
      code,
      client_secret
      
    })
    .then(res => {
      console.log(res.data);
      //informParent(res);
    })
    .catch(error => {
      console.log('GITHUB SIGNIN ERROR', error.response);
    });
};
      // handle google
    const googleSuccess = response => {
    const result = response?.profileObj;
    const token = response?.tokenId;
        console.log(response);
        sendGoogleToken(response.tokenId);
        dispatch({ type: AUTH, data: { result, token } });

      };

    const googleError = () => 
     alert('Google Sign In was unsuccessful. Try again later');



     // handle Github
      const githubSuccess = async(response) => {
        try{
            const { client_secret, code, client_id} = response
            const res = await axios.post(`http://localhost:7000/api/githublogin`, 
            {client_secret, code, client_id})
          //sendGithubToken(response.client_secret, response.code, response.client_id)
//console.log(res)
          const result =res.data;
          console.log(result)

  
          const token = response?.token;

          dispatch({ type: AUTH, data: { result, token } })

          history.push('/project')
        
        }
        catch (error) {
          console.log(error);
      }
      }
      const githubFailure = response =>
      alert('Github Sign In was unsuccessful. Try again later');


  return (

    <div>
      <Card  className="auth-card">
 {/*logo */}
 <img  src={logo} alt="logo" className="logo-auth"></img>
      <h2>Welcome to EarnCoin</h2>

      <h4>Log in to your account :</h4> 
    
      
     
           <GithubLogin
                  clientId={`e8db77544d2e4e9ab741`}
                  buttonText="Login with Github"
                  onSuccess={githubSuccess}
                  onFailure={githubFailure}
                  className="icon-github"
                
           ></GithubLogin>
         
         <h3>Or</h3>

       
           <GoogleLogin
          clientId="998922049920-3bhfhk05ff2nb9ivp1h811hhin6ilkgk.apps.googleusercontent.com"
          onSuccess={googleSuccess}
          onFailure={googleError}
          cookiePolicy="single_host_origin"
          />

</Card>

    </div>
  )
}

export default Auth

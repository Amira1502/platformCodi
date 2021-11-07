const User = require('../models/user');

const jwt = require('jsonwebtoken');


const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT);

const fetch = require('node-fetch');
const FormData = require('form-data')

const config = require('./config')

const userCtrl = {

// google authentification
googleController : (req, res) => {
  const { idToken } = req.body;

  client
    .verifyIdToken({ idToken, audience: process.env.GOOGLE_CLIENT })
    .then(response => {
      // console.log('GOOGLE LOGIN RESPONSE',response)
      const { email_verified, name, email } = response.payload;
      console.log(response.payload)
      if (email_verified) {
        User.findOne({ email }).exec((err, user) => {
          if (user) {
            const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
              expiresIn: '7d'
            });
            const { _id, email, name, role } = user;
            return res.json({
              token,
              user: { _id, email, name, role },

            });
          } else {
            let password = email + process.env.JWT_SECRET;
            user = new User({ name, email, password });

            user.save((err, data) => {
              if (err) {
                console.log('ERROR GOOGLE LOGIN ON USER SAVE', err);
                return res.status(400).json({
                  error: 'User signup failed with google'
                });
              }
              const token = jwt.sign(
                { _id: data._id },
                process.env.JWT_SECRET,
                { expiresIn: '7d' }
              );
              const { _id, email, name, role } = data;
              return res.json({
                token,
                user: { _id, email, name, role }
              });
            });
          }           
        });
   
      } else {
        return res.status(400).json({
          error: 'Google login failed. Try again'
        });
      }
    });
},
getAccessToken: (req, res) => {
  try {
      const rf_token = req.cookies.refreshtoken
      if(!rf_token) return res.status(400).json({msg: "Please login now!"})

      jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
          if(err) return res.status(400).json({msg: "Please login now!"})

          const access_token = createAccessToken({id: user.id})
          res.json({access_token})
      })
  } catch (err) {
      return res.status(500).json({msg: err.message})
  }
},

getUserInfor: async (req, res) => {
  try {
      const user = await User.findById(req.user.id).select('-password')

      res.json(user)
  } catch (err) {
      return res.status(500).json({msg: err.message})
  }
},

githubController :  (req, res) => {
  
  const { code } = req.body;

  const data = new FormData();
  data.append("client_id", config.client_id);
  data.append("client_secret", config.client_secret);
  data.append("code", code);
  data.append("redirect_uri", config.redirect_uri);
console.log(data)
  // Request to exchange code for an access token
  fetch(`https://github.com/login/oauth/access_token`, {
    method: "POST",
    body: data,
  })
    .then((response) => response.text())
    .then((paramsString) => {
      let params = new URLSearchParams(paramsString);
      const access_token = params.get("access_token");

      // Request to return data of a user that has been authenticated
      return fetch(`https://api.github.com/user`, {
        headers: {
          Authorization: `token ${access_token}`,
        },
      });
    })
    .then((response) => response.json())
    .then((response) => {
    

      const { email, name } = response;

      User.findOne({ email }).exec((err, user) => {
        if (user) {
          const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '7d'
          });
          const { _id, email, name, role } = user;
          return res.status(200).json(response);


          return res.json({
            token,
            user: { _id, email, name, role },
          });

        } else {

          let password = email + process.env.JWT_SECRET;
          user = new User({ name, email, password });

          user.save((err, data) => {
            if (err) {
              console.log('ERROR GITHUB LOGIN ON USER SAVE', err);
              return res.status(400).json({
                error: 'User signup failed with github'
              });
            }

            const token = jwt.sign(
              { _id: data._id },
              process.env.JWT_SECRET,
              { expiresIn: '7d' }
            );
            const { _id, email, name, role } = data;

            return res.json({
              token,
              user: { _id, email, name, role }
            });
          });
        }
      
    })
  })
.catch((error) => {
      return res.status(400).json(error);
    });

  }
}

  module.exports = userCtrl
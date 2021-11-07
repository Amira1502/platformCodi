require('dotenv').config()

const config = {
  client_id: process.env.GITHUB_CLIENT,
  redirect_uri: process.env.GITHUB_REDIRECT_URI,
  client_secret: process.env.GITHUB_CLIENT_SECRET,
}

module.exports = config
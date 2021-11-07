const express = require('express')
const router = express.Router()

 
// Load Controllers
const userCtrl = require('../controllers/auth.controllers')

// auth with google
router.post('/googlelogin',  userCtrl.googleController)

// auth with github

router.post('/githublogin',  userCtrl.githubController)

router.post('/refresh_token', userCtrl.getAccessToken)


router.get('/infor',  userCtrl.getUserInfor)
module.exports = router

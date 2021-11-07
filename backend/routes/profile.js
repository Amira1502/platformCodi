// require express
const express = require('express')

// require Router
const router = express.Router()


// require controllers
const { getProfile,
    getAllProfiles,
    deleteProfile,
    editProfile
  
} = require('../controllers/profile.controllers')


// ************** All routes **********************

/**
 * @desc : test route
 * @method : GET
 * @path : http://localhost:7000/api/test
 * @data : nothing
 * @acess : public
 */
 router.get('/test', (req, res) => {
    res.status(200).send('Hello test')
})

 /**
 * @desc : get all profile
 * @method : GET
 * @path : http://localhost:7000/api/profile
 * @data : no data
 * @acess : public
 */
  router.get('/', getAllProfiles)

  /**
  * @desc : get one profile
  * @method : GET
  * @path : http://localhost:7000/api/profile/:_id
  * @data : req.params
  * @acess : public
  */
 router.get('/:_id', getProfile)

 /**
 * delete project
 *  */
 /**
  * @desc : delete profile
  * @method : DELETE
  * @path : http://localhost:7000/api/profile/:_id
  * @data : req.params
  * @acess : public
  */
  router.delete('/:_id', deleteProfile)

 
  
 /**
  * @desc : edit profile
  * @method : PUT
  * @path : http://localhost:7000/api/profile/:_id
  * @data : req.params & req.body
  * @acess : public
  */
 router.put('/:_id', editProfile) 
   
// export module
module.exports =router;

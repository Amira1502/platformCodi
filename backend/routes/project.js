// require express
const express = require('express')

// require Router
const router = express.Router()


// require controllers
const { postProject,
    getProject,
    getAllProjects,
    deleteProject,
    editProject
  
} = require('../controllers/project.controllers')


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
 * @desc : add projet
 * @method : POST
 * @path : http://localhost:7000/api/project
 * @data : req.body
 * @acess : public
 */
 
 router.post("/", postProject)

 /**
 * @desc : get all projects
 * @method : GET
 * @path : http://localhost:7000/api/project
 * @data : no data
 * @acess : public
 */
  router.get('/', getAllProjects)

  /**
  * @desc : get one project
  * @method : GET
  * @path : http://localhost:7000/api/project/:_id
  * @data : req.params
  * @acess : public
  */
 router.get('/:_id', getProject)

 /**
 * delete project
 *  */
 /**
  * @desc : delete project
  * @method : DELETE
  * @path : http://localhost:7000/api/project/:_id
  * @data : req.params
  * @acess : public
  */
  router.delete('/:_id', deleteProject)

 
  
 /**
  * @desc : edit project
  * @method : PUT
  * @path : http://localhost:7000/api/project/:_id
  * @data : req.params & req.body
  * @acess : public
  */
 router.put('/:_id', editProject) 
   
// export module
module.exports =router;

// require model contact
const User = require('../models/User')


  
  /**
 * GET all
 *  */
const getAllProfiles = async (req, res) => {
  try {
    const listProfiles = await User.find()
    res.status(200).send({ msg: 'This is the list of profiles ...', listProfiles })
  } catch (error) {
    res.status(400).send({ msg: 'Can not get all profiles !!', error })
  }
}


/**
 * GET one profile
 *  */
const getProfile = async (req, res) => {
  try {
    const { _id } = req.params
    const profileToFind = await User.findOne({ _id })
    console.log(profileToFind)
    res.status(200).send({ msg: 'I find the profile ...', profileToFind })
  } catch (error) {
    res.status(400).send({ msg: 'Can not get profile with this id !!', error })
  }
}


/**
 * delete project
 *  */
 

  const deleteProfile = async (req, res) => {
    const { _id } = req.params
    try {
      const profileToDelete = await User.findOneAndRemove({ _id })
      // console.log(profileToDelete)
      if (!profileToDelete) {
        res.status(200).send({ msg: 'Profile already deleted ...' })
        return
      }
      res.status(200).send({ msg: 'Profile deleted ...', profileToDelete })
    } catch (error) {
      res.status(400).send({ msg: 'Can not delete profile with this id !!', error })
    }
  }

 /**
  * edit profile
  */
 const editProfile = async (req, res) => {
    // const { name, email, phone } = req.body
    const { _id } = req.params
    try {
      const profileToEdit = await User.updateOne({ _id }, { $set: { ...req.body } })
      // console.log(profileToEdit)
      if (!profileToEdit.nModified) {
        res.status(400).send({ msg: 'Profile already updated ..', profileToEdit })
        return
      }
      res.status(200).send({ msg: 'Profile updated ..', profileToEdit })
    } catch (error) {
      res.status(400).send({ msg: 'Can not edit profile with this id !!', error })
    }
  }
   
  

  // export module
  module.exports = {getAllProfiles, getProfile, deleteProfile, editProfile}
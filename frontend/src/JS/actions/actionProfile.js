import axios from 'axios'

import {
    GET_PROFILE_LOAD, 
    GET_PROFILES_SUCCESS,
    GET_PROFILES_FAIL,
    GET_PROFILE,
    TOGGLE_TRUE,
    TOGGLE_FALSE
} from '../actionsTypes/actionProfile'


// get profiles
export const getProfiles = () => async (dispatch) => {
    dispatch({ type: GET_PROFILE_LOAD })
    try {
        const res = await axios.get("/api/profile/")
        dispatch({
            type: GET_PROFILES_SUCCESS,
            payload: res.data.listProfiles
        })
    } catch (error) {
        dispatch({
            type: GET_PROFILES_FAIL,
            payload: error
        })
        console.log(error)
    }
}
// get one profile by id
export const getProfile = (profileId) => async (dispatch) => {
    try {
        const res = await axios.get(`/api/profile/${profileId}`)
        dispatch({ type: GET_PROFILE, payload: res.data.profileToFind})
    } catch (error) {
        console.log(error)
    }
}

// delete profile
export const deleteProfile = (id) =>async(dispatch)=>{
    try{
    await axios.delete(`/api/profile/${id}`)
    dispatch( getProfiles())  
    
    }
    catch (error) {
        dispatch({type:  GET_PROFILES_FAIL, payload: error.response.data })
    }
    }

// add new profile
export const addProfile = ( newProfile) => async (dispatch) => {
    try {
        await axios.post("/api/profile/", newProfile)
        dispatch(getProfiles())
    } catch (error) {
        console.log(error)
    }
}

// edit a profile
export const editProfile= (profileId, newProfile) => async (dispatch) => {
    try {
        await axios.put(`/api/project/${profileId}`, newProfile)
        dispatch(getProfiles())
    } catch (error) {
        console.log(error)
    }
}

// Toggle true
export const toggleTrue = () => {
    return {
        type: TOGGLE_TRUE
    }
}

// Toggle false
export const toggleFalse = () => {
    return {
        type: TOGGLE_FALSE
    }
}


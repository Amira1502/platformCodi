import axios from 'axios'

import {
    GET_PROJECTS_LOAD, 
    GET_PROJECTS_SUCCESS,
    GET_PROJECTS_FAIL,
    GET_PROJECT,
    TOGGLE_TRUE,
    TOGGLE_FALSE
} from '../actionsTypes/actionProject'


// get projects
export const getProjects = () => async (dispatch) => {
    dispatch({ type: GET_PROJECTS_LOAD })
    try {
        const res = await axios.get("/api/project/")
        dispatch({
            type: GET_PROJECTS_SUCCESS,
            payload: res.data.listProjects
        })
    } catch (error) {
        dispatch({
            type: GET_PROJECTS_FAIL,
            payload: error
        })
        console.log(error)
    }
}
// get one project by id
export const getProject = (projectId) => async (dispatch) => {
    try {
        const res = await axios.get(`/api/project/${projectId}`)
        dispatch({ type: GET_PROJECT, payload: res.data.projectToFind})
    } catch (error) {
        console.log(error)
    }
}

// delete project
export const deleteProject = (id) =>async(dispatch)=>{
    try{
    await axios.delete(`/api/project/${id}`)
    dispatch( getProjects())  
    
    }
    catch (error) {
        dispatch({type:  GET_PROJECTS_FAIL, payload: error.response.data })
    }
    }

// add new project
export const addProject = ( newProject) => async (dispatch) => {
    try {
        await axios.post("/api/project/", newProject)
        dispatch(getProjects())
    } catch (error) {
        console.log(error)
    }
}

// edit a project
export const editProject= (projectId, newProject) => async (dispatch) => {
    try {
        await axios.put(`/api/project/${projectId}`, newProject)
        dispatch(getProjects())
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


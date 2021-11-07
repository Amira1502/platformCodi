import {
    GET_PROJECTS_LOAD, 
    GET_PROJECTS_SUCCESS,
    GET_PROJECTS_FAIL,
    GET_PROJECT,
    TOGGLE_FALSE,
    TOGGLE_TRUE
} from '../actionsTypes/actionProject'

const initState = {
    projects: [],
    loadProjects: false,
    errors: [],
    isEdit: false,
    oneProject: {}
}

const projectReducer = (state = initState, { type, payload }) => {

    switch (type) {
        case  GET_PROJECTS_LOAD: return {
            ...state,
            loadProjects: true
        }
        case GET_PROJECTS_SUCCESS: return {
            ...state,
            projects: payload,
            loadProjects: false
        }
        case GET_PROJECTS_FAIL: return {
            ...state,
            errors: payload,
            loadProjects: false
        }
        case TOGGLE_TRUE: return {
            ...state,
            isEdit: true
        }
        case TOGGLE_FALSE: return {
            ...state,
            isEdit: false
        }
        case GET_PROJECT: return {
            ...state,
            oneProject: payload
        }

        default: return state
    }

}

export default projectReducer 
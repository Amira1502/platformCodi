import {
    GET_PROFILE_LOAD, 
    GET_PROFILES_SUCCESS,
    GET_PROFILES_FAIL,
    GET_PROFILE,
    TOGGLE_TRUE,
    TOGGLE_FALSE
} from '../actionsTypes/actionProfile'

const initState = {
    profiles: [],
    loadProfiles: false,
    errors: [],
    isEdit: false,
    oneProfile: {}
}

const profileReducer = (state = initState, { type, payload }) => {

    switch (type) {
        case  GET_PROFILE_LOAD: return {
            ...state,
            loadProfiles: true
        }
        case GET_PROFILES_SUCCESS: return {
            ...state,
            profiles: payload,
            loadProfiles: false
        }
        case GET_PROFILES_FAIL: return {
            ...state,
            errors: payload,
            loadProfiles: false
        }
        case TOGGLE_TRUE: return {
            ...state,
            isEdit: true
        }
        case TOGGLE_FALSE: return {
            ...state,
            isEdit: false
        }
        case GET_PROFILE: return {
            ...state,
            oneProfile: payload
        }

        default: return state
    }

}

export default profileReducer 
import ACTIONS from '../actions/'

const initialState = {
    user: [],
    isLogged: false,
    isAdmin: false
}

const authGithubReducer = (state = initialState, { type, payload }) => {
    switch(type){
        case ACTIONS.LOGIN:
            return {
                ...state,
                isLogged: true
            }
        case ACTIONS.GET_USER:
            return {
                ...state,
                user: payload.user,
                isAdmin: payload.isAdmin
            }
        default:
            return state
    }
}

export default authGithubReducer
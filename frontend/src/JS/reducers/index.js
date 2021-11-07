import {combineReducers} from "redux";


//import authGithubReducer from "./authGithubReducer";
import auth from "./authReducer";
import projectReducer from "./projectReducer";
import profileReducer from "./profileReducer";


const rootReducer = combineReducers({projectReducer, profileReducer, auth});
export default rootReducer;
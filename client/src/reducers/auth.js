import { 
    REGISTER_SUCCESS, 
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT
} from "../actions/types";

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    isloading: true,
    user: null
};

export default function( state = initialState , action ){
    const {type, payload} = action;
    
    switch(type) {
        case USER_LOADED:
            localStorage.setItem('token', payload.token);
            return {
                ...state, 
                isAuthenticated: true, 
                isloading: false,
                user: payload
            }

        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token', payload.token);
            return {
                ...state, 
                ...payload, 
                isAuthenticated: true, 
                isloading: false
            }

            case REGISTER_FAIL:
            case AUTH_ERROR:
            case LOGIN_FAIL:
                case LOGOUT:
                localStorage.removeItem('token');
                return {
                ...state,
                token: null,
                isAuthenticated: false, 
                isloading: false
                }

              
        case LOGIN_SUCCESS:
            localStorage.setItem('token', payload.token);
            return {
                ...state, 
                ...payload, 
                isAuthenticated: true, 
                isloading: false
            }  

            default:
                    return state;   
    }
}
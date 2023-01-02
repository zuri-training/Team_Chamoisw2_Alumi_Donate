import { SIGN_IN, SIGN_UP, LOGOUT } from "../actions";

const initialState = {
    user:{},
}

const authReducer = (state= initialState, action) => {
    switch(action.type){
        case SIGN_UP:
        case SIGN_IN:
            const newState = {
               user: action.payload
            }
        return newState;
        case LOGOUT:
            return initialState;
        default:
            return state;
    }
}

export default authReducer;
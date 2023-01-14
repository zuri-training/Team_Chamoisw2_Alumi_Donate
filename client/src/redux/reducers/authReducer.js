import { SIGN_IN, SIGN_UP, LOGOUT, UPDATE_TOKEN, SIGN_IN_ADMIN } from "../actions";

const initialState = {
    user:{
        isAdmin: false,
    },
}

const authReducer = (state= initialState, action) => {
    switch(action.type){
        case SIGN_UP:
        case SIGN_IN:
            const newState = {
               user: action.payload,
               isAdmin: false
            }
        return newState;
        case UPDATE_TOKEN:
            return {
                user:{ 
                    ...state.user,
                    token: action.payload
                }
            }
        case SIGN_IN_ADMIN:
            return {
                user:{ 
                   token: action.payload,
                   isAdmin: true
                }
            }
        case LOGOUT:
            return initialState;
        default:
            return state;
    }
}

export default authReducer;
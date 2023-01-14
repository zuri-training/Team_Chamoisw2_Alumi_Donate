import { EDIT_ADMIN_DETAILS } from "../actions"

const initialState = {
    user:{},
    admin:{}
}

const profileReducer = (state = initialState, action) => {
    switch(action.type){
        case EDIT_ADMIN_DETAILS:
            return {
                ...state,
                admin: action.payload
            }
        default: 
            return initialState
    }
    
}

export default profileReducer
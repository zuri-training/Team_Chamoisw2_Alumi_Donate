import { SET_LOADER_VISIBLE } from "../actions";

const initialState = {
    loading: false
}

const uiReducer = (state = initialState, action) => {
    switch(action.type){
        case SET_LOADER_VISIBLE:
            return { loading: action.payload }
        default:
            return initialState
    }
}

export default uiReducer
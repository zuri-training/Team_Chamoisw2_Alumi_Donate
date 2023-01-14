import { EDIT_COLLEGE_DETAILS } from "../actions"

const initialState = {
    activeOperation: null,
    collegeDetails:{}
}

const collegeReducer = (state = initialState, action) => {
    switch(action.type){
        case EDIT_COLLEGE_DETAILS:
            return {
                activeOperation: EDIT_COLLEGE_DETAILS,
                collegeDetails: action.payload
            }
        default:
            return initialState
    }
}

export default collegeReducer
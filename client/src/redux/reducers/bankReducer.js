import { EDIT_BANK_DETAILS } from "../actions"

const initialState = {
    name: '',
    slug: '',
    code: ''
}

const BanksReducer = (state = initialState, action) => {
    switch(action.type) {
        case EDIT_BANK_DETAILS: 
            return {
                ...state,
                ...action.payload
            }
        default:
            return initialState
    }
}

export default BanksReducer
import { SET_DONATION_AMOUNT, SET_DONATION_LINK, LOGOUT } from "../actions";

const initialState = {
    amountToDonate: 0,
    anonymousAlumni: false,
    donationLink: ''
}

const donationsReducer = (state= initialState, action) => {
    switch(action.type){
        case SET_DONATION_AMOUNT:
        case SET_DONATION_LINK:
            return { ...state, donationLink: action.payload }
        case LOGOUT:
            return initialState
        default:
            return initialState;
    }
}

export default donationsReducer;
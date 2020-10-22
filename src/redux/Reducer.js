import {ACTION_TYPES} from "./Types"


const initialState = {
    token: localStorage.getItem("token"),
    authanticates:false
}

export const Reducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION_TYPES.LOGIN:
            
            return {
                ...state,
                token: action.payload,
                authanticates: true
            }
        case ACTION_TYPES.LOGOUT:
            return {
                ...state,
                token:null
            }
        default:
         return state
    }
}
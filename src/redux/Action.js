import { ACTION_TYPES } from "./Types"

export const logIn = (token) => dispach => {
    dispach({
        type: ACTION_TYPES.LOGIN,
        payload:token
    })
}

export const logOut = (token) => dispach => {
    dispach({
        type: ACTION_TYPES.LOGOUT,
        payload:token
    })
}
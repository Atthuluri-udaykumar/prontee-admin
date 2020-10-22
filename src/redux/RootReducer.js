import { combineReducers } from "redux"
import {Reducer} from "./Reducer"

export const RootReducer = combineReducers({
    auth:Reducer,
})
import { combineReducers } from "redux";
import headerReducer from './headerReducer'
import shopReducer from './shopReducer'

export default combineReducers({
    headerReducer,shopReducer   
})
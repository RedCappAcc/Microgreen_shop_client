import { MENU_TOGGLE,IS_MOBILE,NOT_MOBILE } from "../actions/actionsType"

const initialState = {
    isMobile:false,
    toggleMenu:false,
}

function headerReducer(state = initialState,action){
    switch(action.type){
        case MENU_TOGGLE:
            return({
                ...state, toggleMenu:!state.toggleMenu
            })
        case IS_MOBILE:
            return({
                ...state, isMobile:true
            })
        case NOT_MOBILE:
            return({
                ...state,isMobile:false
            })
        default:
            return({
                ...state
            })
    }
}   

export default headerReducer
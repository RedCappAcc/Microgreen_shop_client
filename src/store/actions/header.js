import { MENU_TOGGLE, NOT_MOBILE, IS_MOBILE } from "./actionsType"

export function changeToggleMenu(){
    return({
        type: MENU_TOGGLE
    })
}

export function ChangeIsMobile(){
    return({
        type:IS_MOBILE
    })
}
export function changeNotMobile(){
    return ({
        type:NOT_MOBILE
    })
}

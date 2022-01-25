import { PAGE_INIT,PAGE_NEXT,PAGE_PREV,PAGE_CHANGE,CATEGRY_CHANGE,
        SORT_CHANGE,LOADING_START,LOADING_END,LOGIN,LOGOUT,
        NAME_INIT,NAME_DEL} from "../actions/actionsType"

const initialState = {
    pages:1,
    activePage:1,
    activeCategory:'Все',
    activeSort:'популярности',
    Loading:false,
    Auth:false,
    userName : '',
}

function shopReducer(state = initialState,action){
    switch(action.type){
        case PAGE_INIT:
            return({
                ...state,pages:action.payload
            })
        case PAGE_NEXT:
            if (state.pages>state.activePage){
                return({
                    ...state,activePage:state.activePage+1
                })
            }
            else{
                return({
                    ...state,activePage:1
                })
            }
        case PAGE_PREV:
            if(state.activePage<=1){
                return({
                    ...state,activePage:state.pages
                })
            }
            else{
                return({
                    ...state,activePage:state.activePage-1
                })
            }
        case PAGE_CHANGE:
            return({
                ...state,activePage:action.payload
            })
        case CATEGRY_CHANGE:
            return({
                ...state,activeCategory:action.payload
            })
        case SORT_CHANGE:
            return({
                ...state,activeSort:action.payload
            })
        case LOADING_START:
            return({
                ...state,Loading:true
            })
        case LOADING_END:
            return({
                ...state,Loading:false
            })

        case LOGIN:
            return({
                ...state,Auth:true
            })

        case LOGOUT:
            return({
                ...state,Auth:false
            })
        case NAME_INIT:
            return({
                ...state,userName:action.payload
            })
        case NAME_DEL:
            return({
                ...state,userName:''
            })
        default:
            return({
                ...state
            })
    }
}

export default shopReducer
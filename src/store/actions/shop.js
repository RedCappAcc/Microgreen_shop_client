import axios from 'axios'
import {PAGE_INIT, PAGE_PREV,PAGE_NEXT,PAGE_CHANGE,CATEGRY_CHANGE,
        SORT_CHANGE, LOADING_END,LOADING_START,LOGIN,LOGOUT,
        NAME_INIT,NAME_DEL} from './actionsType'

export function initPage(pages){
    return({
        type:PAGE_INIT,payload:pages
    })
}

export function prevPages(){
    return({
        type:PAGE_PREV
    })
}

export function nextPages(){
    return({
        type:PAGE_NEXT
    })
}

export function changePage(page){
    return({
        type:PAGE_CHANGE,payload:page
    })
}

export function changeCategory(category){
    return({
        type:CATEGRY_CHANGE,payload:category
    })
}

export function changeSort(category){
    return({
        type:SORT_CHANGE, payload:category
    })
}

export function loadingStart(){
    return({
        type:LOADING_START
    })
}

export function loadingEnd(){
    return({
        type:LOADING_END
    })
}
export function login(){
    return({
        type:LOGIN
    })
}

export function logout(){
    return({
        type:LOGOUT
    })
}


export function userNameInit(name){
    return({
        type:NAME_INIT,payload:name
    })
}


export function nameDel(){
    return({
        type:NAME_DEL
    })
}

export function userRegistr({email,password,name,surname,phone}){
    const apiAUTH = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB8b7N6HCJFYk30DOJ4KnZITdgzNLNoueQ'
    const apiDataBase = 'https://microgreen-2507e-default-rtdb.europe-west1.firebasedatabase.app/users.json'
    return async dispatch=>{
        try{
            dispatch(loadingStart())
            const response = await axios.post(apiAUTH,{email:email,password:password,returnSecureToken:true})
            if(response.status===200){
                dispatch(login())
                localStorage.setItem('Token',response.data.idToken)
                localStorage.setItem('userID',response.data.localId)
                const expiresInMilesecond = ((response.data.expiresIn*1000)+Date.now())
                localStorage.setItem('expiresIn',expiresInMilesecond)
                const userResponse = await axios.post(apiDataBase,{id:response.data.localId, email:email,name:name,surname:surname,phone:phone})
                localStorage.setItem('authId',userResponse.data.name)
                const userNameResponse = await axios.get(`https://microgreen-2507e-default-rtdb.europe-west1.firebasedatabase.app/users/${userResponse.data.name}.json`)
                dispatch(userNameInit(userNameResponse.data['name']))
                dispatch(loadingEnd())
                setTimeout(()=>{
                    dispatch(userLogout())
                },response.data.expiresIn*1000)
                return {status:true}
            }
            }
        catch(e){
            if(e.response.status===400){
                dispatch(loadingEnd())
                return {status:false, message:e.response.data.error.message}
            }
        }
    }
}

export function loginAuth({email,password}){
    const api = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB8b7N6HCJFYk30DOJ4KnZITdgzNLNoueQ'
    return async dispatch=>{
        dispatch(loadingStart())
        try{
            const response = await axios.post(api,{email:email,password:password,returnSecureToken:true})
            if(response.status===200){
                dispatch(login())
                localStorage.setItem('Token',response.data.idToken)
                localStorage.setItem('userID',response.data.localId)
                const expiresInMilesecond = ((response.data.expiresIn*1000)+Date.now())
                localStorage.setItem('expiresIn',expiresInMilesecond)

                const responseUser = await axios.get('https://microgreen-2507e-default-rtdb.europe-west1.firebasedatabase.app/users.json')
                const keys = Object.keys(responseUser.data)
                keys.forEach(el=>{
                    if(responseUser.data[el]['id']===localStorage.getItem('userID')){
                        localStorage.setItem('authId',el)
                        dispatch(userNameInit(responseUser.data[el]['name']))
                    }
                    
                })
                dispatch(loadingEnd())
                setTimeout(()=>{
                    dispatch(userLogout())
                },response.data.expiresIn*1000)
                return {status:true}
            }
        }
        catch(e){
            if(e.response){
                dispatch(loadingEnd())
                return {status: false, message:e.response.data.error.message}
            }
        }
        
    }
}


export function autoLogin(){
    return async dispatch =>{
        if(localStorage.getItem('Token')&&(localStorage.getItem('expiresIn'))>Date.now()){
            const responseUser = await axios.get('https://microgreen-2507e-default-rtdb.europe-west1.firebasedatabase.app/users.json')
                const keys = Object.keys(responseUser.data)
                keys.forEach(el=>{
                    if(responseUser.data[el]['id']===localStorage.getItem('userID')){
                        dispatch(login())
                        dispatch(userNameInit(responseUser.data[el]['name']))
                        let lastTime = localStorage.getItem('expiresIn')-Date.now()
                        setTimeout(()=>{
                            dispatch(userLogout())
                        },lastTime)
                    }
                    
                })
        }
        else{
            dispatch(userLogout())
        }
    }

}

export function userLogout(){
    return dispatch =>{
        dispatch(loadingStart())
        dispatch(logout())
        dispatch(nameDel())
        localStorage.removeItem('Token')
        localStorage.removeItem('userID')
        localStorage.removeItem('expiresIn')
        localStorage.removeItem('authId')
        dispatch(loadingEnd)
    }
}
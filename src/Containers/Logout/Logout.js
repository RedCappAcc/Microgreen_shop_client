import {useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import {userLogout} from '../../store/actions/shop'
import {useDispatch} from 'react-redux'

function Logout(){
    const dispatch = useDispatch()
    const navigate = useNavigate();
    useEffect(()=>{
        dispatch(userLogout())
        navigate('/auth')
    },[])

    return(<div></div>)
}

export default Logout
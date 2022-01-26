import cls from './Profile.module.css'
import {useState,useEffect} from 'react'
import {useSelector} from 'react-redux'
import axios from 'axios'
import {useDispatch} from 'react-redux'
import {loadingStart,loadingEnd} from '../../store/actions/shop'
import Load from '../../components/Load/Load'
import {useNavigate} from 'react-router-dom'

function Profile (){
    const navigate = useNavigate()
    const authId = localStorage.getItem('authId')
    const loading = useSelector(state=>state.shopReducer.Loading)
    const dispatch = useDispatch()
    let [state,setState] = useState({
        name:'',
        surName:'',
        email:'',
        phone:'',
    })
    useEffect(async()=>{
        dispatch(loadingStart())
        const response = await axios.get(`https://microgreen-2507e-default-rtdb.europe-west1.firebasedatabase.app/users/${authId}.json`)
        setState({
            name:response.data.name,
            surName:response.data.surname,
            email:response.data.email,
            phone:response.data.phone,
        })
        dispatch(loadingEnd())
    },[authId])

    return(
        <div className={cls.profile}>
            {loading?<Load/>:
            <div className={cls.profile_container}>
                <div className={cls.label}>Мой профиль</div>
                <div className={cls.content}>
                    <div className={cls.left}>
                        <div>Имя :</div>
                        <div>Фамилия :</div>
                        <div>E-mail :</div>
                        <div>Телефон :</div>
                    </div>
                    <div className={cls.right}>
                        <div><span>{state.name}</span></div>
                        <div><span>{state.surName}</span></div>
                        <div><span>{state.email}</span></div>
                        <div><span>{state.phone}</span></div>
                    </div>
                </div>
                <div className={cls.btns}>
                    <div  onClick={()=>{navigate('/profile/edit')}} className={cls.edit_profile}><button>Изменить анкетные данные</button></div>
                    <div  onClick={()=>{navigate('/profile/edit_email')}} className={cls.edit_email}><button>Изменить e-mail</button></div>
                    <div  onClick={()=>{navigate('/profile/edit_password')}} className={cls.edit_password}><button>Изменить пароль</button></div>
                </div>
            </div>
            }
        </div>
    )
}

export default Profile
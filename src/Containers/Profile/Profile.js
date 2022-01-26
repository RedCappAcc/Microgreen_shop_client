import cls from './Profile.module.css'
import {useState,useEffect} from 'react'
import {useSelector} from 'react-redux'
import axios from 'axios'
import {useDispatch} from 'react-redux'
import {loadingStart,loadingEnd} from '../../store/actions/shop'
import Load from '../../components/Load/Load'

function Profile (){
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
                <div className={cls.btn}>
                    <button>Изменить</button>
                </div>
            </div>
            }
        </div>
    )
}

export default Profile
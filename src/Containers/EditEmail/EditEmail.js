import cls from './EditEmail.module.css'
import {useNavigate} from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import {useAlert} from 'react-alert'
import {userLogout} from '../../store/actions/shop'
import {useDispatch} from 'react-redux'


function EditEmail (){
    const dispatch = useDispatch()
    const alert = useAlert()
    const idToken = localStorage.getItem('Token')
    const authId = localStorage.getItem('authId')
    let [email,setEmail] = useState('')
    let [classes,setClasses] = useState([])
    let [valid,setValid] = useState(false)
    const navigate = useNavigate()

    function changeHadler(e){
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let value = e.target.value
        if(re.test(value)){
            setClasses([])
            setValid(true)
        }
        else{
            setClasses([cls.notValid])
            setValid(false)
        }
        setEmail(value)
    }

    
    async function submit(e){
        e.preventDefault()
        if(valid){
            const responseAuth = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyB8b7N6HCJFYk30DOJ4KnZITdgzNLNoueQ`,{idToken:idToken, email:email})
            const responseBase = await axios.patch(`https://microgreen-2507e-default-rtdb.europe-west1.firebasedatabase.app/users/${authId}.json`,{email:email})
            if(responseAuth.status===200&&responseBase.status===200){
                alert.show('E-mail успешно изменен. Просим повторно авторирозавться')
                dispatch(userLogout())
                navigate('/auth')

            }
        }
    }


    return(
        <div className={cls.edit}>
            <form>
                <div className={cls.form}>
                    <div className={cls.labels}>
                        <div>Новый E-mail :</div>
                    </div>
                    <div className={cls.inp}>
                        <input className={classes.join(' ')} onChange={changeHadler}/>
                    </div>
                </div>
                <div className={cls.btns}>
                    <div className={cls.back} onClick={()=>{navigate('/profile')}}><button>Вернуться назад</button></div>
                    <div className={cls.save} onClick={submit}><button>Сохранить</button></div>
                </div>
            </form>
        </div>
    )
}

export default EditEmail
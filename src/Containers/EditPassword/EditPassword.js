import cls from './EditPassword.module.css'
import {useNavigate} from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import {useAlert} from 'react-alert'
import {userLogout} from '../../store/actions/shop'
import {useDispatch} from 'react-redux'


function EditPassword (){
    const dispatch = useDispatch()
    const alert = useAlert()
    const idToken = localStorage.getItem('Token')
    const authId = localStorage.getItem('authId')
    let [password,setPassword] = useState('')
    let [newPassword,setNewPassword] = useState('')
    let [classesOrigin,setClassesOrigin] = useState([])
    let [classesNew, setClassesNew] = useState([])
    const navigate = useNavigate()

    function changeHadlerOrigin(e){
        let value = e.target.value
        if(value.length>=8){
            setClassesOrigin([])
        }
        else{
            setClassesOrigin([cls.notValid])
        }
        setPassword(value)
    }

    
    function changeHadlerNew(e){
        let value = e.target.value
        if(value.length>=8){
            setClassesNew([])
        }
        else{
            setClassesNew([cls.notValid])
        }
        setNewPassword(value)
    }

    async function submit(e){
        e.preventDefault()
        if(password.length>=8&&newPassword.length>=8){
            try{
                const emailRes = await axios.get(`https://microgreen-2507e-default-rtdb.europe-west1.firebasedatabase.app/users/${authId}.json`)
            const email = emailRes.data.email
            const response = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB8b7N6HCJFYk30DOJ4KnZITdgzNLNoueQ`,{email:email,password:password})
            if (response.status===200){
                const responsechange = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyB8b7N6HCJFYk30DOJ4KnZITdgzNLNoueQ`,{idToken:idToken,password:newPassword})
                console.log(responsechange)
                alert.show('Пароль успешно изменен, просим повторно авторизоваться')
                dispatch(userLogout())
                navigate('/auth')
            }
            }
            catch(e){
                alert.show('Вы ввели неверный пароль')
            }
        }
        else{
            alert.show('Заполните пожалуйста все поля корректно')
        }
    }


    return(
        <div className={cls.edit}>
            <form>
                <div className={cls.form}>
                    <div className={cls.labels}>
                        <div>Старый пароль :</div>
                        <div>Новый пароль :</div>
                    </div>
                    <div className={cls.inp}>
                        <input type='password' className={classesOrigin.join(' ')} onChange={changeHadlerOrigin}/>
                        <input type='password' className={classesNew.join(' ')} onChange={changeHadlerNew}/>
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

export default EditPassword
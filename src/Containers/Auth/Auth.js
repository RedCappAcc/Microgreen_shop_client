import cls from './Auth.module.css'
import Input from '../../components/Input/Input'
import {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {loginAuth} from '../../store/actions/shop'
import { useAlert } from 'react-alert'

function Auth (){
    const alert  = useAlert()
    const dispatch = useDispatch()

    const navigate = useNavigate();

    let [email,setEmail] =  useState({
        value: '',
        label: 'E-mail',
        errorMessage: 'Введите корректный email',
        valid: false,
        touched: false,
    })

    let [password,setPassword] =  useState({
        type : 'password',
        value: '',
        label: 'Пароль',
        errorMessage: 'Пароль должен состоять минимум из 8 символов',
        valid: false,
        touched: false,
    })

    function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }


    function onChangeLogin({e}){
        if(validateEmail(e.target.value)){
            setEmail({
                ...email,valid:true,value:e.target.value,touched:true
            })
        }
        else{
            setEmail({
                ...email,valid:false,value:e.target.value,touched:true
            })
        }
    }
    function onChangePassword({e}){
        if(e.target.value.length>=8){
            setPassword({
                ...password,valid:true,value:e.target.value,touched:true
            })
        }
        else{
            setPassword({
                ...password,valid:false,value:e.target.value,touched:true
            })
        }
    }

    async function loginHadler(e){
        e.preventDefault()
        if(email.valid&&password.valid){
            const response = await dispatch(loginAuth({email:email.value, password:password.value}))
            if (response.status){
                alert.show('Вы успешно авторизовались')
                navigate('/shop')
            }
            else{
                if(response.message==='INVALID_PASSWORD'){
                    alert.show(`Ошибка авторизации вы ввели неверный пароль`)
                    setPassword({...password, value:''})
                }
                else{
                    alert.show(`Ошибка авторизации данная почта не зарегистрированна`)
                    setEmail({...email,value:''})
                    setPassword({...password, value:''})
                }
                
            }
        }
    }

    return(
        <div className={cls.auth}>
            <form className={cls.authNow}>
                <div className={cls.auth_container}>
                    <div className={cls.authNow__label}><span>Уже зарагестрированны</span></div>
                    <Input 
                        onChange = {onChangeLogin}
                        value = {email.value}
                        label = {email.label} 
                        errorMessage = {email.errorMessage} 
                        valid = {email.valid} 
                        touched = {email.touched}/>
                    <Input 
                        onChange = {onChangePassword}
                        value = {password.value}
                        label = {password.label} 
                        errorMessage = {password.errorMessage} 
                        valid = {password.valid} 
                        touched = {password.touched}
                        type = {password.type}/>
                    <div className={cls.btn_container}><button onClick={loginHadler} className={cls.btn} type='submit'>Войти</button></div>
                </div>
            </form>
            <div className={cls.registr}>
                <div className={cls.registr_container}>
                    <div className = {cls.registr_label}>
                        <span>Впервые на </span>
                        <span>Micro green</span>
                    </div>
                    <div className={cls.registr_dis}>Чтобы продолжить, необходимо зарегистрироваться (получить логин и пароль).</div>
                    <button onClick={()=>{navigate(`/registration`)}} className={cls.registr_btn}>Зарестрироваться</button>
                </div>
            </div>
        </div>  
    )
}

export default Auth 
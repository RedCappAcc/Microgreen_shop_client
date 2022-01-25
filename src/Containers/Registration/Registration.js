import cls from './Registration.module.css'
import Input from '../../components/Input/Input'
import {useState} from 'react'
import {useDispatch} from 'react-redux'
import {userRegistr} from '../../store/actions/shop'
import { useNavigate } from 'react-router-dom'
import {useAlert } from 'react-alert'


function Registration (){
    const alert = useAlert()
    const dispatch = useDispatch()
    const navigate = useNavigate();
    let [name,setName] =  useState({
        value: '',
        label: 'Имя',
        errorMessage: 'Введите корректное имя',
        valid: false,
        touched: false,
    })

    let [surName,setSurName] =  useState({
        value: '',
        label: 'Фамилия',
        errorMessage: 'Введите корректную Фамилию',
        valid: false,
        touched: false,
    })

    let [email,setEmail] =  useState({
        value: '',
        label: 'E-mail',
        errorMessage: 'Введите корректный E-mail',
        valid: false,
        touched: false,
    })

    let [phone,setPhone] =  useState({
        maxLength : '11',
        type:'tel',
        value: '',
        label: 'Телефон',
        errorMessage: 'Введите корректный телефон',
        valid: false,
        touched: false,
    })

    let [password,setPassword] =  useState({
        type:'password',
        value: '',
        label: 'Пароль',
        errorMessage: 'Пароль должен состоять как минимум из 8 символов',
        valid: false,
        touched: false,
    })

    let [repeatPassword,setRepeatPassword] =  useState({
        type:'password',
        value: '',
        label: 'Повторите пароль',
        errorMessage: 'Пароль должен состоять как минимум из 8 символов и совпадать с вышеуказанным',
        valid: false,
        touched: false,
    })

    function valid(state,setState,value){
        setState({
            ...state,value:value,touched:true,valid:true
        })
    }

    function inValid(state,setState,value){
        setState({
            ...state,value:value,touched:true,valid:false
        })
    }


    function onChangeValue({e,label}){
        switch(label){
            case 'Имя':
                if(/^[a-zа-яё]+$/i.test(e.target.value)){
                    valid(name,setName,e.target.value)
                }
                else{
                    inValid(name,setName,e.target.value)
                }
                break
            case 'Фамилия':
                if(/^[a-zа-яё]+$/i.test(e.target.value)){
                    valid(surName,setSurName,e.target.value)
                }
                else{
                    inValid(surName,setSurName,e.target.value)
                }
                break
            case 'E-mail':
                if(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(e.target.value)){
                    valid(email,setEmail,e.target.value)
                }
                else{
                    inValid(email,setEmail,e.target.value)
                }
                break
            case 'Телефон':
                function getInputsValueNumber(value){
                    return value.replace(/\D/g,'')
                }
                let inputNumberValue = getInputsValueNumber(e.target.value)
                if(inputNumberValue.length===11){
                    valid(phone,setPhone,inputNumberValue)
                }
                else{
                    inValid(phone,setPhone,inputNumberValue)
                }
                break
            case 'Пароль':
                if(e.target.value.length>=8){
                    valid(password,setPassword,e.target.value)
                }
                else{
                    inValid(password,setPassword,e.target.value)
                }
                break
            case 'Повторите пароль':
                if(e.target.value.length>=8&&e.target.value===password.value){
                    valid(repeatPassword,setRepeatPassword,e.target.value)
                }
                else{
                    inValid(repeatPassword,setRepeatPassword,e.target.value)
                }
                break
            default:
                console.log('error')
                break
        }
    }

    async function submitHadler(e){
        e.preventDefault()
        if(name.valid&&surName.valid&&email.valid&&phone.valid&&password.valid&&repeatPassword.valid){
            const response = await dispatch(userRegistr({name:name.value,surname:surName.value,phone:phone.value,email:email.value,password:password.value}))
            if(response.status){
                alert.show('Вы успешно зарегистрировались')
                navigate('/shop')
            }
            else{
                alert.show('Данная почта уже зарегистророванна')
            }
            

        }
    }

    return(
        <div className={cls.registr}>
            <div className={cls.registr_container}>
                <div className={cls.back} onClick = {()=>{navigate('/auth')}}>
                    <button>Вернуться назад</button>
                </div>
                <div className={cls.content}>
                    <form>
                        <Input label = {name.label} onChange = {onChangeValue} value = {name.value} valid = {name.valid} touched = {name.touched} errorMessage = {name.errorMessage}/>
                        <Input label = {surName.label} onChange = {onChangeValue} value = {surName.value} valid = {surName.valid} touched = {surName.touched} errorMessage = {surName.errorMessage}/>
                        <Input label = {email.label} onChange = {onChangeValue} value = {email.value} valid = {email.valid} touched = {email.touched} errorMessage = {email.errorMessage}/>
                        <Input label = {phone.label} onChange = {onChangeValue} value = {phone.value} valid = {phone.valid} touched = {phone.touched} errorMessage = {phone.errorMessage} type = {phone.type} maxLength = {phone.maxLength}/>
                        <Input label = {password.label} onChange = {onChangeValue} value = {password.value} valid = {password.valid} touched = {password.touched} errorMessage = {password.errorMessage} type = {password.type}/>
                        <Input label = {repeatPassword.label} onChange = {onChangeValue} repeatPassword = {name.value} valid = {repeatPassword.valid} touched = {repeatPassword.touched} errorMessage = {repeatPassword.errorMessage} type = {repeatPassword.type}/>
                        <div className={cls.submit}><button onClick={submitHadler}>Зарестрироваться</button></div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Registration
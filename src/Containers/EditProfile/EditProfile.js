import cls from './EditProfile.module.css'
import {useState,useEffect} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import {useAlert} from 'react-alert'


function EditProfile(){
    const alert = useAlert()
    const navigate = useNavigate()
    const authId = localStorage.getItem('authId')
    let [name, setName] = useState('')
    let [surname,setSurname] = useState('')
    let [phone,setPhone] = useState('')
    let [phoneCls,setPhoneCls] = useState([])
    useEffect(async()=>{
        const response = await axios.get(`https://microgreen-2507e-default-rtdb.europe-west1.firebasedatabase.app/users/${authId}.json`)
        setName(response.data.name)
        setSurname(response.data.surname)
        setPhone(response.data.phone)
    },[])
    function clickHadler({type,value}){
        switch(type){
            case 'name':
                const name = value.replace(/[^а-яёa-z-A-Z-А-ЯЁ) ]+/g,'')
                setName(name)
                break
            case 'surname':
                const surname = value.replace(/[^а-яёa-z-A-Z-А-ЯЁ) ]+/g,'')
                setSurname(surname)
                break
            case 'phone':
                const number = value.replace(/\D/g,'')
                if(value.length===11){
                    setPhoneCls([])
                }
                else{
                    setPhoneCls([cls.inValid])
                }
                setPhone(number)
                break
        }
    }

    async function submit(e){
        e.preventDefault()
        if(name.length>0&&surname.length>0&&phone.length===11){
            await axios.patch(`https://microgreen-2507e-default-rtdb.europe-west1.firebasedatabase.app/users/${authId}.json`,{name:name,surname:surname,phone:phone})
            navigate('/profile') 
        }
        else{
            alert.show('Заполните пожалуйста все поля')
        }
    }

    return(
        <div className={cls.edit}>
            <form>
                <div className={cls.form}>
                    <div className={cls.labels}>
                        <div>Имя:</div>
                        <div>Фамилия:</div>
                        <div>Телефон:</div>
                    </div>
                    <div className={cls.inp}>
                        <input value={name} onChange={(e)=>{clickHadler({type:'name',value:e.target.value})}}/>
                        <input value={surname} onChange={(e)=>{clickHadler({type:'surname',value:e.target.value})}}/>
                        <input className={phoneCls.join(' ')} maxLength={11} value={phone} onChange={(e)=>{clickHadler({type:'phone',value:e.target.value})}}/>
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

export default EditProfile
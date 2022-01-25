import cls from './ProfileBody.module.css'
import {NavLink} from 'react-router-dom'
import basketImg from './img/basket.png'
import logoutImg from'./img/exit.svg'
import {useState,useEffect} from 'react'
import {useSelector} from 'react-redux'
import regImg from './img/registration.png'
import entryImg from './img/entry.png'

function ProfileBody({profileVisable}){
    let auth = useSelector(state=>state.shopReducer.Auth)
    let [classes,setClasses] = useState([cls.profileBody])
    let [linkArray,setLinkArray] = useState([])
    useEffect(()=>{
        if(profileVisable){
            setClasses([cls.profileBody, cls.active])
        }
        else{
            setClasses([cls.profileBody])
        }
    },[profileVisable])

    useEffect(()=>{
        if(auth){
            setLinkArray([
                <NavLink className={cls.profile} key={1} to = '/profile'>Мой профиль</NavLink>,
                <NavLink className={cls.basket} key={2} to = '/basket'><img src={basketImg}/><div>Корзина</div></NavLink>,
                <NavLink className={cls.logout} key={3} to = '/logout'><img src={logoutImg}/><div>Выйти</div></NavLink>,
            ])
        }
        else{
            setLinkArray([
                <NavLink className={cls.registration} key={4} to = '/registration'><img src={regImg}/><div>Регистрация</div></NavLink>,
                <NavLink className={cls.auth} key={5} to = '/auth'><img src={entryImg}/><div>Вход</div></NavLink>,
            ])
        }
    },[auth])

    return(
        <div className={classes.join(' ')}>
            {linkArray}
        </div>
    )
}

export default ProfileBody
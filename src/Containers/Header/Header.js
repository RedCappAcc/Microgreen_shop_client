import cls from './Header.module.css'
import logo from './img/Персонаж.svg'
import logoProfile from './img/profile logo.svg'
import tringle from './img/triangle down.png'
import {useEffect,useState} from 'react'
import BurgerMenu from '../../components/BurgerMenu/BurgerMenu'
import {useSelector,useDispatch} from 'react-redux'
import {ChangeIsMobile,changeNotMobile} from '../../store/actions/header'
import MobileMenu from '../../components/MobileMenu/MobileMenu'
import {NavLink} from 'react-router-dom'
import ProfileBody from '../../components/ProfilrBody/ProfileBody'


function Header(){
    const dispatch = useDispatch()
    let isMobile  = useSelector(state=>state.headerReducer.isMobile)
    let auth = useSelector(state=>state.shopReducer.Auth)
    let userName = useSelector(state=>state.shopReducer.userName)
    let [profileName,setProfileName] = useState('Профиль')

    const menu = [
        <NavLink  to = '/' className={cls.menu__item} key ={1}>Главная</NavLink>,
        <NavLink  to = '/shop' className={cls.menu__item} key ={2}>Магазин</NavLink>,
        <NavLink  to = '/about' className={cls.menu__item} key ={3}>О нас</NavLink>,
        <NavLink  to = '/contacts' className={cls.menu__item} key ={4}>Контакты</NavLink>,
    ]

    function resize(){
            if (window.innerWidth<=1024){
                dispatch(ChangeIsMobile())
            }
            else{
                dispatch(changeNotMobile())
            }
        }
    
    let [profileVisable, setProfileVisable] = useState(false)

    useEffect(()=>{
        window.addEventListener('resize',resize)
        if(window.innerWidth<=1024){
            dispatch(ChangeIsMobile())
        }
        else{
            dispatch(changeNotMobile())
        }
        return ()=>{window.removeEventListener('resize',resize)}
    },[])

    useEffect(()=>{
        if(auth){
            setProfileName(userName)
        }
        else(
            setProfileName('Профиль')
        )
    },[auth,userName])
    return(
        <>
        <header>
            <div className={cls.logo}>
                <img src={logo}/>
                <span> Micro green</span>
            </div>
            
            <div className={cls.menu}>
            {!isMobile?menu
            :<BurgerMenu/>}
            </div>
            <div className={cls.profile} onClick = {()=>{setProfileVisable(!profileVisable)}}>
                <img src={logoProfile}/>
                <div className={cls.profile__item}>
                    <span>{profileName}</span>
                    <img src={tringle}/>
                </div>
                <ProfileBody profileVisable = {profileVisable}/>
            </div>
        </header>
        <MobileMenu/>
        </>
    )
}
export default Header
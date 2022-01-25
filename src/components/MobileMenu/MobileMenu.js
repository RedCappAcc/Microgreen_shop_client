import cls from './MobileMenu.module.css'
import {useSelector} from 'react-redux'
import {useState,useEffect} from 'react'
import {NavLink} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import { changeToggleMenu } from '../../store/actions/header'

function MobileMenu(){
    const dispatch = useDispatch()
    const toggleMenu = useSelector(state=>state.headerReducer.toggleMenu)
    let [classes,setClasses] = useState([cls.menu])
    const menu = [
        <NavLink onClick={()=>{dispatch(changeToggleMenu())}} key = {1} to = '/'>Главная</NavLink>,
        <NavLink onClick={()=>{dispatch(changeToggleMenu())}}  key = {2} to = '/shop'>Магазин</NavLink>,
        <NavLink onClick={()=>{dispatch(changeToggleMenu())}}  key = {3} to = '/about'>О нас</NavLink>,
        <NavLink onClick={()=>{dispatch(changeToggleMenu())}}  key = {4} to = '/contacts'>Контакты</NavLink>,
    ]
    useEffect(()=>{
        if(toggleMenu){
            setClasses([cls.menu,  cls.active])
        }
        else{
            setClasses([cls.menu])
        }
    },[toggleMenu])
    return(
        <div className={classes.join(' ')}> 
            {menu}
        </div>
    )
}

export default MobileMenu
import cls from './BurgerMenu.module.css'
import {useDispatch} from 'react-redux'
import {changeToggleMenu} from '../../store/actions/header'
import {useSelector} from 'react-redux'
import burgerMenuImg from './img/burger_menu.png'
import closeImg from './img/close.png'


function BurgerMenu(){
    let toggleMenu = useSelector(state=>state.headerReducer.toggleMenu)
    const dispatch  = useDispatch()
    function clickHadler(){
        dispatch(changeToggleMenu())
    }
    return(
        <div className={cls.open}>
            {!toggleMenu?
                <button className={cls.openMenu} onClick = {clickHadler}> 
                    <img src={burgerMenuImg} alt = 'burger menu open'/>
                </button> 
            :   <button className={cls.close} onClick = {clickHadler}>
                    <img src={closeImg} alt = 'burger menu close'/>
                </button>
            }
        </div>
    )
}

export default BurgerMenu
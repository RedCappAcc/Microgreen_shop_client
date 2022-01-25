import cls from './Sort.module.css'
import triangleImg from './img/triangle.svg'
import {useState} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import { changeSort } from '../../store/actions/shop'

function Sort(){
    const dispatch = useDispatch()
    const activeSort = useSelector(state=>state.shopReducer.activeSort)
    let [isOpen,setIsOpen] = useState(false)
    function clickHadler(text){
        dispatch(changeSort(text))
        setIsOpen(!isOpen)
    }
    return(
        <div className={cls.container}>
            <div className={cls.sort} onClick= {()=>{setIsOpen(!isOpen)}}>
                <span>Сортировать по: </span>
                <span>{activeSort}</span>
                <img src={triangleImg}/>
            </div>
            {isOpen?
            <div className={cls.menu}>
                <p onClick={()=>{clickHadler('популярности')}}>популярности</p>
                <p onClick={()=>{clickHadler('по цене')}}>по цене</p>
            </div>
            :null
            }
        </div>
    )
}

export default Sort
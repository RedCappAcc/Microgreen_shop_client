import cls from './Filter.module.css'
import {useSelector,useDispatch} from 'react-redux'
import { changeCategory } from '../../store/actions/shop'
import {useState} from 'react'
import Sort from '../Sort/Sort'

function Filter(){
    let [isOpen, setIsOpen] = useState(false)
    const dispatch = useDispatch()
    const activeCategory = useSelector(state=>state.shopReducer.activeCategory)
    const category = ["Все", "Микрозелень","Семена","Удобрение","Субстраты"]
    const renderCategory = category.map((el,index)=>{
        if(el===activeCategory){
            return(<button onClick={()=>{dispatch(changeCategory(el))}} className={cls.active} key = {index}><span>{el}</span></button>)
        }
        else{
            return(<button onClick={()=>{dispatch(changeCategory(el))}} className={cls.filter__item} key = {index}><span>{el}</span></button>)
        }
        
    })
    return(
        <div className={cls.filter__head}>
            <div className={cls.filter}>
                {renderCategory}
            </div>
            <Sort/>
        </div>
    )
}

export default Filter
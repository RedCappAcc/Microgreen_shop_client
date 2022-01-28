import cls from './Filter.module.css'
import {useSelector,useDispatch} from 'react-redux'
import { changeCategory } from '../../store/actions/shop'
import {useState} from 'react'
import Sort from '../Sort/Sort'
import triangleImg from './img/triangle.svg'

function Filter(){
    let [mobilecls,setMobilecls] = useState([cls.mobileCategory])
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

    function changeFilterCategory(){
        if(mobilecls.indexOf(cls.activeMobile)>-1){
            setMobilecls([cls.mobileCategory])
        }
        else{
            setMobilecls([cls.mobileCategory, cls.activeMobile])
        }
    }
    return(
        <div className={cls.filter__head}>
            <div className={cls.filter}>
                {renderCategory}
            </div>
            <div className={cls.mobileFilter} onClick = {changeFilterCategory}>
                <div className={cls.mobilefilterName}>Фильтр :</div>
                <div className={cls.mobileActiveCategory}>{activeCategory}</div>
                <img src={triangleImg}/>
                <div className={mobilecls.join(' ')}>
                    {renderCategory}
                </div>
            </div>
            <Sort/>
        </div>
    )
}

export default Filter
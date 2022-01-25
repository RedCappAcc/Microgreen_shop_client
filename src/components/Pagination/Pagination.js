import cls from './Pagination.module.css'
import nextImg from './img/Arrow_next.svg'
import prevImg from './img/Arrow_prev.svg'
import { changePage,nextPages,prevPages } from '../../store/actions/shop'
import {useSelector,useDispatch} from 'react-redux'

function Pagination({}){
    const pages = useSelector(state=>state.shopReducer.pages)
    const dispatch = useDispatch()
    const activePage = useSelector(state=>state.shopReducer.activePage)
    let numbers = []
    for (let i = 0;i<pages;i++){
        if(i+1===activePage){
            numbers.push(<button key = {i} className={cls.active} onClick ={()=>{dispatch(changePage(i+1))}} >{i+1}</button>)
        }
        else{
            numbers.push(<button key = {i} className={cls.btn} onClick ={()=>{dispatch(changePage(i+1))}}>{i+1}</button>)
        }
    }
    return(
        <div className={cls.pagination}>
            <div className={cls.container}>
                <button className={cls.arrow} onClick = {()=>{dispatch(prevPages())}}>
                    <img src={prevImg}/>
                    <span>Предыдущая</span>
                </button>
                <div className={cls.buttons}>
                    {numbers}
                </div>
                <button className={cls.arrow}onClick = {()=>{dispatch(nextPages())}}>
                    <span>Следующая</span>
                    <img src={nextImg}/>
                </button>
            </div>
        </div>
    )
}

export default Pagination
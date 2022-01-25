import cls from './EmptyBasket.module.css'
import emptyImg from './img/empty.png'
import { useNavigate } from 'react-router-dom'


function EmptyBasket(){
    const navigate = useNavigate();
    return(
        <div className={cls.empty}>
            <div className = {cls.empty_container}>
                <div className={cls.label}>Корзина пустая </div>
                <div className={cls.dis}>Вероятней всего, вы не заказывали ещё у нас на сайте. Для того, чтобы заказать , перейди на страницу магазина</div>
                <img src={emptyImg}/>
                <div className={cls.btn} onClick = {()=>{navigate('/shop')}}><button>Вернуться назад</button></div>
            </div>
        </div>
    )
}

export default EmptyBasket
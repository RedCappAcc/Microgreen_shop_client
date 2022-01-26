import cls from './Order.module.css'
import openImg from './img/open.png'
import timeImg from './img/time-left.png'
import {useState} from 'react'

function Order(props){

    let [orderProductsCls, setOrderProsuctsCls] = useState([cls.orderProducts])

    function onClickHadler(){
        if(orderProductsCls.indexOf(cls.active)>0){
            setOrderProsuctsCls([cls.orderProducts])
        }
        else{
            setOrderProsuctsCls([cls.orderProducts,cls.active])
        }
        
    }

    const products = props.products.map((el,index)=>{
        return (<div className={cls.product}  key = {index}>
                    <div className={cls.name}>{el.name}</div>
                    <div className={cls.count}>{el.count}шт</div>
                    <div>x</div>
                    <div className={cls.priceProduct}>{el.price}тг</div>
                    <div>=</div>
                    <div className={cls.value}>{el.value}тг</div>
                </div>)
    })


    return(
        <div className={cls.order_container} key = {props.index}>
            <div  className={cls.order} onClick={onClickHadler}>
                <div className={cls.orderBody}>
                    <span className={cls.date}>{props.date}</span>
                    <span className={cls.allOrderPrice}>Общая сумма заказов</span>
                    <span className={cls.price}>{props.allPrice} тг</span>
                    <img src={openImg}/>
                </div>
                <div className={cls.orderStatus}>
                    <div className={cls.status}>Статус :</div>
                    <div className={cls.statusName}>{props.status}</div>
                    <img src={timeImg} />
                </div>
            </div>
            <div className={orderProductsCls.join(' ')}>
                {products}
            </div>
        </div>
    )
}


export default Order
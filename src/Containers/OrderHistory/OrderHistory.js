import cls from './OrderHistory.module.css'
import {useEffect, useState} from 'react'
import axios from 'axios'
import Order from '../../components/Order/Order'


function OrderHistory(){
    const authId = localStorage.getItem('authId')
    let [order,setOrder] = useState([])

    useEffect(async()=>{
        const response = await axios.get(`https://microgreen-2507e-default-rtdb.europe-west1.firebasedatabase.app/history/${authId}.json`)
        const data = response.data
        const keys  = Object.keys(response.data)
        const orders = keys.map((el,index)=>{
            const date =  new Date(data[el].date).toLocaleDateString()
            let status = ''
            if ( data[el].status==='AWAIT_CONF'){
                status = 'Ожидает подтверждение'
            }
            const allPrice = data[el].value
            const products = data[el].order
            return(<Order key = {index} date = {date} status = {status} allPrice = {allPrice} products = {products}/>)
        })
        setOrder([...orders])
    },[])

    return(
        <div className={cls.orderhistory}>
            <div className={cls.orderhistory_container}>
                <div className={cls.label}>История заказов :</div>
                {order}
            </div>
        </div>
    )
}

export default OrderHistory
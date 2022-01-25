import cls from './Basket.module.css'
import basketImg from './img/basket 1.png'
import basket2Img from './img/basket 2.png'
import Basketcard from '../../components/Basketcard/Basketcard'
import {useEffect, useState} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import Load from '../../components/Load/Load'
import { loadingEnd, loadingStart } from '../../store/actions/shop'
import axios from 'axios'
import EmptyBasket from '../../components/EmptyBasket/EmptyBasket'
import { useNavigate } from 'react-router-dom'
import {useAlert} from 'react-alert'




function Basket (){
    const alert =useAlert()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    let [cards, setCards] = useState({})
    let localCards = {}
    let [allPrice, setAllPrice] = useState()
    const authId = localStorage.getItem('authId')
    const loading = useSelector(state=>state.shopReducer.Loading)

    async function fetchForApi(){
        let response = await axios.get(`https://microgreen-2507e-default-rtdb.europe-west1.firebasedatabase.app/basket/${authId}.json`)
        if(response.data!=null){
            let productKeys = Object.keys(response.data)
            productKeys.forEach(async (productID,index)=>{
                let product = await axios.get(`https://microgreen-2507e-default-rtdb.europe-west1.firebasedatabase.app/products/${productID}.json`)
                const id = productID
                const name = product.data['name']
                const price = product.data['price']
                const img = product.data['file']
                let count = Object.keys(response.data[productID]).length
                localCards[id] = {name:name,price:price,img:img,index:index,count:count,id:id}
                setCards({...localCards})
        })}
    }

    useEffect(async()=>{
        dispatch(loadingStart())
        if(!!authId){
            fetchForApi()
        }
        dispatch(loadingEnd())
    },[])

    useEffect(()=>{
        let allPrice = 0
        Object.keys(cards).forEach((el)=>{
            allPrice+=(+cards[el].price*cards[el].count)
        })
        setAllPrice(allPrice)
    },[cards])


    async function clearBtn(){
        try{
            await axios.delete(`https://microgreen-2507e-default-rtdb.europe-west1.firebasedatabase.app/basket/${authId}.json`)
            alert.show('Корзина очищена ')
            setCards({})
        }
        catch(e){
            console.log(e.response)
        }
    }

    async function plus(id){
        try{
            Object.keys(cards).forEach(async el=>{
                if(cards[el].id===id){
                    let newCard = {...cards}
                    newCard[id] = {name:cards[el].name,price:cards[el].price,img:cards[el].img,index:cards[el].index,count:cards[el].count+1,id:cards[el].id}
                    setCards(newCard)
                    await axios.post(`https://microgreen-2507e-default-rtdb.europe-west1.firebasedatabase.app/basket/${authId}/${id}.json`,1)
                }
            })
            }
        catch(e){
            console.log(e.response)
        }
    }
    
    async function deleteItem(id){
        let key = Object.keys(cards).filter(el=>cards[el]!=cards[id])
        let newCards = {}
        key.forEach(el=>{
            newCards[el] = {name:cards[el].name, price:cards[el].price,img:cards[el].img,index:cards[el].index,count:cards[el].count,id:cards[el].id }
        })
        setCards(newCards)
        await axios.delete(`https://microgreen-2507e-default-rtdb.europe-west1.firebasedatabase.app/basket/${authId}/${id}.json`) 
    }

    function minus(id){
        try{
            if(cards[id].count-1>0){
                Object.keys(cards).forEach(async el=>{
                    if(cards[el].id===id){
                        let newCard = {...cards}
                        newCard[id] = {name:cards[el].name,price:cards[el].price,img:cards[el].img,index:cards[el].index,count:cards[el].count-1,id:cards[el].id}
                        let response = await axios.get(`https://microgreen-2507e-default-rtdb.europe-west1.firebasedatabase.app/basket/${authId}/${id}.json`)
                        let deleteEl = Object.keys(response.data)[0]
                        setCards(newCard)
                        await axios.delete(`https://microgreen-2507e-default-rtdb.europe-west1.firebasedatabase.app/basket/${authId}/${id}/${deleteEl}.json`)
                    }
                })
            }
            else{
               deleteItem(id)
            }
        }
        catch(e){
            console.log(e.response)
        }
    }

   function deleteEl(id){
        try{
           deleteItem(id)
        }
        catch(e){
            console.log(e.response)
        }
    }
    
    if(Object.keys(cards).length>0){
        return(
            <>
            {loading?<Load/>
            :<div className={cls.basket}>
                <div className={cls.basket_container}>
                    <div className={cls.clear}>
                        <div className={cls.clear_img}><img src={basketImg}/><span>Корзина</span></div>
                        <div className={cls.clear_btn} onClick = {clearBtn}><img src={basket2Img}/><span>Очистить Корзину</span></div>
                    </div>
                    <div className={cls.line}/>
                    <div className={cls.content}>
                        {Object.keys(cards).map(el=>{
                           return <Basketcard delete = {deleteEl} plus = {plus} minus = {minus} id = {cards[el].id} key = {cards[el].index} name = {cards[el].name} price = {cards[el].price*cards[el].count} count = {cards[el].count} img = {cards[el].img} />
                        })}
                    </div>
                    <div className={cls.footer}>
                        <div className={cls.count}><span>Всего товаров :</span><span>{Object.keys(cards).length}</span></div>
                        <div className={cls.price}><span>Сумма заказа :</span><span>{allPrice} тг</span></div>
                    </div>
                    <div className={cls.btns}>
                        <div className={cls.back} onClick ={()=>{navigate('/shop')}}><button>Вернуться назад</button></div>
                        <div className={cls.buy} onAuxClick={()=>{navigate()}} ><button>Купить сейчас</button></div>
                    </div>
                </div>
            </div>
            }
            </>
            )
    }
    else{
        return(
            <EmptyBasket/>
        )
    }

}

export default Basket
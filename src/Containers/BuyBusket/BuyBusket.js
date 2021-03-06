import cls from './BuyBusket.module.css'
import {useState,useEffect} from 'react'
import axios from 'axios'
import {useAlert} from 'react-alert'
import Load from '../../components/Load/Load'
import {useDispatch} from 'react-redux'
import{loadingStart, loadingEnd} from '../../store/actions/shop'
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'


function BuyBasket(){
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const alert = useAlert()
    const authId = localStorage.getItem('authId')
    let loading = useSelector(state=>state.shopReducer.Loading)
    
    let [profile, setProfile] = useState({
        name:'',
        surname:'',
        email: '',
        phone:'',
        payType: '',
        adress:''

    })

    let [fullScreenAlert, setFullScreenAlert] = useState([cls.alert])
    let [productCards, setProductCards] = useState([])
    let [price,setPrice] = useState(0)
    let [order,setOrder] = useState([])

    useEffect(async()=>{
        dispatch(loadingStart())
        const responseUser = await axios.get(`https://microgreen-2507e-default-rtdb.europe-west1.firebasedatabase.app/users/${authId}.json`)
        const user = responseUser.data
        setProfile({
            ...profile,
            name: user.name,
            surname: user.surname,
            email: user.email,
            phone: user.phone,
        })
        const responseProduct = await axios.get(`https://microgreen-2507e-default-rtdb.europe-west1.firebasedatabase.app/basket/${authId}.json`)
        const products = Object.keys(responseProduct.data)
        let card = []
        products.forEach(async (el,index)=>{
            const product = await axios.get(`https://microgreen-2507e-default-rtdb.europe-west1.firebasedatabase.app/products/${el}.json`)
            let count =  Object.keys(responseProduct.data[el]).length
            card.push(
                <div  key={index} className = {cls.card}>
                     <p>{product.data.name}</p>
                     <p>-</p>
                     <p>{count}????</p>
                     <p>...{count*product.data.price}????</p>
                </div>
                )
            setOrder((prev)=>{
                return[...prev,{name:product.data.name,count:count,price:product.data.price,value:count*product.data.price}]
            })
            setProductCards([...card])
            setPrice((prev)=>prev+Number(product.data.price*count))
        })  
        dispatch(loadingEnd())
    },[])

    function changeHadler({value,type}){
        switch(type){
            case 'pay':
                setProfile({...profile,payType:value})
                break 
            case 'adress':
                setProfile({...profile,adress:value})
                break 
            default:
                setProfile({...profile})
                break  
        }
    }


   async function buy(){
        if(profile.adress!=''){
            setFullScreenAlert([cls.alert, cls.active])
            const historyObj = {date:new Date(),order:order,status:'AWAIT_CONF',adress:profile.adress,value:price}
            await axios.post(`https://microgreen-2507e-default-rtdb.europe-west1.firebasedatabase.app/history/${authId}.json`,historyObj)
            await axios.delete(`https://microgreen-2507e-default-rtdb.europe-west1.firebasedatabase.app/basket/${authId}.json`)
        }
        else{
            alert.show('?????????????????? ???????????????????? ?????? ????????')
        }
    }

    return(
        <>
        {loading?<Load/>
        :<div className={cls.buynow}>
        <div className={cls.buynow_container}>
        <div className={cls.btnBack} onClick={()=>{navigate(`/basket`)}}><button>?????????????????? ??????????</button></div>
            <div className={cls.up}>
                <div className={cls.customer}>
                    <div className={cls.label}>???????????? ???????????????????? :</div>
                    <div className={cls.profile}>
                        <div className={cls.name}><span>?????? : {profile.name}</span> </div>
                        <div className={cls.surname}><span>?????????????? : {profile.surname}</span> </div>
                        <div className={cls.email}><span>E-mail : {profile.email}</span> </div>
                        <div className={cls.phone}><span>?????????????? : {profile.phone}</span></div>
                        <div className={cls.pay}  onChange={(e)=>{changeHadler({type:'pay',value:e.target.value})}}>
                            <span>???????????? ???????????? :</span>
                            <select>
                                <option>?????????????????? ?????? ??????????????????</option>
                                <option>???????????? ?????? ??????????????????</option>
                            </select>
                        </div>
                        <div className={cls.adress}>
                            <span>?????????? ????????????????:</span>
                            <textarea value={profile.adress} onChange={(e)=>{changeHadler({type:'adress',value:e.target.value})}}/>
                        </div>
                    </div>
                </div>
                <div className={cls.product}>
                    <div className={cls.product}>
                        <div className={cls.label_product}>???????????? :</div>
                    </div>
                    <div>
                        {productCards}
                    </div>
                    <div className={cls.down}>
                        <div className={cls.price_all}>
                        <div>?????????? ?????????? ????????????</div>
                        <div className={cls.allprice}>{price} ????</div>
                    </div>
                    <div className={cls.btn} onClick={buy}>
                        <button>???????????????? ??????????</button>
                    </div>
                </div>
                </div>
            </div>
        </div>
        <div className={fullScreenAlert.join(' ')}>
            <div className={cls.alert_container}>
                <span>???????????????????? ?????? ???? ??????????!</span>
                <span>?? ?????????????? ???????? ?? ???????? ?????????????????? ?????? ?????????????????? ?????? ?????? ??????????????????????????.</span>
                <span>???????????????????? ?? ???????????? ?????????? ???????? ?????????????? ?????? ???? ??????????.</span>
                <span> ???????? ?? ?????? ???????? ?????????????? ???????????? ?????????????????? ?? ???????? ???? ????????????</span>
                <span>8(777)666-55-44</span>
                <div className={cls.btn} onClick={()=>{
                    setFullScreenAlert([cls.alert])
                    navigate('/shop')
                    }}><button>OK</button></div>
            </div>
        </div>
    </div>
    }
    </>
    )
}

export default BuyBasket
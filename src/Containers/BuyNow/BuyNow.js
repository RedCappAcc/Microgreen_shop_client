import cls from './BuyNow.module.css'
import {useParams} from 'react-router-dom'
import {useState,useEffect} from 'react'
import axios from 'axios'
import {useAlert} from 'react-alert'
import Load from '../../components/Load/Load'
import {useDispatch} from 'react-redux'
import{loadingStart, loadingEnd} from '../../store/actions/shop'
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'

function BuyNow(){
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const alert = useAlert()
    const authId = localStorage.getItem('authId')
    const params = useParams();
    let loading = useSelector(state=>state.shopReducer.Loading)
    


    let [profile, setProfile] = useState({
        name:'',
        surname:'',
        email:'',
        phone:'',
        payType: '',
        adress:''

    })
    let [product, setProduct] = useState({
        name:'',
        img: '',
        count: '',
        price: '',
        allPrice: ''
    })

    let [email,setEmail] = useState([cls.email])
    let [fullScreenAlert, setFullScreenAlert] = useState([cls.alert])

    useEffect(async()=>{
        if(!!authId){
            dispatch(loadingStart())
            const responseUser = await axios.get(`https://microgreen-2507e-default-rtdb.europe-west1.firebasedatabase.app/users/${authId}.json`)
            const user = responseUser.data
            
            setProfile({
                name: user.name,
                surname: user.surname,
                email: user.email,
                phone: user.phone,
                validEmail:true,
                payType:'наличными при получении',
                adress: ''
            })
        }
        const responseProduct = await axios.get(`https://microgreen-2507e-default-rtdb.europe-west1.firebasedatabase.app/products/${params.id}.json`)
        const product = responseProduct.data
        setProduct({
            name: product.name,
            img: product.file,
            count: 1,
            price: +product.price,
            allPrice:+ product.price
        })
        dispatch(loadingEnd())
    },[])

    function plus(){
        setProduct({
            ...product,count:product.count+1,allPrice:product.allPrice+product.price
        })
    }

    function minus(){
        if(product.count-1>0){
            setProduct({
                ...product,count:product.count-1, allPrice:product.allPrice-product.price
            })
        }
        else{
            alert.show('Вы не можете приобрести меньше одного товара')
        }
    }

    function changeHadler({value,type}){
        switch(type){
            case 'name':
                const name = value.replace(/[^а-яёa-z-A-Z-А-ЯЁ) ]+/g,'')
                setProfile({...profile,name:name})
                break            
            case 'surname':
                const surname = value.replace(/[^а-яёa-z-A-Z-А-ЯЁ) ]+/g,'')
                setProfile({...profile,surname:surname})
                break  
            case 'email':
                const regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                if(regEmail.test(value)){
                    setProfile({...profile,email:value,validEmail:true})
                    setEmail([cls.email])
                }
                else{
                    setProfile({...profile,email:value,validEmail:false})
                    setEmail([cls.email, cls.invalid])
                }
                break  
            case 'phone':
                const number = value.replace(/\D/g,'')
                setProfile({...profile,phone:number})
                break 
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


    function buy(){
        if(profile.name!=''&&profile.surname!=''&&profile.validEmail&&profile.phone.length===11&&profile.adress!=''){
            setFullScreenAlert([cls.alert, cls.active])
        }
        else{
            alert.show('Заполните пожалуйста все поля')
        }
    }

    return(
        <>
        {loading?<Load/>:
        <div className={cls.buynow}>
            <div className={cls.buynow_container}>
            <div className={cls.btnBack} onClick={()=>{navigate(`/shop/${params.id}`)}}><button>Вернуться назад</button></div>
                <div className={cls.up}>
                    <div className={cls.customer}>
                        <div className={cls.label}>Данные покупателя :</div>
                        <div className={cls.profile}>
                            <div className={cls.name}><span>Имя :</span> <input value={profile.name} type="text" onChange={(e)=>{changeHadler({type:'name',value:e.target.value})}}/></div>
                            <div className={cls.surname}><span>Фамилия :</span> <input value={profile.surname} type="text" onChange={(e)=>{changeHadler({type:'surname',value:e.target.value})}}/></div>
                            <div className={email.join(' ')}><span>E-mail :</span> <input value={profile.email} type="text" onChange={(e)=>{changeHadler({type:'email',value:e.target.value})}}/></div>
                            <div className={cls.phone}><span>Телефон :</span> <input value={profile.phone} maxLength={11} type="text" onChange={(e)=>{changeHadler({type:'phone',value:e.target.value})}}/></div>
                            <div className={cls.pay}  onChange={(e)=>{changeHadler({type:'pay',value:e.target.value})}}>
                                <span>Способ оплаты :</span>
                                <select>
                                    <option>наличными при получении</option>
                                    <option>картой при получении</option>
                                </select>
                            </div>
                            <div className={cls.adress}>
                                <span>Адрес доставки:</span>
                                <textarea value={profile.adress} onChange={(e)=>{changeHadler({type:'adress',value:e.target.value})}}/>
                            </div>
                        </div>
                    </div>
                    <div className={cls.product}>
                        <div className={cls.label_product}>Товар :</div>
                        <div className={cls.name}>
                            <img src = {product.img}/>
                            <span>{product.name}</span>
                        </div>
                        <div className={cls.count}>
                            <div className={cls.count_label}>Количество</div>
                            <button onClick={minus}>-</button>
                            <div className={cls.count_body}>{product.count}</div>
                            <button onClick={plus}>+</button>
                        </div>
                        <div className={cls.price}>Цена за штуку: {product.price} тг</div>
                        <div className={cls.down}>
                            <div className={cls.price_all}>
                            <div>Общая сумма заказа</div>
                            <div>{product.allPrice} тг</div>
                        </div>
                        <div className={cls.btn} onClick={buy}>
                            <button>Оформить заказ</button>
                        </div>
                    </div>
                    </div>
                </div>
                <div className={cls.down}></div>
            </div>
            <div className={fullScreenAlert.join(' ')}>
                <div className={cls.alert_container}>
                    <span>Благодарим вас за заказ!</span>
                    <span>В течении часа с вами свяжеться наш сотрудник для его подтверждения.</span>
                    <span>Информация о заказе также была выслана вам на почту {profile.email}.</span>
                    <span> Если у вас есть вопросы можете связаться с нами по номеру</span>
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

export default BuyNow
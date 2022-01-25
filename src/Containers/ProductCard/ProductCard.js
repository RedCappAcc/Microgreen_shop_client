import {useParams} from 'react-router-dom'
import {useEffect,useState} from 'react'
import {useDispatch} from 'react-redux'
import { loadingEnd, loadingStart } from '../../store/actions/shop'
import axios from 'axios'
import Load from '../../components/Load/Load'
import cls from './ProductCard.module.css'
import { useNavigate } from 'react-router-dom'
import {useSelector} from 'react-redux'
import { useAlert } from 'react-alert'


function ProductCard(){
    const alert = useAlert()
    const authId = localStorage.getItem('authId')
    let loading = useSelector(state=>state.shopReducer.Loading)
    let dispatch = useDispatch()
    let params = useParams();
    let [data,setData] = useState({})
    const navigate = useNavigate();
    useEffect(async()=>{
        dispatch(loadingStart())
        let response = await axios.get(`https://microgreen-2507e-default-rtdb.europe-west1.firebasedatabase.app/products/${params.id}.json`)
        const views = response.data['views']
        await axios.patch(`https://microgreen-2507e-default-rtdb.europe-west1.firebasedatabase.app/products/${params.id}.json`,{views:views+1})
        setData(response.data)
        dispatch(loadingEnd())
    },[])

    async function addBusket(){
        if(!!authId){
            try{
                let response = await axios.post(`https://microgreen-2507e-default-rtdb.europe-west1.firebasedatabase.app/basket/${authId}/${params.id}.json`,1)
                if(response.status===200){
                    alert.show(`Товар "${data.name}" добавлен в корзину`)
                }
            }
            catch(e){
                alert(`Ошибка ${e.response.status}`)
            }
        }
        else{
            alert.show(`Для добавления товаров в корзину пожалуйста авторизуйтесь`)
        }
    }

    return(
        <div className={cls.container}>
            {loading?<Load/>:
            <div className={cls.productCard}>
                <div className={cls.back}>
                    <button onClick={(()=>{navigate('/shop')})}>Вернуться назад</button>
                </div>
                <div className={cls.content}>
                    <img src={data.file}/>
                    <div className={cls.product}>
                        <div className={cls.name}>{data.name}</div>
                        <div className={cls.price}>Цена: {data.price} тг</div>
                        <div className={cls.dis}> 
                            <div className={cls.disName}>Описание:</div>
                            <div className={cls.discription}>{data.dis}</div>
                        </div>
                        <div className={cls.btns}>
                            <button onClick={()=>{navigate(`/buynow/${params.id}`)}}>Купить сейчас</button>
                            <button onClick={addBusket}>Добавить</button>
                        </div>
                    </div>
                </div>
            </div>
            }
        </div>
    )
}

export default ProductCard
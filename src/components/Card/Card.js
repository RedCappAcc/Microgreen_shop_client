import cls from './Card.module.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { useAlert } from 'react-alert'

function Card ({imageSrc,name,price,id}){
    const alert = useAlert()
    const authId = localStorage.getItem('authId')
    const navigate = useNavigate();
    function redirectHadler(){
        navigate(`/shop/${id}`)
    }
   async function addBasket(){
       if(authId){
            try{    
                let response = await axios.post(`https://microgreen-2507e-default-rtdb.europe-west1.firebasedatabase.app/basket/${authId}/${id}.json`,1)
                if(response.status===200){
                    alert.show(`Товар "${name}" добавлен в корзину`)
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
        <div className={cls.card}>
            <div className={cls.image}  onClick={redirectHadler}>
                <img src={imageSrc}/>
            </div>
            <div className={cls.product__name}  onClick={redirectHadler}><span>{name}</span></div>
            <div className={cls.card__footer}>
                <div className={cls.price}>{price+' тг.'}</div>
                <div className={cls.btn} onClick={addBasket}>
                    <span>добавить</span>
                </div>
            </div>
        </div>
    )
}

export default Card
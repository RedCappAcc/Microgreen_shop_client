import cls from './Products.module.css'
import Card from '../../components/Card/Card'
import { useEffect,useState} from 'react'
import axios from 'axios'
import { initPage, loadingEnd, loadingStart } from '../../store/actions/shop'
import {useDispatch,useSelector} from 'react-redux'
import Load from '../Load/Load'


function getAmount(){
    const len = window.innerWidth
    if(len<1140&&len>854){
        return 9
    }
    else{
        return 8
    }
}

function pagesArr (cardArr,pageCount,limit){
    let cards = {}
    let count = 0
    const arr = Object.keys(cardArr)
    while (count<pageCount){
        let card = []
        for(let i = arr.length-1;i>=0;i--){
            if(card.length<limit){
                card.push(arr[i])
            }
        }
        cards[count] = card
        count++
        for(let i = 0;i<card.length-1;i++){
            arr.pop()
        }
    }
    return cards  
}

function sortObject(cardArr,activeSort){
    let result = []
    let res = {}
    if (activeSort==='популярности'){
        const keys = Object.keys(cardArr)
        keys.forEach(el=>{
            let tmp = {}
            tmp['id'] = el
            tmp['views'] = +cardArr[el]['views']
            result.push(tmp)
        })
        result.sort((a, b) => a.views > b.views ? 1 : -1);
    }
    if(activeSort==='по цене'){
        const keys = Object.keys(cardArr)
        keys.forEach(el=>{
            let tmp = {}
            tmp['id'] = el
            tmp['price'] = +cardArr[el]['price']
            result.push(tmp)
        })
        result.sort((a, b) => a.price > b.price ? 1 : -1);
    }
    for (let i of result){
        res[i['id']] = {...cardArr[i['id']]}
    }
    return res
}


function filterCategory(cardArr,activeCategory){
    let result = {}
    let keys = Object.keys(cardArr)
    keys.forEach(el=>{
        if(cardArr[el].category===activeCategory){
            result[el] = cardArr[el]
        }
        
    })
    return result
}


function Products(){
    let activeCategory = useSelector(state=>state.shopReducer.activeCategory)
    let activeSort = useSelector(state=>state.shopReducer.activeSort)
    let activePage = useSelector(state=>state.shopReducer.activePage)
    let loading = useSelector(state=>state.shopReducer.Loading)
    const dispatch = useDispatch()
    let [cards,setCards] = useState()
    useEffect(async()=>{
        dispatch(loadingStart())
        let response = await axios.get('https://microgreen-2507e-default-rtdb.europe-west1.firebasedatabase.app/products.json')
        const cardArr = response.data
        let cardLength = Object.keys(cardArr).length
        if(activeCategory==='Все'){
            let sortCardArr = sortObject(cardArr,activeSort)
            const amount = getAmount()
            const pages = pagesArr(sortCardArr,Math.ceil(cardLength/8),amount)
            let cardsForRender = pages[activePage-1].map((el,index)=>{
                return(<Card id = {el} key = {index} price = {sortCardArr[el].price} imageSrc={sortCardArr[el].file} name = {sortCardArr[el].name}/>)
            })
            setCards(cardsForRender)
            dispatch(initPage(Math.ceil(cardLength/8)))
        }
        else{
            const tmp =  sortObject(filterCategory(cardArr,activeCategory),activeSort)
            let cardLength = Object.keys(tmp).length
            const amount = getAmount()
            const pages = pagesArr(tmp,Math.ceil(cardLength/8),amount)
            let cardsForRender = pages[activePage-1].map((el,index)=>{
                return(<Card id = {el} key = {index} price = {cardArr[el].price} imageSrc={cardArr[el].file} name = {cardArr[el].name}/>)
            })
            setCards(cardsForRender)
            let len = Object.keys(tmp).length
            dispatch(initPage(Math.ceil(len/8)))
        }
        dispatch(loadingEnd())
    },[activePage,activeCategory,activeSort])
    return(
        <div className={cls.products}>
            {loading?<Load/>:cards}
        </div>
    )
}   

export default Products
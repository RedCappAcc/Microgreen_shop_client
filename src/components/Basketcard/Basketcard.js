import axios from 'axios'
import cls from './Basketcard.module.css'
import closeImg from './img/delete btn.png'
import minusImg from './img/minus.png'
import plusImg from './img/plus.png'
import {useState} from 'react'

function Basketcard(props){
    return(
        <div className={cls.card}>
            <div className={cls.label}>
                <img src = {props.img}/>
                <span>{props.name}</span>
            </div>
            <div className={cls.count}>
                <button className={cls.plus} onClick = {()=>{props.plus(props.id)}}><img src={plusImg}/></button>
                <span>{props.count}</span>
                <button className={cls.minus} onClick = {()=>{props.minus(props.id)}}><img src={ minusImg }/></button>
            </div>
            <div className={cls.price}>{props.price}тг</div>
            <button className={cls.close} onClick = {()=>{props.delete(props.id)}}><img src={closeImg} /></button>
        </div>
    )
}

export default Basketcard
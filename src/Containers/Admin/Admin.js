import axios from 'axios'
import {useState} from 'react'
import cls from './Admin.module.css'

function Admin(){
    let [data,setData] = useState({
        name:'',
        dis:'',
        price:'',
        category:'Микрозелень',
        file:'',
        views:0
    })
    async function clickHadler(e){
        e.preventDefault()
        const formData = new FormData()
        formData.append('file',data.file)
        formData.append('upload_preset','zbutjyyf')
        let responseImg = await axios.post('https://api.cloudinary.com/v1_1/dirpft9up/image/upload',formData)
        const imageUrl = responseImg.data.secure_url
        const responseDataBase = await axios.post('https://microgreen-2507e-default-rtdb.europe-west1.firebasedatabase.app/products.json',{...data,file:imageUrl})
        console.log(responseDataBase)
    }
    return(
        <div className={cls.admin}>
            <div className={cls.container}>
                <div className={cls.head}>Добавить товар</div>
                <form className={cls.form}> 
                    <div className={cls.inp}>
                        <label >Название товара</label>
                        <input onChange={(e)=>{
                            setData({...data,name: e.target.value})
                            }}
                            type='text' />   
                    </div>
                    <div className={cls.inp}>
                        <label>Описание</label>
                        <textarea onChange={(e)=>{
                            setData({...data, dis: e.target.value})
                            }}
                        type='text' />
                    </div>
                    <div className={cls.inp}>
                        <label>Цена</label>
                        <input onChange={(e)=>{
                            setData({...data,price: e.target.value})
                            }}
                        type='text' />
                    </div>
                    <div className={cls.inp}>
                        <label>Категория</label>
                        <select onChange={(e)=>{
                            setData({...data,category: e.target.value})
                            }}>
                            <option>Микрозелень</option>
                            <option>Семена</option>
                            <option>Удобрение</option>
                            <option>Субстраты</option>
                        </select>
                    </div>
                    <div className={cls.inp}>
                        <label>Фото товара</label>
                        <input  onChange={(e)=>{
                            setData({...data,file: e.target.files[0]})
                            }}
                        type='file' />
                    </div>
                    <button className={cls.btn} onClick={clickHadler} type="submit">Добавить</button>
                </form>
            </div>
        </div>
    )
}

export default Admin
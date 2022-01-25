import cls from './Main.module.css'
import img from './img/контент справа.svg'

function Main(){
    return(
        <div className={cls.container}>
            <div className={cls.content}>
                <div className={cls.left}>
                    <div className={cls.label}>
                        Микрозелень
                        <br/> с доставкой на дом
                     </div>
                    <div className={cls.text}>Мы вращиваем для вас зелень без химии и ГМО Наша микрозелень сразу готова к употреблению и прекрасно подходит для ваших блюд.</div>
                    <button className={cls.btn}>Заказать</button>
                </div>
                <div className={cls.right}>
                    <img src={img}/>
                </div>
            </div>
        </div>
    )
}

export default Main
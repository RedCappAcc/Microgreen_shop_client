import cls from './Footer.module.css'
import insta from './img/insta.svg'
import vk from './img/vk.png'
import fb from './img/fb.png'

function Footer(){
    return(
        <div className={cls.footer}>
            <div className={cls.container}>
                <div className={cls.left}>
                    <div className={cls.contacts}>Наши контакты</div>
                    <div>+7 727 333 22 11</div>
                    <div>+7 777 555 44 33</div>
                    <div>info@microgreen.kz</div>
                </div>
                <div className={cls.right}>
                    <div className={cls.right__item}>
                        <img src={insta}/>
                        <div>Instagram</div>
                    </div>
                    <div className={cls.right__item}>
                        <img src={vk}/>
                        <div>ВКонтакте</div>
                    </div>
                    <div className={cls.right__item}>
                        <img src={fb}/>
                        <div>Facebook</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer
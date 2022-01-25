import cls from './Contacts.module.css'
import mapImg from './img/map.svg'
import instaImg from './img/insta.svg'
import fbImg from './img/fb.svg'
import mailImg from './img/mail.svg'
import vkImg from './img/vk.svg'
import phoneImg from './img/phone .svg'


function Contacts (){
    return(
        <div className={cls.contacts}>
            <div className={cls.container}>
                <div className={cls.left}>
                    <div className={cls.our_contacts}>
                        Наши контакты
                    </div>
                    <div className={cls.numbers}>
                        <img src={phoneImg}/>
                        <div>
                            <div>+7 727 333 22 11</div>
                            <div>+7 777 555 44 33</div>
                        </div>
                    </div>
                    <div className={cls.email}>
                        <img src={mailImg}/>
                        <div>info@microgreen.kz</div>
                    </div>
                    <div className={cls.social}>
                        <div className={cls.social__item}>
                            <img src={instaImg}/>
                            <div>Instagram</div>
                        </div>
                        <div className={cls.social__item}>
                            <img src={vkImg}/>
                            <div>ВКонтакте</div>
                        </div>
                        <div className={cls.social__item}>
                            <img src={fbImg}/>
                            <div>Facebook</div>
                        </div>
                    </div>
                </div>
                <div className={cls.right}>
                    <img src={mapImg} />
                </div>
            </div>
        </div>
    )
}

export default Contacts
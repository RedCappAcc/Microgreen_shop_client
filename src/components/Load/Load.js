import cls from './Load.module.css'

function Load(){
    return(
        <div className={cls.container}>
            <div className={cls.lds_ripple}>
                <div></div>
                <div></div>
            </div>
        </div>
    )
}

export default Load
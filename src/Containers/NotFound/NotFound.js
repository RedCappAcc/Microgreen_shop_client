import cls from './NotFound.module.css'


function NotFound(){
    return(
        <div className={cls.notfound}>
            <div className={cls.notfound_body}>
                <div className={cls.label}>404</div>
                <div className={cls.dis}>Page not found</div>
            </div>
        </div>
    )
}


export default NotFound
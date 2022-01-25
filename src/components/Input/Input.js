import classes from './Input.module.css'

function Input (props){
    let cls = [classes.customInput]
    const inputType = props.type||'text'
    const maxLength = props.maxLength||null
    const htmlFor = `${inputType}-${Math.random()}`
    let errorMessage = ''
    if (!props.valid&&props.touched){
        errorMessage = props.errorMessage
        cls.push(classes.error)
    }
    else{
        cls = cls.filter((el)=>{
            return el!==classes.error
        })
    }
    
    return(
        <div className={cls.join(' ')}>
            <label htmlFor={htmlFor}>{props.label}</label>
            <input 
            id = {htmlFor}
            type={inputType} 
            value={props.value} 
            onChange={(e)=>{props.onChange({e:e,label:props.label})}}
            maxLength = {maxLength}
            ></input>
            <span>{errorMessage}</span>
        </div>
    )
}

export default Input
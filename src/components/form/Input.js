import styles from "./Input.module.css"

function Input({type, text, name, placeholder, handlerOnChange, value}){
    return(
        <div className = {styles.form_controler}>
            <label htmlFor={name}>{text}</label>
            <input type={type} id={name} onChange={handlerOnChange} value={value} name={name} placeholder={placeholder}></input>
        </div>
    )
}

export default Input
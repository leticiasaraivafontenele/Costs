import style from "./Container.module.css"

function Container({children, customClass}){
    return(
        <div className={`${style.container} ${style[customClass]}`}>
        {children}
        </div>
    )
}
export default Container
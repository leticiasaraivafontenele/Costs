import style from './ProjectCard.module.css'
import {BsPencil, BsFillTrashFill} from 'react-icons/bs'
import {Link} from 'react-router-dom'

function ProjectCard({id, name, budget, category, handleRemove}){
    return(
        <div className={style.project_card}>
            <h4>{name}</h4>
            <p>
                <span>Orçamento:</span> R${budget}
            </p>
            <p className={style.category_text}>
                <span className={style[category.toLowerCase()]}></span>{category}
            </p>
            <div className={style.project_card_actions}>
                <Link to='/'>
                    <BsPencil/> Editar
                </Link>
                <button>
                    <BsFillTrashFill/> Excluir
                </button>
            </div>
        </div>
    )
}
export default ProjectCard
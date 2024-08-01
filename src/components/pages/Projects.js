import Message from "../layout/Message"
import { useLocation} from "react-router-dom"
import { useState, useEffect } from "react"
import style from "./Projects.module.css"
import Container from "../layout/Container"
import LinkButton from "../layout/LinkButton"
import ProjectCard from "../projects/ProjectCard"

function Projects(){

    const [projects, setProjects] = useState([])

    const location = useLocation()
    let message = ""
    if(location.state){
        message = location.state.message
    }

    useEffect(()=>{
        fetch("http://localhost:5000/projects",{
            method: 'GET',
            headers: {
                'Content-Type':'application/json'
            },
        })
        .then(resp => resp.json())
        .then(data =>{
            setProjects(data)
        })
        .catch(err => console.log(err))
    }, [])

    return(
        <div className={style.project_container}>
            <div className={style.title_container}>
                <h1>Meus Projetos</h1>
                <LinkButton to='/newproject' text="Criar Projeto" />
            </div>
            {message && <Message msg={message} type="success"></Message>}
            <Container customClass="start">
                {projects.length > 0 &&
                    projects.map((project)=>(
                        <ProjectCard 
                        name={project.name} 
                        id={project.id} 
                        budget={project.budget} 
                        category={project.category.name}
                        key={project.id}
                        />
                    ))}
            </Container>
        </div>
    )
}
export default Projects
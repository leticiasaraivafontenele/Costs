import { useLocation} from "react-router-dom"
import { useState, useEffect } from "react"

import style from "./Projects.module.css"

import Container from "../layout/Container"
import LinkButton from "../layout/LinkButton"
import ProjectCard from "../projects/ProjectCard"
import Loading from "../layout/Loading"
import Message from "../layout/Message"

function Projects(){

    const [projects, setProjects] = useState([])
    const [removeLoading, setRemoveLoading] =useState(false)
    const [projectMessage, setProjectMessage] =useState("")

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
            setRemoveLoading(true)
        })
        .catch(err => console.log(err))
    }, [])

    function removeProject(id){
        fetch(`http://localhost:5000/projects/${id}`,{
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(resp => resp.json())
        .then(() =>{
            setProjects(projects.filter((project)=>project.id !== id))
            setProjectMessage("Projeto removido com suscesso! ")
        })
        .catch(err => console.log(err))
    }

    return(
        <div className={style.project_container}>
            <div className={style.title_container}>
                <h1>Meus Projetos</h1>
                <LinkButton to='/newproject' text="Criar Projeto" />
            </div>
            {message && <Message msg={message} type="success"></Message>}
            {projectMessage && <Message msg={projectMessage} type="success"></Message>}

            <Container customClass="start">
                {projects.length > 0 &&
                    projects.map((project)=>(
                        <ProjectCard 
                        name={project.name} 
                        id={project.id} 
                        budget={project.budget} 
                        category={project.category.name}
                        key={project.id}
                        handleRemove={removeProject}
                        />
                    ))}
                    {!removeLoading && <Loading/>}
                    {removeLoading && projects.length === 0 &&(
                        <p>Não há projetos cadastrados!</p>
                    )}
            </Container>
        </div>
    )
}
export default Projects
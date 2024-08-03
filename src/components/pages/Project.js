import style from "./Project.module.css"

import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import {parse, v4 as uuidv4} from 'uuid'

import Loading from "../layout/Loading"
import Container from "../layout/Container"
import ProjectForm from "../projects/ProjectForm"
import Message from "../layout/Message"
import ServiceForm from "../service/ServiceForm"
import ServiceCard from "../service/ServiceCard"

function Project(){

    const { id } = useParams()
    const [project, setProject] = useState([])
    const [services, setServices] = useState([])

    const [showProjectForm, setShowProjectForm] = useState(false)
    const [showServiceForm, setShowServiceForm] = useState(false)
    const [message, setMessage] = useState("")
    const [type, setType] = useState()


    useEffect(()=>{
        fetch(`http://localhost:5000/projects/${id}`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(resp => resp.json())
        .then((data)=>{
            setProject(data)
            setServices(data.services)
        })
        .catch(err => console.log(err))
    }, [id])

    function editPost(project){
        setMessage("")
        //budget validation
        if(project.budgte < project.cost){
            setMessage("O orçmento não pode ser menor que o custo de projeto!")
            setType("error")
            return false
        }
        fetch(`http://localhost:5000/projects/${project.id}`,{
            method: 'PATCH',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project)
        })
        .then(resp => resp.json())
        .then((data)=>{
            setProject(data)
            setShowProjectForm(false)
            setMessage("Projeto atualizado!")
            setType("success")
        })
        .catch(err => console.log(err))
    }

    function createService(project){
        setMessage("")
        const lastService = project.services[project.services.length -1]
        lastService.id = uuidv4()

        const lastServiceCost = lastService.cost
        const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost)

        //maximun value validation
        if(newCost > parseFloat(project.budget)){
            setMessage("Orçamento ultrapassado, verifique o valor do serviço")
            setType("error")
            project.services.pop()
            return false
        }
        project.cost = newCost

        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(project)
        })
        .then(resp => resp.json())
        .then((data)=>{
            setShowServiceForm(false)
        })
        .catch(err => console.log(err))
    }
    function removeService(){

    }

    function toggleProjectForm(){
        setShowProjectForm(!showProjectForm)
    }
    function toggleServiceForm(){
        setShowServiceForm(!showServiceForm)
    }

    return(<>
        {project.name? (
            <div className={style.project_details}>
                <Container customClass="column">
                    {message && <Message type={type} msg={message}/> }
                    <div className={style.details_container}>
                        <h1>Projeto: {project.name}</h1>
                        <button className={style.btn} onClick={toggleProjectForm}>{!showProjectForm?"Editar Projeto":"Fechar"}</button>
                        {!showProjectForm?
                        <div className={style.project_info}>
                            <p>
                                <span>Categoria: </span>{project.category.name}
                            </p>
                            <p>
                                <span>Total de Orçamento: </span>R${project.budget}
                            </p>
                            <p>
                                <span>Total de Utilizado: </span>R${project.cost}
                            </p>
                        </div>
                        :<div className={style.project_info}>
                            <ProjectForm handleSubmit={editPost} btnText="Concluir Edição" projectData={project}/> 
                        </div>}
                    </div>
                    <div className={style.service_form_container}>
                        <h2>Adicione um serviço:</h2>
                        <button className={style.btn} onClick={toggleServiceForm}>
                            {!showServiceForm?"Adicioner serviço":"Fechar"}
                        </button>
                        <div className={style.project_info}>
                            {showServiceForm && 
                                <ServiceForm handleSubmit={createService} textBtn="Adicionar serviço" projectData={project}/>
                            }
                        </div>
                    </div>
                    <h2>Serviço</h2>
                    <Container customClass="start">
                            {services.length > 0 && services.map((service)=>(
                                <ServiceCard service={service} handleRemove={removeService} />
                            ))}
                            {services.length === 0 && <p>Não há serviços cadastrados</p>}
                    </Container>
                </Container>
            </div>

        ): <Loading/>
        }
        </>
    )
}
export default Project
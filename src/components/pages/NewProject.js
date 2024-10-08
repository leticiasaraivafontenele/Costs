import {useNavigate} from 'react-router-dom'
import ProjectForm from '../projects/ProjectForm'
import styles from './NewProject.module.css'

function NewProject(){

    const navigate = useNavigate()

    function creatPost(project){
        //initialize costs and service
        project.cost =0
        project.services =[]

        fetch("http://localhost:5000/projects", {
            method: "POST",
            headers:{
                'Content-type': 'application/json'
            },
            body: JSON.stringify(project)
        })
        .then((resp) => resp.json)
        .then((data)=>{
            console.log(data)
            //redirect
            // navigate('/projects', {message: "Projeto criado com sucesso!"})
            const state ={message: "Projeto criado com sucesso!"};
            navigate("/projects", {state})
        }).catch(err => console.log(err))
    }

    return(
        <div className = {styles.newproject_container}>
            <h1>Criar Projeto</h1>
            <p>Crie seu projeto para depois adicionar sos serviços</p>
            <ProjectForm handleSubmit={creatPost} btnText="Criar Projeto"/>
        </div>
    )
}
export default NewProject
import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
//  CSS 
import {Card, Grid} from '@material-ui/core';
import './ProjectCard.css'

// import img
import editBtn from '../../Assets/edit.png'
import icone from '../../Assets/icone project.svg'
import deleteBtn from '../../Assets/delete.png'

// import Action project
import { deleteProject, getProject, toggleTrue } from '../../JS/actions/actionProject'


const ProjectCard = ({ project }) => {

    const dispatch = useDispatch()

    return (
       
        <div>
             
             <Card className="project-card">
                 <span className="project-card-content">
                 <img src={icone} alt="icone" className="icone-project" />
            <h3>{project.title}</h3>
            <span>{project.description}</span>
            <div className="delete-edit-btns">
            <img src={deleteBtn}
                    alt="delete-icon"
                    onClick={() => dispatch(deleteProject(project._id))}
                />
                
                <Link to="/edit_project">
                   <img  src={editBtn}
                        alt="edit-icon"
                        onClick={() => { dispatch(toggleTrue()); dispatch(getProject(project._id)) }}
                    />
                </Link>
            </div> 
                 </span>
          
            </Card>
          
        </div>
    )
}

export default ProjectCard
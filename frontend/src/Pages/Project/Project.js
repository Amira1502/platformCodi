// import package
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
 
// import component
import { getProjects } from '../../JS/actions/actionProject'
import ProjectCard from '../../Components/ProjectCard/ProjectCard'
// import CSS
import './Project.css'
import {Spinner} from "react-bootstrap"



const Project = () => {

    const projects = useSelector(state => state.projectReducer.projects)
    const loadProjects = useSelector(state => state.projectReducer.loadProjects)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getProjects())
    }, [dispatch]);

    return (
    
         loadProjects ?   <Spinner animation="border" variant="info" />
            : 
            <div className="projects-content">
                <div className="projects-list">
                <h2>Our Available Projects</h2>
                    {projects.map(project =>
                        <ProjectCard project={project} key={project._id} />
                    )}
                </div>
            </div>
     
        
    )
}

export default Project
// import package 
import React, {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {editProject, addProject} from "../../JS/actions/actionProject"

// import css
import {Form, Button} from "react-bootstrap"
import Card from '@material-ui/core/Card';

import './AddEditProject.css'

//import img
import editBtn from '../../Assets/edit.png'
import addBtn from '../../Assets/add.png'


const AddEditProject= ({history}) => {

   // from store
   const oneproject =useSelector(state => state.projectReducer.oneProject);
   const isEdit=useSelector(state => state.projectReducer.isEdit);

  // state
    const [oneProject, setoneProject] = useState({ title: "", description: "" })

    // dispatch
    const dispatch = useDispatch()
    console.log(editProject)

    // useEffect
    useEffect(() => {
isEdit?
 setoneProject(oneproject) : 
setoneProject({title:"", description:""})},[isEdit, oneproject]);

 // handleEdit function
 const handleEdit = () => {
  dispatch(editProject(oneProject._id, oneProject))
}

// handleAdd function
const handleAdd = () => {
  dispatch(addProject(oneProject))
}
console.log(addProject())

// handleProject
    const handleChange = (e) => {
      setoneProject({...oneProject, [e.target.title]: e.target.value }) 
    }
    return (
        <div>
           <h2>{isEdit ? "Edit Project":"Add Project"}</h2>
           <Card className="card-add-edit">
           <Form className="form">

    <Form.Label>Title</Form.Label>
    <Form.Control className="form-control-title"
     value={oneProject.title} 
     name="title" 
     placeholder="Enter title" 
     onChange={(e) => setoneProject({ ...oneProject, title: e.target.value })}/>
   

    <Form.Label>Description</Form.Label>
    <Form.Control  className="form-control-description"
     name="description" 
     placeholder="Enter description" 
     value={oneProject.description} 
     onChange={(e) => setoneProject({ ...oneProject, description: e.target.value })}/>
  
    {/* add or edit button*/}
    {isEdit ?
                <img src={editBtn} alt="edit" className="edit-btn"
                    onClick={() => { handleEdit(); history.push('/') }}
                />

                :

                <img src={addBtn} alt="add" className="add-btn"
                    onClick={() => { handleAdd(); history.push("/") }}
                />
            }
</Form>
           </Card>

      
        </div>
    
    )
}

export default AddEditProject
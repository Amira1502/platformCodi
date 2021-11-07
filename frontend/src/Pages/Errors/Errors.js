import React from 'react'
import img from '../../Assets/error.jpg'
// css
import './Errors.css'
import {Button} from "@material-ui/core"

export const Errors = ({ history }) => {
    return (
      <div>
        <img src={img}  className="imgErr" alt="error" />
        <br />
        <Button variant="outlined" color="secondary"  className="btnErr"  onClick={() => history.goBack()}>
        Go Back
        </Button>
      </div>
    )}
export default Errors;
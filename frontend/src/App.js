import { Route, Switch } from "react-router-dom";
import React from 'react';



// import componenets
import Navbar from './Components/Navbar/Navbar'
import Footer from "./Components/Footer/Footer";
import AddEditProject from "./Components/AddEditProject/AddEditProject";
import EditProfile from "./Components/EditProfile/EditProfile";





// import pages
import Home from './Pages/Home/Home';
import Profile from './Pages/Profile/Profile';
import Project from "./Pages/Project/Project";
import Errors from "./Pages/Errors/Errors";
import Auth from "./Pages/Auth/Auth";




// css
import './App.css';




function App() {



  return (
    <div>
      <Navbar/>
      
      <Switch>
        
      <Route path="/" exact component={Home} />
      
      <Route path="/profile" component={Profile} />

      <Route path="/edit_profile" component={EditProfile} />

      
      <Route path="/auth" component={Auth} />


      <Route path="/project" component={Project} />

      <Route path="/(add_project|edit_project)" component={AddEditProject} /> 
      
      <Route path="/*" component={Errors} />
      </Switch>

  <Footer />      
    </div>

  
  )
}
export default App;

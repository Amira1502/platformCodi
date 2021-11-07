// import package
import React, { useState, useEffect } from 'react';
import { Link , useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';


// import axios
import axios from 'axios';


// import img
import img from '../../Assets/intro1.png'
import img1 from '../../Assets/intro.png'
import img2 from '../../Assets/midllepart.png'
import img3 from '../../Assets/bg carous.svg'

//import css
import './Home.css'
import {Container, Typography, Button} from '@material-ui/core';
import {Carousel, Card } from 'react-bootstrap';

const Home = () => {


    return (
        <div>
        <img src={img} alt="" className="imgLandingPage" />
        <h4 className="wordCarousel">
    <span>at Codi </span>
    <div>
        <ul className="flip4">
        <li>Building applications</li>
        <li>Earn money while</li>
        <li>Learning new technologies</li>
        <li>And meeting like-minded developers</li>   
        </ul>
    </div>
  
</h4>

<img src={img1} alt="" className="imgintro" />
 

 {/*midlepart */}
 <div>
<Container fixed className="middlepart">
<h2>How it work</h2>


        <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '70vh', width: '188vh' }} />
        <div>
        <div className="warpper">
          <input className="radio" id="one" name="group" type="radio" defaultChecked />
          <input className="radio" id="two" name="group" type="radio" />
          <input className="radio" id="three" name="group" type="radio" />
          <div className="tabs">
            <label className="tab" id="one-tab" htmlFor="one">Sign in with Google</label>
            <label className="tab" id="two-tab" htmlFor="two">Sign in with GitHub</label>
          </div>
          <div className="panels">
            <div className="panel" id="one-panel">
              <div className="panel-title">As an Employeer</div>
              <p>Publish your project to attract attention from developers and be resolved!</p>
            </div>
            <div className="panel" id="two-panel">
              <div className="panel-title">As a Developer</div>
              <p>Find project you can solve from project list. There are tons of opportunities.{' '}</p>
            </div>
            
          </div>
        </div>
      </div>
        <img src={img2} alt="" className="img-middlepart" />
      </Container>
</div>

{/*feature project*/}
<Container fixed className="feature-project-content">
 <h2>Our Available Projects</h2>

<div className="feature-project">
<Carousel >
  <Carousel.Item interval={2000}className="feature-project-item">
  <Card className="feature-project-card">
     <h2>E-commerce website</h2>
            <p>We are looking for a free lance to create an e-commerce jewelry site under Woocommerce. Addition and configuration of 20 products, payment system, chat, interactive map.</p>
    
  <Link to="/project">
  <Button variant="contained" size="small" color="primary">See more</Button>
</Link>{" "}
     </Card>
  
  </Carousel.Item>

  <Carousel.Item interval={2500}className="feature-project-item">
  <Card className="feature-project-card">   
     <h2> Magento site modification </h2>
            <p>Hello we are looking for someone to put Sage on our magento site and also why not upgrade it to magento 2. Thank you for coming back to me. cordially</p>
    
    <Link to="/project">
    <Button variant="contained" size="small" color="primary">See more</Button>
</Link>{" "}
   </Card> 
 
  </Carousel.Item>

  <Carousel.Item className="feature-project-item">
   <Card className="feature-project-card">
     <h2> Ui / ux in react for an e-learning platform  </h2>
      <p>We are looking for a freelance specialist in ux / ui (in react) to redesign our elearning platform.</p>
   
      <Link to="/project">
      <Button variant="contained" size="small" color="primary">See more</Button>
</Link>{" "}
   </Card>
  </Carousel.Item>
</Carousel>



{/*feature project */}
<Link to="/add_project">
<button className="buttonIntro">
    <h2>Publish Project</h2>
</button>
</Link>{" "}

</div>
</Container>
</div>

    )
}

export default Home

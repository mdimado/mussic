import React,{useEffect} from "react";
import './footer.css'
import logo from "../../assets/images/eco-logo.png"
import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import {Link} from "react-router-dom";

const Footer = () => {
  useEffect(()=>{
    window.scrollTo(0,0)
  })
  
  const year = new Date().getFullYear()
  return <footer className="footer">
    
  
    <Container>
      <Row>
        

       
       
        <Col className="text-center social" lg='12'>
        <p className="socialp">
          <a href="https://www.instagram.com/mdimado/?hl=en" target="_blank" rel="noopener noreferrer">
            <i className="ri-instagram-line"></i>
          </a>
          <a href="https://www.instagram.com/mdimado/?hl=en" target="_blank" rel="noopener noreferrer">
            <i className="ri-facebook-circle-fill"></i>
          </a>
          <a href="https://www.linkedin.com/mdimado" target="_blank" rel="noopener noreferrer">
          <i class="ri-linkedin-box-fill"></i>
          </a>
          <a href="https://github.com/mdimado" target="_blank" rel="noopener noreferrer">
          <i class="ri-github-fill"></i>
          </a>
        </p>
        </Col>





        <Col lg='12'>
          <p className="footer__copyright">TasteBite<i class="ri-copyright-line"></i>  {year}. All rights reserved. </p>
          <p className="footer__text mt-4">TasteBite: Your virtual culinary companion. Explore diverse recipes, from classic comfort foods to exotic delights. Elevate your cooking experience with step-by-step instructions and tantalizing flavors, all at your fingertips.</p>

        </Col>
      </Row>
    </Container>
  </footer>
};

export default Footer;
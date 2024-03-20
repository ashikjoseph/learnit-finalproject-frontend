import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom'
import learnitImg from '../Assets/learnIt (2).png'




function Header({ dashboard }) {
    const isDashboard = dashboard ? true : false;
    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary navbar navbar-expand-lg  bg-light pt-3 sticky-top justify-content-between">
                <Container>
                    <Navbar.Brand href="#home"><img src={learnitImg} alt="" style={{ width: "120px", height: "100px" }} />
                   
                    
                    </Navbar.Brand>
                   
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="#home">Home</Nav.Link>
                            <Nav.Link href="#link">Study Materials</Nav.Link>
                            <Nav.Link href="#link">Contact us</Nav.Link>
                        </Nav>
                        <div className="buttons text-center">
                            <NavLink to="/login" className="btn btn-outline-dark m-2"><i className="fa fa-sign-in-alt mr-1"></i> Login</NavLink>
                            <NavLink to="/register" className="btn btn-outline-dark m-2"><i className="fa fa-user-plus mr-1"></i> Register</NavLink>
                            <NavLink to="/cart" className="btn btn-outline-dark m-2"><i className="fa fa-cart-shopping mr-1"></i> Cart</NavLink>
                        </div>
                    </Navbar.Collapse>
                    {
                        isDashboard &&
                        <button className='btn btn-warning rounded'>Logout</button>
                    }
                </Container>
            </Navbar>
        </>
    )
}

export default Header
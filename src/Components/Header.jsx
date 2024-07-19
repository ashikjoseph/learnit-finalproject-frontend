import React, { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink, useNavigate } from 'react-router-dom';
import learnitImg from '../Assets/learnIt (2).png';
import { isAuthTokenContext } from '../context/ContextShare';
import './Header.css';

function Header() {
    const { isAuthToken, setIsAuthToken } = useContext(isAuthTokenContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("existingUser");
        setIsAuthToken(false);
        navigate('/');
    };

    return (
        <Navbar expand="lg" className="bg-body-tertiary navbar navbar-expand-lg bg-light pt-3 sticky-top justify-content-between">
            <Container>
                <Navbar.Brand as={NavLink} to="/">
                    <img src={learnitImg} alt="LearnIt Logo" style={{ width: "120px", height: "100px" }} />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    {!isAuthToken && (
                        <Nav className="me-auto">
                            <NavLink to="/" className="nav-link">Home</NavLink>
                            <NavLink to="/register" className="nav-link">Add notes</NavLink>
                            <NavLink to="/notebank" className="nav-link">Notebank</NavLink>
                        </Nav>
                    )}
                </Navbar.Collapse>
                {isAuthToken && (
                    <button className='btn btn-warning rounded' onClick={handleLogout}>Logout</button>
                )}
            </Container>
        </Navbar>
    );
}

export default Header;

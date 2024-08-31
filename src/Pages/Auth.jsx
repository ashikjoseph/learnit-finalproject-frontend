import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import authImage from '../Assets/istockphoto-1409722748-170667a.webp'
import { Button, Form } from 'react-bootstrap';
import { loginAPI, registerAPI } from '../services/allAPI';
import { isAuthTokenContext } from '../context/ContextShare';

function Auth({ register }) {
  const { isAuthToken, setIsAuthToken } = useContext(isAuthTokenContext)
  const registerForm = register ? true : false;
  const navigate = useNavigate()
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: ""
  })

  const handleRegister = async (e) => {
    e.preventDefault();
    const { username, email, password } = userData;
    if (!username || !email || !password) {
      alert("Please fill the form completely")
    } else {
      const result = await registerAPI(userData);
      if (result.status === 200) {
        alert("User registered successfully")
        setUserData({ username: "", email: "", password: "" })
        navigate('/login')
      } else {
        alert(result.response.data)
      }
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = userData;
    if (!email || !password) {
      alert("Please fill the form completely")
    } else {
      const result = await loginAPI(userData);
      if (result.status === 200) {
        sessionStorage.setItem("existinguser", JSON.stringify(result.data.existingUser));
        sessionStorage.setItem("token", result.data.token)
        setIsAuthToken(true)
        alert("User logged in successfully")
        setUserData({ username: "", email: "", password: "" })
        navigate('/')
      } else {
        alert(result.response.data)
      }
    }
  }

  const handleClick = () => {
    navigate('/');
  };

  return (
    <div className='d-flex justify-content-center align-items-center' style={{ width: "100%", minHeight: "100vh" }}>
      <div className='container'>
        <Button
          onClick={handleClick}
          variant="primary"
          className="mb-3"
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '8px 16px',
            fontSize: '14px',
            borderRadius: '3px',
            boxShadow: '0 3px 5px rgba(0, 0, 0, 0.1)',
            transition: 'background-color 0.3s ease',
            color: '#ffffff',
            backgroundColor: '#007bff',
            border: '1px solid #007bff',
            cursor: 'pointer'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = '#0056b3';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = '#007bff';
          }}
        >
          <i className="fa-solid fa-arrow-left" style={{ marginRight: '6px' }}></i>
          Back to Home
        </Button>

        <div className='card bg-light p-4' style={{ minHeight: '400px' }}>
          <div className='row align-items-center'>
            <div className='col-lg-6 col-md-6 col-sm-12'>
              <img src={authImage} alt="" width={"100%"} />
            </div>
            <div className='col-lg-6 col-md-6 col-sm-12 p-3'>
              <div className='d-flex align-items-center flex-column'>
                <h2 className='mb-3'>
                  <i className="fa-solid fa-users"></i> learnIt
                </h2>
                <h5 className='mb-4'>
                  {registerForm ? "Sign Up your account" : "Sign into your account"}
                </h5>
                <Form>
                  {registerForm &&
                    <Form.Group controlId="username">
                      <Form.Label>Username</Form.Label>
                      <Form.Control
                        value={userData.username}
                        onChange={(e) => setUserData({ ...userData, username: e.target.value })}
                        type="text"
                        placeholder="username"
                        style={{ width: "100%" }}
                      />
                    </Form.Group>
                  }
                  <Form.Group controlId="email" className={registerForm ? "mt-3" : ""}>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      value={userData.email}
                      onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                      type="text"
                      placeholder="email"
                      style={{ width: "100%" }}
                    />
                  </Form.Group>
                  <Form.Group controlId="password" className="mt-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      value={userData.password}
                      onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                      type="password"
                      placeholder="password"
                      style={{ width: "100%" }}
                    />
                  </Form.Group>
                </Form>
                <div className="mt-4">
                  {registerForm ? (
                    <>
                      <button className='btn btn-warning rounded' onClick={handleRegister}>Register</button>
                      <p className='mt-3'>Already a user? Click here to <Link to="/login" style={{ textDecoration: "none" }}>Login</Link></p>
                    </>
                  ) : (
                    <>
                      <button className='btn btn-warning rounded' onClick={handleLogin}>Login</button>
                      <p className='mt-3'>New user? Click here to <Link to="/register" style={{ textDecoration: "none" }}>Register</Link></p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Auth;

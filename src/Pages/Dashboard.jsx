import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import Mydocs from '../Components/Mydocs'
import Myprofile from '../Components/Myprofile'
import Header from '../Components/Header'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap';


function Dashboard({ }) {
  const [userName, setUserName] = useState("")
  useEffect(() => {
    if (sessionStorage.getItem("existinguser")) {
      const existingUserData = JSON.parse(sessionStorage.getItem("existinguser"));
      setUserName(existingUserData.username)
    }
  })
  return (
    <>
      <Header dashboard={"dashboard"} />
      <h2 className='mt-5 mt-3'>Hi<span style={{ color: "danger" }}> {userName}, </span>Welcome to learnIt</h2>

      <Row>
        <Col md={8} lg={8}>
          <Mydocs />
        </Col>
        <Col md={4} lg={4}>
          <Myprofile />
        </Col>
      </Row>

      <Row className="bg-primary p-4 rounded" style={{marginTop:"20px"}}>
        <h4>Explore Notebank</h4>
        <Col className="d-flex justify-content-center">
          <Link to="/Notebank" style={{ textDecoration: "none" }}>
            <Button variant="primary" className="fw-bold rounded-pill px-4 py-2 shadow-lg" style={{ fontSize: '1.5rem' }}>NoteBank</Button>
          </Link>
        </Col>
      </Row>
    </>
  )
}

export default Dashboard
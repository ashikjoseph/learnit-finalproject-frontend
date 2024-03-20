import React from 'react'
import { Col, Row } from 'react-bootstrap'
import Notesection from '../Components/Notesection'
function Notebank() {
  return (
    <>
      <div className='d-flex justify-content-center align-items-center flex-column mt-5'>
        <h2>Uploads</h2>
        <div className='mt-5 w-25 d-flex'>
          <input type="text" className='form-control' placeholder='Search notes by title' />
          <i class="fa-solid fa-magnifying-glass fa-rotate-90" style={{marginLeft:"-45px"}}></i>
        </div>
      </div>
      <Row className='m-5'>
        <Col sm={12} lg={6} md={6} >
          <Notesection />
        </Col>
      </Row>
    </>
  )
}

export default Notebank
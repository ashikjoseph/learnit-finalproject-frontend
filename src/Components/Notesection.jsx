import React from 'react'
import Card from 'react-bootstrap/Card';
import thermodynamicsImg from '../Assets/ME8391-Engineering-Thermodynamics.webp'
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import { Col, Row } from 'react-bootstrap';


function Notesection() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <Card style={{ width: '18rem' }} onClick={handleShow}>
                <Card.Img variant="top" src={thermodynamicsImg} />
                <Card.Body>
                    <Card.Title>Thermodynamics</Card.Title>
                    <Card.Text style={{overflow:"visible"}}>
                        Title: Basics Of Thermodynamics
                    </Card.Text>
                </Card.Body>
            </Card>

            <Modal show={show} onHide={handleClose} size='lg'>
                <Modal.Header closeButton>
                    <Modal.Title>ThermoDynamics</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col md={6} lg={6}>
                            <img src={thermodynamicsImg} alt="" width={"100%"} height={"300px"} />
                        </Col>
                        <Col md={6} lg={6}>
                            <h4>Note Description</h4>
                            <p>
                                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Debitis labore id totam soluta quasi ex quis tempora non commodi culpa unde eum eveniet numquam similique sapiente consectetur, voluptas dolorem atque?
                            </p>
                            <p><span className='fw-bolder'>Course name:</span>Mechanical Engineering</p>
                            <p><span className='fw-bolder'>Subject name:</span>Thermodynamics</p>
                        </Col>
                    </Row>
                    <div>
                        <a href="https://ncert.nic.in/ncerts/l/kech106.pdf" target='_blank' style={{color:"black",fontSize:"25px", textDecoration:"none"}} >View
                        <i class="fa-solid fa-eye ms-2"></i>
                        </a>
                     
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default Notesection
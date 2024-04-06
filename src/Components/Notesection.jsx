import React from 'react';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { BASE_URL } from '../services/baseurl';

function Notesection({ note }) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const viewPdf = () => {
        window.open(`${BASE_URL}/uploads/${note.notePdf}`, '_blank');
    };

    return (
        <>
            <Card style={{ width: '18rem' }} onClick={handleShow}>
                <Card.Img variant="top" src={`${BASE_URL}/uploads/${note.noteThumbnail}`}  style={{height:'150px'}}/>
                <Card.Body>
                    <Card.Title>{note.subjectName}</Card.Title>
                    <Card.Text style={{ overflow: "visible" }}>
                        Title: {note.noteTitle}
                    </Card.Text>
                </Card.Body>
            </Card>

            <Modal show={show} onHide={handleClose} size='lg'>
                <Modal.Header closeButton>
                    <Modal.Title>{note.subjectName}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col md={6} lg={6}>
                            <img src={`${BASE_URL}/uploads/${note.noteThumbnail}`} alt="" width={"100%"} height={"300px"} />
                        </Col>
                        <Col md={6} lg={6}>
                            <h4>Note Description</h4>
                            <p>{note.noteDescription}</p>
                            <p><span className='fw-bolder'>Course name:</span>{note.courseName}</p>
                            <p><span className='fw-bolder'>Subject name:</span>{note.subjectName}</p>
                        </Col>
                    </Row>
                    <div>
                        <button onClick={viewPdf} style={{ color: "black", fontSize: "15px", textDecoration: "none", background: "none", border: "none", cursor: "pointer" }}>View <i className="fa-solid fa-eye ms-2"></i></button>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default Notesection;

import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import { Col, Row, Button } from 'react-bootstrap';
import { BASE_URL } from '../services/baseurl';
import { useNavigate } from 'react-router-dom';
import * as pdfjsLib from 'pdfjs-dist/webpack';
import './Notesection.css';
import { useEffect } from 'react';

function Notesection({ note }) {
    const [show, setShow] = useState(false);
    const [pdfPageSrc, setPdfPageSrc] = useState(null);
    const [showButton, setShowbutton] = useState(false)
    const navigate = useNavigate();

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (token) {
            setShowbutton(true);
        }
    }, []);

    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true);
        loadPdfPage();
    };

    const viewPdf = () => {
        window.open(`${BASE_URL}/uploads/${note.notePdf}`, '_blank');
    };

    const handleBuyNow = () => {
        navigate('/payment', { state: { note } });
    };

    const previewPdfInNewTab = () => {
        if (pdfPageSrc) {
            const newTab = window.open();
            newTab.document.write(`<img src="${pdfPageSrc}" alt="PDF Preview" width="100%">`);
        } else {
            alert("Preview is not available yet. Please wait for it to load.");
        }
    };

    const loadPdfPage = async () => {
        const url = `${BASE_URL}/uploads/${note.notePdf}`;
        const pdf = await pdfjsLib.getDocument(url).promise;
        const page = await pdf.getPage(1);
        const viewport = page.getViewport({ scale: 1.5 });
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const renderContext = {
            canvasContext: context,
            viewport: viewport
        };
        await page.render(renderContext).promise;
        setPdfPageSrc(canvas.toDataURL());
    };

    return (
        <>
            <Card className="note-card" onClick={handleShow}>
                <Card.Img
                    variant="top"
                    src={`${BASE_URL}/uploads/${note.noteThumbnail}`}
                    className="note-thumbnail"
                />
                <Card.Body>
                    <Card.Title>{note.subjectName}</Card.Title>
                    <Card.Text className="note-title">
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
                            <img
                                src={`${BASE_URL}/uploads/${note.noteThumbnail}`}
                                alt={note.noteTitle || "Note Thumbnail"}
                                className="modal-thumbnail"
                                width={"100%"}
                                height={"300px"}
                            />
                        </Col>
                        <Col md={6} lg={6}>
                            <h4>Note Description</h4>
                            <p>{note.noteDescription}</p>
                            <p><span className='fw-bolder'>Course name:</span> {note.courseName}</p>
                            <p><span className='fw-bolder'>Subject name:</span> {note.subjectName}</p>
                        </Col>
                    </Row>

                    {
                        showButton ? (
                            <div className="button-container">
                                <Button onClick={handleBuyNow} className="action-button">Buy Now</Button>
                                <Button onClick={previewPdfInNewTab} className="action-button">Preview First Page <i className="fa-solid fa-eye ms-2"></i></Button>
                            </div>
                        ) :
                            (
                                <div className="button-container">
                                    <Button onClick={previewPdfInNewTab} className="action-button">Preview First Page <i className="fa-solid fa-eye ms-2"></i></Button>
                                </div>
                            )

                    }

                </Modal.Body>
            </Modal>
        </>
    );
}

export default Notesection;

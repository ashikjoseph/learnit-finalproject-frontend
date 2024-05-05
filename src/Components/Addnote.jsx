import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Toast from 'react-bootstrap/Toast';
import { addNoteAPI } from '../services/allAPI';
import { addNoteResponseContext } from '../context/ContextShare';

function Addnote() {
    const {addNoteResponse, setAddNoteResponse}=useContext(addNoteResponseContext)
    const [preview, setPreview] = useState("")
    const [token, setToken] = useState("")
    const [noteDetails, setnoteDetails] = useState({
        noteTitle: "",
        notePdf: "",
        courseName: "",
        subjectName: "",
        paypalEmail: "",
        noteDescription: "",
        noteThumbnail: ""
    })
    const [show, setShow] = useState(false);
    const [showToast, setShowToast] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleAdd = async (e) => {
        e.preventDefault();
        console.log("==get note details==")
        const { noteTitle, notePdf, courseName, subjectName, paypalEmail, noteDescription, noteThumbnail } = noteDetails;
        if (!noteTitle || !notePdf || !courseName || !subjectName || !paypalEmail || !noteDescription || !noteThumbnail) {
           
        }
        else {
            const reqBody = new FormData();
            reqBody.append('noteTitle', noteTitle)
            reqBody.append('notePdf', notePdf)
            reqBody.append('courseName', courseName)
            reqBody.append('subjectName', subjectName)
            reqBody.append('paypalEmail', paypalEmail)
            reqBody.append('noteDescription', noteDescription)
            reqBody.append('noteThumbnail', noteThumbnail)

            const reqHeader = {
                "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${token}`
            }

            const result = await addNoteAPI(reqBody, reqHeader)
            if (result.status === 200) {
                alert("Note added successfully")
                setAddNoteResponse(result)
                handleCloseClear();
                handleClose();
                setShowToast(true);
                setTimeout(() => {
                    setShowToast(false);
                }, 4000);
            }
            else {
                alert(result.response.data)
            }
        }
    }
    useEffect(() => {
        if (noteDetails.noteThumbnail) {

            setPreview(URL.createObjectURL(noteDetails.noteThumbnail))
        }
    }, [noteDetails.noteThumbnail])
    useEffect(() => {
        setToken(sessionStorage.getItem("token"))
    }, [])
    const handleCloseClear = () => {
        setnoteDetails(
            {
                noteTitle: "",
                notePdf: "",
                courseName: "",
                subjectName: "",
                paypalEmail: "",
                noteDescription: "",
                noteThumbnail: ""
            }
        )
        setPreview("")
    }
    return (

        <>
            <Button variant="primary" onClick={handleShow}>
                Add Note
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Note</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='row p-3' style={{ width: "500px" }}>
                        <div className='col-lg-6'>
                            <label htmlFor="noteThumbnail">
                                <input
                                    onChange={((e) => setnoteDetails({ ...noteDetails, noteThumbnail: e.target.files[0] }))}
                                    type="file"
                                    style={{ display: "none" }} id="noteThumbnail" />
                                <img
                                    height={"250px"}
                                    width={"100%"}
                                    src={preview ? preview : "https://www.lifewire.com/thmb/TRGYpWa4KzxUt1Fkgr3FqjOd6VQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/cloud-upload-a30f385a928e44e199a62210d578375a.jpg"} alt="" />
                            </label>
                        </div>
                        <div className='col-lg-6 d-flex justify-content-center align-items-center flex-column'>
                            <div className='w-100 mt-3 mb-3'>
                                <input
                                    value={noteDetails.noteTitle}
                                    onChange={((e) => setnoteDetails({ ...noteDetails, noteTitle: e.target.value }))}
                                    type="text" className='form-control' placeholder='Note Title' />
                            </div>
                            <div className='w-100 mt-3 mb-3' >
                                <input
                                    onChange={((e) => setnoteDetails({ ...noteDetails, notePdf: e.target.files[0] }))}
                                    type="file" className='form-control' placeholder='Note pdf' id="notePdf" />
                            </div>
                            <div className='mt-3 w-100'>
                                <input
                                    value={noteDetails.courseName}
                                    onChange={((e) => setnoteDetails({ ...noteDetails, courseName: e.target.value }))}
                                    type="text" className='form-control' placeholder='Course Name' />
                            </div>
                            <div className='mt-3 w-100'>
                                <input
                                    value={noteDetails.subjectName}
                                    onChange={((e) => setnoteDetails({ ...noteDetails, subjectName: e.target.value }))}
                                    type="text" className='form-control' placeholder='Subject Name' />
                            </div>
                            <div className='mt-3 w-100'>
                                <input
                                    value={noteDetails.paypalEmail}
                                    onChange={((e) => setnoteDetails({ ...noteDetails, paypalEmail: e.target.value }))}
                                    type="text" className='form-control' placeholder='Paypal email' />
                            </div>
                            <div className='mt-3 w-100'>
                                <textarea
                                    value={noteDetails.noteDescription}
                                    onChange={((e) => setnoteDetails({ ...noteDetails, noteDescription: e.target.value }))}
                                    className='mt-3 w-100'
                                    cols="30" rows="6" placeholder=' Note Description'>
                                </textarea>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseClear}>
                        Clear
                    </Button>
                    <Button variant="primary" onClick={handleAdd}>
                        Add note
                    </Button>
                </Modal.Footer>
            </Modal>
            <Toast show={showToast} onClose={() => setShowToast(false)} style={{ fontSize: '14px', padding: '8px 12px', backgroundColor: '#28a745', color: 'white', borderRadius: '5px' }}>
                <Toast.Body>You will get paid after your note is verified</Toast.Body>
            </Toast>
        </>
    )
}

export default Addnote
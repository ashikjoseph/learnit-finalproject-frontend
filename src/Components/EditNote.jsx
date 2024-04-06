import React, { useContext, useEffect } from 'react'
import { Button } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import { BASE_URL } from '../services/baseurl';
import { editUserNoteApi } from '../services/allAPI';
import { editNoteResponseContext } from '../context/ContextShare';


function EditNote({ note }) {
    const { editNoteResponse, setEditNoteResponse } = useContext(editNoteResponseContext)
    const [preview, setPreview] = useState("")
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [noteDetails, setnoteDetails] = useState({
        id: note._id,
        noteTitle: note.noteTitle,
        courseName: note.courseName,
        subjectName: note.subjectName,
        paypalEmail: note.paypalEmail,
        noteDescription: note.noteDescription,
        noteThumbnail: ""
    })
    useEffect(() => {
        if (noteDetails.noteThumbnail) {
            setPreview(URL.createObjectURL(noteDetails.noteThumbnail))
        }
    }, [noteDetails.noteThumbnail])
    const handleReset = () => {
        setnoteDetails({
            noteTitle: note.noteTitle,
            courseName: note.courseName,
            subjectName: note.subjectName,
            paypalEmail: note.paypalEmail,
            noteDescription: note.noteDescription,
            noteThumbnail: ""
        })
        setPreview("")
    }
    const handleUpdate = async (e) => {
        e.preventDefault()
        const { noteTitle, subjectName, courseName, paypalEmail, noteDescription, noteThumbnail, id } = noteDetails;
        if (!noteTitle || !subjectName || !courseName || !paypalEmail || !noteDescription || !id) {
            alert("Please fill the form completely")
        }
        else {
            const reqBody = new FormData();
            reqBody.append("noteTitle", noteTitle);
            reqBody.append("subjectName", subjectName);
            reqBody.append("courseName", courseName);
            reqBody.append("paypalEmail", paypalEmail);
            reqBody.append("noteDescription", noteDescription);
            preview ? reqBody.append("noteThumbnail", noteThumbnail) :
                reqBody.append("noteThumbnail", note.noteThumbnail)
            const token = sessionStorage.getItem("token");
            if (preview) {
                const reqHeader = {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${token}`
                }
                const result = await editUserNoteApi(id, reqBody, reqHeader);
                console.log(result)
                if (result.status === 200) {
                    setEditNoteResponse(result)
                    alert("Note updated successfully");
                    handleClose()
                }
                else {
                    alert(result.response.data)
                }
            }
            else {
                const reqHeader = {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
                const result = await editUserNoteApi(id, reqBody, reqHeader);
                console.log(result)
                if (result.status === 200) {
                    setEditNoteResponse(result)
                    alert("Note updated successfully");
                    handleClose()
                }
                else {
                    alert(result.response.data)
                }
            }
        }
    }
    return (
        <>
            <button className='btn'><i class="fa-solid fa-pen-to-square text-info" onClick={handleShow}></i></button>

            <Modal show={show} onHide={handleClose} size='md'>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Note</Modal.Title>
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
                                    src={preview ? preview : `${BASE_URL}/uploads/${note.noteThumbnail}`}
                                    height={"200px"} width={"100%"} alt=""
                                />
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
                                    onChange={(e) => setnoteDetails({ ...noteDetails, notePdf: e.target.files[0] })}
                                    type="file"
                                    className='form-control'
                                    placeholder='Note pdf'
                                    id="notePdf"
                                    disabled 
                                />
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
                    <Button variant="secondary" onClick={handleReset} >
                        Reset
                    </Button>
                    <Button variant="primary" onClick={handleUpdate} >
                        Update Note
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default EditNote










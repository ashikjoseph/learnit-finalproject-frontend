import React, { useContext, useEffect, useState } from 'react';
import Addnote from './Addnote';
import { deleteNoteApi, userNoteApi } from '../services/allAPI';
import { BASE_URL } from '../services/baseurl';
import { addNoteResponseContext, editNoteResponseContext } from '../context/ContextShare';
import EditNote from './EditNote';

function Mydocs() {
  const { addNoteResponse, setAddNoteResponse } = useContext(addNoteResponseContext)
  const { editNoteResponse, setEditNoteResponse } = useContext(editNoteResponseContext)
  const [userNote, setUserNote] = useState([])
  const getUserNote = async () => {
    const token = sessionStorage.getItem("token")
    const reqHeader = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
    const result = await userNoteApi(reqHeader);
    console.log("====inside my notes==")
    console.log(result.data)
    setUserNote(result.data)
  }
  useEffect(() => {
    getUserNote();
  }, [addNoteResponse, editNoteResponse])

  const viewPdf = (notePdf) => {
    window.open(`${BASE_URL}/uploads/${notePdf}`, '_blank');
  };
  const handleDelete = async (id) => {
    const token = sessionStorage.getItem("token")
    const reqHeader = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
    const result = await deleteNoteApi(id, reqHeader)
    if (result.status === 200) {
      alert("Project deleted successfully");
      getUserNote()
    }
  }
  return (
    <>
      <div className='card shadow p-5 ms-3 me-3 mb-5'>
        <div className='d-flex mb-3'>
          <h3 className='text-success ms-3'>My Uploads</h3>
          <div className='ms-auto'>
            <Addnote />
          </div>
        </div>
        <div>
          {
            userNote.length > 0 ?
              userNote.map((item) => (
                <div key={item._id} className='border d-flex align-items-center rounded p-2'>
                  <h5>{item.noteTitle}</h5>
                  <div className='ms-auto'>
                    <EditNote note={item} />
                    <button className='btn' onClick={() => viewPdf(item.notePdf)}><i className="fa-solid fa-eye"></i></button>
                    <button className='btn' onClick={() => handleDelete(item._id)}><i className="fa-solid fa-trash text-danger"></i></button>
                  </div>
                </div>
              )) :
              <p className='text-danger fw-bolder fs-5 mt-3 '>No notes uploaded yet!!</p>
          }
        </div>
      </div>
    </>
  );
}

export default Mydocs;

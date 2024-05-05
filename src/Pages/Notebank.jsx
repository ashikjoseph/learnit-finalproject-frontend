import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import Notesection from '../Components/Notesection';
import { allNoteApi } from '../services/allAPI';
import { Link } from 'react-router-dom';

function Notebank() {
   const [isToken, setIsToken] = useState(false)
  const [searchKey, setSearchKey] = useState("")
  const [allNote, setAllNote] = useState([]);

  const getAllNotes = async () => {
    if (sessionStorage.getItem('token')) {
      const token = sessionStorage.getItem('token');
      const reqHeader = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };
      try {
        const result = await allNoteApi(searchKey, reqHeader);
        console.log('==result for all notes==');
        console.log(result);
        setAllNote(result.data)
      } catch (error) {
        console.error('Error fetching notes:', error);
      }
    }
  };

  useEffect(() => {
    getAllNotes();
  }, [searchKey]);

   useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setIsToken(true)
    }
  })
  console.log("==searchkey==", searchKey)

  return (
    <>
      <div className="d-flex justify-content-center align-items-center flex-column mt-5">
        <h2>Uploads</h2>
        <div className="mt-5 w-25 d-flex">
          <input type="text" className="form-control" placeholder="Search notes by title"
            onChange={(e) => setSearchKey(e.target.value)}
          />
          <i className="fa-solid fa-magnifying-glass fa-rotate-90" style={{ marginLeft: '-45px' }}></i>
        </div>
      </div>
      <div style={{marginBottom:"20px"}}>
      <Row className='m-5'>

        {
          allNote.length > 0 ?
            allNote.map((item) => (
              <Col sm={12} lg={4} md={4}>
                <Notesection note={item} />
              </Col>
            )) :
             <div>
              {
                isToken?
                <p>No notes uploaded yet</p>:
                <div className='d-flex justify-content-center align-items-center flex-column'>
                  <img src="https://t4.ftcdn.net/jpg/01/19/11/55/360_F_119115529_mEnw3lGpLdlDkfLgRcVSbFRuVl6sMDty.jpg" alt="" height={"300px"} width={"400px"} />
                  <p className='text-danger fs-4'>Please <Link style={{textDecoration:"none"}} to={'/login'} >Login</Link>  to view notes</p>
                </div>
              }
            </div>
        }
      </Row>
      </div>
    </>
  );
}

export default Notebank;
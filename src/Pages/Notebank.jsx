import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import Notesection from '../Components/Notesection';
import { allNoteApi } from '../services/allAPI';
import { Link } from 'react-router-dom'; import { useNavigate } from 'react-router-dom';
import { isAuthTokenContext } from '../context/ContextShare';
import { useContext } from 'react';
import './notebank.css';

function Notebank() {
  const [isToken, setIsToken] = useState(false);
  const [searchKey, setSearchKey] = useState("");
  const [allNote, setAllNote] = useState([]);
  const { setIsAuthToken } = useContext(isAuthTokenContext);
  const navigate = useNavigate();

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
        setAllNote(result.data);
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
      setIsToken(true);
    }
  });

  console.log("==searchkey==", searchKey);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("existingUser");
    setIsAuthToken(false);
    navigate('/');
  };

  return (
    <>
      <div className="notebank-container">
        <Link to="/dashboard" className="dashboard-button">
          <i className="fa-solid fa-arrow-right" style={{ marginRight: "5px" }}></i>Dashboard
        </Link>
        <button className='btn btn-warning btn-logout' onClick={handleLogout}>Logout</button>
        <h2 className="notebank-header">Notebank</h2>
        <div className="notebank-search position-relative">
          <input
            type="text"
            className="form-control"
            placeholder="Search notes by title"
            onChange={(e) => setSearchKey(e.target.value)}
          />
          <i className="fa-solid fa-magnifying-glass fa-rotate-90"></i>
        </div>
      </div>
      <div style={{ marginBottom: "20px" }}>
        <Row className='m-5'>
          {allNote.length > 0 ?
            allNote.map((item) => (
              <Col sm={12} lg={3} md={3} key={item.id} className="notebank-row">
                <Notesection note={item} />
              </Col>
            )) :
            <div>
              {isToken ?
                <p>No notes uploaded yet</p> :
                <div className='notebank-no-notes'>
                  <img src="https://t4.ftcdn.net/jpg/01/19/11/55/360_F_119115529_mEnw3lGpLdlDkfLgRcVSbFRuVl6sMDty.jpg" alt="" height={"300px"} width={"400px"} />
                  <p>Please <Link style={{ textDecoration: "none" }} to={'/login'}>Login</Link> to view notes</p>
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

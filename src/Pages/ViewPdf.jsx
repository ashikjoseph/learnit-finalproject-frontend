import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../services/baseurl';
import Button from 'react-bootstrap/Button';
import './viewpdf.css';

function ViewPdf() {
    const location = useLocation();
    const { note } = location.state || {};
    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate('/notebank');
    };

    return (
        <div className="pdf-viewer">
            {note ? (
                <>
                  <div className="alert alert-warning save-note-alert">
                        <strong>Important:</strong> Save your PDF now! You’ll need to pay again to access it later.
                    </div>
                    <div style={{ marginTop: '20px', textAlign: 'center', marginLeft: '-1150px' }}>
                        <Button onClick={handleBackClick}><i class="fa-solid fa-arrow-left"></i>Back to Notebank</Button>
                    </div>
                    <iframe
                        src={`${BASE_URL}/uploads/${note.notePdf}`}
                        width="100%"
                        height="600px"
                        title={note.noteTitle}
                    ></iframe>

                </>
            ) : (
                <p>No PDF found</p>
            )}
        </div>
    );
}

export default ViewPdf;


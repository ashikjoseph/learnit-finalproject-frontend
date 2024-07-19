import React, { useEffect, useState } from 'react';
import { Col, Row, Button } from 'react-bootstrap';
import Mydocs from '../Components/Mydocs';
import Myprofile from '../Components/Myprofile';
import Header from '../Components/Header';
import { Link } from 'react-router-dom'; 
import './dashboard.css';

function Dashboard() {
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [profileAdded, setProfileAdded] = useState(false);

    useEffect(() => {
        // Fetch existing user data from sessionStorage on component mount
        if (sessionStorage.getItem("existinguser")) {
            const existingUserData = JSON.parse(sessionStorage.getItem("existinguser"));
            setUserName(existingUserData.username);
            setEmail(existingUserData.email);
        }

        // Check if profile has been added
        if (sessionStorage.getItem("profileAdded")) {
            setProfileAdded(true);
        }
    }, []);

    const handleProfileAdded = () => {
        // Set profileAdded state to true and update sessionStorage
        setProfileAdded(true);
        sessionStorage.setItem("profileAdded", "true");
    };

    return (
        <div className="dashboard-container">
            <Header dashboard={"dashboard"} />
            <div className="dashboard-header">
                <h2>Hi<span> {userName}, </span>Welcome to learnIt</h2>
                <Link to="/notebank">
                    <Button className="notebank-button"><i class="fa-solid fa-arrow-right" style={{marginRight:"5px"}}></i>Notebank</Button>
                </Link>
            </div>

            <Row className="dashboard-row">
                <Col md={8} lg={8} className="dashboard-col">
                    <Mydocs />
                </Col>
                <Col md={4} lg={4} className="dashboard-col">
                    <Myprofile
                        userName={userName}
                        email={email}
                        onProfileAdded={handleProfileAdded}
                    />
                </Col>
            </Row>
        </div>
    );
}

export default Dashboard;

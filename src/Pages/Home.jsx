import React, { useEffect, useState } from 'react';
import img1 from '../Assets/how-to-study-like-a-harvard-student.jpg';
import img2 from '../Assets/Stocksy_woman-writing-laptop_476082-57ab432d3df78cf459975331.jpg';
import img3 from '../Assets/Freelancer-working-from-home-768x478.png';
import Card from 'react-bootstrap/Card';
import { Button, Row } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import { homeNoteApi } from '../services/allAPI';
import './home.css';
import Notesection from '../Components/Notesection';
import scienceIcon from '../Assets/science icon.png';
import businessIcon from '../Assets/business icon.png';
import mathIcon from '../Assets/mathematics icon.png';
import humanitiesIcon from '../Assets/humanities icon.webp';
import literatureIcon from '../Assets/literature icon 1.jpg';
import codingIcon from '../Assets/coding icon 1.jpg';


function Home() {
    const [homeNote, setHomeNote] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    useEffect(() => {
        getHomeNote();
    }, []);

    const getHomeNote = async () => {
        try {
            const result = await homeNoteApi();
            setHomeNote(result.data);
        } catch (error) {
            console.error('Error fetching home notes:', error);
        }
    };

    const subjects = [
        { name: 'Science', icon: scienceIcon },
        { name: 'Business', icon: businessIcon },
        { name: 'Mathematics', icon: mathIcon },
        { name: 'Humanities', icon: humanitiesIcon },
        { name: 'Literature', icon: literatureIcon },
        { name: 'Coding', icon: codingIcon },
    ];

    return (
        <>
            <Header />
            <div className='home-container'>
                <h1 className='home-title'>Let's Learn Together</h1>
                <h5 className='home-subtitle'>
                    Get Access To 50k+ Study Materials From Most Promising Community
                </h5>
                {isLoggedIn ? (
                    <div className='button-container'>
                        <Link to='/dashboard'>
                            <Button className='btn btn-add-notes'>Add Notes</Button>
                        </Link>
                        <Link to='/notebank'>
                            <Button className='btn btn-notebank'>Notebank</Button>
                        </Link>
                    </div>
                ) : (
                    <div className='button-container'>
                        <Link to='/login'>
                            <Button className='btn btn-get-started'>Get Started</Button>
                        </Link>
                    </div>
                )}
            </div>

            <div className='section-container'>
                <h2 className='section-title'>What We Provide!</h2>
                <Row className='card-container'>
                    <Col>
                        <Card className='scale-on-hover'>
                            <Card.Img variant='top' src={img1} />
                            <Card.Body>
                                <Card.Title>Unlock Knowledge</Card.Title>
                                <Card.Text>
                                    Instant access to premium notes! A small payment unlocks high-quality materials to enhance your learning.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card className='scale-on-hover'>
                            <Card.Img variant='top' src={img2} />
                            <Card.Body>
                                <Card.Title>Earn While You Learn</Card.Title>
                                <Card.Text>
                                    Monetize your hard work! Upload your notes and earn money every time someone buys them. Your effort pays off, literally.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card className='scale-on-hover'>
                            <Card.Img variant='top' src={img3} />
                            <Card.Body>
                                <Card.Title>Seamless Uploads</Card.Title>
                                <Card.Text>
                                    Upload your notes in just a few clicks. Our user-friendly interface ensures you can share your knowledge quickly and effortlessly.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </div>

            <div className="featured-subjects-container">
                <h2 className="featured-subjects-title">Featured Subjects</h2>
                <Row className="featured-subjects-row">
                    {subjects.map((subject, index) => (
                        <Col key={index} xs={12} sm={6} md={4} lg={3}>
                            <Card className="subject-card">
                                <Card.Img variant="top" src={subject.icon} alt={subject.name} />
                                <Card.Body>
                                    <Card.Title className="subject-title">{subject.name}</Card.Title>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>

            <div className='section-container'>
                <h1 className='section-title'>Recent Uploads</h1>
                <div className='marquee-container'>
                    <marquee scrollAmount={20}>
                        <div className='d-flex mt-5 mb-5'>
                            {
                                homeNote.length > 0 ?
                                    homeNote.map((item) => (
                                        <div className='ms-5' style={{ width: "400px" }}>
                                            <Notesection note={item} />
                                        </div>
                                    )) :
                                    <p>No notes to load</p>
                            }
                        </div>
                    </marquee>
                </div>
            </div>

            <div className='review-container'>
                <div className='review'>
                    <img
                        src='https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg'
                        alt='Profile Picture'
                    />
                    <h3>John Doe</h3>
                    <p>Los Angeles, USA</p>
                    <p>"LearnIt helped me immensely in my studies. The class notes are comprehensive and well-structured."</p>
                </div>
                <div className='review'>
                    <img
                        src='https://a.storyblok.com/f/191576/1200x800/faa88c639f/round_profil_picture_before_.webp'
                        alt='Profile Picture'
                    />
                    <h3>Jane Smith</h3>
                    <p>New York City, USA</p>
                    <p>"I've been using LearnIt for a while now, and it's been a game-changer for my academic performance. Highly recommended!"</p>
                </div>
                <div className='review'>
                    <img
                        src='https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg'
                        alt='Profile Picture'
                    />
                    <h3>David Lee</h3>
                    <p>London, UK</p>
                    <p>"LearnIt has made studying so much easier for me. The class notes are clear and concise, making revision a breeze."</p>
                </div>
            </div>
        </>
    );
}

export default Home;

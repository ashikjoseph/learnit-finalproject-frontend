import React, { useEffect, useState } from 'react'
import landingImg from '../Assets/education-is-important.jpg'
import img1 from '../Assets/how-to-study-like-a-harvard-student.jpg'
import img2 from '../Assets/Stocksy_woman-writing-laptop_476082-57ab432d3df78cf459975331.jpg'
import img3 from '../Assets/Freelancer-working-from-home-768x478.png'
import Card from 'react-bootstrap/Card';
import { Button, Row } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import Notesection from '../Components/Notesection'
import Header from '../Components/Header'
import { homeNoteApi } from '../services/allAPI'
import './styles.css';


function Home() {
    const [homeNote, setHomeNote] = useState([])
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    const getHomeNote = async () => {
        const result = await homeNoteApi();
        console.log(result)
        setHomeNote(result.data)
    }
    useEffect(() => {
        getHomeNote();
    }, [])
    const Home = {
        backgroundImage:
            `url(${landingImg})`,
        height: "100vh",
        fontSize: "50px",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
    };

    return (
        <>
            <Header />
            <div style={Home}>
                <Row>
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: '100vh',
                        }}
                    >

                        <h1 style={{ fontWeight: "bold", fontSize: "50px" }}>Let's Learn Together</h1>
                    </div>
                </Row>
                <Row>
                    <div style={{ marginTop: "-280px" }} className='d-flex justify-content-center'>
                        <h5 className='text-dark'>Get Access To 50k+ Study Materials From Most Promising Community</h5>
                    </div>
                </Row>
                {
                    isLoggedIn ? (
                        <>
                            <div className='d-flex justify-content-center align-content center gap-3'>
                                <Link to='/dashboard'>
                                    <Button className='btn' style={{ marginTop: '-350px', backgroundColor: '#ffc107', color: 'black', fontWeight: 'bold', padding: '12px 24px', fontSize: '1.2rem', borderRadius: '8px', marginRight: '10px' }}>Add Notes</Button>
                                </Link>
                                <Link to='/notebank'>
                                    <Button className='btn' style={{ marginTop: '-350px', backgroundColor: '#ffc107', color: 'black', fontWeight: 'bold', padding: '12px 24px', fontSize: '1.2rem', borderRadius: '8px' }}>Notebank</Button>
                                </Link>
                            </div>
                        </>
                    ) : (
                        <Row>
                            <div style={{ fontSize: "10px", marginTop: "-230px", height: "50px" }} className='d-flex justify-content-center'>
                                <Link to='/login'>
                                    <Button className='btn ms-3' style={{ cursor: "pointer" }}>Get Started</Button>
                                </Link>
                            </div>
                        </Row>
                    )
                }


            </div>



            <div style={{ marginTop: "20px", marginBottom: "20px" }}>
                <h2 className='mt-5 d-flex justify-content-center'>What We Provide!</h2>
                <div className='mt-3 d-flex justify-content-center'>
                    <Row>
                        <Col>
                            <Card style={{ width: '18rem' }} className="scale-on-hover">
                                <Card.Img variant="top" src={img1} />
                                <Card.Body>
                                    <Card.Title>Get learned</Card.Title>
                                    <Card.Text>
                                        Thousands of people are searching for notes on learnIt every day. Including yours! Some documents even sell hundreds of times.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Card style={{ width: '18rem' }} className="scale-on-hover">
                                <Card.Img variant="top" src={img2} />
                                <Card.Body>
                                    <Card.Title>Make money easily</Card.Title>
                                    <Card.Text>
                                        Each time your document is sold, you earn money. This money is immediately credited to your account.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Card style={{ width: '18rem', height: "350px" }} className="scale-on-hover">
                                <Card.Img variant="top" src={img3} style={{ height: "200px" }} />
                                <Card.Body>
                                    <Card.Title>Easy uploading</Card.Title>
                                    <Card.Text>
                                        In less than a minute, you have created an account, set the price of your document and started selling. Let's get work with learnIt.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </div>

            <div className='mt=5 all-notes' style={{ marginTop: "20px", marginBottom: "20px" }}>
                <div className='text-center'>
                    <h1 className='mt-5'>Recent Uploads</h1>
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
            </div >

            <div class="review-container">
                <div class="review">
                    <img src="https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg" alt="Profile Picture" />
                    <h3>John Doe</h3>
                    <p>Los Angeles, USA</p>
                    <p>"LearnIt helped me immensely in my studies. The class notes are comprehensive and well-structured."</p>
                </div>
                <div class="review">
                    <img src="https://a.storyblok.com/f/191576/1200x800/faa88c639f/round_profil_picture_before_.webp" alt="Profile Picture" />
                    <h3>Jane Smith</h3>
                    <p>New York City, USA</p>
                    <p>"I've been using LearnIt for a while now, and it's been a game-changer for my academic performance. Highly recommended!"</p>
                </div>
                <div class="review">
                    <img src="https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg" alt="Profile Picture" />
                    <h3>David Lee</h3>
                    <p>London, UK</p>
                    <p>"LearnIt has made studying so much easier for me. The class notes are clear and concise, making revision a breeze."</p>
                </div>
            </div>



        </>
    )
}

export default Home
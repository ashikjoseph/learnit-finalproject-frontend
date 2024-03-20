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

function Landing() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    useEffect(() => {
        if (sessionStorage.getItem("token")) {
            setIsLoggedIn(true)
        }
    }, [])
    const landing = {
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
            <div style={landing}>
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
                    isLoggedIn ?
                        <Link to='/dashboard'>
                            <Button className='btn' style={{ cursor: "pointer", marginTop:"-300px", marginLeft:"575px" }}>Logged as a learnIt user</Button>
                        </Link>
                        :
                        <Row>
                            <div style={{ fontSize: "10px", marginTop: "-230px", height: "50px" }} className='d-flex justify-content-center'>
                                <Button style={{ cursor: "pointer", height: "40px" }} className='btn'>Subscribe</Button>
                                <Link to='/login'>
                                    <Button className='btn ms-3' style={{ cursor: "pointer" }}>Start Trial For 10 Days</Button>
                                </Link>
                            </div>
                        </Row>

                }

            </div>



            <div>
                <h2 className='mt-5 d-flex justify-content-center'>What We Provide!</h2>
                <div className='mt-3 d-flex justify-content-center'>
                    <Row>
                        <Col>
                            <Card style={{ width: '18rem' }}>
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
                            <Card style={{ width: '18rem' }}>
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
                            <Card style={{ width: '18rem', height: "350px" }}>
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

            <div className='mt=5 all-notes'>
                <div className='text-center'>
                    <h1 className='mt-5'>Recent Uploads</h1>
                    <marquee scrollAmount={20}>
                        <div className='d-flex mt-5 mb-5'>
                            <div className='ms-5' style={{ width: "400px" }}>
                                <Notesection />
                            </div>
                            <div className='ms-5' style={{ width: "400px" }}>
                                <Notesection />
                            </div>
                            <div className='ms-5' style={{ width: "400px" }}>
                                <Notesection />
                            </div>
                        </div>
                    </marquee>
                </div>
            </div >


        </>
    )
}

export default Landing
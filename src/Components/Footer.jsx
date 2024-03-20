import React from 'react'

function Footer() {
  return (
    <>
    <footer className="footer p-3">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <div className="d-flex">
              <ul style={{listStyleType:"none"}} className='d-flex'>
                <li>
                  <a href="#" style={{textDecoration:"none"}} className='text-dark'>Blog</a>
                </li>
                <li>
                  <a href="#" style={{textDecoration:"none"}} className='ms-3 text-dark'>FAQs</a>
                </li>
                <li>
                  <a href="#" style={{textDecoration:"none"}} className='ms-3 text-dark'>Contact us</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-6">
            <div className=" d-flex flex-row align-items-center justify-content-lg-end justify-content-center">
              <ul style={{listStyleType:"none"}} className='d-flex'>
                <li>
                  <a href="#" >
                    <i className="fab fa-facebook-f"></i>
                  </a>
                </li>
                <li>
                  <a href="#" className='ms-3'>
                    <i className="fab fa-twitter"></i>
                  </a>
                </li>
                <li>
                  <a href="#" className='ms-3'>
                    <i className="fab fa-instagram"></i>
                  </a>
                </li>

                <li>
                  <a href="#" className='ms-3'>
                    <i className="fab fa-pinterest-p"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div >
              <div>
                ©2024 All Rights Reserverd. This website is created and maintained
                <i className="fa fa-heart-o" aria-hidden="true"></i> by
                <a href="https://quintuslabs.com/" target="_blank" className='ms-2 text-decoration-none'>
                  learnIt
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
    </>
  )
}

export default Footer
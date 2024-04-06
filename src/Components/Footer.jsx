import React from 'react';

function Footer() {
  return (
    <footer className="footer p-4 bg-dark text-light" style={{marginTop:"20px"}}>
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <ul className="list-inline">
              <li className="list-inline-item">
                <a href="#" className="text-light">Blog</a>
              </li>
              <li className="list-inline-item">
                <a href="#" className="text-light">FAQs</a>
              </li>
              <li className="list-inline-item">
                <a href="#" className="text-light">Contact us</a>
              </li>
            </ul>
          </div>
          <div className="col-lg-6">
            <ul className="list-inline d-flex justify-content-end">
              <li className="list-inline-item">
                <a href="#" className="text-light">
                  <i className="fab fa-facebook-f"></i>
                </a>
              </li>
              <li className="list-inline-item">
                <a href="#" className="text-light">
                  <i className="fab fa-twitter"></i>
                </a>
              </li>
              <li className="list-inline-item">
                <a href="#" className="text-light">
                  <i className="fab fa-instagram"></i>
                </a>
              </li>
              <li className="list-inline-item">
                <a href="#" className="text-light">
                  <i className="fab fa-pinterest-p"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12 text-center">
            <p className="mb-0">© 2024 All Rights Reserved. This website is created and maintained with <i className="fa fa-heart text-danger"></i> by <a href="" target="_blank" className="text-decoration-none text-light">learnIt</a></p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

import React from 'react'
import './Footer.css'
import payment from './../img/payment.png'
import logo from './../img/logo.jpeg'

export default function Footer() {
  return (
  <div>
  <section className="footer-head">
    <div className="container">
      <div className="row">
        <div className="social-contact col-md-6 py-5">
          <img src={logo} className="py-4 img-fluid " />
          <p className="first-paragraph">Yara Shop is a global fashion and lifestyle e-retailer committed to making the beauty of fashion accessible to all. </p>
        </div>
        <div className="footer-contact-info col-md-5 py-5 my-5 mx-2 ">
          <h4 className="py-4">Contact Info</h4>
          <a href="https://www.google.com/maps" className="pt-4 paragraph-hover text-decoration-none my-2 fw-normal">
            455 West Orchard Street Kings Mountain, NC 280867
          </a>
          <div className="d-flex align-items-center">
            <i className="fa-solid fa-phone-volume pe-2" />
            <a href="tel:" className="footer-info text-decoration-none my-2 fw-normal">+088 (006) 992-99-10</a>
          </div>
          <div className="d-flex align-items-center">
            <i className="fa-regular fa-envelope pe-2" />
            <a href="mailto:" className="footer-info text-decoration-none my-2 fw-normal">example@gmail.com</a>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section className="footer-end my-4">
    <div className="container">
      <div className="footer-end row">
        <div className="col-lg-6">
          <p className="mb-0"> ©2023 Ecologytheme. All Rights Reserved</p>
        </div>
        <div className="col-lg-6 d-flex justify-content-end">
          <img className="img-fluid" src={payment} alt="payment cards" />
        </div>
      </div>
    </div>
  </section>
</div>

  )
}

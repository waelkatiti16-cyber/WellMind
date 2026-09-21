import React from 'react'

export default function Footer() {
  return (
<div>
  <footer className="footer footer-one">
    <div className="footer-top">
      <div className="container">
        <div className="row row-gap-4">
          <div className="col-lg-4">
            <div className="footer-about">
              <div className="footer-logo">
                <img src="assets/img/logo-white.svg" alt />
              </div>
              <p>Platform designed to help organizations, educators, and learners manage, deliver, and track learning and training activities.</p>
              <div className="d-flex align-items-center">
                <a href="#" className="me-2"><img src="assets/img/icon/appstore.svg" alt /></a>
                <a href="#"><img src="assets/img/icon/googleplay.svg" alt /></a>
              </div>
            </div>
          </div>
          <div className="col-lg-5">
            <div className="row row-gap-4">
              <div className="col-lg-4 col-md-4">
                <div className="footer-widget footer-menu">
                  <h5 className="footer-title">Support</h5>
                  <ul>
                    <li><a href="course-grid.html">Education</a></li>
                    <li><a href="add-course.html">Enroll Course</a></li>
                    <li><a href="javscript:void(0);">Orders</a></li>
                    <li><a href="pricing-plan.html">Payments</a></li>
                    <li><a href="blog-grid.html">Blogs</a></li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-4 col-md-4">
                <div className="footer-widget footer-menu">
                  <h5 className="footer-title">About</h5>
                  <ul>
                    <li><a href="course-category.html">Categories</a></li>
                    <li><a href="course-list.html">Courses</a></li>
                    <li><a href="about-us.html">About Us</a></li>
                    <li><a href="faq.html">Faq</a></li>
                    <li><a href="contact-us.html">Contacts</a></li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-4 col-md-4">
                <div className="footer-widget footer-menu">
                  <h5 className="footer-title">Useful Links</h5>
                  <ul>
                    <li><a href="javascript:void(0);">Our values</a></li>
                    <li><a href="javascript:void(0);">Our advisory board</a></li>
                    <li><a href="javascript:void(0);">Our partners</a></li>
                    <li><a href="javascript:void(0);">Become a partner</a></li>
                    <li><a href="javascript:void(0);">Work at Future Learn</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>							
          <div className="col-lg-3">
            <div className="footer-widget footer-contact">
              <h5 className="footer-title">Subscribe Newsletter</h5>
              <div className="footer-newsletter">
                <p>Sign up to get updates &amp; news.</p>							
                <form action="javascript:void(0);">
                  <div className="subscribe-form">
                    <span>
                      <i className="isax isax-message-text" />
                    </span>
                    <input type="email" className="form-control" placeholder="Email Address" />
                  </div>
                  <button type="submit" className="btn btn-secondary btn-xl w-100">Subscribe</button>		
                </form>	
              </div>	
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="footer-bottom">
      <div className="container">
        <div className="row row-gap-2">
          <div className="col-lg-5">
            <div className="text-center text-lg-start">									
              <p>Copyright 2025 © <span className="text-secondary">DreamsLMS</span>. All right reserved.</p>
            </div>
          </div>
          <div className="col-lg-4">
            <ul className="d-flex align-items-center justify-content-center footer-link">
              <li><a href="terms-and-conditions.html">Terms &amp; Conditions</a></li>
              <li><a href="privacy-policy.html">Privacy Policy</a></li>
            </ul>
          </div>
          <div className="col-lg-3">
            <div className="social-icon">
              <a href="javascript:void(0);"><i className="fa-brands fa-facebook-f" /></a>
              <a href="javascript:void(0);"><i className="fa-brands fa-instagram" /></a>
              <a href="javascript:void(0);"><i className="fa-brands fa-x-twitter" /></a>
              <a href="javascript:void(0);"><i className="fa-brands fa-youtube" /></a>
              <a href="javascript:void(0);"><i className="fa-brands fa-linkedin" /></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</div>

  )
}

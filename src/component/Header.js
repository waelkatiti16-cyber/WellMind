import React from 'react'

export default function Header() {
  return (
    <div>
  <header className="header-one">
    <div className="container">
      <div className="header-nav">
        <div className="navbar-header">
          <a id="mobile_btn" href="javascript:void(0);">
            <span className="bar-icon">
              <i className="isax isax-menu" />
            </span>
          </a>
          <div className="navbar-logo">
            <a className="logo-white header-logo" href="index.html">
              <img src="assets/img/logo-white.svg" className="logo" alt="Logo" />
            </a>
            <a className="logo-dark header-logo" href="index.html">
              <img src="assets/img/logo-white.svg" className="logo" alt="Logo" />
            </a>
          </div>
        </div>
        <div className="main-menu-wrapper">								
          <div className="menu-header">
            <a href="index.html" className="menu-logo">
              <img src="assets/img/logo.svg" className="img-fluid" alt="Logo" />
            </a>
            <a id="menu_close" className="menu-close" href="javascript:void(0);">
              <i className="fas fa-times" />
            </a>
          </div>
          <ul className="main-nav">
            <li className="has-submenu megamenu active">
              <a href="#">Accueil <i className="fas fa-chevron-down" /></a>
              <ul className="submenu mega-submenu">
                <li>
                  {/* <div className="megamenu-wrapper">
                    <div className="row">
                      <div className="col-lg-2">
                        <div className="single-demo active">
                          <div className="demo-img">
                            <a href="index.html" className="inner-demo-img"><img src="assets/img/home/home-01.jpg" className="img-fluid " alt="img" /></a>
                          </div>
                          <div className="demo-info">
                            <a href="index.html" className="inner-demo-img">Home 1</a>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-2">
                        <div className="single-demo">
                          <div className="demo-img">
                            <a href="index-2.html" className="inner-demo-img"><img src="assets/img/home/home-02.jpg" className="img-fluid " alt="img" /></a>
                          </div>
                          <div className="demo-info">
                            <a href="index-2.html" className="inner-demo-img">Home 2</a>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-2">
                        <div className="single-demo">
                          <div className="demo-img">
                            <a href="index-3.html" className="inner-demo-img"><img src="assets/img/home/home-03.jpg" className="img-fluid " alt="img" /></a>
                          </div>
                          <div className="demo-info">
                            <a href="index-3.html" className="inner-demo-img">Home 3</a>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-2">
                        <div className="single-demo">
                          <div className="demo-img">
                            <a href="index-4.html" className="inner-demo-img"><img src="assets/img/home/home-04.jpg" className="img-fluid " alt="img" /></a>
                          </div>
                          <div className="demo-info">
                            <a href="index-4.html" className="inner-demo-img">Home 4</a>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-2">
                        <div className="single-demo">
                          <div className="demo-img">
                            <a href="index-5.html" className="inner-demo-img"><img src="assets/img/home/home-05.jpg" className="img-fluid " alt="img" /></a>
                          </div>
                          <div className="demo-info">
                            <a href="index-5.html" className="inner-demo-img">Home 5</a>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-2">
                        <div className="single-demo">
                          <div className="demo-img">
                            <a href="index-6.html" className="inner-demo-img"><img src="assets/img/home/home-06.jpg" className="img-fluid " alt="img" /></a>
                          </div>
                          <div className="demo-info">
                            <a href="index-6.html" className="inner-demo-img">Home 6</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div> */}
                </li>
              </ul>
            </li>
            <li className="has-submenu">
              <a href="#">Cours <i className="fas fa-chevron-down" /></a>
              <ul className="submenu">
                <li className="has-submenu">
                  <a href="javascript:void(0);">Courses</a>
                  <ul className="submenu">
                    <li><a href="course-grid.html">Course Grid</a></li>
                    <li><a href="course-list.html">Course List</a></li>
                  </ul>
                </li>
                <li className="has-submenu">
                  <a href="javascript:void(0);">Course Category</a>
                  <ul className="submenu">
                    <li><a href="course-category.html">Course Category</a></li>
                    <li><a href="course-category-2.html">Course Category 2</a></li>
                    <li><a href="course-category-3.html">Course Category 3</a></li>
                  </ul>
                </li>
                <li className="has-submenu">
                  <a href="javascript:void(0);">Course Details</a>
                  <ul className="submenu">
                    <li><a href="course-details.html">Course Details</a></li>
                    <li><a href="course-details-2.html">Course Details 2</a></li>
                  </ul>
                </li>										
                <li><a href="course-resume.html">Course Resume</a></li>
                <li><a href="course-watch.html">Course Watch</a></li>
                <li><a href="cart.html">Course Cart</a></li>
                <li><a href="checkout.html">Course Checkout</a></li>
                <li><a href="add-course.html">Add New Course</a></li>
              </ul>
            </li>
            <li className="has-submenu">
              <a href="javascript:void(0);">Tableau de bord <i className="fas fa-chevron-down" /></a>
              <ul className="submenu">
                <li className="has-submenu">
                  <a href="javascript:void(0);">Instructor Dashboard</a>
                  <ul className="submenu">
                    <li><a href="instructor-dashboard">Dashboard</a></li>
                    <li><a href="instructor-profile.html">My Profile</a></li>
                    <li><a href="instructor-course.html">Course</a></li>
                    <li><a href="instructor-announcements.html">Announcements</a></li>
                    <li><a href="instructor-assignment.html">Assignments</a></li>
                    <li className="has-submenu">
                      <a href="javascript:void(0);">Student</a>
                      <ul className="submenu">
                        <li><a href="students.html">Student Grid</a></li>
                        <li><a href="student-list.html">Student List</a></li>
                        <li><a href="student-details.html">Student Details</a></li>
                      </ul>
                    </li>
                    <li><a href="instructor-quiz.html">Quiz</a></li>
                    <li><a href="instructor-quiz-results.html">Quiz Results</a></li>
                    <li><a href="instructor-certificate.html">Certificates</a></li>
                    <li><a href="instructor-earnings.html">Earning</a></li>
                    <li><a href="instructor-payout.html">Payout</a></li>
                    <li><a href="instructor-statements.html">Statement</a></li>
                    <li><a href="instructor-tickets.html">Support Tickets</a></li>
                    <li><a href="instructor-settings.html">Settings</a></li>
                  </ul>
                </li>
                <li className="has-submenu">
                  <a href="javascript:void(0);">Student Dashboard</a>
                  <ul className="submenu">
                    <li><a href="student-dashboard.html">Student Dashboard</a></li>
                    <li><a href="student-profile.html">My Profile</a></li>
                    <li><a href="student-courses.html">Enrolled Courses</a></li>
                    <li><a href="student-certificates.html">My Certificates</a></li>
                    <li><a href="student-wishlist.html">Wishlist</a></li>
                    <li><a href="student-reviews.html">Reviews</a></li>
                    <li><a href="student-quiz.html">My Quiz Attempts</a></li>
                    <li><a href="student-order-history.html">Order History</a></li>
                    <li><a href="student-referral.html">Referrals</a></li>
                    <li><a href="student-messages.html">Messages</a></li>
                    <li><a href="student-tickets.html">Support Ticket</a></li>
                    <li><a href="student-settings.html">Settings</a></li>
                  </ul>
                </li>
              </ul>
            </li>
            <li className="has-submenu">
              <a href="#">Pages <i className="fas fa-chevron-down" /></a>
              <ul className="submenu">
                <li className="has-submenu">
                  <a href="#">Instructors</a>
                  <ul className="submenu">
                    <li><a href="instructor-grid.html">Instructor Grid</a></li>
                    <li><a href="instructor-list.html">Instructor List</a></li>
                    <li><a href="instructor-details.html">Instructor Details</a></li>
                  </ul>
                </li>
                <li><a href="about-us.html">About Us</a></li>
                <li><a href="contact-us.html">Contact us</a></li>
                <li><a href="notifications.html">Notifications</a></li>
                <li><a href="become-an-instructor.html">Become an Instructor</a></li>
                <li><a href="testimonials.html">Testimonials</a></li>
                <li className="has-submenu">
                  <a href="#">Authentication</a>
                  <ul className="submenu">
                    <li><a href="login.html">Login</a></li>
                    <li><a href="register.html">Register</a></li>
                    <li><a href="forgot-password.html">Forgot Password</a></li>
                    <li><a href="reset-password.html">Reset Password</a></li>
                    <li><a href="set-password.html">Set Password</a></li>
                    <li><a href="otp.html">OTP</a></li>
                    <li><a href="lock-screen.html">Lock Screen</a></li>
                  </ul>
                </li>
                <li className="has-submenu">
                  <a href="#">Error</a>
                  <ul className="submenu">
                    <li><a href="error-404.html">404 Error</a></li>
                    <li><a href="error-500.html">500 Error</a></li>
                  </ul>
                </li>
                <li><a href="pricing-plan.html">Pricing Plan</a></li>
                <li><a href="faq.html">FAQ</a></li>
                <li><a href="coming-soon.html">Coming Soon</a></li>
                <li><a href="under-construction.html">Under Construction</a></li>
                <li><a href="terms-and-conditions.html">Terms &amp; Conditions</a></li>
                <li><a href="privacy-policy.html">Privacy Policy</a></li>
                <li><a href="index-rtl.html">RTL</a></li>
              </ul>
            </li>	
            <li className="has-submenu">
              <a href="#">Blog <i className="fas fa-chevron-down" /></a>
              <ul className="submenu">
                <li className="has-submenu">
                  <a href="#">Blog Layouts</a>
                  <ul className="submenu">
                    <li><a href="blog-grid.html">Blog 1 Grid</a></li>
                    <li><a href="blog-2-grid.html">Blog 2 Grid</a></li>
                    <li><a href="blog-3-grid.html">Blog 3 Grid</a></li>
                    <li><a href="blog-carousal.html">Blog Carousal</a></li>
                    <li><a href="blog-masonry.html">Blog Mansory</a></li>
                    <li><a href="blog-left-sidebar.html">Blog Left Sidebar</a></li>
                    <li><a href="blog-right-sidebar.html">Blog Right Sidebar</a></li>
                  </ul>
                </li>
                <li className="has-submenu">
                  <a href="#">Blog Details</a>
                  <ul className="submenu">
                    <li><a href="blog-details.html">Blog Details</a></li>
                    <li><a href="blog-details-left-sidebar.html">Blog Details Left Sidebar</a></li>
                    <li><a href="blog-details-right-sidebar.html">Blog Details Right Sidebar</a></li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
          <div className="menu-dropdown">
            <div className="cart-item">
              <h6>Cart &amp; Wishlist</h6>                                
              <div className="icon-btn">
                <a href="cart.html" className="position-relative">
                  <i className="isax isax-shopping-cart5" />
                  <span className="count-icon bg-success p-1 rounded-pill text-white fs-10 fw-bold">1</span>
                </a>
              </div>
            </div>
            <div className="dropdown flag-dropdown mb-2">
              <a href="javascript:void(0);" className="dropdown-toggle d-flex align-items-center" data-bs-toggle="dropdown" aria-expanded="false">
                <img src="assets/img/flags/us-flag.svg" className="me-2" alt="flag" />ENG
              </a>
              <ul className="dropdown-menu p-2 mt-2">
                <li>
                  <a className="dropdown-item rounded d-flex align-items-center" href="javascript:void(0);">
                    <img src="assets/img/flags/us-flag.svg" className="me-2" alt="flag" />ENG
                  </a>
                </li>
                <li>
                  <a className="dropdown-item rounded d-flex align-items-center" href="javascript:void(0);">
                    <img src="assets/img/flags/arab-flag.svg" className="me-2" alt="flag" />ARA
                  </a>
                </li>
                <li>
                  <a className="dropdown-item rounded d-flex align-items-center" href="javascript:void(0);">
                    <img src="assets/img/flags/france-flag.svg" className="me-2" alt="flag" />FRE
                  </a>
                </li>
              </ul>
            </div>
            <div className="dropdown mb-2">
              <a href="javascript:void(0);" className="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                USD
              </a>
              <ul className="dropdown-menu p-2 mt-2">
                <li><a className="dropdown-item rounded" href="javascript:void(0);">USD</a></li>
                <li><a className="dropdown-item rounded" href="javascript:void(0);">YEN</a></li>
                <li><a className="dropdown-item rounded" href="javascript:void(0);">EURO</a></li>
              </ul>
            </div>
            <div className="dropdown mb-2">
              <a href="javascript:void(0);" className="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                Light
              </a>
              <ul className="dropdown-menu p-2 mt-2">
                <li><a className="dropdown-item rounded" href="javascript:void(0);">Light</a></li>
                <li><a className="dropdown-item rounded" href="javascript:void(0);">Dark</a></li>
              </ul>
            </div>
          </div>
          <div className="menu-login">
            <a href="login" className="btn btn-primary w-100 mb-2"><i className="isax isax-user me-2" />Se connecter</a>
            <a href="register" className="btn btn-secondary w-100"><i className="isax isax-user-edit me-2" />S'inscrire</a>
          </div>
        </div>
        <div className="header-btn d-flex align-items-center">							
          <div className="dropdown flag-dropdown icon-btn">
            <a href="javascript:void(0);" className="d-inline-flex align-items-center" data-bs-toggle="dropdown" aria-expanded="false">
              <img src="assets/img/flags/us-flag.svg" alt="flag" />
            </a>
            <ul className="dropdown-menu p-2 mt-2">
              <li>
                <a className="dropdown-item rounded d-flex align-items-center" href="javascript:void(0);">
                  <img src="assets/img/flags/us-flag.svg" className="me-2" alt="flag" />ENG
                </a>
              </li>
              <li>
                <a className="dropdown-item rounded d-flex align-items-center" href="javascript:void(0);">
                  <img src="assets/img/flags/arab-flag.svg" className="me-2" alt="flag" />ARA
                </a>
              </li>
              <li>
                <a className="dropdown-item rounded d-flex align-items-center" href="javascript:void(0);">
                  <img src="assets/img/flags/france-flag.svg" className="me-2" alt="flag" />FRE
                </a>
              </li>
            </ul>
          </div>
          <div className="dropdown icon-btn">
            <a href="javascript:void(0);" data-bs-toggle="dropdown" aria-expanded="false">
              <i className="isax isax-dollar-circle4" />
            </a>
            <ul className="dropdown-menu p-2 mt-2">
              <li><a className="dropdown-item rounded" href="javascript:void(0);">USD</a></li>
              <li><a className="dropdown-item rounded" href="javascript:void(0);">TND</a></li>
              <li><a className="dropdown-item rounded" href="javascript:void(0);">EURO</a></li>
            </ul>
          </div>
          <div className="icon-btn">
            <a href="javascript:void(0);" id="dark-mode-toggle" className="theme-toggle activate">
              <i className="isax isax-sun-15" />
            </a>
            <a href="javascript:void(0);" id="light-mode-toggle" className="theme-toggle">
              <i className="isax isax-moon" />
            </a>
          </div>
          <div className="icon-btn">
            <a href="cart.html" className="position-relative">
              <i className="isax isax-shopping-cart5" />
              <span className="count-icon bg-success p-1 rounded-pill text-white fs-10 fw-bold">1</span>
            </a>
          </div>
          <a href="login" className="btn btn-primary d-inline-flex align-items-center me-2">
            <i className="isax isax-user me-2" />Se connecter
          </a>
          <a href="register" className="btn btn-secondary me-0">
            <i className="isax isax-user-edit me-2" />S'inscrire
          </a>
        </div>
      </div>
    </div>
  </header>
</div>

  )
}

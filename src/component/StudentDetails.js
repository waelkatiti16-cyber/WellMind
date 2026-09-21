import React from 'react'

export default function StudentDetails() {
  return (
   <div>
  <div className="breadcrumb-bar text-center">
    <div className="container">
      <div className="row">
        <div className="col-md-12 col-12">
          <h2 className="breadcrumb-title mb-2">Students Details</h2>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb justify-content-center mb-0">
              <li className="breadcrumb-item">Home</li>
              <li className="breadcrumb-item active" aria-current="page">Students Details</li>
            </ol>
          </nav>
        </div>
      </div>
    </div>
  </div>
  {/* /Breadcrumb */}
  <div className="content instructor-detail-content">
    <div className="container">
      <div className="instructor-profile">
        <div className="instructor-profile-bg">
          <img src="assets/img/bg/card-bg-01.png" className="instructor-profile-bg-1" alt />
        </div>
        <div className="row align-items-center row-gap-3">
          <div className="col-md-6">
            <div className="d-flex align-items-center">
              <span className="avatar flex-shrink-0 avatar-xxl avatar-rounded me-3 border border-white border-3 position-relative">
                <img src="assets/img/user/user-01.jpg" alt="img" />
                <span className="verify-tick"><i className="isax isax-verify5" /></span>
              </span>
              <div>
                <h5 className="mb-1 text-white d-inline-flex align-items-center">Eugene Andre<a href="instructor-profile.html" className="link-light fs-16 ms-2"><i className="isax isax-edit-2" /></a></h5>
                <p className="text-light">Instructor</p>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="d-flex align-items-center flex-wrap gap-3 justify-content-md-end">
              <a href="addcourse" className="btn btn-white rounded-pill">Add New Course</a>
              {/* <a href="student-dashboard.html" className="btn btn-secondary rounded-pill">Student Dashboard</a> */}
            </div>
          </div>
        </div>
      </div>
      <a href="student-list.html" className="d-flex align-items-center mb-3"><i className="isax isax-arrow-left me-1 fw-bold" />Back to List</a>
      <div className="row">
        <div className="col-lg-8">
          <div className="instructor-details-item1 mb-4">
            <div className="instructor-details">
              <div className="instructor-img">
                <a href="javascript:void(0);">
                  <img src="assets/img/students/student-01.jpg" alt="img" className="img-fluid" />
                </a>
              </div>
              <div className="flex-fill">
                <div className="pb-3 border-bottom mb-3">
                  <div className="d-flex align-items-center justify-content-between mb-1">
                    <h6 className="fs-18 fw-bold"><a href="javascript:void(0);">Thompson Hicks</a></h6>
                  </div>
                  <div className="d-flex align-items-center mb-1">
                    <p>Joined on : 24 May 2024</p>
                  </div>
                  <div>
                    <p>Hello! I'm Thompson Hicks. I'm passionate about developing innovative software solutions, analyzing classic literature. </p>
                  </div>
                </div>
                <div className="d-flex align-items-center justify-content-between flex-wrap">
                  <div className="d-flex align-items-center counts-details mb-0">
                    <div className="d-flex align-items-center me-4">
                      <span className="d-flex align-items-center"><i className="isax isax-book5 text-primary me-1" />10 Courses</span>														
                    </div>
                  </div>
                  <div className="d-flex align-items-center">
                    <span>
                      <a href="javascript:void(0);" className="rounded-circle d-inline-flex align-items-center justify-content-center p-1 me-2">
                        <i className="fa-brands fa-facebook-f" />
                      </a>
                    </span>
                    <span>
                      <a href="javascript:void(0);" className="rounded-circle d-inline-flex align-items-center justify-content-center p-1 me-2">
                        <i className="fa-brands fa-instagram" />
                      </a>
                    </span>
                    <span>
                      <a href="javascript:void(0);" className="rounded-circle d-inline-flex align-items-center justify-content-center p-1 me-2">
                        <i className="fa-brands fa-x-twitter" />
                      </a>
                    </span>
                    <span>
                      <a href="javascript:void(0);" className="rounded-circle d-inline-flex align-items-center justify-content-center p-1 me-2">
                        <i className="fa-brands fa-youtube" />
                      </a>
                    </span>
                    <span>
                      <a href="javascript:void(0);" className="rounded-circle d-inline-flex align-items-center justify-content-center">
                        <i className="fa-brands fa-linkedin-in" />
                      </a>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="about-me-card bg-white">
            <div className="about-me-body">
              <h6 className="page-title fs-18 fw-bold">About Me</h6>
              <p className="mb-2">Very well thought out and articulate communication. Clear milestones, deadlines and fast work. Patience. Infinite patience. No shortcuts. Even if the client is being careless. Some quick example text to build on the card title and bulk the card's content Moltin gives you platform.</p>
              <a href="javascript:void(0);" className="text-secondary text-decoration-underline fs-14">Read More</a>
            </div>
          </div>
          <div className="education-card">
            <div className="education-body">
              <h6 className="fs-18 fw-bold page-title">Education</h6>
              <div className="education-flow">
                <div className="ps-4 pb-3 timeline-flow">
                  <div>
                    <h6 className="fs-16 mb-1">BCA - Bachelor of Computer Applications</h6>
                    <p>International University - (2004 - 2010)</p>
                  </div>
                </div>
                <div className="ps-4 pb-3 timeline-flow">
                  <div>
                    <h6 className="fs-16 mb-1">MCA - Master of Computer Application</h6>
                    <p>International University - (2010 - 2012)</p>
                  </div>
                </div>
                <div className="ps-4 timeline-flow">
                  <div>
                    <h6 className="mb-1">Design Communication Visual</h6>
                    <p>International University - (2012-2015)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="enrolled-courses-card mb-4 mb-lg-0">
            <div className="enrolled-courses-body">
              <div className="page-title">
                <h6 className="mb-0 fs-18 fw-bold">Enrolled Courses</h6>
              </div>									
              <div className="course-carousal student-details-carousal">
                <div>
                  <div className="course-item-two course-item mx-2">
                    <div className="course-img">
                      <a href="course-details.html">
                        <img src="assets/img/course/course-01.jpg" alt="img" className="img-fluid" />  
                      </a>
                      <div className="position-absolute start-0 top-0 d-flex align-items-start w-100 z-index-2 p-3">
                        <div className="badge text-bg-danger">15% off</div>
                        <a href="javascript:void(0);" className="fav-icon ms-auto"><i className="isax isax-heart" /></a>
                      </div>
                    </div>
                    <div className="course-content">
                      <div className="d-flex justify-content-between mb-2">
                        <div className="d-flex align-items-center">
                          <a href="instructor-details.html" className="avatar avatar-sm">
                            <img src="assets/img/user/user-29.jpg" alt="img" className="img-fluid avatar avatar-sm rounded-circle" />
                          </a>
                          <div className="ms-2">
                            <a href="instructor-details.html" className="link-default fs-14">Brenda Slaton</a>
                          </div>
                        </div>
                        <span className="badge badge-light rounded-pill bg-light d-inline-flex align-items-center fs-13 fw-medium mb-0">
                          Design
                        </span>
                      </div>
                      <h6 className="title mb-2"><a href="course-details.html">Information About UI/UX Design Degree</a></h6>
                      <p className="d-flex align-items-center mb-3"><i className="fa-solid fa-star text-warning me-2" />4.9 (200 Reviews)</p>
                      <div className="d-flex align-items-center justify-content-between">
                        <h5 className="text-secondary mb-0">$120</h5>
                        <a href="course-details.html" className="btn btn-dark btn-sm d-inline-flex align-items-center">View Course<i className="isax isax-arrow-right-3 ms-1" /></a>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="course-item-two course-item mx-2">
                    <div className="course-img">
                      <a href="course-details.html">
                        <img src="assets/img/course/course-02.jpg" alt="img" className="img-fluid" />  
                      </a>
                      <div className="position-absolute start-0 top-0 d-flex align-items-start w-100 z-index-2 p-3">
                        <a href="javascript:void(0);" className="fav-icon ms-auto"><i className="isax isax-heart" /></a>
                      </div>
                    </div>
                    <div className="course-content">
                      <div className="d-flex justify-content-between mb-2">
                        <div className="d-flex align-items-center">
                          <a href="instructor-details.html" className="avatar avatar-sm">
                            <img src="assets/img/user/user-30.jpg" alt="img" className="img-fluid avatar avatar-sm rounded-circle" />
                          </a>
                          <div className="ms-2">
                            <a href="instructor-details.html" className="link-default fs-14">Ana Reyes</a>
                          </div>
                        </div>
                        <span className="badge badge-light rounded-pill bg-light d-inline-flex align-items-center fs-13 fw-medium mb-0">
                          Wordpress
                        </span>
                      </div>
                      <h6 className="title mb-2"><a href="course-details.html">Wordpress for Beginners - Master Wordpress Quickly</a></h6>
                      <p className="d-flex align-items-center mb-3"><i className="fa-solid fa-star text-warning me-2" />4.4 (160 Reviews)</p>
                      <div className="d-flex align-items-center justify-content-between">
                        <h5 className="text-secondary mb-0">$140</h5>
                        <a href="course-details.html" className="btn btn-dark btn-sm d-inline-flex align-items-center">View Course<i className="isax isax-arrow-right-3 ms-1" /></a>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="course-item-two course-item mx-2">
                    <div className="course-img">
                      <a href="course-details.html">
                        <img src="assets/img/course/course-03.jpg" alt="img" className="img-fluid" />  
                      </a>
                      <div className="position-absolute start-0 top-0 d-flex align-items-start w-100 z-index-2 p-3">
                        <a href="javascript:void(0);" className="fav-icon ms-auto"><i className="isax isax-heart" /></a>
                      </div>
                    </div>
                    <div className="course-content">
                      <div className="d-flex justify-content-between mb-2">
                        <div className="d-flex align-items-center">
                          <a href="instructor-details.html" className="avatar avatar-sm">
                            <img src="assets/img/user/user-31.jpg" alt="img" className="img-fluid avatar avatar-sm rounded-circle" />
                          </a>
                          <div className="ms-2">
                            <a href="instructor-details.html" className="link-default fs-14">Andrew Pirtle</a>
                          </div>
                        </div>
                        <span className="badge badge-light rounded-pill bg-light d-inline-flex align-items-center fs-13 fw-medium mb-0">
                          Design
                        </span>
                      </div>
                      <h6 className="title mb-2"><a href="course-details.html">Sketch from A to Z (2024): Become an app designer</a></h6>
                      <p className="d-flex align-items-center mb-3"><i className="fa-solid fa-star text-warning me-2" />4.4 (160 Reviews)</p>
                      <div className="d-flex align-items-center justify-content-between">
                        <h5 className="text-secondary mb-0">$140</h5>
                        <a href="course-details.html" className="btn btn-dark btn-sm d-inline-flex align-items-center">View Course<i className="isax isax-arrow-right-3 ms-1" /></a>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="course-item-two course-item mx-2">
                    <div className="course-img">
                      <a href="course-details.html">
                        <img src="assets/img/course/course-04.jpg" alt="img" className="img-fluid" />  
                      </a>
                      <div className="position-absolute start-0 top-0 d-flex align-items-start w-100 z-index-2 p-3">
                        <a href="javascript:void(0);" className="fav-icon ms-auto"><i className="isax isax-heart" /></a>
                      </div>
                    </div>
                    <div className="course-content">
                      <div className="d-flex justify-content-between mb-2">
                        <div className="d-flex align-items-center">
                          <a href="instructor-details.html" className="avatar avatar-sm">
                            <img src="assets/img/user/user-32.jpg" alt="img" className="img-fluid avatar avatar-sm rounded-circle" />
                          </a>
                          <div className="ms-2">
                            <a href="instructor-details.html" className="link-default fs-14">Christy Garner</a>
                          </div>
                        </div>
                        <span className="badge badge-light rounded-pill bg-light d-inline-flex align-items-center fs-13 fw-medium mb-0">
                          Programming
                        </span>
                      </div>
                      <h6 className="title mb-2"><a href="course-details.html">Build Responsive Real World Websites with Crash Course</a></h6>
                      <p className="d-flex align-items-center mb-3"><i className="fa-solid fa-star text-warning me-2" />4.2 (220 Reviews)</p>
                      <div className="d-flex align-items-center justify-content-between">
                        <h5 className="text-secondary mb-0">$200</h5>
                        <a href="course-details.html" className="btn btn-dark btn-sm d-inline-flex align-items-center">View Course<i className="isax isax-arrow-right-3 ms-1" /></a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="certification-card">
            <div className="certification-body">
              <h5 className="mb-3 fw-bold">Certifications</h5>
              <div className="d-flex align-items-center">
                <div className="certificate-img rounded-circle me-2">
                  <img src="assets/img/certificates/certificate-01.svg" alt="img" className="img-fluid" />
                </div>
                <div className="certificate-img rounded-circle me-2">
                  <img src="assets/img/certificates/certificate-02.svg" alt="img" className="img-fluid" />
                </div>
                <div className="certificate-img rounded-circle me-2">
                  <img src="assets/img/certificates/certificate-03.svg" alt="img" className="img-fluid" />
                </div>
                <div className="certificate-img rounded-circle">
                  <img src="assets/img/certificates/certificate-01.svg" alt="img" className="img-fluid" />
                </div>
              </div>
            </div>
          </div>
          <div className="contact-card border-0 mb-0">
            <div className="contact-details-body">
              <h5 className="mb-3 fw-bold">Contact Details</h5>
              <div className="d-flex align-items-center mb-4">
                <span className="contact-icon flex-shrink-0 rounded-circle d-flex align-items-center justify-content-center me-3">
                  <i className="fa-regular fa-envelope" />
                </span>
                <div>
                  <h6 className="mb-0">Email</h6>
                  <p className="fs-14 mb-0">jennywilson@example.com</p>
                </div>
              </div>
              <div className="d-flex align-items-center mb-4">
                <span className="contact-icon flex-shrink-0 rounded-circle d-flex align-items-center justify-content-center me-3">
                  <i className="isax isax-location" />
                </span>
                <div>
                  <h6 className="mb-0">Address</h6>
                  <p className="fs-14 mb-0 text-truncate">877 Ferry Street, Huntsville, Alabama</p>
                </div>
              </div>
              <div className="d-flex align-items-center">
                <span className="contact-icon flex-shrink-0 rounded-circle d-flex align-items-center justify-content-center me-3">
                  <i className="isax isax-call" />
                </span>
                <div>
                  <h6 className="mb-0">Phone</h6>
                  <p className="fs-14 mb-0">+1(452) 125-6789</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

  )
}

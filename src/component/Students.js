import React from 'react'

export default function Students() {
  return (
    <div>
      <div>
  <div className="breadcrumb-bar text-center">
    <div className="container">
      <div className="row">
        <div className="col-md-12 col-12">
          <h2 className="breadcrumb-title mb-2">Students Grid</h2>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb justify-content-center mb-0">
              <li className="breadcrumb-item"><a href="/">Home</a></li>
              <li className="breadcrumb-item active" aria-current="page">Students Grid</li>
            </ol>
          </nav>
        </div>
      </div>
    </div>
  </div>
  <div className="content">
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
              <a href="add-course" className="btn btn-white rounded-pill">Add New Course</a>
              {/* <a href="student-dashboard.html" className="btn btn-secondary rounded-pill">Student Dashboard</a> */}
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        {/* Sidebar */}
        <div className="col-lg-3 theiaStickySidebar">
          <div className="settings-sidebar mb-lg-0">
            <div>
              <h6 className="mb-3">Main Menu</h6>
              <ul className="mb-3 pb-1">
                {/* <li>
                  <a href="instructor-dashboard.html" className="d-inline-flex align-items-center"><i className="isax isax-grid-35 me-2" />Dashboard</a>
                </li>
                <li>
                  <a href="instructor-profile.html" className="d-inline-flex align-items-center"><i className="fa-solid fa-user me-2" />My Profile</a>
                </li>
                <li>
                  <a href="instructor-course.html" className="d-inline-flex align-items-center"><i className="isax isax-teacher5 me-2" />Courses</a>
                </li>
                <li>
                  <a href="instructor-announcements.html" className="d-inline-flex align-items-center"><i className="isax isax-volume-high5 me-2" />Announcements</a>
                </li>
                <li>
                  <a href="instructor-assignment.html" className="d-inline-flex align-items-center"><i className="isax isax-clipboard-text5 me-2" />Assignments</a>
                </li> */}
                <li>
                  <a href="students.html" className="d-inline-flex align-items-center active"><i className="isax isax-profile-2user5 me-2" />Students</a>
                </li>
                {/* <li>
                  <a href="instructor-quiz.html" className="d-inline-flex align-items-center"><i className="isax isax-award5 me-2" />Quiz</a>
                </li>
                <li>
                  <a href="instructor-quiz-results.html" className="d-inline-flex align-items-center"><i className="isax isax-medal-star5 me-2" />Quiz Results</a>
                </li>
                <li>
                  <a href="instructor-certificate.html" className="d-inline-flex align-items-center"><i className="isax isax-note-215 me-2" />Certificates</a>
                </li>
                <li>
                  <a href="instructor-earnings.html" className="d-inline-flex align-items-center"><i className="isax isax-wallet-add5 me-2" />Earnings</a>
                </li>
                <li>
                  <a href="instructor-payout.html" className="d-inline-flex align-items-center"><i className="isax isax-coin-15 me-2" />Payout</a>
                </li>
                <li>
                  <a href="instructor-statements.html" className="d-inline-flex align-items-center"><i className="isax isax-shopping-cart5 me-2" />Statements</a>
                </li>
                <li>
                  <a href="instructor-message.html" className="d-inline-flex align-items-center"><i className="isax isax-messages-35 me-2" />Messages</a>
                </li>
                <li>
                  <a href="instructor-tickets.html" className="d-inline-flex align-items-center"><i className="isax isax-ticket5 me-2" />Support Tickets</a>
                </li> */}
              </ul>
              <hr />
              <h6 className="mb-3">Account Settings</h6>
              <ul>
                <li>
                  <a href="instructor-settings.html" className="d-inline-flex align-items-center"><i className="isax isax-setting-25 me-2" />Settings</a>
                </li>
                <li>
                  <a href="login.html" className="d-inline-flex align-items-center"><i className="isax isax-logout5 me-2" />Logout</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* /Sidebar */}
        <div className="col-lg-9">
          <div className="page-title d-flex align-items-center justify-content-between">
            <h5 className="fw-bold">Students</h5>
            <div className="d-flex align-items-center list-icons">
              <a href="studentlist" className="me-2"><i className="isax isax-task" /></a>
              <a href="students" className="active"><i className="isax isax-element-3" /></a>
            </div>
          </div>
          <div className="row justify-content-end">
            <div className="col-md-4">
              <div className="input-icon mb-3">
                <span className="input-icon-addon">
                  <i className="isax isax-search-normal-14" />
                </span>
                <input type="email" className="form-control form-control-md" placeholder="Search" />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-4 col-md-6">
              <div className="card">
                <div className="card-body">
                  <div className="mb-3">
                    <a href="student-details.html"><img src="assets/img/students/student-01.jpg" className="rounded-3" alt /></a>
                  </div>
                  <div className="d-flex align-items-center justify-content-between border-bottom mb-3 pb-3">
                    <div>
                      <h5 className="mb-2 fw-bold"><a href="student-details.html">Ronald Richard</a></h5>
                      <span className="text-info d-inline-flex align-items-center"><i className="isax isax-location me-1" /><a href="#" className="text-info text-decoration-underline stu-loc">Newyork</a></span>
                    </div>
                    <a href="#" className="avatar avatar-md avatar-rounded border"><i className="isax isax-messages text-gray-9 fs-14" /></a>
                  </div>
                  <div className="d-flex align-items-center justify-content-between fs-14">
                    <span className="d-inline-flex align-items-center"><i className="isax isax-calendar-add5 text-primary me-1" />22 Aug 2025</span>
                    <span className="d-inline-flex align-items-center"><i className="isax isax-teacher5 text-secondary me-1" />10 Courses</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-md-6">
              <div className="card">
                <div className="card-body">
                  <div className="mb-3">
                    <a href="student-details.html"><img src="assets/img/students/student-02.jpg" className="rounded-3" alt /></a>
                  </div>
                  <div className="d-flex align-items-center justify-content-between border-bottom mb-3 pb-3">
                    <div>
                      <h5 className="mb-2 fw-bold"><a href="student-details.html">Mona Nancy</a></h5>
                      <span className="text-info d-inline-flex align-items-center"><i className="isax isax-location me-1" /><a href="#" className="text-info text-decoration-underline stu-loc">Los Angels</a></span>
                    </div>
                    <a href="#" className="avatar avatar-md avatar-rounded border"><i className="isax isax-messages text-gray-9 fs-14" /></a>
                  </div>
                  <div className="d-flex align-items-center justify-content-between fs-14">
                    <span className="d-inline-flex align-items-center"><i className="isax isax-calendar-add5 text-primary me-1" />15 Jul 2025</span>
                    <span className="d-inline-flex align-items-center"><i className="isax isax-teacher5 text-secondary me-1" />08 Courses</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-md-6">
              <div className="card">
                <div className="card-body">
                  <div className="mb-3">
                    <a href="student-details.html"><img src="assets/img/students/student-03.jpg" className="rounded-3" alt /></a>
                  </div>
                  <div className="d-flex align-items-center justify-content-between border-bottom mb-3 pb-3">
                    <div>
                      <h5 className="mb-2 fw-bold"><a href="student-details.html">Patrick Alleman</a></h5>
                      <span className="text-info d-inline-flex align-items-center"><i className="isax isax-location me-1" /><a href="#" className="text-info text-decoration-underline stu-loc">Alabama</a></span>
                    </div>
                    <a href="#" className="avatar avatar-md avatar-rounded border"><i className="isax isax-messages text-gray-9 fs-14" /></a>
                  </div>
                  <div className="d-flex align-items-center justify-content-between fs-14">
                    <span className="d-inline-flex align-items-center"><i className="isax isax-calendar-add5 text-primary me-1" />18 Jun 2025</span>
                    <span className="d-inline-flex align-items-center"><i className="isax isax-teacher5 text-secondary me-1" />12 Courses</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-md-6">
              <div className="card">
                <div className="card-body">
                  <div className="mb-3">
                    <a href="student-details.html"><img src="assets/img/students/student-04.jpg" className="rounded-3" alt /></a>
                  </div>
                  <div className="d-flex align-items-center justify-content-between border-bottom mb-3 pb-3">
                    <div>
                      <h5 className="mb-2 fw-bold"><a href="student-details.html">Olive Paxson</a></h5>
                      <span className="text-info d-inline-flex align-items-center"><i className="isax isax-location me-1" /><a href="#" className="text-info text-decoration-underline stu-loc">Brisbane</a></span>
                    </div>
                    <a href="#" className="avatar avatar-md avatar-rounded border"><i className="isax isax-messages text-gray-9 fs-14" /></a>
                  </div>
                  <div className="d-flex align-items-center justify-content-between fs-14">
                    <span className="d-inline-flex align-items-center"><i className="isax isax-calendar-add5 text-primary me-1" />03 May 2025</span>
                    <span className="d-inline-flex align-items-center"><i className="isax isax-teacher5 text-secondary me-1" />07 Courses</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-md-6">
              <div className="card">
                <div className="card-body">
                  <div className="mb-3">
                    <a href="student-details.html"><img src="assets/img/students/student-05.jpg" className="rounded-3" alt /></a>
                  </div>
                  <div className="d-flex align-items-center justify-content-between border-bottom mb-3 pb-3">
                    <div>
                      <h5 className="mb-2 fw-bold"><a href="student-details.html">Chris Thomas</a></h5>
                      <span className="text-info d-inline-flex align-items-center"><i className="isax isax-location me-1" /><a href="#" className="text-info text-decoration-underline stu-loc">Newyork</a></span>
                    </div>
                    <a href="#" className="avatar avatar-md avatar-rounded border"><i className="isax isax-messages text-gray-9 fs-14" /></a>
                  </div>
                  <div className="d-flex align-items-center justify-content-between fs-14">
                    <span className="d-inline-flex align-items-center"><i className="isax isax-calendar-add5 text-primary me-1" />14 Apr 2025</span>
                    <span className="d-inline-flex align-items-center"><i className="isax isax-teacher5 text-secondary me-1" />04 Courses</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-md-6">
              <div className="card">
                <div className="card-body">
                  <div className="mb-3">
                    <a href="student-details.html"><img src="assets/img/students/student-06.jpg" className="rounded-3" alt /></a>
                  </div>
                  <div className="d-flex align-items-center justify-content-between border-bottom mb-3 pb-3">
                    <div>
                      <h5 className="mb-2 fw-bold"><a href="student-details.html">Joyce Perron</a></h5>
                      <span className="text-info d-inline-flex align-items-center"><i className="isax isax-location me-1" /><a href="#" className="text-info text-decoration-underline stu-loc">Ontoro</a></span>
                    </div>
                    <a href="#" className="avatar avatar-md avatar-rounded border"><i className="isax isax-messages text-gray-9 fs-14" /></a>
                  </div>
                  <div className="d-flex align-items-center justify-content-between fs-14">
                    <span className="d-inline-flex align-items-center"><i className="isax isax-calendar-add5 text-primary me-1" />17 Mar 2025</span>
                    <span className="d-inline-flex align-items-center"><i className="isax isax-teacher5 text-secondary me-1" />06 Courses</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* /pagination */}
          <div className="row align-items-center">
            <div className="col-md-2">
              <p className="pagination-text">Page 1 of 2</p>
            </div>
            <div className="col-md-10">
              <ul className="pagination lms-page justify-content-center justify-content-md-end mt-2 mt-md-0">
                <li className="page-item prev">
                  <a className="page-link" href="javascript:void(0)" tabIndex={-1}><i className="fas fa-angle-left" /></a>
                </li>
                <li className="page-item first-page active">
                  <a className="page-link" href="javascript:void(0)">1</a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="javascript:void(0)">2</a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="javascript:void(0)">3</a>
                </li>
                <li className="page-item next">
                  <a className="page-link" href="javascript:void(0)"><i className="fas fa-angle-right" /></a>
                </li>
              </ul>
            </div>
          </div>
          {/* /pagination */}
        </div>
      </div>
    </div>
  </div>
</div>

    </div>
  )
}

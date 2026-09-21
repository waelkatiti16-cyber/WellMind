import React from 'react'

export default function StudentList() {
  return (
<div>
  <div className="breadcrumb-bar text-center">
    <div className="container">
      <div className="row">
        <div className="col-md-12 col-12">
          <h2 className="breadcrumb-title mb-2">Students List</h2>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb justify-content-center mb-0">
              <li className="breadcrumb-item"><a href="/">Home</a></li>
              <li className="breadcrumb-item active" aria-current="page">Students List</li>
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
              <a href="addcourse" className="btn btn-white rounded-pill">Add New Course</a>
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
                  <a href="login" className="d-inline-flex align-items-center"><i className="isax isax-logout5 me-2" />Logout</a>
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
              <a href="studentlist" className="active me-2"><i className="isax isax-task" /></a>
              <a href="students"><i className="isax isax-element-3" /></a>
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
          <div className="table-responsive custom-table">
            <table className="table">
              <thead className="thead-light">
                <tr>
                  <th>Student ID</th>
                  <th>Student Name</th>
                  <th>Enroll Date</th>
                  <th>Progress</th>
                  <th>Courses</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><a href="studentdetails" className="text-primary">#STU020</a></td>
                  <td>
                    <div className="d-flex align-items-center">
                      <a href="studentdetails" className="avatar avatar-md avatar-rounded flex-shrink-0 me-2">
                        <img src="assets/img/user/user-01.jpg" alt />
                      </a>
                      <a href="studentdetails"><p className="fs-14">Thompson Hicks</p></a>
                    </div>
                  </td>
                  <td>22 Aug 2025</td>
                  <td>
                    <div className="d-flex align-items-center">
                      <div className="progress progress-xs flex-shrink-0" role="progressbar" aria-valuenow={40} aria-valuemin={0} aria-valuemax={100} style={{height: 4, width: 110}}>
                        <div className="progress-bar bg-success" style={{width: '0%'}} />
                      </div>
                      <span className="ms-2">0%</span>
                    </div>
                  </td>
                  <td>10</td>
                  <td>
                    <div className="d-flex align-items-center">
                      <a href="studentdetails" className="d-inline-flex fs-14 me-1 action-icon"><i className="isax isax-eye" /></a>
                      <a href="#" className="d-inline-flex fs-14 action-icon"><i className="isax isax-messages-3" /></a>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td><a href="studentdetails" className="text-primary">#STU019</a></td>
                  <td>
                    <div className="d-flex align-items-center">
                      <a href="studentdetails" className="avatar avatar-md avatar-rounded flex-shrink-0 me-2">
                        <img src="assets/img/user/user-06.jpg" alt />
                      </a>
                      <a href="studentdetails"><p className="fs-14">Jennifer Tovar</p></a>
                    </div>
                  </td>
                  <td>10 Aug 2025</td>
                  <td>
                    <div className="d-flex align-items-center">
                      <div className="progress progress-xs flex-shrink-0" role="progressbar" aria-valuenow={40} aria-valuemin={0} aria-valuemax={100} style={{height: 4, width: 110}}>
                        <div className="progress-bar bg-success" style={{width: '15%'}} />
                      </div>
                      <span className="ms-2">15%</span>
                    </div>
                  </td>
                  <td>08</td>
                  <td>
                    <div className="d-flex align-items-center">
                      <a href="studentdetails" className="d-inline-flex fs-14 me-1 action-icon"><i className="isax isax-eye" /></a>
                      <a href="#" className="d-inline-flex fs-14 action-icon"><i className="isax isax-messages-3" /></a>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td><a href="studentdetails" className="text-primary">#STU018</a></td>
                  <td>
                    <div className="d-flex align-items-center">
                      <a href="studentdetails" className="avatar avatar-md avatar-rounded flex-shrink-0 me-2">
                        <img src="assets/img/user/user-09.jpg" alt />
                      </a>
                      <a href="studentdetails"><p className="fs-14">James Schulte</p></a>
                    </div>
                  </td>
                  <td>26 Jul 2025</td>
                  <td>
                    <div className="d-flex align-items-center">
                      <div className="progress progress-xs flex-shrink-0" role="progressbar" aria-valuenow={40} aria-valuemin={0} aria-valuemax={100} style={{height: 4, width: 110}}>
                        <div className="progress-bar bg-success" style={{width: '60%'}} />
                      </div>
                      <span className="ms-2">60%</span>
                    </div>
                  </td>
                  <td>12</td>
                  <td>
                    <div className="d-flex align-items-center">
                      <a href="studentdetails" className="d-inline-flex fs-14 me-1 action-icon"><i className="isax isax-eye" /></a>
                      <a href="#" className="d-inline-flex fs-14 action-icon"><i className="isax isax-messages-3" /></a>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td><a href="studentdetails" className="text-primary">#STU017</a></td>
                  <td>
                    <div className="d-flex align-items-center">
                      <a href="studentdetails" className="avatar avatar-md avatar-rounded flex-shrink-0 me-2">
                        <img src="assets/img/user/user-20.jpg" alt />
                      </a>
                      <a href="studentdetails"><p className="fs-14">Kristy Cardona</p></a>
                    </div>
                  </td>
                  <td>12 Jul 2025</td>
                  <td>
                    <div className="d-flex align-items-center">
                      <div className="progress progress-xs flex-shrink-0" role="progressbar" aria-valuenow={40} aria-valuemin={0} aria-valuemax={100} style={{height: 4, width: 110}}>
                        <div className="progress-bar bg-success" style={{width: '20%'}} />
                      </div>
                      <span className="ms-2">20%</span>
                    </div>
                  </td>
                  <td>17</td>
                  <td>
                    <div className="d-flex align-items-center">
                      <a href="studentdetails" className="d-inline-flex fs-14 me-1 action-icon"><i className="isax isax-eye" /></a>
                      <a href="#" className="d-inline-flex fs-14 action-icon"><i className="isax isax-messages-3" /></a>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td><a href="studentdetails" className="text-primary">#STU016</a></td>
                  <td>
                    <div className="d-flex align-items-center">
                      <a href="studentdetails" className="avatar avatar-md avatar-rounded flex-shrink-0 me-2">
                        <img src="assets/img/user/user-27.jpg" alt />
                      </a>
                      <a href="studentdetails"><p className="fs-14">William Aragon</p></a>
                    </div>
                  </td>
                  <td>02 Jul 2025</td>
                  <td>
                    <div className="d-flex align-items-center">
                      <div className="progress progress-xs flex-shrink-0" role="progressbar" aria-valuenow={40} aria-valuemin={0} aria-valuemax={100} style={{height: 4, width: 110}}>
                        <div className="progress-bar bg-success" style={{width: '10%'}} />
                      </div>
                      <span className="ms-2">10%</span>
                    </div>
                  </td>
                  <td>09</td>
                  <td>
                    <div className="d-flex align-items-center">
                      <a href="studentdetails" className="d-inline-flex fs-14 me-1 action-icon"><i className="isax isax-eye" /></a>
                      <a href="#" className="d-inline-flex fs-14 action-icon"><i className="isax isax-messages-3" /></a>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td><a href="studentdetails" className="text-primary">#STU015</a></td>
                  <td>
                    <div className="d-flex align-items-center">
                      <a href="studentdetails" className="avatar avatar-md avatar-rounded flex-shrink-0 me-2">
                        <img src="assets/img/user/user-30.jpg" alt />
                      </a>
                      <a href="studentdetails"><p className="fs-14">Shirley Lis</p></a>
                    </div>
                  </td>
                  <td>25 Jun 2025</td>
                  <td>
                    <div className="d-flex align-items-center">
                      <div className="progress progress-xs flex-shrink-0" role="progressbar" aria-valuenow={40} aria-valuemin={0} aria-valuemax={100} style={{height: 4, width: 110}}>
                        <div className="progress-bar bg-success" style={{width: '80%'}} />
                      </div>
                      <span className="ms-2">80%</span>
                    </div>
                  </td>
                  <td>15</td>
                  <td>
                    <div className="d-flex align-items-center">
                      <a href="studentdetails" className="d-inline-flex fs-14 me-1 action-icon"><i className="isax isax-eye" /></a>
                      <a href="#" className="d-inline-flex fs-14 action-icon"><i className="isax isax-messages-3" /></a>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td><a href="studentdetails" className="text-primary">#STU014</a></td>
                  <td>
                    <div className="d-flex align-items-center">
                      <a href="studentdetails" className="avatar avatar-md avatar-rounded flex-shrink-0 me-2">
                        <img src="assets/img/user/user-17.jpg" alt />
                      </a>
                      <a href="studentdetails"><p className="fs-14">John Brewer</p></a>
                    </div>
                  </td>
                  <td>17 Jun 2025</td>
                  <td>
                    <div className="d-flex align-items-center">
                      <div className="progress progress-xs flex-shrink-0" role="progressbar" aria-valuenow={40} aria-valuemin={0} aria-valuemax={100} style={{height: 4, width: 110}}>
                        <div className="progress-bar bg-success" style={{width: '40%'}} />
                      </div>
                      <span className="ms-2">40%</span>
                    </div>
                  </td>
                  <td>13</td>
                  <td>
                    <div className="d-flex align-items-center">
                      <a href="studentdetails" className="d-inline-flex fs-14 me-1 action-icon"><i className="isax isax-eye" /></a>
                      <a href="studentdetails" className="d-inline-flex fs-14 action-icon"><i className="isax isax-messages-3" /></a>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td><a href="studentdetails" className="text-primary">#STU013</a></td>
                  <td>
                    <div className="d-flex align-items-center">
                      <a href="studentdetails" className="avatar avatar-md avatar-rounded flex-shrink-0 me-2">
                        <img src="assets/img/user/user-37.jpg" alt />
                      </a>
                      <a href="studentdetails"><p className="fs-14">Doris Hughes</p></a>
                    </div>
                  </td>
                  <td>04 Jun 2025</td>
                  <td>
                    <div className="d-flex align-items-center">
                      <div className="progress progress-xs flex-shrink-0" role="progressbar" aria-valuenow={40} aria-valuemin={0} aria-valuemax={100} style={{height: 4, width: 110}}>
                        <div className="progress-bar bg-success" style={{width: '50%'}} />
                      </div>
                      <span className="ms-2">50%</span>
                    </div>
                  </td>
                  <td>17</td>
                  <td>
                    <div className="d-flex align-items-center">
                      <a href="studentdetails" className="d-inline-flex fs-14 me-1 action-icon"><i className="isax isax-eye" /></a>
                      <a href="studentdetails" className="d-inline-flex fs-14 action-icon"><i className="isax isax-messages-3" /></a>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td><a href="studentdetails" className="text-primary">#STU012</a></td>
                  <td>
                    <div className="d-flex align-items-center">
                      <a href="studentdetails" className="avatar avatar-md avatar-rounded flex-shrink-0 me-2">
                        <img src="assets/img/user/user-04.jpg" alt />
                      </a>
                      <a href="studentdetails"><p className="fs-14">Sarah Martinez</p></a>
                    </div>
                  </td>
                  <td>20 May 2025</td>
                  <td>
                    <div className="d-flex align-items-center">
                      <div className="progress progress-xs flex-shrink-0" role="progressbar" aria-valuenow={40} aria-valuemin={0} aria-valuemax={100} style={{height: 4, width: 110}}>
                        <div className="progress-bar bg-success" style={{width: '20%'}} />
                      </div>
                      <span className="ms-2">20%</span>
                    </div>
                  </td>
                  <td>08</td>
                  <td>
                    <div className="d-flex align-items-center">
                      <a href="studentdetails" className="d-inline-flex fs-14 me-1 action-icon"><i className="isax isax-eye" /></a>
                      <a href="studentdetails" className="d-inline-flex fs-14 action-icon"><i className="isax isax-messages-3" /></a>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td><a href="studentdetails" className="text-primary">#STU011</a></td>
                  <td>
                    <div className="d-flex align-items-center">
                      <a href="studentdetails" className="avatar avatar-md avatar-rounded flex-shrink-0 me-2">
                        <img src="assets/img/user/user-18.jpg" alt />
                      </a>
                      <a href="studentdetails"><p className="fs-14">Sarah Martinez</p></a>
                    </div>
                  </td>
                  <td>15 May 2025</td>
                  <td>
                    <div className="d-flex align-items-center">
                      <div className="progress progress-xs flex-shrink-0" role="progressbar" aria-valuenow={40} aria-valuemin={0} aria-valuemax={100} style={{height: 4, width: 110}}>
                        <div className="progress-bar bg-success" style={{width: '60%'}} />
                      </div>
                      <span className="ms-2">60%</span>
                    </div>
                  </td>
                  <td>10</td>
                  <td>
                    <div className="d-flex align-items-center">
                      <a href="studentdetails" className="d-inline-flex fs-14 me-1 action-icon"><i className="isax isax-eye" /></a>
                      <a href="studentdetails" className="d-inline-flex fs-14 action-icon"><i className="isax isax-messages-3" /></a>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          {/* /pagination */}
          <div className="row align-items-center mt-4">
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

  )
}

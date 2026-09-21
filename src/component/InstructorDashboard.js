import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';
import { getLoggedInAdmin, logoutAdmin } from './authHelper';

export default function InstructorDashboard() {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(null);
  const [totalCourses, setTotalCourses] = useState(0);
  const [totalCategories, setTotalCategories] = useState(0);
  const [totalCoaches, setTotalCoaches] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [averageCoachRating, setAverageCoachRating] = useState(0);
  const [totalInterestedCourses, setTotalInterestedCourses] = useState(0);
  const [coachRatingDistribution, setCoachRatingDistribution] = useState([]);
  const [interestedByCategory, setInterestedByCategory] = useState([]);
  const [loadingStats, setLoadingStats] = useState(true);

  useEffect(() => {
    const loggedAdmin = getLoggedInAdmin();
    setAdmin(loggedAdmin);
  }, []);

  useEffect(() => {
    const fetchStats = async () => {
      setLoadingStats(true);
      try {
        const [coursesRes, categoriesRes, coachesRes, usersRes] = await Promise.all([
          fetch("http://localhost:8000/course/all"),
          fetch("http://localhost:8000/category/all"),
          fetch("http://localhost:8000/coach/all"),
          fetch("http://localhost:8000/register/all") // ou "http://localhost:8000/users/all" si vous avez créé la route dédiée
        ]);

        const [courses, categories, coaches, users] = await Promise.all([
          coursesRes.json(),
          categoriesRes.json(),
          coachesRes.json(),
          usersRes.json()
        ]);

        setTotalCourses(Array.isArray(courses) ? courses.length : 0);
        setTotalCategories(Array.isArray(categories) ? categories.length : 0);
        setTotalCoaches(Array.isArray(coaches) ? coaches.length : 0);
        setTotalUsers(Array.isArray(users) ? users.length : 0);

        const avg = coaches.length > 0
          ? coaches.reduce((sum, c) => sum + (c.AverageRating || 0), 0) / coaches.length
          : 0;
        setAverageCoachRating(avg.toFixed(1));

        const ratingBins = [0, 1, 2, 3, 4, 5];
        const distribution = ratingBins.map((bin, idx) => {
          const next = ratingBins[idx + 1] || 6;
          const count = coaches.filter(c => {
            const rating = c.AverageRating || 0;
            return rating >= bin && rating < next;
          }).length;
          return { name: `${bin}-${next}`, count };
        });
        setCoachRatingDistribution(distribution);

        let interested = [];
        try {
          interested = JSON.parse(localStorage.getItem('interestedCourses') || '[]');
        } catch (e) {
          interested = [];
        }
        setTotalInterestedCourses(interested.length);

        const categoryMap = {};
        interested.forEach(courseId => {
          const course = courses.find(c => c._id === courseId);
          if (course) {
            const cat = course.Category || 'Autre';
            categoryMap[cat] = (categoryMap[cat] || 0) + 1;
          }
        });
        const interestedData = Object.keys(categoryMap).map(cat => ({
          name: cat,
          count: categoryMap[cat]
        }));
        setInterestedByCategory(interestedData);

      } catch (error) {
        console.error("Erreur lors du chargement des statistiques :", error);
      } finally {
        setLoadingStats(false);
      }
    };

    fetchStats();
  }, []);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  const handleLogout = () => {
    logoutAdmin();
    navigate('/loginAdmin');
  };

  return (
    <div className="main-wrapper">
      {/* ================= HEADER ================= */}
      <header className="header-two">
        <div className="container">
          <div className="header-nav">
            <div className="navbar-header">
              <a id="mobile_btn" href="javascript:void(0);">
                <span className="bar-icon">
                  <span />
                  <span />
                  <span />
                </span>
              </a>
              <div className="navbar-logo">
                <a className="logo-white header-logo" href="index.html">
                  <img src="assets/img/logo.png" className="" alt="Logo" style={{ width: 300 }} />
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
            </div>
            <div className="header-btn d-flex align-items-center" style={{ marginTop: 30, marginBottom: 30 }}>
              <div className="icon-btn me-2">
                <a href="javascript:void(0);" id="dark-mode-toggle" className="theme-toggle activate">
                  <i className="isax isax-sun-15" />
                </a>
                <a href="javascript:void(0);" id="light-mode-toggle" className="theme-toggle">
                  <i className="isax isax-moon" />
                </a>
              </div>
              <div className="icon-btn me-3">
                <a href="cart.html" className="position-relative">
                  <i className="isax isax-shopping-cart5" />
                  <span className="count-icon bg-success p-1 rounded-pill text-white fs-10 fw-bold">1</span>
                </a>
              </div>
              <div className="dropdown profile-dropdown">
                <a href="javascript:void(0);" className="d-flex align-items-center" data-bs-toggle="dropdown">
                  <span className="avatar">
                    <img src="assets/img/user/user-01.jpg" alt="Img" className="img-fluid rounded-circle" />
                  </span>
                </a>
                <div className="dropdown-menu dropdown-menu-end">
                  <div className="profile-header d-flex align-items-center">
                    <div className="avatar">
                      <img src="assets/img/user/user-01.jpg" alt="Img" className="img-fluid rounded-circle" />
                    </div>
                    <div>
                      <h6>{admin ? admin.nom : 'Admin'}</h6>
                      <p>{admin ? admin.email : 'admin@example.com'}</p>
                    </div>
                  </div>
                  <ul className="profile-body">
                    <li>
                      <a className="dropdown-item d-inline-flex align-items-center rounded fw-medium" href="instructor-profile.html"><i className="isax isax-security-user me-2" />My Profile</a>
                    </li>
                    <li>
                      <a className="dropdown-item d-inline-flex align-items-center rounded fw-medium" href="instructor-course.html"><i className="isax isax-teacher me-2" />Courses</a>
                    </li>
                    <li>
                      <a className="dropdown-item d-inline-flex align-items-center rounded fw-medium2" href="instructor-earnings.html"><i className="isax isax-dollar-circle me-2" />Earnings</a>
                    </li>
                    <li>
                      <a className="dropdown-item d-inline-flex align-items-center rounded fw-medium" href="instructor-payout.html"><i className="isax isax-coin me-2" />Payouts</a>
                    </li>
                    <li>
                      <a className="dropdown-item d-inline-flex align-items-center rounded fw-medium" href="instructor-message.html"><i className="isax isax-messages-3 me-2" />Messages<span className="message-count">2</span></a>
                    </li>
                    <li>
                      <a className="dropdown-item d-inline-flex align-items-center rounded fw-medium" href="instructor-settings.html"><i className="isax isax-setting-2 me-2" />Settings</a>
                    </li>
                  </ul>
                  <div className="profile-footer">
                    <a className="dropdown-item d-inline-flex align-items-center rounded fw-medium" href="login.html"><i className="isax isax-arrow-2 me-2" />Log in as Student</a>
                    <button onClick={handleLogout} className="btn btn-secondary d-inline-flex align-items-center justify-content-center w-100">
                      <i className="isax isax-logout me-2" />Logout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ================= BREADCRUMB ================= */}
      <div className="breadcrumb-bar text-center">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-12">
              <h2 className="breadcrumb-title mb-2">Dashboard</h2>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb justify-content-center mb-0">
                  <li className="breadcrumb-item"><a href="index.html">Home</a></li>
                  <li className="breadcrumb-item active" aria-current="page">Dashboard</li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* ================= CONTENU ================= */}
      <div className="content">
        <div className="container">
          <div className="instructor-profile">
            <div className="instructor-profile-bg">
              <img src="assets/img/bg/card-bg-01.png" className="instructor-profile-bg-1" alt="" />
            </div>
            <div className="row align-items-center row-gap-3">
              <div className="col-md-6">
                <div className="d-flex align-items-center">
                  <span className="avatar flex-shrink-0 avatar-xxl avatar-rounded me-3 border border-white border-3 position-relative">
                    <img src="assets/img/user/user-01.jpg" alt="img" />
                    <span className="verify-tick"><i className="isax isax-verify5" /></span>
                  </span>
                  <div>
                    <h5 className="mb-1 text-white d-inline-flex align-items-center">
                      {admin ? admin.nom : 'Admin'}
                    </h5>
                    <p className="text-light">Administrateur</p>
                  </div>
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
                    <li>
                      <a href="instructor-dashboard.html" className="d-inline-flex align-items-center active"><i className="isax isax-grid-35 me-2" />Dashboard</a>
                    </li>
                    <li>
                      <Link to="/listcours" className="d-inline-flex align-items-center"><i className="isax isax-teacher5 me-2" />Cours</Link>
                    </li>
                    <li>
                      <Link to="/listCat" className="d-inline-flex align-items-center"><i className="isax isax-menu-15 me-2" />Catégories</Link>
                    </li>
                    <li>
                      <Link to="/listcoach" className="d-inline-flex align-items-center"><i className="isax isax-profile-2user5 me-2" />Coachs</Link>
                    </li>
                    <li>
                      <Link to="/listusers" className="d-inline-flex align-items-center"><i className="isax isax-note-215 me-2" />Utilisateurs</Link>
                    </li>
                  </ul>
                  <hr />
                  <h6 className="mb-3"></h6>
                  <ul>
                    <li>
                      <button onClick={handleLogout} className="d-inline-flex align-items-center btn btn-link p-0 text-reset text-decoration-none">
                        <i className="isax isax-logout5 me-2" />Déconnexion
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Contenu principal */}
            <div className="col-lg-9">
              {/* Cartes de statistiques en haut */}
              <div className="row">
                <div className="col-md-3">
                  <Link to="/listcours" className="card text-decoration-none">
                    <div className="card-body">
                      <div className="d-flex align-items-center">
                        <span className="icon-box bg-primary-transparent me-2 me-xxl-3 flex-shrink-0">
                          <img src="assets/img/icon/book-2.svg" alt="" />
                        </span>
                        <div>
                          <span className="d-block">Total Cours</span>
                          <h4 className="fs-24 mt-1">{loadingStats ? '...' : totalCourses}</h4>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
                <div className="col-md-3">
                  <Link to="/listCat" className="card text-decoration-none">
                    <div className="card-body">
                      <div className="d-flex align-items-center">
                        <span className="icon-box bg-secondary-transparent me-2 me-xxl-3 flex-shrink-0">
                          <img src="assets/img/icon/bookmark.svg" alt="" />
                        </span>
                        <div>
                          <span className="d-block">Total Catégories</span>
                          <h4 className="fs-24 mt-1">{loadingStats ? '...' : totalCategories}</h4>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
                <div className="col-md-3">
                  <Link to="/listcoach" className="card text-decoration-none">
                    <div className="card-body">
                      <div className="d-flex align-items-center">
                        <span className="icon-box bg-info-transparent me-2 me-xxl-3 flex-shrink-0">
                          <img src="assets/img/icon/user-octagon.svg" alt="" />
                        </span>
                        <div>
                          <span className="d-block">Total Coachs</span>
                          <h4 className="fs-24 mt-1">{loadingStats ? '...' : totalCoaches}</h4>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
                <div className="col-md-3">
                  <Link to="/listusers" className="card text-decoration-none">
                    <div className="card-body">
                      <div className="d-flex align-items-center">
                        <span className="icon-box bg-success-transparent me-2 me-xxl-3 flex-shrink-0">
                          <img src="assets/img/icon/user.svg" alt="" />
                        </span>
                        <div>
                          <span className="d-block">Total Utilisateurs</span>
                          <h4 className="fs-24 mt-1">{loadingStats ? '...' : totalUsers}</h4>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>

              {/* Graphiques */}
              <div className="row mt-4">
                <div className="col-lg-6">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="fw-bold mb-3">Répartition des notes des coachs</h5>
                      <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={coachRatingDistribution}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis allowDecimals={false} />
                          <Tooltip />
                          <Bar dataKey="count" fill="#8884d8" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="fw-bold mb-3">Cours intéressants par catégorie</h5>
                      <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                          <Pie
                            data={interestedByCategory}
                            dataKey="count"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            fill="#8884d8"
                            label
                          >
                            {interestedByCategory.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </div>

            
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
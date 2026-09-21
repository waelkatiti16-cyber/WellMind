import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getLoggedInUser, logout } from './authHelper';

const PAGE_SIZE = 9;

export default function TousLesCours() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  const [search, setSearch] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedLevels, setSelectedLevels] = useState([]);
  const [priceFilter, setPriceFilter] = useState('all');
  const [sortOption, setSortOption] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentUser(getLoggedInUser());
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [coursesRes, categoriesRes] = await Promise.all([
          fetch("http://localhost:8000/course/all"),
          fetch("http://localhost:8000/category/all")
        ]);
        const coursesData = await coursesRes.json();
        const categoriesData = await categoriesRes.json();

        const published = Array.isArray(coursesData)
          ? coursesData.filter((c) => c.Status === 'Publié')
          : [];

        setCourses(published);
        setCategories(Array.isArray(categoriesData) ? categoriesData : []);
      } catch (error) {
        console.error("Erreur lors du chargement :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    logout();
    setCurrentUser(null);
    navigate('/');
  };

  // Compte le nombre de cours par catégorie / niveau
  const categoryCounts = useMemo(() => {
    const counts = {};
    courses.forEach((c) => {
      if (c.Category) counts[c.Category] = (counts[c.Category] || 0) + 1;
    });
    return counts;
  }, [courses]);

  const levelOptions = ['Débutant', 'Intermédiaire', 'Avancé', 'Expert'];
  const levelCounts = useMemo(() => {
    const counts = {};
    courses.forEach((c) => {
      if (c.Level) counts[c.Level] = (counts[c.Level] || 0) + 1;
    });
    return counts;
  }, [courses]);

  const toggleFilter = (value, list, setList) => {
    setCurrentPage(1);
    if (list.includes(value)) {
      setList(list.filter((v) => v !== value));
    } else {
      setList([...list, value]);
    }
  };

  const clearFilters = () => {
    setSearch('');
    setSelectedCategories([]);
    setSelectedLevels([]);
    setPriceFilter('all');
    setCurrentPage(1);
  };

  // Filtrage
  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      if (search && !course.Title?.toLowerCase().includes(search.toLowerCase())) {
        return false;
      }
      if (selectedCategories.length > 0 && !selectedCategories.includes(course.Category)) {
        return false;
      }
      if (selectedLevels.length > 0 && !selectedLevels.includes(course.Level)) {
        return false;
      }
      if (priceFilter === 'free' && !course.IsFree) return false;
      if (priceFilter === 'paid' && course.IsFree) return false;
      return true;
    });
  }, [courses, search, selectedCategories, selectedLevels, priceFilter]);

  // Tri
  const sortedCourses = useMemo(() => {
    const list = [...filteredCourses];
    switch (sortOption) {
      case 'price_asc':
        return list.sort((a, b) => (a.Price || 0) - (b.Price || 0));
      case 'price_desc':
        return list.sort((a, b) => (b.Price || 0) - (a.Price || 0));
      case 'free':
        return list.sort((a, b) => (b.IsFree ? 1 : 0) - (a.IsFree ? 1 : 0));
      case 'newest':
      default:
        return list.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
    }
  }, [filteredCourses, sortOption]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(sortedCourses.length / PAGE_SIZE));
  const paginatedCourses = sortedCourses.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      <div className="main-wrapper">
        {/* Header avec navigation conditionnelle */}
        <header className="header-two">
          <div className="container">
            <div className="header-nav d-flex align-items-center justify-content-between py-3">
              <Link to="/accueil" className="header-logo">
                <img src="assets/img/logo.png" className="logo" alt="Logo" style={{ width: 200 }} />
              </Link>
              <div className="d-flex align-items-center gap-2">
                {currentUser ? (
                  <>
                    <Link to="/mes-favoris" className="btn btn-light d-inline-flex align-items-center">
                      <i className="fa-regular fa-heart me-2" />Vos favoris
                    </Link>
                    <Link to="/profil" className="btn btn-light d-inline-flex align-items-center">
                      <i className="isax isax-user me-2" />{currentUser.Name || 'Profil'}
                    </Link>
                    <button type="button" className="btn btn-secondary d-inline-flex align-items-center" onClick={handleLogout}>
                      <i className="fa-solid fa-right-from-bracket me-2" />Déconnexion
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/loginuser" className="btn btn-light d-inline-flex align-items-center">
                      <i className="isax isax-user me-2" />Connexion
                    </Link>
                    <Link to="/register" className="btn btn-secondary d-inline-flex align-items-center">
                      <i className="isax isax-user-edit me-2" />S'inscrire
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Breadcrumb */}
        <div className="breadcrumb-bar text-center">
          <div className="container">
            <div className="row">
              <div className="col-md-12 col-12">
                <h2 className="breadcrumb-title mb-2">Tous les cours</h2>
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb justify-content-center mb-0">
                    <li className="breadcrumb-item"><Link to="/">Accueil</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Tous les cours</li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>

        {/* Cours */}
        <section className="course-content course-list-content py-5">
          <div className="container">
            <div className="row align-items-baseline">
              {/* Sidebar filtres */}
              <div className="col-lg-3">
                <div className="filter-clear">
                  <div className="clear-filter mb-4 pb-lg-2 d-flex align-items-center justify-content-between">
                    <h5><i className="feather-filter me-2" />Filtres</h5>
                    <button type="button" className="clear-text btn btn-link p-0" onClick={clearFilters}>
                      Effacer
                    </button>
                  </div>

                  <div className="accordion accordion-customicon1 accordions-items-seperate">
                    <div className="accordion-item">
                      <h2 className="accordion-header">
                        <span className="accordion-button">Catégories</span>
                      </h2>
                      <div className="accordion-body">
                        {categories.map((cat) => (
                          <div key={cat._id}>
                            <label className="custom_check">
                              <input
                                type="checkbox"
                                checked={selectedCategories.includes(cat.Name)}
                                onChange={() => toggleFilter(cat.Name, selectedCategories, setSelectedCategories)}
                              />
                              <span className="checkmark" /> {cat.Name} ({categoryCounts[cat.Name] || 0})
                            </label>
                          </div>
                        ))}
                        {categories.length === 0 && (
                          <p className="text-muted fs-13 mb-0">Aucune catégorie disponible.</p>
                        )}
                      </div>
                    </div>

                    <div className="accordion-item">
                      <h2 className="accordion-header">
                        <span className="accordion-button">Prix</span>
                      </h2>
                      <div className="accordion-body">
                        <div>
                          <label className="custom_check custom_one">
                            <input type="checkbox" checked={priceFilter === 'all'} onChange={() => { setPriceFilter('all'); setCurrentPage(1); }} />
                            <span className="checkmark" /> Tous
                          </label>
                        </div>
                        <div>
                          <label className="custom_check custom_one">
                            <input type="checkbox" checked={priceFilter === 'free'} onChange={() => { setPriceFilter('free'); setCurrentPage(1); }} />
                            <span className="checkmark" /> Gratuit
                          </label>
                        </div>
                        <div>
                          <label className="custom_check custom_one mb-0">
                            <input type="checkbox" checked={priceFilter === 'paid'} onChange={() => { setPriceFilter('paid'); setCurrentPage(1); }} />
                            <span className="checkmark" /> Payant
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="accordion-item">
                      <h2 className="accordion-header">
                        <span className="accordion-button">Niveau</span>
                      </h2>
                      <div className="accordion-body">
                        {levelOptions.map((level) => (
                          <div key={level}>
                            <label className="custom_check custom_one">
                              <input
                                type="checkbox"
                                checked={selectedLevels.includes(level)}
                                onChange={() => toggleFilter(level, selectedLevels, setSelectedLevels)}
                              />
                              <span className="checkmark" /> {level} ({levelCounts[level] || 0})
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Liste des cours */}
              <div className="col-lg-9">
                <div className="showing-list mb-4">
                  <div className="row align-items-center">
                    <div className="col-lg-4">
                      <div className="show-result text-center text-lg-start">
                        <h6 className="fw-medium">
                          {loading
                            ? "Chargement..."
                            : `${sortedCourses.length} cours trouvé${sortedCourses.length > 1 ? 's' : ''}`}
                        </h6>
                      </div>
                    </div>
                    <div className="col-lg-8">
                      <div className="show-filter add-course-info">
                        <div className="d-sm-flex justify-content-center justify-content-lg-end gap-2 mb-1 mb-lg-0">
                          <select
                            className="form-select"
                            style={{ maxWidth: '220px' }}
                            value={sortOption}
                            onChange={(e) => setSortOption(e.target.value)}
                          >
                            <option value="newest">Plus récents</option>
                            <option value="free">Gratuits d'abord</option>
                            <option value="price_asc">Prix croissant</option>
                            <option value="price_desc">Prix décroissant</option>
                          </select>
                          <div className="search-group">
                            <i className="isax isax-search-normal-1" />
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Rechercher un cours"
                              value={search}
                              onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {loading && (
                  <p className="text-center text-muted py-5">Chargement des cours...</p>
                )}

                {!loading && paginatedCourses.length === 0 && (
                  <p className="text-center text-muted py-5">Aucun cours ne correspond à votre recherche.</p>
                )}

                <div className="row course-list-wrap">
                  {paginatedCourses.map((course) => (
                    <div className="col-12" key={course._id}>
                      <div className="courses-list-item">
                        <div className="d-md-flex align-items-center">
                          <div className="position-relative overflow-hidden rounded-3 card-image" style={{ width: '260px', minWidth: '260px', aspectRatio: '4/3', backgroundColor: '#000' }}>
                            {course.VideoCourte ? (
                              <video
                                src={course.VideoCourte}
                                autoPlay
                                loop
                                muted
                                playsInline
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                              />
                            ) : (
                              <div className="d-flex align-items-center justify-content-center h-100 text-white">
                                <i className="fa-solid fa-video fs-24" />
                              </div>
                            )}
                          </div>
                          <div className="course-list-contents w-100 ps-0 ps-md-3 pt-4 pt-md-0">
                            <div className="d-flex flex-wrap align-items-center justify-content-between">
                              <div className="d-flex align-items-center">
                                <div className="avatar avatar-sm rounded-circle bg-secondary-transparent d-flex align-items-center justify-content-center">
                                  <i className="fa-solid fa-user" />
                                </div>
                                <p className="ms-2 mb-0">{course.Professional || 'Professionnel'}</p>
                              </div>
                              <span><span className="tag-btn">{course.Category || 'Général'}</span></span>
                            </div>
                            <h4 className="mt-3 mb-2">{course.Title}</h4>
                            {course.ShortDescription && (
                              <p className="text-gray-6 mb-2">{course.ShortDescription}</p>
                            )}
                            <div className="d-flex align-items-center">
                              <p className="mb-0">{course.Level || 'Tous niveaux'}</p>
                              {course.SousCategorie && (
                                <>
                                  <span className="dot" />
                                  <p className="mb-0">{course.SousCategorie}</p>
                                </>
                              )}
                            </div>
                            <div className="d-flex justify-content-between mt-3 align-items-center">
                              {course.IsFree ? (
                                <span className="badge bg-success-transparent text-success">Gratuit</span>
                              ) : (
                                <>
                                  <h5 className="text-secondary mb-0">{course.Price ? `${course.Price} DT` : ''}</h5>
                                  <Link
                                    to={`/course-details/${course._id}`}
                                    className="btn btn-dark btn-sm d-inline-flex align-items-center"
                                  >
                                    Voir détail du cours<i className="fs-8 fas fa-angle-right ms-2" />
                                  </Link>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                {!loading && totalPages > 1 && (
                  <div className="row align-items-center mt-3">
                    <div className="col-md-2">
                      <p className="pagination-text mb-2 mb-md-0">Page {currentPage} sur {totalPages}</p>
                    </div>
                    <div className="col-md-10">
                      <ul className="pagination lms-page justify-content-center justify-content-md-end mt-2 mt-md-0">
                        <li className="page-item prev">
                          <button type="button" className="page-link" onClick={() => goToPage(currentPage - 1)}>
                            <i className="fas fa-angle-left" />
                          </button>
                        </li>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                          <li key={page} className={`page-item ${page === currentPage ? 'active' : ''}`}>
                            <button type="button" className="page-link" onClick={() => goToPage(page)}>
                              {page}
                            </button>
                          </li>
                        ))}
                        <li className="page-item next">
                          <button type="button" className="page-link" onClick={() => goToPage(currentPage + 1)}>
                            <i className="fas fa-angle-right" />
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Footer simplifié */}
        <footer className="footer footer-one">
          <div className="footer-bottom">
            <div className="container">
              <div className="row row-gap-2 py-4">
                <div className="col-lg-6">
                  <p className="mb-0">Copyright 2026 © <span className="text-secondary">Notre Plateforme</span>. Tous droits réservés.</p>
                </div>
                <div className="col-lg-6">
                  <div className="social-icon justify-content-lg-end d-flex justify-content-center">
                    <a href="javascript:void(0);"><i className="fa-brands fa-facebook-f" /></a>
                    <a href="javascript:void(0);"><i className="fa-brands fa-instagram" /></a>
                    <a href="javascript:void(0);"><i className="fa-brands fa-linkedin" /></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
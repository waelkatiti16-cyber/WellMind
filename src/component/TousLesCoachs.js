import React, { useState, useEffect, useMemo } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { getLoggedInUser, logout } from './authHelper';

const PAGE_SIZE = 9;

export default function TousLesCoachs() {
  const [searchParams] = useSearchParams();
  const typeParam = searchParams.get('type') || '';
  const navigate = useNavigate();

  const [coaches, setCoaches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [sortOption, setSortOption] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    setCurrentUser(getLoggedInUser());
  }, []);

  useEffect(() => {
    const fetchCoaches = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:8000/coach/all");
        const data = await response.json();
        setCoaches(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Erreur lors du chargement des coachs :", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCoaches();
  }, []);

  const handleLogout = () => {
    logout();
    setCurrentUser(null);
    navigate('/');
  };

  // Filtre par type si le paramètre est présent
  const filteredByType = useMemo(() => {
    if (!typeParam) return coaches;
    return coaches.filter(c => c.Type === typeParam);
  }, [coaches, typeParam]);

  // Recherche UNIQUEMENT par nom
  const filteredCoaches = useMemo(() => {
    return filteredByType.filter(coach => {
      if (search.trim() !== '') {
        return coach.Name?.toLowerCase().includes(search.trim().toLowerCase());
      }
      return true;
    });
  }, [filteredByType, search]);

  // Tri
  const sortedCoaches = useMemo(() => {
    const list = [...filteredCoaches];
    switch (sortOption) {
      case 'name_asc':
        return list.sort((a, b) => a.Name.localeCompare(b.Name));
      case 'name_desc':
        return list.sort((a, b) => b.Name.localeCompare(a.Name));
      case 'rating_desc':
        return list.sort((a, b) => (b.AverageRating || 0) - (a.AverageRating || 0));
      case 'newest':
      default:
        return list.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
    }
  }, [filteredCoaches, sortOption]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(sortedCoaches.length / PAGE_SIZE));
  const paginatedCoaches = sortedCoaches.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const clearSearch = () => {
    setSearch('');
    setCurrentPage(1);
  };

  return (
    <div>
      <div className="main-wrapper">
        {/* Header avec navigation conditionnelle */}
        <header className="header-two">
          <div className="container">
            <div className="header-nav d-flex align-items-center justify-content-between py-3">
              <Link to="/accueil" className="header-logo">
                <img src="assets/img/logo.png" style={{ width: 200 }} alt="Logo" />
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
                <h2 className="breadcrumb-title mb-2">
                  {typeParam ? typeParam + 's' : 'Tous les coachs'}
                </h2>
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb justify-content-center mb-0">
                    <li className="breadcrumb-item"><Link to="/accueil">Accueil</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">
                      {typeParam ? typeParam + 's' : 'Tous les coachs'}
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>

        {/* Liste des coachs */}
        <section className="course-content py-5">
          <div className="container">
            <div className="row align-items-baseline">
              {/* Colonne de gauche : recherche */}
              <div className="col-lg-3">
                <div className="filter-clear">
                  <div className="clear-filter mb-4 d-flex align-items-center justify-content-between">
                    <h5 className="mb-0"><i className="feather-search me-2" />Recherche</h5>
                    {search && (
                      <button type="button" className="clear-text btn btn-link p-0" onClick={clearSearch}>
                        Effacer
                      </button>
                    )}
                  </div>
                  <div className="search-group position-relative">
                    <i className="isax isax-search-normal-1 position-absolute top-50 translate-middle-y" style={{ left: '12px', color: '#777' }} />
                    <input
                      type="text"
                      className="form-control ps-5"
                      placeholder="Nom du coach..."
                      value={search}
                      onChange={handleSearchChange}
                      style={{ height: '46px', borderRadius: '10px', border: '1px solid #dee2e6', fontSize: '0.9rem' }}
                    />
                    {search && (
                      <button
                        type="button"
                        className="btn btn-link position-absolute top-50 translate-middle-y p-0"
                        style={{ right: '10px', color: '#999', fontSize: '16px' }}
                        onClick={clearSearch}
                        aria-label="Effacer la recherche"
                      >
                        <i className="fa-solid fa-times" />
                      </button>
                    )}
                  </div>
                  <p className="text-muted fs-12 mt-2 mb-0">Recherchez par nom uniquement.</p>
                </div>
              </div>

              {/* Colonne de droite : liste + tri */}
              <div className="col-lg-9">
                <div className="showing-list mb-4">
                  <div className="row align-items-center">
                    <div className="col-lg-4">
                      <div className="show-result text-center text-lg-start">
                        <h6 className="fw-medium mb-0">
                          {loading
                            ? "Chargement..."
                            : `${sortedCoaches.length} coach${sortedCoaches.length > 1 ? 's' : ''} trouvé${sortedCoaches.length > 1 ? 's' : ''}`}
                        </h6>
                      </div>
                    </div>
                    <div className="col-lg-8">
                      <div className="show-filter add-course-info">
                        <div className="d-sm-flex justify-content-center justify-content-lg-end gap-2 mb-1 mb-lg-0">
                          <select
                            className="form-select"
                            style={{ maxWidth: '220px', height: '46px', borderRadius: '10px' }}
                            value={sortOption}
                            onChange={(e) => setSortOption(e.target.value)}
                          >
                            <option value="newest">Plus récents</option>
                            <option value="name_asc">Nom A-Z</option>
                            <option value="name_desc">Nom Z-A</option>
                            <option value="rating_desc">Meilleure note</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {loading && (
                  <p className="text-center text-muted py-5">Chargement des coachs...</p>
                )}

                {!loading && paginatedCoaches.length === 0 && (
                  <p className="text-center text-muted py-5">Aucun coach ne correspond à votre recherche.</p>
                )}

                <div className="row g-4">
                  {paginatedCoaches.map((coach) => (
                    <div className="col-md-6 col-lg-4" key={coach._id}>
                      <Link to={`/coach-profile/${coach._id}`} className="card p-3 h-100 text-decoration-none text-reset border-0 shadow-sm hover-shadow">
                        <div className="text-center">
                          {coach.Image ? (
                            <img
                              src={coach.Image}
                              alt={coach.Name}
                              className="rounded-circle mx-auto mb-3"
                              style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                            />
                          ) : (
                            <div
                              className="rounded-circle bg-secondary-transparent d-flex align-items-center justify-content-center mx-auto mb-3"
                              style={{ width: '100px', height: '100px' }}
                            >
                              <i className="fa-solid fa-user fs-24" />
                            </div>
                          )}
                        </div>
                        <span className={coach.Type === 'Psychologue' ? 'badge bg-info-transparent text-info mb-2' : 'badge bg-primary-transparent text-primary mb-2'}>
                          {coach.Type || 'Professionnel'}
                        </span>
                        <h6 className="mb-1">{coach.Name}</h6>
                        {coach.Specialities && coach.Specialities.length > 0 && (
                          <p className="fs-13 text-gray-6 mb-2">
                            {coach.Specialities.map(s => s.Category).filter((v, i, arr) => arr.indexOf(v) === i).join(', ')}
                          </p>
                        )}
                        <div className="d-flex align-items-center justify-content-between">
                          <span className="fs-13">
                            <i className="fa-solid fa-star text-warning me-1" />
                            {coach.AverageRating ? coach.AverageRating.toFixed(1) : '—'} ({coach.RatingsCount || 0})
                          </span>
                          <span className="btn btn-sm btn-outline-secondary">Voir profil</span>
                        </div>
                      </Link>
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
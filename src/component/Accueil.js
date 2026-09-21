import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { getLoggedInUser, logout } from './authHelper';

export default function Accueil() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [coaches, setCoaches] = useState([]);
  const [loadingCourses, setLoadingCourses] = useState(true);
  const [loadingCoaches, setLoadingCoaches] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    setCurrentUser(getLoggedInUser());
  }, []);

  const handleLogout = () => {
    logout();
    setCurrentUser(null);
    navigate('/');
  };

  useEffect(() => {
    const fetchCourses = async () => {
      setLoadingCourses(true);
      try {
        const response = await fetch("http://localhost:8000/course/all");
        const data = await response.json();
        const published = Array.isArray(data) ? data.filter((c) => c.Status === 'Publié') : [];
        setCourses(published);
      } catch (error) {
        console.error("Erreur lors du chargement des cours :", error);
      } finally {
        setLoadingCourses(false);
      }
    };

    const fetchCoaches = async () => {
      setLoadingCoaches(true);
      try {
        const response = await fetch("http://localhost:8000/coach/all");
        const data = await response.json();
        setCoaches(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Erreur lors du chargement des coachs :", error);
      } finally {
        setLoadingCoaches(false);
      }
    };

    fetchCourses();
    fetchCoaches();
  }, []);

  return (
    <div>
      <div className="main-wrapper">

        {/* Header simplifié */}
        <header className="header-two">
          <div className="container">
            <div className="header-nav d-flex align-items-center justify-content-between py-3">
              <Link to="/" className="header-logo">
                <img src="assets/img/logo.png" className="" alt="Logo" style={{width:300}} />
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

        {/* Hero / bannière */}
        <section className="banner-section py-5">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-7">
                <div className="banner-content">
                  <span className="hero-title text-secondary fw-medium d-inline-block mb-2">
                    Votre accompagnement au quotidien
                  </span>
                  <h1 className="mb-3">
                    Grandir, comprendre, avancer — <span className="text-secondary">avec les bons accompagnateurs</span>
                  </h1>
                  <p className="fs-lg mb-4">
                    Notre plateforme réunit des coachs et psychologues spécialisés pour vous aider à progresser,
                    que ce soit pour la réussite scolaire, la santé mentale, la vie de couple ou le développement personnel.
                  </p>
                  <div className="d-flex align-items-center gap-2">
                    <Link to="/register" className="btn btn-secondary btn-lg">Commencer maintenant</Link>
                    <a href="#nos-cours" className="btn btn-light btn-lg">Découvrir les cours</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* À propos */}
        <section className="py-5 bg-light">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6">
                <span className="fw-medium text-secondary text-decoration-underline mb-2 d-inline-block">
                  Qui sommes-nous
                </span>
                <h2 className="mb-3">Une plateforme pensée pour vous accompagner</h2>
                <p className="mb-3">
                  Notre site met en relation des personnes en quête d'accompagnement avec des coachs et
                  psycologues qualifiés, à travers des cours vidéo courts et complets, organisés par
                  thématique : réussite scolaire, santé mentale, relations de couple, ou encore inspiration
                  à travers l'analyse de parcours de sportifs et de personnalités.
                </p>
                <p className="mb-0">
                  Chaque cours est associé à un professionnel spécialisé dans sa catégorie, pour vous garantir
                  un accompagnement pertinent et de qualité, à votre rythme.
                </p>
              </div>
              <div className="col-lg-6">
                <div className="row g-3 mt-3 mt-lg-0">
                  <div className="col-6">
                    <div className="card text-center p-3 h-100">
                      <h3 className="text-secondary mb-1">{courses.length}</h3>
                      <p className="mb-0">Cours disponibles</p>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="card text-center p-3 h-100">
                      <h3 className="text-secondary mb-1">{coaches.length}</h3>
                      <p className="mb-0">Coachs & professionnels</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Nos cours */}
        <section id="nos-cours" className="py-5">
          <div className="container">
            <div className="section-header d-flex flex-wrap justify-content-between align-items-center mb-4">
              <div className="text-center text-lg-start">
                <span className="fw-medium text-secondary text-decoration-underline mb-2 d-inline-block">
                  <NavLink to="/tous-les-cours" className="text-secondary"> Nos cours</NavLink>
                </span>
                <h2>Découvrez nos formations</h2>
                <p>Un aperçu vidéo de quelques secondes pour chaque cours, pour vous aider à choisir.</p>
              </div>
              <div className="mt-3 mt-lg-0">
                <Link to="/tous-les-cours" className="btn btn-secondary">Voir tous les cours</Link>
              </div>
            </div>

            {loadingCourses && (
              <p className="text-center text-muted">Chargement des cours...</p>
            )}

            {!loadingCourses && courses.length === 0 && (
              <p className="text-center text-muted">Aucun cours publié pour le moment.</p>
            )}

            <div className="row g-4">
              {courses.slice(0, 3).map((course) => (
                <div className="col-md-6 col-lg-4" key={course._id}>
                  <div className="card h-100 overflow-hidden">
                    <div style={{ aspectRatio: '16/9', backgroundColor: '#000' }}>
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
                    <div className="card-body">
                      <div className="d-flex align-items-center justify-content-between mb-2">
                        <span className="badge bg-light text-dark border">{course.Category || 'Général'}</span>
                        {course.IsFree ? (
                          <span className="badge bg-success-transparent text-success">Gratuit</span>
                        ) : (
                          <span className="fw-semibold text-secondary">{course.Price ? `${course.Price} DT` : ''}</span>
                        )}
                      </div>
                      <h5 className="mb-2">{course.Title}</h5>
                      {course.ShortDescription && (
                        <p className="text-gray-6 mb-3">{course.ShortDescription}</p>
                      )}
                      {course.Professional && (
                        <p className="fs-13 text-gray-6 mb-0">
                          <i className="fa-solid fa-user me-1" />
                          Animé par {course.Professional}
                        </p>
                      )}
                      {!course.IsFree && (
                        <Link
                          to={`/course-details/${course._id}`}
                          className="btn btn-dark btn-sm d-inline-flex align-items-center mt-3"
                        >
                          Voir détail du cours<i className="fs-8 fas fa-angle-right ms-2" />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Nos psychologues */}
        <CoachSection
          title="Nos psychologues"
          subtitle="Des spécialistes de la santé mentale à votre écoute."
          eyebrow="Santé mentale"
          loading={loadingCoaches}
          coaches={coaches.filter((c) => c.Type === 'Psychologue')}
          emptyLabel="Aucun psychologue pour le moment."
          bgClass="bg-light"
          viewAllTo="/tous-les-coachs?type=Psychologue"
        />

        {/* Nos coachs de vie */}
        <CoachSection
          title="Nos coachs de vie"
          subtitle="Pour vous accompagner dans votre développement personnel."
          eyebrow="Coaching"
          loading={loadingCoaches}
          coaches={coaches.filter((c) => c.Type === 'Coach de vie')}
          emptyLabel="Aucun coach de vie pour le moment."
          bgClass=""
          viewAllTo="/tous-les-coachs?type=Coach de vie"
        />

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

// Bloc réutilisable pour afficher une liste de coachs (psychologues ou coachs de vie)
function CoachSection({ title, subtitle, eyebrow, loading, coaches, emptyLabel, bgClass, viewAllTo }) {
  const visibleCoaches = coaches.slice(0, 3);

  return (
    <section className={`py-5 ${bgClass}`}>
      <div className="container">
        <div className="section-header d-flex flex-wrap justify-content-between align-items-center mb-4">
          <div className="text-center text-lg-start">
            <span className="fw-medium text-secondary text-decoration-underline mb-2 d-inline-block">
              {eyebrow}
            </span>
            <h2>{title}</h2>
            <p>{subtitle}</p>
          </div>
          {viewAllTo && (
            <div className="mt-3 mt-lg-0">
              <Link to={viewAllTo} className="btn btn-secondary">Voir tous</Link>
            </div>
          )}
        </div>

        {loading && (
          <p className="text-center text-muted">Chargement...</p>
        )}

        {!loading && coaches.length === 0 && (
          <p className="text-center text-muted">{emptyLabel}</p>
        )}

        <div className="row g-4 justify-content-center">
          {visibleCoaches.map((coach) => (
            <div className="col-6 col-md-4 col-lg-3 text-center" key={coach._id}>
              <Link to={`/coach-profile/${coach._id}`} className="card p-3 h-100 text-decoration-none text-reset">
                {coach.Image ? (
                  <img
                    src={coach.Image}
                    alt={coach.Name}
                    className="rounded-circle mx-auto mb-3"
                    style={{ width: '110px', height: '110px', objectFit: 'cover' }}
                  />
                ) : (
                  <div
                    className="rounded-circle bg-secondary-transparent d-flex align-items-center justify-content-center mx-auto mb-3"
                    style={{ width: '110px', height: '110px' }}
                  >
                    <i className="fa-solid fa-user fs-24" />
                  </div>
                )}
                <h6 className="mb-1">{coach.Name}</h6>
                {coach.Specialities && coach.Specialities.length > 0 && (
                  <p className="fs-13 text-gray-6 mb-0">
                    {coach.Specialities.map((s) => s.Category).filter((v, i, arr) => arr.indexOf(v) === i).join(', ')}
                  </p>
                )}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
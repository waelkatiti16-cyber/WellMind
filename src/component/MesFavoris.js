import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getLoggedInUser, getFavorites, toggleFavoriteCoach, toggleFavoriteCourse } from './authHelper';

export default function MesFavoris() {
  const navigate = useNavigate();

  const [coaches, setCoaches] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadFavorites = async () => {
      const user = getLoggedInUser();
      if (!user) {
        navigate('/loginuser');
        return;
      }
      try {
        const data = await getFavorites(); // { coaches: [...], courses: [...] }
        setCoaches(data.coaches || []);
        setCourses(data.courses || []);
      } catch (err) {
        console.error("Erreur chargement favoris", err);
        setError("Impossible de charger vos favoris.");
      } finally {
        setLoading(false);
      }
    };
    loadFavorites();
  }, [navigate]);

  const removeFavoriteCoach = async (coachId) => {
    try {
      const updated = await toggleFavoriteCoach(coachId);
      if (updated) {
        setCoaches(coaches.filter(c => c._id !== coachId));
      }
    } catch (err) {
      console.error(err);
      setError("Erreur lors de la suppression du coach.");
    }
  };

  const removeFavoriteCourse = async (courseId) => {
    try {
      const updated = await toggleFavoriteCourse(courseId);
      if (updated) {
        setCourses(courses.filter(c => c._id !== courseId));
      }
    } catch (err) {
      console.error(err);
      setError("Erreur lors de la suppression du cours.");
    }
  };

  if (loading) {
    return (
      <div className="content">
        <div className="container py-5 text-center text-muted">
          <div className="spinner-border text-secondary" role="status">
            <span className="visually-hidden">Chargement...</span>
          </div>
          <p className="mt-2">Chargement de vos favoris...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="breadcrumb-bar text-center">
        <div className="container">
          <h2 className="breadcrumb-title mb-2">Vos favoris et intérêts</h2>
            <ol className="breadcrumb justify-content-center mb-0">
                              <li className="breadcrumb-item"><Link to="/">Accueil</Link></li>
                              <li className="breadcrumb-item active" aria-current="page">Tous les cours</li>
                            </ol>
        </div>
      </div>

      <div className="content">
        <div className="container">
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          {/* Section coachs favoris */}
          <h4 className="mb-4">Coachs favoris</h4>
          {coaches.length === 0 ? (
            <div className="text-center py-4">
              <i className="fa-regular fa-heart fs-24 text-muted mb-3 d-block" />
              <p className="text-muted mb-3">Vous n'avez pas encore de coach favori.</p>
              <Link to="/accueil" className="btn btn-secondary">Découvrir nos coachs</Link>
            </div>
          ) : (
            <div className="row g-4 mb-5">
              {coaches.map((coach) => (
                <div className="col-md-6 col-lg-4" key={coach._id}>
                  <div className="card p-3 h-100 position-relative">
                    <button
                      type="button"
                      onClick={() => removeFavoriteCoach(coach._id)}
                      aria-label="Retirer des favoris"
                      className="btn btn-light rounded-circle d-flex align-items-center justify-content-center position-absolute"
                      style={{ width: '36px', height: '36px', top: '10px', right: '10px', zIndex: 1 }}
                    >
                      <i className="fa-solid fa-heart" style={{ color: '#e63757' }} />
                    </button>

                    <Link to={`/coach-profile/${coach._id}`} className="text-decoration-none text-reset text-center">
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
                      <span className={coach.Type === 'Psychologue' ? 'badge bg-info-transparent text-info mb-2' : 'badge bg-primary-transparent text-primary mb-2'}>
                        {coach.Type || 'Professionnel'}
                      </span>
                      <h6 className="mb-0">{coach.Name}</h6>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Section cours intéressants */}
          <h4 className="mb-4">Cours intéressants</h4>
          {courses.length === 0 ? (
            <div className="text-center py-4">
              <i className="fa-regular fa-bookmark fs-24 text-muted mb-3 d-block" />
              <p className="text-muted mb-3">Vous n'avez pas encore marqué de cours comme intéressant.</p>
              <Link to="/tous-les-cours" className="btn btn-secondary">Parcourir les cours</Link>
            </div>
          ) : (
            <div className="row g-4">
              {courses.map((course) => (
                <div className="col-md-6 col-lg-4" key={course._id}>
                  <div className="card p-3 h-100 position-relative">
                    <button
                      type="button"
                      onClick={() => removeFavoriteCourse(course._id)}
                      aria-label="Retirer des intérêts"
                      className="btn btn-light rounded-circle d-flex align-items-center justify-content-center position-absolute"
                      style={{ width: '36px', height: '36px', top: '10px', right: '10px', zIndex: 1 }}
                    >
                      <i className="fa-solid fa-bookmark" style={{ color: '#e63757' }} />
                    </button>

                    <Link to={`/course-details/${course._id}`} className="text-decoration-none text-reset text-center">
                      {course.Image ? (
                        <img
                          src={course.Image}
                          alt={course.Title}
                          className="rounded mx-auto mb-3"
                          style={{ width: '100%', height: '150px', objectFit: 'cover' }}
                        />
                      ) : (
                        <div
                          className="rounded bg-secondary-transparent d-flex align-items-center justify-content-center mx-auto mb-3"
                          style={{ width: '100%', height: '150px' }}
                        >
                          <i className="fa-solid fa-book fs-24" />
                        </div>
                      )}
                      <span className="badge bg-warning mb-2">{course.Category || 'Cours'}</span>
                      <h6 className="mb-0">{course.Title}</h6>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
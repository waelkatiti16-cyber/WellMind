import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getLoggedInUser, getFavorites, saveFavorites } from './authHelper';

export default function CoachProfile() {
  const { id } = useParams();

  const [coach, setCoach] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  useEffect(() => {
    const fetchCoach = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await fetch(`http://localhost:8000/coach/${id}`);
        const data = await response.json();

        if (!response.ok) {
          setError(data.message || "Impossible de charger ce profil");
          return;
        }

        setCoach(data);
      } catch (err) {
        console.error(err);
        setError("Erreur de connexion au serveur");
      } finally {
        setLoading(false);
      }
    };

    fetchCoach();
  }, [id]);

  useEffect(() => {
    setIsFavorite(getFavorites().includes(id));
  }, [id]);

  const toggleFavorite = () => {
    const user = getLoggedInUser();

    if (!user) {
      setShowLoginPrompt(true);
      return;
    }

    const favorites = getFavorites();
    let updated;

    if (favorites.includes(id)) {
      updated = favorites.filter((favId) => favId !== id);
      setIsFavorite(false);
    } else {
      updated = [...favorites, id];
      setIsFavorite(true);
    }

    saveFavorites(updated);
  };

  if (loading) {
    return (
      <div className="content">
        <div className="container py-5 text-center text-muted">Chargement du profil...</div>
      </div>
    );
  }

  if (error || !coach) {
    return (
      <div className="content">
        <div className="container py-5 text-center">
          <p className="text-danger mb-3">{error || "Profil introuvable"}</p>
          <Link to="/accueil" className="btn btn-secondary">Retour à l'accueil</Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="breadcrumb-bar text-center">
        <div className="container">
          <h2 className="breadcrumb-title mb-2">{coach.Name}</h2>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb justify-content-center mb-0">
              <li className="breadcrumb-item"><Link to="/accueil">Accueil</Link></li>
              <li className="breadcrumb-item active" aria-current="page">{coach.Name}</li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="content">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="card p-4">
                <div className="row align-items-center g-4">

                  {/* Photo + favori */}
                  <div className="col-md-4 text-center">
                    <div className="position-relative d-inline-block">
                      {coach.Image ? (
                        <img
                          src={coach.Image}
                          alt={coach.Name}
                          className="rounded-circle"
                          style={{ width: '180px', height: '180px', objectFit: 'cover' }}
                        />
                      ) : (
                        <div
                          className="rounded-circle bg-secondary-transparent d-flex align-items-center justify-content-center mx-auto"
                          style={{ width: '180px', height: '180px' }}
                        >
                          <i className="fa-solid fa-user fs-24" />
                        </div>
                      )}

                      <button
                        type="button"
                        onClick={toggleFavorite}
                        aria-label={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
                        className="btn btn-light rounded-circle d-flex align-items-center justify-content-center position-absolute"
                        style={{
                          width: '40px',
                          height: '40px',
                          bottom: '4px',
                          right: '4px',
                          boxShadow: '0 2px 6px rgba(0,0,0,0.15)'
                        }}
                      >
                        <i
                          className={isFavorite ? "fa-solid fa-heart" : "fa-regular fa-heart"}
                          style={{ color: isFavorite ? '#e63757' : '#6c757d' }}
                        />
                      </button>
                    </div>
                  </div>

                  {/* Infos principales */}
                  <div className="col-md-8">
                    <span className={coach.Type === 'Psychologue' ? 'badge bg-info-transparent text-info mb-2' : 'badge bg-primary-transparent text-primary mb-2'}>
                      {coach.Type || 'Professionnel'}
                    </span>
                    <h3 className="mb-2">{coach.Name}</h3>

                    {coach.Bio && (
                      <p className="text-gray-6 mb-3">{coach.Bio}</p>
                    )}

                    {coach.Cv && (
                      <a
                        href={coach.Cv}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-outline-secondary d-inline-flex align-items-center"
                      >
                        <i className="fa-solid fa-file-pdf me-2" />
                        Voir le CV
                      </a>
                    )}
                  </div>
                </div>

                <hr className="my-4" />

                {/* Spécialités */}
                <div>
                  <h5 className="mb-3">Domaines d'accompagnement</h5>
                  {coach.Specialities && coach.Specialities.length > 0 ? (
                    <div className="d-flex flex-wrap gap-2">
                      {coach.Specialities.map((s, i) => (
                        <span key={i} className="badge bg-light text-dark border p-2">
                          {s.Category}
                          {s.SousCategorie && ` — ${s.SousCategorie}`}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted mb-0">Aucune spécialité renseignée.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Invite à se connecter pour ajouter un favori */}
      {showLoginPrompt && (
        <div
          className="modal fade show"
          style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}
          tabIndex={-1}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-body p-4 text-center">
                <div className="text-secondary fs-24 mb-2">
                  <i className="fa-regular fa-heart" />
                </div>
                <h5 className="mb-2">Connectez-vous pour ajouter ce coach à vos favoris</h5>
                <p className="text-gray-6 mb-4">
                  Vous devez avoir un compte pour sauvegarder vos coachs préférés.
                </p>
                <div className="d-flex align-items-center justify-content-center gap-2">
                  <button
                    type="button"
                    className="btn btn-light"
                    onClick={() => setShowLoginPrompt(false)}
                  >
                    Annuler
                  </button>
                  <Link to="/loginuser" className="btn btn-secondary">
                    Se connecter
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

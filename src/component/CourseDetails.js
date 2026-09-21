import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getLoggedInUser, toggleFavoriteCourse } from './authHelper';

const PURCHASES_KEY = 'purchasedCourses'; // simulation locale uniquement pour les achats

// --- Utilitaires pour les achats (simulation locale) ---
function getPurchases() {
  try {
    const stored = localStorage.getItem(PURCHASES_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function savePurchase(courseId) {
  const purchases = getPurchases();
  if (!purchases.includes(courseId)) {
    purchases.push(courseId);
    localStorage.setItem(PURCHASES_KEY, JSON.stringify(purchases));
  }
}

export default function CourseDetails() {
  const { id } = useParams();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [isPurchased, setIsPurchased] = useState(false);
  const [isInterested, setIsInterested] = useState(false);

  useEffect(() => {
    const fetchCourse = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await fetch(`http://localhost:8000/course/${id}`);
        const data = await response.json();

        if (!response.ok) {
          setError(data.message || "Impossible de charger ce cours");
          return;
        }

        setCourse(data);
      } catch (err) {
        console.error(err);
        setError("Erreur de connexion au serveur");
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  useEffect(() => {
    // Initialisation de l'état d'achat (local)
    setIsPurchased(getPurchases().includes(id));

    // Initialisation de l'état "intéressé" via l'API backend
    const checkInterest = async () => {
      const user = getLoggedInUser();
      if (!user) return;
      try {
        const res = await fetch(`http://localhost:8000/favorites?userId=${user._id}`);
        if (res.ok) {
          const data = await res.json();
          const courseIds = data.courses.map(c => c._id);
          setIsInterested(courseIds.includes(id));
        }
      } catch (err) {
        console.error("Erreur vérification intérêt", err);
      }
    };
    checkInterest();
  }, [id]);

  const isLoggedIn = Boolean(getLoggedInUser());

  const handlePayClick = () => {
    if (!isLoggedIn) {
      setShowLoginPrompt(true);
      return;
    }
    setShowPaymentModal(true);
  };

  const handleFakePaymentConfirm = () => {
    savePurchase(id);
    setIsPurchased(true);
    setShowPaymentModal(false);
  };
const handleInterestClick = async () => {
  if (!isLoggedIn) {
    setShowLoginPrompt(true);
    return;
  }
  const updated = await toggleFavoriteCourse(id);
  if (Array.isArray(updated)) {
    setIsInterested(updated.includes(id));
  }
};

  if (loading) {
    return (
      <div className="content">
        <div className="container py-5 text-center text-muted">Chargement du cours...</div>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="content">
        <div className="container py-5 text-center">
          <p className="text-danger mb-3">{error || "Cours introuvable"}</p>
          <Link to="/tous-les-cours" className="btn btn-secondary">Retour aux cours</Link>
        </div>
      </div>
    );
  }

  const hasAccess = course.IsFree || isPurchased;

  return (
    <div>
      <div className="breadcrumb-bar text-center">
        <div className="container">
          <h2 className="breadcrumb-title mb-2">Détail du cours</h2>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb justify-content-center mb-0">
              <li className="breadcrumb-item"><Link to="/accueil">Accueil</Link></li>
              <li className="breadcrumb-item"><Link to="/tous-les-cours">Cours</Link></li>
              <li className="breadcrumb-item active" aria-current="page">{course.Title}</li>
            </ol>
          </nav>
        </div>
      </div>

      <section className="course-details-two py-4">
        <div className="container">

          {/* Bandeau du haut */}
          <div className="row mb-4">
            <div className="col-12">
              <div className="card bg-light">
                <div className="card-body d-lg-flex align-items-center">

                  <div className="position-relative flex-shrink-0" style={{ width: '260px' }}>
                    <div
                      onClick={() => course.VideoComplete && setShowVideoModal(true)}
                      style={{ cursor: course.VideoComplete ? 'pointer' : 'default', position: 'relative' }}
                    >
                      {course.VideoCourte ? (
                        <video
                          src={course.VideoCourte}
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="rounded-2"
                          style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover' }}
                        />
                      ) : (
                        <div
                          className="rounded-2 bg-dark d-flex align-items-center justify-content-center"
                          style={{ width: '100%', aspectRatio: '4/3' }}
                        >
                          <i className="fa-solid fa-video text-white fs-24" />
                        </div>
                      )}
                      {course.VideoComplete && (
                        <div
                          className="position-absolute top-50 start-50 translate-middle bg-white rounded-circle d-flex align-items-center justify-content-center"
                          style={{ width: '50px', height: '50px' }}
                        >
                          <i className="ti ti-player-play-filled fs-24 text-secondary" />
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="w-100 ps-lg-4 pt-3 pt-lg-0">
                    <h3 className="mb-2">{course.Title}</h3>
                    {course.ShortDescription && (
                      <p className="fs-14 mb-3">{course.ShortDescription}</p>
                    )}

                    <div className="d-flex align-items-center gap-2 gap-sm-3 flex-wrap mb-3">
                      {course.Category && (
                        <span className="badge badge-sm rounded-pill bg-warning fs-12">{course.Category}</span>
                      )}
                      {course.Level && (
                        <p className="fw-medium d-flex align-items-center mb-0">
                          <i className="fa-solid fa-chart-simple me-2" />{course.Level}
                        </p>
                      )}
                      {course.Duration && (
                        <p className="fw-medium d-flex align-items-center mb-0">
                          <i className="fa-regular fa-clock me-2" />{course.Duration}
                        </p>
                      )}
                      {course.Language && (
                        <p className="fw-medium d-flex align-items-center mb-0">
                          <i className="fa-solid fa-globe me-2" />{course.Language}
                        </p>
                      )}
                    </div>

                    {course.Professional && (
                      <div className="d-flex align-items-center">
                        <div className="avatar avatar-lg bg-secondary-transparent rounded-circle d-flex align-items-center justify-content-center">
                          <i className="fa-solid fa-user" />
                        </div>
                        <div className="ms-2">
                          <h5 className="fs-18 fw-semibold mb-0">{course.Professional}</h5>
                          <p className="fs-14 mb-0">Coach / Professionnel</p>
                        </div>
                      </div>
                    )}
                  </div>

                </div>
              </div>
            </div>
          </div>

          <div className="row">
            {/* Colonne principale */}
            <div className="col-lg-8">
              <div className="card mb-4">
                <div className="card-body">
                  <h5 className="mb-3">Aperçu</h5>

                  {course.Description && (
                    <>
                      <h6 className="mb-2">Description du cours</h6>
                      <p style={{ whiteSpace: 'pre-line' }}>{course.Description}</p>
                    </>
                  )}

                  {course.Prerequisites && (
                    <>
                      <h6 className="mb-2 mt-3">Pré-requis</h6>
                      <p className="mb-0" style={{ whiteSpace: 'pre-line' }}>{course.Prerequisites}</p>
                    </>
                  )}

                  {course.Tags && course.Tags.length > 0 && (
                    <>
                      <h6 className="mb-2 mt-3">Ce que vous allez aborder</h6>
                      <div className="d-flex flex-wrap gap-2">
                        {course.Tags.map((tag, i) => (
                          <span key={i} className="badge bg-light text-dark border">{tag}</span>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>

              {course.Professional && (
                <div className="card mb-4">
                  <div className="card-body">
                    <h5 className="subs-title mb-3">À propos du professionnel</h5>
                    <div className="d-flex align-items-center">
                      <div className="avatar avatar-lg bg-secondary-transparent rounded-circle d-flex align-items-center justify-content-center">
                        <i className="fa-solid fa-user" />
                      </div>
                      <div className="ms-2">
                        <span className="name-link fw-semibold">{course.Professional}</span>
                        <p className="mb-0 fs-14">Spécialiste — {course.Category}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Colonne latérale */}
            <div className="col-lg-4">
              <div className="card mb-4">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    {course.IsFree ? (
                      <h2 className="text-success fs-30 mb-0">GRATUIT</h2>
                    ) : (
                      <h2 className="text-secondary fs-30 mb-0">{course.Price ? `${course.Price} DT` : ''}</h2>
                    )}
                  </div>

                  {/* Bouton "Intéressant" */}
                  <button
                    type="button"
                    className={`btn w-100 mb-2 ${isInterested ? 'btn-outline-secondary' : 'btn-outline-primary'}`}
                    onClick={handleInterestClick}
                  >
                    <i className={`fa-${isInterested ? 'solid fa-heart' : 'regular fa-heart'} me-2`} />
                    {isInterested ? 'Retirer de mes intérêts' : 'Marquer comme intéressant'}
                  </button>

                  {hasAccess ? (
                    <button type="button" className="btn btn-secondary w-100">
                      Commencer le cours
                    </button>
                  ) : (
                    <button type="button" className="btn btn-secondary w-100" onClick={handlePayClick}>
                      <i className="fa-solid fa-lock me-2" />
                      Payer pour accéder au cours
                    </button>
                  )}

                  {isPurchased && !course.IsFree && (
                    <p className="fs-13 text-success text-center mt-2 mb-0">
                      <i className="fa-solid fa-circle-check me-1" />
                      Paiement simulé effectué
                    </p>
                  )}
                </div>
              </div>

              <div className="card">
                <div className="card-body cou-features">
                  <h5 className="subs-title mb-3">Caractéristiques du cours</h5>
                  <ul className="list-unstyled mb-0">
                    <li className="mb-2">
                      <p className="mb-0"><i className="fa-solid fa-layer-group me-2" />Catégorie : {course.Category || '—'}</p>
                    </li>
                    {course.SousCategorie && (
                      <li className="mb-2">
                        <p className="mb-0"><i className="fa-solid fa-tag me-2" />Sous-catégorie : {course.SousCategorie}</p>
                      </li>
                    )}
                    <li className="mb-2">
                      <p className="mb-0"><i className="fa-solid fa-chart-simple me-2" />Niveau : {course.Level || '—'}</p>
                    </li>
                    <li className="mb-2">
                      <p className="mb-0"><i className="fa-regular fa-clock me-2" />Durée : {course.Duration || '—'}</p>
                    </li>
                    <li>
                      <p className="mb-0"><i className="fa-solid fa-globe me-2" />Langue : {course.Language || '—'}</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Modal : vidéo complète */}
      {showVideoModal && (
        <div
          className="modal fade show"
          style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.8)' }}
          onClick={() => setShowVideoModal(false)}
        >
          <div className="modal-dialog modal-lg modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content bg-black">
              <button
                type="button"
                className="btn-close btn-close-white position-absolute top-0 end-0 m-3"
                style={{ zIndex: 1 }}
                onClick={() => setShowVideoModal(false)}
              />
              <video src={course.VideoComplete} controls autoPlay style={{ width: '100%' }} />
            </div>
          </div>
        </div>
      )}

      {/* Modal : paiement simulé */}
      {showPaymentModal && (
        <FakePaymentModal
          price={course.Price}
          onClose={() => setShowPaymentModal(false)}
          onConfirm={handleFakePaymentConfirm}
        />
      )}

      {/* Modal : invite à se connecter */}
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
                  <i className="fa-solid fa-lock" />
                </div>
                <h5 className="mb-2">Connectez-vous pour continuer</h5>
                <p className="text-gray-6 mb-4">
                  Vous devez avoir un compte pour payer ou enregistrer ce cours dans vos intérêts.
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

// --- Simulation de paiement (inchangée) ---
function FakePaymentModal({ price, onClose, onConfirm }) {
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [processing, setProcessing] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      onConfirm();
    }, 1200);
  };

  return (
    <div
      className="modal fade show"
      style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}
      tabIndex={-1}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="mb-0">Paiement (simulation)</h5>
            <button type="button" className="btn-close" onClick={onClose} />
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="alert alert-warning fs-13" role="alert">
                <i className="fa-solid fa-triangle-exclamation me-1" />
                Ceci est une simulation de paiement à des fins de démonstration.
                Aucune carte réelle n'est débitée.
              </div>

              <div className="mb-3">
                <label className="form-label">Montant à régler</label>
                <input type="text" className="form-control" value={price ? `${price} DT` : ''} disabled />
              </div>

              <div className="mb-3">
                <label className="form-label">Numéro de carte</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="4242 4242 4242 4242"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  maxLength={19}
                  required
                />
              </div>

              <div className="row">
                <div className="col-6">
                  <div className="mb-3">
                    <label className="form-label">Expiration</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="MM/AA"
                      value={expiry}
                      onChange={(e) => setExpiry(e.target.value)}
                      maxLength={5}
                      required
                    />
                  </div>
                </div>
                <div className="col-6">
                  <div className="mb-3">
                    <label className="form-label">CVV</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="123"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value)}
                      maxLength={3}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-light" onClick={onClose} disabled={processing}>
                Annuler
              </button>
              <button type="submit" className="btn btn-secondary" disabled={processing}>
                {processing ? "Traitement..." : "Confirmer le paiement"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
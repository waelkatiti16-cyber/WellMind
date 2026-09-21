import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getLoggedInUser, toggleFavoriteCoach } from './authHelper';

export default function CoachProfile() {
  const { id } = useParams();
  const navigate = useNavigate(); // Pour la redirection vers le paiement

  const [coach, setCoach] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  const [hoverStars, setHoverStars] = useState(0);
  const [ratingMessage, setRatingMessage] = useState('');
  const [submittingRating, setSubmittingRating] = useState(false);

  // États du chatbot
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);

  const currentUser = getLoggedInUser();

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

  useEffect(() => {
    fetchCoach();
  }, [id]);

  // Initialisation de l'état favori via l'API
  useEffect(() => {
    const checkFavorite = async () => {
      const user = getLoggedInUser();
      if (!user) return;
      try {
        const res = await fetch(`http://localhost:8000/favorites?userId=${user._id}`);
        if (res.ok) {
          const data = await res.json();
          const coachIds = data.coaches.map(c => c._id);
          setIsFavorite(coachIds.includes(id));
        }
      } catch (err) {
        console.error("Erreur vérification favori", err);
      }
    };
    checkFavorite();
  }, [id]);

  useEffect(() => {
    if (!ratingMessage) return;
    const timer = setTimeout(() => setRatingMessage(''), 3000);
    return () => clearTimeout(timer);
  }, [ratingMessage]);

  // Initialisation des messages du chatbot quand l'utilisateur ouvre la fenêtre
  useEffect(() => {
    if (!isChatOpen) return;
    const messages = [];
    if (currentUser) {
      messages.push({
        type: 'bot',
        text: `Bonjour ${currentUser.Name} ! Vous pouvez contacter ${coach?.Name || 'ce coach'} et découvrir nos offres d'abonnement pour planifier vos séances en ligne.`,
      });
    } else {
      messages.push({
        type: 'bot',
        text: "Bonjour ! Pour contacter ce coach et découvrir les offres d'abonnement, veuillez vous connecter.",
      });
    }
    setChatMessages(messages);
  }, [isChatOpen, currentUser, coach]);

  const toggleFavorite = async () => {
    if (!currentUser) {
      setShowLoginPrompt(true);
      return;
    }
    const updated = await toggleFavoriteCoach(id);
    if (updated) {
      setIsFavorite(updated.includes(id));
    }
  };

  // --- Notation ---
  const ratings = coach?.Ratings || [];
  const averageRating = coach?.AverageRating || 0;
  const ratingsCount = coach?.RatingsCount ?? ratings.length;
  const myRating = currentUser
    ? ratings.find((r) => r.UserId === currentUser._id)?.Stars || 0
    : 0;

  const handleRate = async (stars) => {
    if (!currentUser) {
      setShowLoginPrompt(true);
      return;
    }

    setSubmittingRating(true);
    try {
      const response = await fetch(`http://localhost:8000/coach/${id}/rate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          UserId: currentUser._id,
          UserName: currentUser.Name,
          Stars: stars
        })
      });

      const data = await response.json();

      if (!response.ok) {
        setRatingMessage(data.message || "Erreur lors de l'enregistrement de la note");
        return;
      }

      setCoach(data.coach);
      setRatingMessage("Merci pour votre note !");
    } catch (err) {
      console.error(err);
      setRatingMessage("Erreur de connexion au serveur");
    } finally {
      setSubmittingRating(false);
    }
  };

  // --- Chatbot : redirection vers la page de paiement ---
  const handlePlanSelect = (plan) => {
    navigate('/paiement', { state: { plan, coach } });
  };

  const openChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  // Exemples de paliers d'abonnement (à adapter selon vos données)
  const subscriptionPlans = [
    { id: 1, name: 'Découverte', sessions: 1, price: '30€' },
    { id: 2, name: 'Suivi', sessions: 5, price: '120€' },
    { id: 3, name: 'Premium', sessions: 10, price: '200€' },
  ];

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
          <Link to="/" className="btn btn-secondary">Retour à l'accueil</Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* ==================== CONTENU ORIGINAL DU PROFIL ==================== */}
      <div className="breadcrumb-bar text-center">
        <div className="container">
          <h2 className="breadcrumb-title mb-2">{coach.Name}</h2>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb justify-content-center mb-0">
              <li className="breadcrumb-item"><Link to="/">Accueil</Link></li>
              <li className="breadcrumb-item active" aria-current="page">{coach.Name}</li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="content">
        <div className="container">

          {/* Bannière profil */}
          <div className="instructor-profile">
            <div className="instructor-profile-bg">
              <img src="assets/img/bg/card-bg-01.png" className="instructor-profile-bg-1" alt="" />
            </div>
            <div className="row align-items-center row-gap-3">
              <div className="col-md-7">
                <div className="d-flex align-items-center">
                  <span className="avatar flex-shrink-0 avatar-xxl avatar-rounded me-3 border border-white border-3 position-relative">
                    {coach.Image ? (
                      <img src={coach.Image} alt={coach.Name} />
                    ) : (
                      <span className="w-100 h-100 d-flex align-items-center justify-content-center bg-secondary-transparent">
                        <i className="fa-solid fa-user fs-24" />
                      </span>
                    )}
                  </span>
                  <div>
                    <h5 className="mb-1 text-white">{coach.Name}</h5>
                    <p className="text-light mb-1">{coach.Type}</p>
                    <div className="d-flex align-items-center">
                      <StarDisplay value={averageRating} />
                      <span className="text-light ms-2 fs-13">
                        {averageRating > 0 ? averageRating.toFixed(1) : '—'} ({ratingsCount} avis)
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-5">
                <div className="d-flex align-items-center flex-wrap gap-3 justify-content-md-end">
                  <button
                    type="button"
                    onClick={toggleFavorite}
                    className="btn btn-white rounded-pill d-inline-flex align-items-center"
                  >
                    <i
                      className={isFavorite ? "fa-solid fa-heart me-2" : "fa-regular fa-heart me-2"}
                      style={{ color: isFavorite ? '#e63757' : 'inherit' }}
                    />
                    {isFavorite ? "Dans vos favoris" : "Ajouter aux favoris"}
                  </button>
                  {coach.Cv && (
                    <a href={coach.Cv} target="_blank" rel="noopener noreferrer" className="btn btn-secondary rounded-pill">
                      Voir le CV
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-8">
              <div className="card">
                <div className="card-body">
                  <h5 className="fs-18 pb-3 border-bottom mb-3">À propos</h5>

                  {coach.Bio ? (
                    <p className="text-gray-6 mb-4">{coach.Bio}</p>
                  ) : (
                    <p className="text-muted mb-4">Aucune biographie renseignée.</p>
                  )}

                  <h6 className="mb-2">Domaines d'accompagnement</h6>
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

              {/* Avis / notes des clients */}
              <div className="card">
                <div className="card-body">
                  <h5 className="fs-18 pb-3 border-bottom mb-3">Avis des clients</h5>

                  {ratings.length === 0 ? (
                    <p className="text-muted mb-0">Aucun avis pour le moment.</p>
                  ) : (
                    <ul className="list-unstyled mb-0">
                      {ratings.slice().reverse().map((r, i) => (
                        <li key={i} className="d-flex align-items-center justify-content-between border-bottom py-2">
                          <span>{r.UserName || 'Utilisateur'}</span>
                          <StarDisplay value={r.Stars} />
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>

            {/* Colonne latérale : noter le coach */}
            <div className="col-lg-4">
              <div className="card">
                <div className="card-body text-center">
                  <h6 className="mb-2">Note moyenne</h6>
                  <h2 className="text-secondary mb-1">{averageRating > 0 ? averageRating.toFixed(1) : '—'}</h2>
                  <StarDisplay value={averageRating} size="fs-20" />
                  <p className="text-muted fs-13 mt-2 mb-4">{ratingsCount} avis</p>

                  <hr />

                  <h6 className="mb-2">{myRating ? "Votre note" : "Donnez votre note"}</h6>
                  <div className="d-flex justify-content-center mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <i
                        key={star}
                        className={`fa-solid fa-star me-1 fs-24 ${
                          (hoverStars || myRating) >= star ? 'text-warning' : 'text-light'
                        }`}
                        style={{ cursor: submittingRating ? 'default' : 'pointer' }}
                        onMouseEnter={() => setHoverStars(star)}
                        onMouseLeave={() => setHoverStars(0)}
                        onClick={() => !submittingRating && handleRate(star)}
                      />
                    ))}
                  </div>

                  {!currentUser && (
                    <p className="fs-13 text-muted mb-0">Connectez-vous pour noter ce professionnel.</p>
                  )}

                  {ratingMessage && (
                    <p className="fs-13 text-success mb-0">{ratingMessage}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
      {/* ==================== FIN DU CONTENU ORIGINAL ==================== */}

      {/* ==================== CHATBOT (sans formulaire de paiement) ==================== */}
      {/* Bouton flottant du chatbot */}
      <button
        onClick={openChat}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          backgroundColor: '#e63757',
          color: '#fff',
          border: 'none',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          cursor: 'pointer',
          zIndex: 1050,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '24px',
        }}
      >
        <i className={`fa-solid ${isChatOpen ? 'fa-times' : 'fa-comment-dots'}`} />
      </button>

      {/* Fenêtre du chatbot */}
      {isChatOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: '90px',
            right: '20px',
            width: '340px',
            maxHeight: '500px',
            backgroundColor: '#fff',
            borderRadius: '12px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
            zIndex: 1050,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* En-tête */}
          <div
            style={{
              backgroundColor: '#e63757',
              color: '#fff',
              padding: '12px 16px',
              fontSize: '16px',
              fontWeight: '600',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <span>Coach Assistant</span>
            <button
              onClick={() => setIsChatOpen(false)}
              style={{
                background: 'none',
                border: 'none',
                color: '#fff',
                fontSize: '18px',
                cursor: 'pointer',
              }}
            >
              ×
            </button>
          </div>

          {/* Zone de contenu défilante */}
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '12px',
            }}
          >
            {/* Messages du chat */}
            {chatMessages.map((msg, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  justifyContent: msg.type === 'user' ? 'flex-end' : 'flex-start',
                  marginBottom: '8px',
                }}
              >
                <div
                  style={{
                    maxWidth: '80%',
                    padding: '8px 12px',
                    borderRadius: '16px',
                    backgroundColor: msg.type === 'user' ? '#e63757' : '#f1f3f5',
                    color: msg.type === 'user' ? '#fff' : '#333',
                    fontSize: '14px',
                    lineHeight: '1.4',
                    wordBreak: 'break-word',
                  }}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {/* Affichage des paliers d'abonnement si connecté */}
            {currentUser && (
              <div style={{ marginTop: '8px' }}>
                <p style={{ fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>
                  Choisissez votre plan :
                </p>
                {subscriptionPlans.map((plan) => (
                  <button
                    key={plan.id}
                    onClick={() => handlePlanSelect(plan)}
                    style={{
                      display: 'block',
                      width: '100%',
                      textAlign: 'left',
                      padding: '8px 12px',
                      marginBottom: '6px',
                      border: '1px solid #ddd',
                      borderRadius: '8px',
                      backgroundColor: '#fff',
                      cursor: 'pointer',
                      transition: 'background-color 0.2s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f8f9fa')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#fff')}
                  >
                    <strong>{plan.name}</strong> – {plan.sessions} séance{plan.sessions > 1 ? 's' : ''} – {plan.price}
                  </button>
                ))}
              </div>
            )}

            {/* Lien de connexion si non connecté */}
            {!currentUser && (
              <div style={{ marginTop: '12px', textAlign: 'center' }}>
                <Link
                  to="/loginuser"
                  className="btn btn-secondary"
                  style={{ fontSize: '14px', padding: '6px 16px' }}
                >
                  Se connecter
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
      {/* ==================== FIN CHATBOT ==================== */}

      {/* Modale d'invite à se connecter (existante) */}
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
                <h5 className="mb-2">Connectez-vous pour continuer</h5>
                <p className="text-gray-6 mb-4">
                  Vous devez avoir un compte pour ajouter un favori ou laisser une note.
                </p>
                <div className="d-flex align-items-center justify-content-center gap-2">
                  <button type="button" className="btn btn-light" onClick={() => setShowLoginPrompt(false)}>
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

// Affichage en lecture seule d'une note en étoiles (pleines / vides)
function StarDisplay({ value, size = 'fs-14' }) {
  return (
    <span>
      {[1, 2, 3, 4, 5].map((star) => (
        <i
          key={star}
          className={`fa-solid fa-star me-1 ${size} ${value >= star ? 'text-warning' : 'text-light'}`}
        />
      ))}
    </span>
  );
}
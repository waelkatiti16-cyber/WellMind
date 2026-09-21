// PaymentPage.js
import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';

export default function PaymentPage() {
  const location = useLocation();
  const { plan, coach } = location.state || {};

  const [paymentForm, setPaymentForm] = useState({
    cardNumber: '',
    expiry: '',
    cvv: ''
  });
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [cardType, setCardType] = useState('');

  // Détection simple du type de carte (Visa, Mastercard, Amex)
  const detectCardType = (number) => {
    const cleaned = number.replace(/\s+/g, '');
    if (/^4/.test(cleaned)) return 'Visa';
    if (/^5[1-5]/.test(cleaned)) return 'Mastercard';
    if (/^3[47]/.test(cleaned)) return 'Amex';
    return '';
  };

  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\D/g, ''); // Garde uniquement les chiffres
    // Formatage avec espaces tous les 4 chiffres
    const formatted = value.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
    setPaymentForm((prev) => ({ ...prev, cardNumber: formatted }));
    setCardType(detectCardType(value));
  };

  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 2) {
      value = value.slice(0, 2) + '/' + value.slice(2, 4);
    }
    setPaymentForm((prev) => ({ ...prev, expiry: value }));
  };

  const handleCvvChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 4);
    setPaymentForm((prev) => ({ ...prev, cvv: value }));
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    // Simulation de paiement réussi
    setPaymentSuccess(true);
  };

  if (!plan || !coach) {
    return (
      <div className="content">
        <div className="container py-5 text-center">
          <p className="text-danger mb-3">Aucune donnée de paiement trouvée.</p>
          <Link to="/accueil" className="btn btn-secondary">Retour à l'accueil</Link>
        </div>
      </div>
    );
  }

  // Icônes des cartes (SVG simplifié ou caractères)
  const cardIcons = {
    Visa: <i className="fab fa-cc-visa fs-3 text-primary"></i>,
    Mastercard: <i className="fab fa-cc-mastercard fs-3 text-danger"></i>,
    Amex: <i className="fab fa-cc-amex fs-3 text-info"></i>,
    generic: <i className="fa-solid fa-credit-card fs-3 text-secondary"></i>,
  };

  return (
    <div>
      {/* Barre de fil d'ariane */}
      <div className="breadcrumb-bar text-center">
        <div className="container">
          <h2 className="breadcrumb-title mb-2">Paiement</h2>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb justify-content-center mb-0">
              <li className="breadcrumb-item"><Link to="/accueil">Accueil</Link></li>
              <li className="breadcrumb-item"><Link to={`/coach/${coach._id}`}>{coach.Name}</Link></li>
              <li className="breadcrumb-item active" aria-current="page">Paiement</li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="content">
        <div className="container py-4">
          <div className="row justify-content-center">
            <div className="col-lg-6 col-md-8">
              <div className="card shadow-sm">
                <div className="card-body p-4">
                  <h5 className="card-title mb-4">Récapitulatif de la commande</h5>
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <div>
                      <p className="mb-1">Coach : <strong>{coach.Name}</strong></p>
                      <p className="mb-0">Plan : <strong>{plan.name}</strong></p>
                    </div>
                    <div className="text-end">
                      <span className="fs-4 fw-bold text-secondary">{plan.price}</span>
                      <p className="mb-0 text-muted">{plan.sessions} séance{plan.sessions > 1 ? 's' : ''}</p>
                    </div>
                  </div>
                  <hr />

                  {!paymentSuccess ? (
                    <>
                      <h6 className="mb-3">Informations de paiement <span className="text-muted">(simulation)</span></h6>
                      <form onSubmit={handlePaymentSubmit}>
                        <div className="mb-3">
                          <label htmlFor="cardNumber" className="form-label">Numéro de carte</label>
                          <div className="input-group">
                            <input
                              type="text"
                              id="cardNumber"
                              name="cardNumber"
                              className="form-control"
                              placeholder="4242 4242 4242 4242"
                              value={paymentForm.cardNumber}
                              onChange={handleCardNumberChange}
                              required
                              style={{ borderRight: 'none' }}
                            />
                            <span className="input-group-text bg-white">
                              {cardType ? cardIcons[cardType] : cardIcons.generic}
                            </span>
                          </div>
                          {cardType && (
                            <small className="text-muted">Carte {cardType} détectée</small>
                          )}
                        </div>
                        <div className="row mb-3">
                          <div className="col-6">
                            <label htmlFor="expiry" className="form-label">Expiration</label>
                            <input
                              type="text"
                              id="expiry"
                              name="expiry"
                              className="form-control"
                              placeholder="MM/AA"
                              value={paymentForm.expiry}
                              onChange={handleExpiryChange}
                              required
                            />
                          </div>
                          <div className="col-6">
                            <label htmlFor="cvv" className="form-label">CVV</label>
                            <input
                              type="text"
                              id="cvv"
                              name="cvv"
                              className="form-control"
                              placeholder="123"
                              value={paymentForm.cvv}
                              onChange={handleCvvChange}
                              required
                            />
                          </div>
                        </div>
                        <button type="submit" className="btn btn-secondary w-100">
                          Payer {plan.price}
                        </button>
                      </form>
                    </>
                  ) : (
                    <div className="text-center py-4">
                      <i className="fa-solid fa-check-circle text-success fs-1 mb-3"></i>
                      <h4 className="text-success">Paiement simulé réussi !</h4>
                      <p className="text-muted">Votre abonnement au plan {plan.name} est activé.</p>
                      <Link to={`/coach/${coach._id}`} className="btn btn-outline-secondary mt-3">
                        Retour au profil du coach
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
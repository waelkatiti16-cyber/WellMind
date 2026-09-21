import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getLoggedInUser, setLoggedInUser, logout } from './authHelper';

function formatDate(dateString) {
  if (!dateString) return '—';
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

export default function UserProfile() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    const current = getLoggedInUser();

    if (!current) {
      navigate('/loginuser');
      return;
    }

    setUser(current);
    setName(current.Name || '');
    setEmail(current.Email || '');
    setPhone(current.Phone || '');
  }, [navigate]);

  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      setMessage('');
      setStatus('');
    }, 4000);
    return () => clearTimeout(timer);
  }, [message]);

  const handleSave = async (e) => {
    e.preventDefault();
    setMessage('');
    setStatus('');

    try {
      const response = await fetch(`http://localhost:8000/register/${user._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Name: name,
          Email: email,
          Phone: phone,
          ...(password ? { Password: password } : {})
        })
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Erreur lors de la modification");
        setStatus('error');
        return;
      }

      const rememberedInLocal = Boolean(localStorage.getItem('user'));
      setLoggedInUser(data.user, rememberedInLocal);

      setUser(data.user);
      setPassword('');
      setIsEditing(false);
      setMessage("Profil mis à jour avec succès !");
      setStatus('success');

    } catch (error) {
      console.error(error);
      setMessage("Erreur de connexion au serveur");
      setStatus('error');
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Supprimer définitivement votre compte ? Cette action est irréversible.")) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:8000/register/${user._id}`, {
        method: "DELETE"
      });

      if (!response.ok) {
        const data = await response.json();
        setMessage(data.message || "Erreur lors de la suppression");
        setStatus('error');
        return;
      }

      logout();
      navigate('/accueil');

    } catch (error) {
      console.error(error);
      setMessage("Erreur de connexion au serveur");
      setStatus('error');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/accueil');
  };

  if (!user) {
    return (
      <div className="content">
        <div className="container py-5 text-center text-muted">Chargement...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="breadcrumb-bar text-center">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-12">
              <h2 className="breadcrumb-title mb-2">Mon profil</h2>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb justify-content-center mb-0">
                  <li className="breadcrumb-item"><Link to="/accueil">Accueil</Link></li>
                  <li className="breadcrumb-item active" aria-current="page">Mon profil</li>
                </ol>
              </nav>
            </div>
          </div>
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
              <div className="col-md-6">
                <div className="d-flex align-items-center">
                  <span className="avatar flex-shrink-0 avatar-xxl avatar-rounded me-3 border border-white border-3 position-relative bg-secondary-transparent d-flex align-items-center justify-content-center">
                    <i className="fa-solid fa-user fs-24" />
                  </span>
                  <div>
                    <h5 className="mb-1 text-white d-inline-flex align-items-center">
                      {user.Name}
                      <button
                        type="button"
                        className="link-light fs-16 ms-2 btn btn-link p-0"
                        onClick={() => setIsEditing(true)}
                      >
                        <i className="isax isax-edit-2" />
                      </button>
                    </h5>
                    <p className="text-light mb-0">Membre</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="d-flex align-items-center flex-wrap gap-3 justify-content-md-end">
                  <Link to="/mes-favoris" className="btn btn-white rounded-pill">Vos favoris</Link>
                  <Link to="/tous-les-cours" className="btn btn-secondary rounded-pill">Voir les cours</Link>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            {/* Sidebar */}
            <div className="col-lg-3 theiaStickySidebar">
              <div className="settings-sidebar mb-lg-0">
                <div>
                  <h6 className="mb-3">Menu</h6>
                  <ul className="mb-3 pb-1">
                    <li>
                      <span className="d-inline-flex align-items-center active">
                        <i className="fa-solid fa-user me-2" />Mon profil
                      </span>
                    </li>
                    <li>
                      <Link to="/mes-favoris" className="d-inline-flex align-items-center">
                        <i className="fa-regular fa-heart me-2" />Vos favoris
                      </Link>
                    </li>
                    <li>
                      <Link to="/tous-les-cours" className="d-inline-flex align-items-center">
                        <i className="isax isax-teacher5 me-2" />Cours
                      </Link>
                    </li>
                  </ul>
                  <hr />
                  <h6 className="mb-3">Compte</h6>
                  <ul>
                    <li>
                      <button
                        type="button"
                        className="d-inline-flex align-items-center btn btn-link p-0 text-reset text-decoration-none"
                        onClick={() => setIsEditing(true)}
                      >
                        <i className="isax isax-setting-25 me-2" />Modifier le profil
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        className="d-inline-flex align-items-center btn btn-link p-0 text-danger text-decoration-none"
                        onClick={handleDelete}
                      >
                        <i className="fa-solid fa-trash me-2" />Supprimer mon compte
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        className="d-inline-flex align-items-center btn btn-link p-0 text-reset text-decoration-none"
                        onClick={handleLogout}
                      >
                        <i className="isax isax-logout5 me-2" />Déconnexion
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Contenu principal */}
            <div className="col-lg-9">
              <div className="page-title d-flex align-items-center justify-content-between">
                <h5 className="fw-bold">Mon profil</h5>
                {!isEditing && (
                  <button type="button" className="edit-profile-icon btn btn-link p-0" onClick={() => setIsEditing(true)}>
                    <i className="isax isax-edit-2" />
                  </button>
                )}
              </div>

              <div className="card">
                <div className="card-body">

                  {!isEditing ? (
                    <>
                      <h5 className="fs-18 pb-3 border-bottom mb-3">Informations de base</h5>
                      <div className="row">
                        <div className="col-md-4">
                          <div className="mb-3">
                            <h6>Nom complet</h6>
                            <span>{user.Name}</span>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="mb-3">
                            <h6>Email</h6>
                            <span>{user.Email}</span>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="mb-3">
                            <h6>Téléphone</h6>
                            <span>{user.Phone || '—'}</span>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="mb-3">
                            <h6>Date d'inscription</h6>
                            <span>{formatDate(user.createdAt)}</span>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <form onSubmit={handleSave}>
                      <h5 className="fs-18 pb-3 border-bottom mb-3">Modifier mes informations</h5>

                      <div className="row">
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label">Nom complet</label>
                            <input
                              type="text"
                              className="form-control"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input
                              type="email"
                              className="form-control"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label">Téléphone</label>
                            <input
                              type="tel"
                              className="form-control"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label">Nouveau mot de passe</label>
                            <input
                              type="password"
                              className="form-control"
                              placeholder="Laisser vide pour ne pas changer"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="d-flex gap-2">
                        <button type="submit" className="btn btn-secondary">Enregistrer</button>
                        <button
                          type="button"
                          className="btn btn-light"
                          onClick={() => {
                            setIsEditing(false);
                            setName(user.Name || '');
                            setEmail(user.Email || '');
                            setPhone(user.Phone || '');
                            setPassword('');
                          }}
                        >
                          Annuler
                        </button>
                      </div>
                    </form>
                  )}

                  {message && (
                    <div
                      className={`alert ${status === 'success' ? 'alert-success' : 'alert-danger'} mt-3 text-center`}
                      role="alert"
                    >
                      {message}
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
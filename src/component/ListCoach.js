import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

export default function ListCoach() {
  const navigate = useNavigate();

  const [coaches, setCoaches] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCoaches = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8000/coach/all");
      const data = await response.json();
      setCoaches(data);
    } catch (error) {
      console.error("Erreur lors du chargement des coachs :", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoaches();
  }, []);

  const handleDelete = async (coach) => {
    if (!window.confirm(`Supprimer le coach "${coach.Name}" ?`)) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:8000/coach/${coach._id}`, {
        method: "DELETE"
      });

      if (!response.ok) {
        const data = await response.json();
        alert(data.message || "Erreur lors de la suppression");
        return;
      }

      fetchCoaches();

    } catch (error) {
      console.error(error);
      alert("Erreur de connexion au serveur");
    }
  };

  return (
    <div>
      <div className="breadcrumb-bar text-center">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-12">
              <h2 className="breadcrumb-title mb-2">Coachs / Professionnels</h2>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb justify-content-center mb-0">
                  <li className="breadcrumb-item"><NavLink to="/instructor-dashboard">Accueil</NavLink></li>
                  <li className="breadcrumb-item active" aria-current="page">Coachs</li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>

      <div className="content">
        <div className="container-fluid">

          <div className="d-flex align-items-center justify-content-between mb-3">
            <h5 className="mb-0">Liste des coachs</h5>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate('/addcoach')}
            >
              <i className="fa-solid fa-plus me-1" />
              Ajouter un coach
            </button>
          </div>

          <div className="add-course-item">
            {loading ? (
              <p className="text-center text-muted mb-0">Chargement...</p>
            ) : coaches.length === 0 ? (
              <p className="text-center text-muted mb-0">Aucun coach pour le moment.</p>
            ) : (
              <div className="table-responsive">
                <table className="table align-middle">
                  <thead>
                    <tr>
                      <th>Photo</th>
                      <th>Nom</th>
                      <th>Type</th>
                      <th>Note</th>
                      <th>Catégories / Sous-catégories</th>
                      <th>CV</th>
                      <th className="text-end">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {coaches.map((coach) => (
                      <tr key={coach._id}>
                        <td>
                          {coach.Image ? (
                            <img
                              src={coach.Image}
                              alt={coach.Name}
                              style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: '50%' }}
                            />
                          ) : (
                            <div
                              className="d-flex align-items-center justify-content-center bg-light rounded-circle"
                              style={{ width: '48px', height: '48px' }}
                            >
                              <i className="fa-solid fa-user text-muted" />
                            </div>
                          )}
                        </td>
                        <td>
                          <p className="fw-medium mb-0">{coach.Name}</p>
                          {coach.Bio && (
                            <span className="fs-13 text-gray-6">
                              {coach.Bio.length > 60 ? `${coach.Bio.slice(0, 60)}...` : coach.Bio}
                            </span>
                          )}
                        </td>
                        <td>
                          <span className={coach.Type === 'Psychologue' ? 'badge bg-info-transparent text-info' : 'badge bg-primary-transparent text-primary'}>
                            {coach.Type || '—'}
                          </span>
                        </td>
                        <td>
                          {coach.RatingsCount > 0 ? (
                            <span className="d-flex align-items-center">
                              <i className="fa-solid fa-star text-warning me-1" />
                              {coach.AverageRating}
                              <span className="text-gray-6 ms-1">({coach.RatingsCount})</span>
                            </span>
                          ) : (
                            <span className="text-muted">Aucun avis</span>
                          )}
                        </td>
                        <td>
                          {coach.Specialities && coach.Specialities.length > 0 ? (
                            <div className="d-flex flex-wrap gap-1">
                              {coach.Specialities.map((s, i) => (
                                <span key={i} className="badge bg-light text-dark border">
                                  {s.Category}{s.SousCategorie ? ` — ${s.SousCategorie}` : ''}
                                </span>
                              ))}
                            </div>
                          ) : (
                            <span className="text-muted">—</span>
                          )}
                        </td>
                        <td>
                          {coach.Cv ? (
                            <a href={coach.Cv} target="_blank" rel="noopener noreferrer">
                              <i className="fa-solid fa-file-pdf text-danger me-1" />
                              Voir le CV
                            </a>
                          ) : (
                            <span className="text-muted">—</span>
                          )}
                        </td>
                        <td className="text-end">
                          <button
                            type="button"
                            className="btn btn-outline-secondary btn-sm me-2"
                            onClick={() => navigate(`/edit-coach/${coach._id}`)}
                          >
                            <i className="fa-solid fa-pen me-1" />
                            Modifier
                          </button>
                          <button
                            type="button"
                            className="btn btn-outline-danger btn-sm"
                            onClick={() => handleDelete(coach)}
                          >
                            <i className="fa-solid fa-trash me-1" />
                            Supprimer
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
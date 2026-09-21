import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function CoachDetails() {
  const { id } = useParams();
  const [coach, setCoach] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCoach = async () => {
      try {
        const response = await fetch(`http://localhost:8000/coach/${id}`);
        const data = await response.json();
        setCoach(data);
      } catch (error) {
        console.error("Erreur lors du chargement du coach :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCoach();
  }, [id]);

  if (loading) {
    return (
      <div className="text-center py-5">
        <p>Chargement du profil...</p>
      </div>
    );
  }

  if (!coach) {
    return (
      <div className="text-center py-5">
        <p>Coach introuvable.</p>
      </div>
    );
  }

  return (
    <div>
      {/* Breadcrumb */}
      <div className="breadcrumb-bar text-center">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-12">
              <h2 className="breadcrumb-title mb-2">Profil du Coach</h2>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb justify-content-center mb-0">
                  <li className="breadcrumb-item"><a href="/addcoach">Coachs</a></li>
                  <li className="breadcrumb-item active" aria-current="page">Profil</li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* CV / Profil */}
      <div className="content">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-9">

              {/* En-tête du profil */}
              <div className="card mb-4">
                <div className="card-body">
                  <div className="d-flex align-items-center flex-wrap gap-4">
                    <span className="avatar avatar-xxl flex-shrink-0">
                      {coach.Photo ? (
                        <img
                          src={coach.Photo}
                          alt={coach.Nom}
                          className="rounded-circle"
                          style={{ width: '120px', height: '120px', objectFit: 'cover' }}
                        />
                      ) : (
                        <div
                          className="rounded-circle bg-light d-flex align-items-center justify-content-center"
                          style={{ width: '120px', height: '120px', fontSize: '40px', color: '#999' }}
                        >
                          {coach.Nom ? coach.Nom.charAt(0).toUpperCase() : '?'}
                        </div>
                      )}
                    </span>
                    <div>
                      <h3 className="mb-1">{coach.Nom}</h3>
                      {coach.Specialite && (
                        <span className="badge bg-secondary-transparent text-secondary fs-14 px-3 py-2">
                          {coach.Specialite}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Coordonnées */}
              <div className="card mb-4">
                <div className="card-body">
                  <h5 className="fw-bold mb-3">Coordonnées</h5>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <p className="mb-1 text-secondary fs-14">Email</p>
                      <p className="fw-medium mb-0">
                        <i className="isax isax-sms me-2" />
                        {coach.Email || "-"}
                      </p>
                    </div>
                    <div className="col-md-6 mb-3">
                      <p className="mb-1 text-secondary fs-14">Téléphone</p>
                      <p className="fw-medium mb-0">
                        <i className="isax isax-call me-2" />
                        {coach.Telephone || "-"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bio / À propos */}
              <div className="card mb-4">
                <div className="card-body">
                  <h5 className="fw-bold mb-3">À propos</h5>
                  <p className="mb-0">
                    {coach.Bio || "Aucune biographie disponible pour ce coach."}
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
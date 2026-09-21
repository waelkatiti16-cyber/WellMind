import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function ListUsers() {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8000/users/all");
      if (!response.ok) throw new Error("Erreur lors du chargement");
      const data = await response.json();
      setUsers(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Erreur lors du chargement des utilisateurs :", error);
      alert("Impossible de charger les utilisateurs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (user) => {
    if (!window.confirm(`Supprimer l'utilisateur "${user.Name}" ?`)) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:8000/users/${user._id}`, {
        method: "DELETE"
      });

      if (!response.ok) {
        const data = await response.json();
        alert(data.message || "Erreur lors de la suppression");
        return;
      }

      fetchUsers();
    } catch (error) {
      console.error(error);
      alert("Erreur de connexion au serveur");
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '—';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div>
      <div className="breadcrumb-bar text-center">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-12">
              <h2 className="breadcrumb-title mb-2">Utilisateurs</h2>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb justify-content-center mb-0">
                  <li className="breadcrumb-item"><Link to="/instructor-dashboard">Accueil</Link></li>
                  <li className="breadcrumb-item active" aria-current="page">Utilisateurs</li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>

      <div className="content">
        <div className="container-fluid">
          <div className="d-flex align-items-center justify-content-between mb-3">
            <h5 className="mb-0">Liste des utilisateurs</h5>
          </div>

          <div className="add-course-item">
            {loading ? (
              <p className="text-center text-muted mb-0">Chargement...</p>
            ) : users.length === 0 ? (
              <p className="text-center text-muted mb-0">Aucun utilisateur pour le moment.</p>
            ) : (
              <div className="table-responsive">
                <table className="table align-middle">
                  <thead>
                    <tr>
                      <th>Nom</th>
                      <th>Email</th>
                      <th>Téléphone</th>
                      <th>Date d'inscription</th>
                      <th className="text-end">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user._id}>
                        <td>
                          <div className="d-flex align-items-center">
                            <div
                              className="avatar avatar-md bg-secondary-transparent rounded-circle d-flex align-items-center justify-content-center me-2"
                              style={{ width: '40px', height: '40px' }}
                            >
                              <i className="fa-solid fa-user text-muted" />
                            </div>
                            <p className="fw-medium mb-0">{user.Name}</p>
                          </div>
                        </td>
                        <td>{user.Email}</td>
                        <td>{user.Phone || '—'}</td>
                        <td>{formatDate(user.createdAt)}</td>
                        <td className="text-end">
                       
                      
                          <button
                            type="button"
                            className="btn btn-outline-danger btn-sm"
                            onClick={() => handleDelete(user)}
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
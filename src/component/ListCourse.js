import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

export default function ListCourse() {
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8000/course/all");
      const data = await response.json();
      setCourses(data);
    } catch (error) {
      console.error("Erreur lors du chargement des cours :", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleDelete = async (course) => {
    if (!window.confirm(`Supprimer le cours "${course.Title}" ?`)) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:8000/course/${course._id}`, {
        method: "DELETE"
      });

      if (!response.ok) {
        const data = await response.json();
        alert(data.message || "Erreur lors de la suppression");
        return;
      }

      fetchCourses();

    } catch (error) {
      console.error(error);
      alert("Erreur de connexion au serveur");
    }
  };

  const statusBadgeClass = (status) => {
    if (status === 'Publié') return 'badge bg-success-transparent text-success';
    return 'badge bg-warning-transparent text-warning';
  };

  return (
    <div>
      <div className="breadcrumb-bar text-center">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-12">
              <h2 className="breadcrumb-title mb-2">Cours & Formations</h2>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb justify-content-center mb-0">
                  <li className="breadcrumb-item"><NavLink to="/instructor-dashboard">Accueil</NavLink></li>
                  <li className="breadcrumb-item active" aria-current="page">Cours & Formations</li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>

      <div className="content">
        <div className="container-fluid">

          <div className="d-flex align-items-center justify-content-between mb-3">
            <h5 className="mb-0">Liste des cours</h5>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate('/addCourse')}
            >
              <i className="fa-solid fa-plus me-1" />
              Ajouter un cours
            </button>
          </div>

          <div className="add-course-item">
            {loading ? (
              <p className="text-center text-muted mb-0">Chargement...</p>
            ) : courses.length === 0 ? (
              <p className="text-center text-muted mb-0">Aucun cours pour le moment.</p>
            ) : (
              <div className="table-responsive">
                <table className="table align-middle">
                  <thead>
                    <tr>
                      <th>Titre</th>
                      <th>Catégorie</th>
                      <th>Sous-catégorie</th>
                      <th>Niveau</th>
                      <th>Prix</th>
                      <th>Statut</th>
                      <th className="text-end">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {courses.map((course) => (
                      <tr key={course._id}>
                        <td>
                          <p className="fw-medium mb-0">{course.Title}</p>
                          {course.ShortDescription && (
                            <span className="fs-13 text-gray-6">{course.ShortDescription}</span>
                          )}
                        </td>
                        <td>{course.Category || '—'}</td>
                        <td>{course.SousCategorie || '—'}</td>
                        <td>{course.Level || '—'}</td>
                        <td>
                          {course.IsFree ? (
                            <span className="badge bg-success-transparent text-success">Gratuit</span>
                          ) : (
                            course.Price ? `${course.Price} DT` : '—'
                          )}
                        </td>
                        <td>
                          <span className={statusBadgeClass(course.Status)}>
                            {course.Status || 'Brouillon'}
                          </span>
                        </td>
                        <td className="text-end">
                          <button
                            type="button"
                            className="btn btn-outline-secondary btn-sm me-2"
                            onClick={() => navigate(`/edit-course/${course._id}`)}
                          >
                            <i className="fa-solid fa-pen me-1" />
                            Modifier
                          </button>
                          <button
                            type="button"
                            className="btn btn-outline-danger btn-sm"
                            onClick={() => handleDelete(course)}
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

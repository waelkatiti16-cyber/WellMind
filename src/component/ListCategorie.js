import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

export default function ListCategorie() {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- Modal d'édition ---
  const [editingCategory, setEditingCategory] = useState(null); // catégorie en cours de modification
  const [editName, setEditName] = useState('');
  const [editSousCategories, setEditSousCategories] = useState(['']);
  const [editMessage, setEditMessage] = useState('');

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8000/category/all");
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Erreur lors du chargement des catégories :", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // --- Ouvrir le modal d'édition avec les données de la catégorie ---
  const openEditModal = (category) => {
    setEditingCategory(category);
    setEditName(category.Name);
    setEditSousCategories(
      category.SousCategories && category.SousCategories.length > 0
        ? [...category.SousCategories]
        : ['']
    );
    setEditMessage('');
  };

  const closeEditModal = () => {
    setEditingCategory(null);
  };

  const updateEditSousCategorieField = (index, value) => {
    const updated = [...editSousCategories];
    updated[index] = value;
    setEditSousCategories(updated);
  };

  const addEditSousCategorieField = () => {
    setEditSousCategories([...editSousCategories, '']);
  };

  const removeEditSousCategorieField = (index) => {
    setEditSousCategories(editSousCategories.filter((_, i) => i !== index));
  };

  // --- Enregistrer les modifications ---
  const handleSaveEdit = async () => {
    if (!editName.trim()) {
      setEditMessage("Le nom de la catégorie est obligatoire");
      return;
    }

    const cleanedSousCategories = editSousCategories
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    try {
      const response = await fetch(`http://localhost:8000/category/${editingCategory._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          Name: editName,
          SousCategories: cleanedSousCategories
        })
      });

      const data = await response.json();

      if (!response.ok) {
        setEditMessage(data.message || "Erreur lors de la modification");
        return;
      }

      closeEditModal();
      fetchCategories();

    } catch (error) {
      console.error(error);
      setEditMessage("Erreur de connexion au serveur");
    }
  };

  // --- Supprimer une catégorie ---
  const handleDelete = async (category) => {
    if (!window.confirm(`Supprimer la catégorie "${category.Name}" et toutes ses sous-catégories ?`)) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:8000/category/${category._id}`, {
        method: "DELETE"
      });

      if (!response.ok) {
        const data = await response.json();
        alert(data.message || "Erreur lors de la suppression");
        return;
      }

      fetchCategories();

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
              <h2 className="breadcrumb-title mb-2">Catégories</h2>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb justify-content-center mb-0">
                  <li className="breadcrumb-item"><NavLink to="/instructor-dashboard">Accueil</NavLink></li>
                  <li className="breadcrumb-item active" aria-current="page">Catégories</li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>

      <div className="content">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 mx-auto">

              <div className="d-flex align-items-center justify-content-between mb-3">
                <h5 className="mb-0">Liste des catégories</h5>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => navigate('/addcat')}
                >
                  <i className="fa-solid fa-plus me-1" />
                  Ajouter une catégorie
                </button>
              </div>

              <div className="add-course-item">
                {loading ? (
                  <p className="text-center text-muted mb-0">Chargement...</p>
                ) : categories.length === 0 ? (
                  <p className="text-center text-muted mb-0">Aucune catégorie pour le moment.</p>
                ) : (
                  <div className="table-responsive">
                    <table className="table align-middle">
                      <thead>
                        <tr>
                          <th>Nom de la catégorie</th>
                          <th>Sous-catégories</th>
                          <th className="text-end">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {categories.map((cat) => (
                          <tr key={cat._id}>
                            <td>{cat.Name}</td>
                            <td>
                              {cat.SousCategories && cat.SousCategories.length > 0 ? (
                                cat.SousCategories.map((sc, i) => (
                                  <span key={i} className="badge bg-light text-dark border me-1 mb-1">
                                    {sc}
                                  </span>
                                ))
                              ) : (
                                <span className="text-muted">—</span>
                              )}
                            </td>
                            <td className="text-end">
                              <button
                                type="button"
                                className="btn btn-outline-secondary btn-sm me-2"
                                onClick={() => openEditModal(cat)}
                              >
                                <i className="fa-solid fa-pen me-1" />
                                Modifier
                              </button>
                              <button
                                type="button"
                                className="btn btn-outline-danger btn-sm"
                                onClick={() => handleDelete(cat)}
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
      </div>

      {/* Modal de modification */}
      {editingCategory && (
        <div
          className="modal fade show"
          style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}
          tabIndex={-1}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5>Modifier la catégorie</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeEditModal}
                  aria-label="Close"
                />
              </div>
              <div className="modal-body">
                <div className="input-block mb-3">
                  <label className="form-label">
                    Nom de la catégorie<span className="text-danger ms-1">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                  />
                </div>

                <div className="bg-light border p-3 rounded-3 mb-3">
                  <h6 className="mb-3">Sous-catégories</h6>

                  {editSousCategories.map((sc, index) => (
                    <div className="d-flex align-items-center mb-2" key={index}>
                      <input
                        type="text"
                        className="form-control me-2"
                        value={sc}
                        onChange={(e) => updateEditSousCategorieField(index, e.target.value)}
                        placeholder={`Sous-catégorie ${index + 1}`}
                      />
                      {editSousCategories.length > 1 && (
                        <button
                          type="button"
                          className="btn btn-light btn-sm"
                          onClick={() => removeEditSousCategorieField(index)}
                        >
                          <i className="fa-solid fa-xmark" />
                        </button>
                      )}
                    </div>
                  ))}

                  <button
                    type="button"
                    className="btn btn-outline-secondary btn-sm mt-2"
                    onClick={addEditSousCategorieField}
                  >
                    + Ajouter une sous-catégorie
                  </button>
                </div>

                {editMessage && (
                  <div className="alert alert-danger text-center" role="alert">
                    {editMessage}
                  </div>
                )}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-light" onClick={closeEditModal}>
                  Annuler
                </button>
                <button type="button" className="btn btn-secondary" onClick={handleSaveEdit}>
                  Enregistrer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

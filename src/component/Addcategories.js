import React, { useState, useEffect } from 'react';

export default function AddCategories() {
  const [categories, setCategories] = useState([]);
  const [title, setTitle] = useState('');
  const [subCategories, setSubCategories] = useState(['']);
  const [editingId, setEditingId] = useState(null);
  const [submitMessage, setSubmitMessage] = useState('');

  const fetchCategories = async () => {
    try {
      const response = await fetch("http://localhost:8000/category/all");
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Erreur lors du chargement des catégories :", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const addSubCategoryField = () => {
    setSubCategories([...subCategories, '']);
  };

  const removeSubCategoryField = (index) => {
    const updated = subCategories.filter((_, i) => i !== index);
    setSubCategories(updated.length > 0 ? updated : ['']);
  };

  const updateSubCategoryField = (index, value) => {
    const updated = [...subCategories];
    updated[index] = value;
    setSubCategories(updated);
  };

  const resetForm = () => {
    setTitle('');
    setSubCategories(['']);
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const cleanedSubCategories = subCategories
      .map((s) => s.trim())
      .filter((s) => s !== '');

    try {
      let response;

      if (editingId) {
        response = await fetch(`http://localhost:8000/category/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ Title: title, SubCategories: cleanedSubCategories })
        });
      } else {
        response = await fetch("http://localhost:8000/category/add", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ Title: title, SubCategories: cleanedSubCategories })
        });
      }

      const data = await response.json();

      if (!response.ok) {
        setSubmitMessage(data.message || "Erreur lors de l'enregistrement");
        return;
      }

      setSubmitMessage(editingId ? "Catégorie modifiée avec succès !" : "Catégorie ajoutée avec succès !");
      resetForm();
      fetchCategories();

    } catch (error) {
      console.error(error);
      setSubmitMessage("Erreur de connexion au serveur");
    }
  };

  const handleEdit = (category) => {
    setEditingId(category._id);
    setTitle(category.Title);
    setSubCategories(category.SubCategories && category.SubCategories.length > 0 ? category.SubCategories : ['']);
    setSubmitMessage('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Voulez-vous vraiment supprimer cette catégorie ?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:8000/category/${id}`, {
        method: "DELETE"
      });

      if (response.ok) {
        setCategories(categories.filter((cat) => cat._id !== id));
      } else {
        console.error("Erreur lors de la suppression");
      }
    } catch (error) {
      console.error("Erreur de connexion au serveur :", error);
    }
  };

  return (
    <div>
      <div className="breadcrumb-bar text-center">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-12">
              <h2 className="breadcrumb-title mb-2">Catégories</h2>
            </div>
          </div>
        </div>
      </div>

      <div className="content">
        <div className="container">

          {/* Formulaire ajout / édition */}
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="fw-bold mb-3">
                {editingId ? "Modifier la catégorie" : "Ajouter une catégorie"}
              </h5>

              <form onSubmit={handleSubmit}>
                <div className="input-block mb-3">
                  <label className="form-label">Titre de la catégorie</label>
                  <input
                    type="text"
                    className="form-control"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>

                <label className="form-label">Sous-catégories</label>
                {subCategories.map((sub, index) => (
                  <div className="input-group mb-2" key={index}>
                    <input
                      type="text"
                      className="form-control"
                      placeholder={`Sous-catégorie ${index + 1}`}
                      value={sub}
                      onChange={(e) => updateSubCategoryField(index, e.target.value)}
                    />
                    <button
                      type="button"
                      className="btn btn-light text-danger"
                      onClick={() => removeSubCategoryField(index)}
                    >
                      <i className="isax isax-trash" />
                    </button>
                  </div>
                ))}

                <button
                  type="button"
                  className="btn btn-light btn-sm mb-3"
                  onClick={addSubCategoryField}
                >
                  <i className="isax isax-add-circle5 me-1" /> Ajouter une sous-catégorie
                </button>

                <div className="d-flex justify-content-end gap-2">
                  {editingId && (
                    <button type="button" className="btn btn-light" onClick={resetForm}>
                      Annuler
                    </button>
                  )}
                  <button type="submit" className="btn btn-secondary">
                    {editingId ? "Enregistrer les modifications" : "Ajouter la catégorie"}
                  </button>
                </div>

                {submitMessage && (
                  <p className="text-center mt-3">{submitMessage}</p>
                )}
              </form>
            </div>
          </div>

          {/* Tableau des catégories */}
          <div className="card">
            <div className="card-body">
              <h5 className="fw-bold mb-3">Toutes les catégories</h5>

              <div className="table-responsive custom-table">
                <table className="table">
                  <thead className="thead-light">
                    <tr>
                      <th>Titre</th>
                      <th>Sous-catégories</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories.length === 0 ? (
                      <tr>
                        <td colSpan="3" className="text-center">Aucune catégorie pour le moment</td>
                      </tr>
                    ) : (
                      categories.map((category) => (
                        <tr key={category._id}>
                          <td className="fw-medium">{category.Title}</td>
                          <td>
                            {category.SubCategories && category.SubCategories.length > 0
                              ? category.SubCategories.join(', ')
                              : '-'}
                          </td>
                          <td>
                            <div className="d-flex align-items-center gap-2">
                              <button
                                className="btn btn-icon btn-sm btn-light"
                                title="Modifier"
                                onClick={() => handleEdit(category)}
                              >
                                <i className="isax isax-edit-25" />
                              </button>
                              <button
                                className="btn btn-icon btn-sm btn-light text-danger"
                                title="Supprimer"
                                onClick={() => handleDelete(category._id)}
                              >
                                <i className="isax isax-trash" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
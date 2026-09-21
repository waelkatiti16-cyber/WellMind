import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

export default function AddCategorie() {
  const [name, setName] = useState('');
  const [sousCategories, setSousCategories] = useState(['']);
  const [submitMessage, setSubmitMessage] = useState('');
  const [submitStatus, setSubmitStatus] = useState(''); // 'success' | 'error'

  const [categories, setCategories] = useState([]);
  const [newSubInputs, setNewSubInputs] = useState({}); // { [categoryId]: valeur du champ }

  // Charger la liste des catégories existantes
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

  // Faire disparaître automatiquement le message après 4 secondes
  useEffect(() => {
    if (!submitMessage) return;
    const timer = setTimeout(() => {
      setSubmitMessage('');
      setSubmitStatus('');
    }, 4000);
    return () => clearTimeout(timer);
  }, [submitMessage]);

  // --- Gestion des sous-catégories du formulaire d'ajout ---
  const addSousCategorieField = () => {
    setSousCategories([...sousCategories, '']);
  };

  const removeSousCategorieField = (index) => {
    setSousCategories(sousCategories.filter((_, i) => i !== index));
  };

  const updateSousCategorieField = (index, value) => {
    const updated = [...sousCategories];
    updated[index] = value;
    setSousCategories(updated);
  };

  // --- Soumission du formulaire : création d'une nouvelle catégorie ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitMessage('');
    setSubmitStatus('');

    if (!name.trim()) {
      setSubmitMessage("Le nom de la catégorie est obligatoire");
      setSubmitStatus('error');
      return;
    }

    const cleanedSousCategories = sousCategories
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    try {
      const response = await fetch("http://localhost:8000/category/addcategorie", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          Name: name,
          SousCategories: cleanedSousCategories
        })
      });

      const data = await response.json();

      if (!response.ok) {
        setSubmitMessage(data.message || "Erreur lors de l'ajout de la catégorie");
        setSubmitStatus('error');
        return;
      }

      setSubmitMessage("Catégorie ajoutée avec succès !");
      setSubmitStatus('success');
      setName('');
      setSousCategories(['']);
      fetchCategories();

    } catch (error) {
      console.error(error);
      setSubmitMessage("Erreur de connexion au serveur");
      setSubmitStatus('error');
    }
  };

  // --- Ajouter une sous-catégorie à une catégorie déjà existante ---
  const handleAddSubToExisting = async (categoryId) => {
    const value = (newSubInputs[categoryId] || '').trim();
    if (!value) return;

    try {
      const response = await fetch(`http://localhost:8000/category/${categoryId}/add-subcategory`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ SousCategorie: value })
      });

      if (!response.ok) {
        const data = await response.json();
        alert(data.message || "Erreur lors de l'ajout de la sous-catégorie");
        return;
      }

      setNewSubInputs({ ...newSubInputs, [categoryId]: '' });
      fetchCategories();

    } catch (error) {
      console.error(error);
      alert("Erreur de connexion au serveur");
    }
  };

  // --- Supprimer une sous-catégorie existante ---
  const handleRemoveSub = async (categoryId, sousCategorie) => {
    try {
      const response = await fetch(`http://localhost:8000/category/${categoryId}/remove-subcategory`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ SousCategorie: sousCategorie })
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

  // --- Supprimer une catégorie entière ---
  const handleDeleteCategory = async (categoryId) => {
    if (!window.confirm("Supprimer cette catégorie et toutes ses sous-catégories ?")) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:8000/category/${categoryId}`, {
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
              <h2 className="breadcrumb-title mb-2">Ajouter une catégorie</h2>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb justify-content-center mb-0">
                  <li className="breadcrumb-item"><NavLink to="/instructor-dashboard">Accueil</NavLink></li>
                  <li className="breadcrumb-item active" aria-current="page">Ajouter une catégorie</li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>

      <div className="content">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mx-auto">

              {/* Formulaire d'ajout */}
              <div className="add-course-item mb-4">
                <div className="title mb-3">
                  <h5>Nouvelle catégorie</h5>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="input-block mb-3">
                    <label className="form-label">
                      Nom de la catégorie<span className="text-danger ms-1">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ex: Enfants & Réussite scolaire"
                    />
                  </div>

                  <div className="bg-light border p-4 rounded-3 mb-3">
                    <h6 className="mb-3">Sous-catégories</h6>

                    {sousCategories.map((sc, index) => (
                      <div className="d-flex align-items-center mb-2" key={index}>
                        <input
                          type="text"
                          className="form-control me-2"
                          value={sc}
                          onChange={(e) => updateSousCategorieField(index, e.target.value)}
                          placeholder={`Sous-catégorie ${index + 1}`}
                        />
                        {sousCategories.length > 1 && (
                          <button
                            type="button"
                            className="btn btn-light btn-sm"
                            onClick={() => removeSousCategorieField(index)}
                          >
                            <i className="fa-solid fa-xmark" />
                          </button>
                        )}
                      </div>
                    ))}

                    <button
                      type="button"
                      className="btn btn-outline-secondary btn-sm mt-2"
                      onClick={addSousCategorieField}
                    >
                      + Ajouter une sous-catégorie
                    </button>
                  </div>

                  <div className="add-form-btn submit-btn">
                    <button type="submit" className="btn btn-secondary main-btn">
                      Enregistrer la catégorie
                    </button>
                  </div>

                  {submitMessage && (
                    <div
                      className={`alert ${submitStatus === 'success' ? 'alert-success' : 'alert-danger'} mt-3 text-center d-flex align-items-center justify-content-center gap-2`}
                      role="alert"
                    >
                      {submitStatus === 'success' ? (
                        <i className="isax isax-tick-circle5" />
                      ) : (
                        <i className="fa-solid fa-circle-exclamation" />
                      )}
                      <span>{submitMessage}</span>
                    </div>
                  )}
                </form>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
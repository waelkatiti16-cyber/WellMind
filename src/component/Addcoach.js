import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function AddCoach() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);
  const [loadingCoach, setLoadingCoach] = useState(isEditMode);

  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [bio, setBio] = useState('');

  // --- Photo ---
  const [image, setImage] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);

  // --- CV ---
  const [cv, setCv] = useState('');
  const [cvFileName, setCvFileName] = useState('');
  const [uploadingCv, setUploadingCv] = useState(false);

  // --- Catégories / sous-catégories depuis la base ---
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSousCategorie, setSelectedSousCategorie] = useState('');
  const [specialities, setSpecialities] = useState([]); // [{ Category, SousCategorie }]

  const [submitMessage, setSubmitMessage] = useState('');
  const [submitStatus, setSubmitStatus] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:8000/category/all");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Erreur lors du chargement des catégories :", error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (!submitMessage) return;
    const timer = setTimeout(() => {
      setSubmitMessage('');
      setSubmitStatus('');
    }, 4000);
    return () => clearTimeout(timer);
  }, [submitMessage]);

  const currentSousCategories =
    categories.find((c) => c.Name === selectedCategory)?.SousCategories || [];

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setSelectedSousCategorie('');
  };

  // --- Mode édition : charger les données du coach existant ---
  useEffect(() => {
    if (!isEditMode) return;

    const fetchCoach = async () => {
      setLoadingCoach(true);
      try {
        const response = await fetch(`http://localhost:8000/coach/${id}`);
        const data = await response.json();

        if (!response.ok) {
          setSubmitMessage(data.message || "Impossible de charger ce coach");
          setSubmitStatus('error');
          return;
        }

        setName(data.Name || '');
        setType(data.Type || '');
        setBio(data.Bio || '');
        setImage(data.Image || '');
        setCv(data.Cv || '');
        setSpecialities(data.Specialities || []);

      } catch (error) {
        console.error(error);
        setSubmitMessage("Erreur de connexion au serveur");
        setSubmitStatus('error');
      } finally {
        setLoadingCoach(false);
      }
    };

    fetchCoach();
  }, [id, isEditMode]);

  // --- Ajouter la spécialité sélectionnée à la liste ---
  const addSpeciality = () => {
    if (!selectedCategory) return;

    const alreadyAdded = specialities.some(
      (s) => s.Category === selectedCategory && s.SousCategorie === (selectedSousCategorie || '')
    );
    if (alreadyAdded) return;

    setSpecialities([
      ...specialities,
      { Category: selectedCategory, SousCategorie: selectedSousCategorie || '' }
    ]);
    setSelectedCategory('');
    setSelectedSousCategorie('');
  };

  const removeSpeciality = (index) => {
    setSpecialities(specialities.filter((_, i) => i !== index));
  };

  // --- Upload photo ---
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingImage(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch("http://localhost:8000/coach/upload-image", {
        method: "POST",
        body: formData
      });
      const data = await response.json();

      if (!response.ok) {
        setSubmitMessage(data.message || "Erreur lors de l'upload de l'image");
        setSubmitStatus('error');
        return;
      }

      setImage(data.url);
    } catch (error) {
      console.error(error);
      setSubmitMessage("Erreur de connexion au serveur");
      setSubmitStatus('error');
    } finally {
      setUploadingImage(false);
    }
  };

  // --- Upload CV ---
  const handleCvChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingCv(true);
    setCvFileName(file.name);
    const formData = new FormData();
    formData.append("cv", file);

    try {
      const response = await fetch("http://localhost:8000/coach/upload-cv", {
        method: "POST",
        body: formData
      });
      const data = await response.json();

      if (!response.ok) {
        setSubmitMessage(data.message || "Erreur lors de l'upload du CV");
        setSubmitStatus('error');
        return;
      }

      setCv(data.url);
    } catch (error) {
      console.error(error);
      setSubmitMessage("Erreur de connexion au serveur");
      setSubmitStatus('error');
    } finally {
      setUploadingCv(false);
    }
  };

  // --- Soumission du formulaire ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitMessage('');
    setSubmitStatus('');

    if (uploadingImage || uploadingCv) {
      setSubmitMessage("Merci d'attendre la fin du téléchargement des fichiers");
      setSubmitStatus('error');
      return;
    }

    if (!name.trim()) {
      setSubmitMessage("Le nom du coach est obligatoire");
      setSubmitStatus('error');
      return;
    }

    if (!type) {
      setSubmitMessage("Merci de sélectionner un type (Coach de vie ou Psychologue)");
      setSubmitStatus('error');
      return;
    }

    if (specialities.length === 0) {
      setSubmitMessage("Ajoutez au moins une catégorie sur laquelle le coach travaille");
      setSubmitStatus('error');
      return;
    }

    try {
      const url = isEditMode
        ? `http://localhost:8000/coach/${id}`
        : "http://localhost:8000/coach/addcoach";

      const response = await fetch(url, {
        method: isEditMode ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Name: name,
          Type: type,
          Image: image,
          Cv: cv,
          Bio: bio,
          Specialities: specialities
        })
      });

      const data = await response.json();

      if (!response.ok) {
        setSubmitMessage(data.message || "Erreur lors de l'enregistrement du coach");
        setSubmitStatus('error');
        return;
      }

      setSubmitMessage(isEditMode ? "Coach modifié avec succès !" : "Coach ajouté avec succès !");
      setSubmitStatus('success');

      if (isEditMode) {
        setTimeout(() => navigate('/listcoach'), 1000);
      } else {
        setName('');
        setType('');
        setBio('');
        setImage('');
        setCv('');
        setCvFileName('');
        setSpecialities([]);
        setSelectedCategory('');
        setSelectedSousCategorie('');
      }

    } catch (error) {
      console.error(error);
      setSubmitMessage("Erreur de connexion au serveur");
      setSubmitStatus('error');
    }
  };

  return (
    <div>
      <div className="breadcrumb-bar text-center">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-12">
              <h2 className="breadcrumb-title mb-2">{isEditMode ? "Modifier le coach" : "Ajouter un coach"}</h2>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb justify-content-center mb-0">
                  <li className="breadcrumb-item"><a href="index.html">Home</a></li>
                  <li className="breadcrumb-item active" aria-current="page">
                    {isEditMode ? "Modifier le coach" : "Ajouter un coach"}
                  </li>
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

              {loadingCoach ? (
                <p className="text-center text-muted py-5">Chargement du coach...</p>
              ) : (
              <form onSubmit={handleSubmit}>
                <div className="add-course-item mb-4">
                  <div className="row">

                    {/* Photo */}
                    <div className="col-md-4">
                      <label className="form-label">
                        Photo<span className="text-danger ms-1">*</span>
                      </label>

                      <input
                        type="file"
                        id="coach-image-input"
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={handleImageChange}
                      />

                      {!image && !uploadingImage && (
                        <label
                          htmlFor="coach-image-input"
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: '160px',
                            border: '2px dashed #ccc',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            textAlign: 'center'
                          }}
                        >
                          <i className="fa-solid fa-user-circle fs-24 mb-1" />
                          <span className="fs-13">Ajouter une photo</span>
                        </label>
                      )}

                      {uploadingImage && (
                        <div className="d-flex align-items-center justify-content-center border rounded-3" style={{ height: '160px' }}>
                          <i className="fa-solid fa-spinner fa-spin me-2 text-primary" />
                          <span className="text-primary">Téléversement...</span>
                        </div>
                      )}

                      {!uploadingImage && image && (
                        <div className="text-center">
                          <img
                            src={image}
                            alt="Photo du coach"
                            style={{ width: '100%', height: '160px', objectFit: 'cover', borderRadius: '8px' }}
                          />
                          <label htmlFor="coach-image-input" className="btn btn-light btn-sm mt-2" style={{ cursor: 'pointer' }}>
                            <i className="fa-solid fa-rotate me-1" />
                            Changer
                          </label>
                        </div>
                      )}
                    </div>

                    {/* Nom + Bio */}
                    <div className="col-md-8">
                      <div className="input-block mb-3">
                        <label className="form-label">
                          Nom du coach<span className="text-danger ms-1">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Ex: Dr. Sarah Coach"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>

                      <div className="input-block mb-3">
                        <label className="form-label">
                          Type<span className="text-danger ms-1">*</span>
                        </label>
                        <select
                          className="form-control"
                          value={type}
                          onChange={(e) => setType(e.target.value)}
                        >
                          <option value="">Sélectionnez un type</option>
                          <option value="Coach de vie">Coach de vie</option>
                          <option value="Psychologue">Psychologue</option>
                        </select>
                      </div>

                      <div className="input-block mb-3">
                        <label className="form-label">Bio / Présentation</label>
                        <textarea
                          className="form-control"
                          rows={4}
                          placeholder="Quelques lignes sur le parcours et l'expertise du coach..."
                          value={bio}
                          onChange={(e) => setBio(e.target.value)}
                        />
                      </div>

                      {/* CV */}
                      <div className="input-block mb-0">
                        <label className="form-label">
                          CV (PDF)<span className="text-danger ms-1">*</span>
                        </label>

                        <input
                          type="file"
                          id="coach-cv-input"
                          accept="application/pdf"
                          style={{ display: 'none' }}
                          onChange={handleCvChange}
                        />

                        <label
                          htmlFor="coach-cv-input"
                          className="btn btn-outline-secondary"
                          style={{ cursor: 'pointer' }}
                        >
                          <i className="fa-solid fa-file-pdf me-1" />
                          {cv ? "Changer le CV" : "Téléverser le CV"}
                        </label>

                        {uploadingCv && (
                          <span className="ms-2 text-primary">
                            <i className="fa-solid fa-spinner fa-spin me-1" />
                            Téléversement...
                          </span>
                        )}

                        {!uploadingCv && cv && (
                          <span className="ms-2">
                            <i className="fa-solid fa-circle-check text-success me-1" />
                            {cvFileName || "CV téléversé"}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Spécialités : catégories / sous-catégories */}
                <div className="add-course-item mb-4">
                  <div className="title mb-3">
                    <h5>Catégories sur lesquelles le coach travaille</h5>
                  </div>

                  <div className="row align-items-end">
                    <div className="col-md-5">
                      <div className="input-block mb-0">
                        <label className="form-label">Catégorie</label>
                        <select className="form-control" value={selectedCategory} onChange={handleCategoryChange}>
                          <option value="">Sélectionnez une catégorie</option>
                          {categories.map((cat) => (
                            <option key={cat._id} value={cat.Name}>{cat.Name}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="col-md-5">
                      <div className="input-block mb-0">
                        <label className="form-label">Sous-catégorie</label>
                        <select
                          className="form-control"
                          value={selectedSousCategorie}
                          onChange={(e) => setSelectedSousCategorie(e.target.value)}
                          disabled={!selectedCategory}
                        >
                          <option value="">Toutes / non précisé</option>
                          {currentSousCategories.map((sc, index) => (
                            <option key={index} value={sc}>{sc}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="col-md-2">
                      <button
                        type="button"
                        className="btn btn-secondary w-100"
                        onClick={addSpeciality}
                        disabled={!selectedCategory}
                      >
                        <i className="fa-solid fa-plus" />
                      </button>
                    </div>
                  </div>

                  {specialities.length > 0 && (
                    <div className="d-flex flex-wrap gap-2 mt-3">
                      {specialities.map((s, i) => (
                        <span key={i} className="badge bg-light text-dark border d-flex align-items-center p-2">
                          {s.Category}
                          {s.SousCategorie && ` — ${s.SousCategorie}`}
                          <button
                            type="button"
                            className="btn-close btn-close-sm ms-2"
                            style={{ fontSize: '0.55rem' }}
                            onClick={() => removeSpeciality(i)}
                            aria-label="Retirer"
                          />
                        </span>
                      ))}
                    </div>
                  )}

                  {specialities.length === 0 && (
                    <p className="text-muted fs-13 mt-3 mb-0">
                      Aucune catégorie ajoutée pour l'instant.
                    </p>
                  )}
                </div>

                <div className="add-form-btn submit-btn text-center">
                  <button type="submit" className="btn btn-secondary main-btn">
                    {isEditMode ? "Enregistrer les modifications" : "Enregistrer le coach"}
                  </button>
                </div>

                {submitMessage && (
                  <div
                    className={`alert ${submitStatus === 'success' ? 'alert-success' : 'alert-danger'} mt-3 text-center d-flex align-items-center justify-content-center gap-2`}
                    role="alert"
                  >
                    {submitStatus === 'success' ? (
                      <i className="fa-solid fa-circle-check" />
                    ) : (
                      <i className="fa-solid fa-circle-exclamation" />
                    )}
                    <span>{submitMessage}</span>
                  </div>
                )}
              </form>
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
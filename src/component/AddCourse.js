import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, NavLink } from 'react-router-dom';

export default function AddCourse() {
  const { id } = useParams(); // présent uniquement en mode édition (/edit-course/:id)
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const [activeTab, setActiveTab] = useState('info'); // 'info' | 'modules' | 'apercu'
  const [loadingCourse, setLoadingCourse] = useState(isEditMode);

  // --- Champs du formulaire ---
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [sousCategorie, setSousCategorie] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [description, setDescription] = useState('');

  // Remplace l'ancien champ "image" par deux vidéos
  const [videoCourte, setVideoCourte] = useState('');   // URL renvoyée après upload
  const [videoComplete, setVideoComplete] = useState(''); // URL renvoyée après upload
  const [uploadingCourte, setUploadingCourte] = useState(false);
  const [uploadingComplete, setUploadingComplete] = useState(false);
  const [uploadError, setUploadError] = useState('');

  const [level, setLevel] = useState('');
  const [language, setLanguage] = useState('');
  const [duration, setDuration] = useState('');
  const [isFree, setIsFree] = useState(false);
  const [price, setPrice] = useState('');

  const [professional, setProfessional] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState([]);
  const [prerequisites, setPrerequisites] = useState('');

  const [submitMessage, setSubmitMessage] = useState('');
  const [submitStatus, setSubmitStatus] = useState(''); // 'success' | 'error'

  // --- Catégories chargées depuis la base ---
  const [categories, setCategories] = useState([]);

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

  // --- Coachs chargés depuis la base ---
  const [coaches, setCoaches] = useState([]);

  useEffect(() => {
    const fetchCoaches = async () => {
      try {
        const response = await fetch("http://localhost:8000/coach/all");
        const data = await response.json();
        setCoaches(data);
      } catch (error) {
        console.error("Erreur lors du chargement des coachs :", error);
      }
    };
    fetchCoaches();
  }, []);

  // Coachs dont une spécialité correspond à la catégorie (et sous-catégorie si précisée) choisie
  const availableCoaches = coaches.filter((coach) =>
    (coach.Specialities || []).some((s) => {
      if (s.Category !== category) return false;
      if (!sousCategorie) return true; // pas de sous-catégorie choisie : on ne filtre pas dessus
      return !s.SousCategorie || s.SousCategorie === sousCategorie;
    })
  );

  const currentSousCategories =
    categories.find((c) => c.Name === category)?.SousCategories || [];

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setSousCategorie('');
    setProfessional('');
  };

  const handleSousCategorieChange = (e) => {
    setSousCategorie(e.target.value);
    setProfessional('');
  };

  // --- Mode édition : charger les données du cours existant ---
  useEffect(() => {
    if (!isEditMode) return;

    const fetchCourse = async () => {
      setLoadingCourse(true);
      try {
        const response = await fetch(`http://localhost:8000/course/${id}`);
        const data = await response.json();

        if (!response.ok) {
          setSubmitMessage(data.message || "Impossible de charger ce cours");
          setSubmitStatus('error');
          return;
        }

        setTitle(data.Title || '');
        setCategory(data.Category || '');
        setSousCategorie(data.SousCategorie || '');
        setShortDescription(data.ShortDescription || '');
        setDescription(data.Description || '');
        setVideoCourte(data.VideoCourte || '');
        setVideoComplete(data.VideoComplete || '');
        setLevel(data.Level || '');
        setLanguage(data.Language || '');
        setDuration(data.Duration || '');
        setIsFree(Boolean(data.IsFree));
        setPrice(data.Price != null ? String(data.Price) : '');
        setProfessional(data.Professional || '');
        setTags(data.Tags || []);
        setPrerequisites(data.Prerequisites || '');

      } catch (error) {
        console.error(error);
        setSubmitMessage("Erreur de connexion au serveur");
        setSubmitStatus('error');
      } finally {
        setLoadingCourse(false);
      }
    };

    fetchCourse();
  }, [id, isEditMode]);

  // Faire disparaître le message de soumission après 4s
  useEffect(() => {
    if (!submitMessage) return;
    const timer = setTimeout(() => {
      setSubmitMessage('');
      setSubmitStatus('');
    }, 4000);
    return () => clearTimeout(timer);
  }, [submitMessage]);

  // --- Tags ---
  const handleTagKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const value = tagInput.trim();
      if (value && !tags.includes(value)) {
        setTags([...tags, value]);
      }
      setTagInput('');
    }
  };

  const removeTag = (tag) => {
    setTags(tags.filter((t) => t !== tag));
  };

  // --- Upload des fichiers vidéo ---
  const uploadVideoFile = async (file, setUrl, setUploading) => {
    if (!file) return;
    setUploadError('');
    setUploading(true);

    const formData = new FormData();
    formData.append("video", file);

    try {
      const response = await fetch("http://localhost:8000/course/upload-video", {
        method: "POST",
        body: formData
        // Ne pas fixer "Content-Type" ici : le navigateur ajoute automatiquement
        // le bon "multipart/form-data; boundary=..."
      });

      const data = await response.json();

      if (!response.ok) {
        setUploadError(data.message || "Erreur lors de l'upload de la vidéo");
        return;
      }

      setUrl(data.url);
    } catch (error) {
      console.error(error);
      setUploadError("Erreur de connexion au serveur pendant l'upload");
    } finally {
      setUploading(false);
    }
  };

  const handleVideoCourteChange = (e) => {
    const file = e.target.files[0];
    uploadVideoFile(file, setVideoCourte, setUploadingCourte);
  };

  const handleVideoCompleteChange = (e) => {
    const file = e.target.files[0];
    uploadVideoFile(file, setVideoComplete, setUploadingComplete);
  };

  // --- Soumission ---
  const handleSubmit = async (status) => {
    if (uploadingCourte || uploadingComplete) {
      setSubmitMessage("Merci d'attendre la fin du téléchargement des vidéos");
      setSubmitStatus('error');
      return;
    }

    const payload = {
      Title: title,
      Category: category,
      SousCategorie: sousCategorie,
      ShortDescription: shortDescription,
      Description: description,
      VideoCourte: videoCourte,
      VideoComplete: videoComplete,
      Level: level,
      Language: language,
      Duration: duration,
      IsFree: isFree,
      Price: isFree ? 0 : price,
      Professional: professional,
      Tags: tags,
      Status: status, // 'Brouillon' ou 'Publié'
      Prerequisites: prerequisites
    };

    try {
      const url = isEditMode
        ? `http://localhost:8000/course/${id}`
        : "http://localhost:8000/course/addcourse";

      const response = await fetch(url, {
        method: isEditMode ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (!response.ok) {
        setSubmitMessage(data.message || "Erreur lors de l'enregistrement du cours");
        setSubmitStatus('error');
        return;
      }

      setSubmitMessage(
        isEditMode
          ? "Cours modifié avec succès !"
          : status === 'Publié'
            ? "Cours publié avec succès !"
            : "Cours enregistré comme brouillon !"
      );
      setSubmitStatus('success');

      if (isEditMode) {
        setTimeout(() => navigate('/listcours'), 1000);
      }

    } catch (error) {
      console.error(error);
      setSubmitMessage("Erreur de connexion au serveur");
      setSubmitStatus('error');
    }
  };

  const handleCancel = () => {
    setTitle('');
    setCategory('');
    setSousCategorie('');
    setShortDescription('');
    setDescription('');
    setVideoCourte('');
    setVideoComplete('');
    setUploadingCourte(false);
    setUploadingComplete(false);
    setUploadError('');
    setLevel('');
    setLanguage('');
    setDuration('');
    setIsFree(false);
    setPrice('');
    setProfessional('');
    setTags([]);
    setTagInput('');
    setPrerequisites('');
    setSubmitMessage('');
    setSubmitStatus('');
  };

  return (
    <div>
      <div className="breadcrumb-bar">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
           
              <h2 className="breadcrumb-title mb-1">
                {isEditMode ? "Modifier le cours" : "Ajouter un nouveau cours"}
              </h2>
               <ol className="breadcrumb justify-content-center mb-0">
                                <li className="breadcrumb-item"><NavLink to="/instructor-dashboard">Accueil</NavLink></li>
                                <li className="breadcrumb-item active" aria-current="page">Ajouer un cours</li>
                              </ol>
            </div>
          </div>
        </div>
      </div>

      <div className="content">
        <div className="container-fluid">

          {loadingCourse ? (
            <p className="text-center text-muted py-5">Chargement du cours...</p>
          ) : (
          <div className="add-course-item">

            {/* Onglets */}
            <ul className="nav nav-tabs mb-4">
              <li className="nav-item">
                <button
                  type="button"
                  className={`nav-link ${activeTab === 'info' ? 'active' : ''}`}
                  onClick={() => setActiveTab('info')}
                >
                  <i className="fa-regular fa-circle-question me-1" />
                  Informations générales
                </button>
              </li>
              <li className="nav-item">
                <button
                  type="button"
                  className={`nav-link ${activeTab === 'modules' ? 'active' : ''}`}
                  onClick={() => setActiveTab('modules')}
                >
                  <i className="fa-solid fa-table-cells me-1" />
                  Modules
                </button>
              </li>
              <li className="nav-item">
                <button
                  type="button"
                  className={`nav-link ${activeTab === 'apercu' ? 'active' : ''}`}
                  onClick={() => setActiveTab('apercu')}
                >
                  <i className="fa-regular fa-eye me-1" />
                  Aperçu
                </button>
              </li>
            </ul>

            {activeTab !== 'info' && (
              <div className="text-center text-muted py-5">
                {activeTab === 'modules'
                  ? "La gestion des modules sera disponible une fois le cours enregistré."
                  : "L'aperçu du cours sera disponible une fois les informations générales complétées."}
              </div>
            )}

            {activeTab === 'info' && (
              <div className="row">
                {/* Colonne 1 */}
                <div className="col-lg-4">
                  <div className="input-block mb-3">
                    <label className="form-label">
                      Titre du cours<span className="text-danger ms-1">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Ex: Améliorer la communication dans le couple"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>

                  <div className="input-block mb-3">
                    <label className="form-label">
                      Catégorie<span className="text-danger ms-1">*</span>
                    </label>
                    <select className="form-control" value={category} onChange={handleCategoryChange}>
                      <option value="">Sélectionnez une catégorie</option>
                      {categories.map((cat) => (
                        <option key={cat._id} value={cat.Name}>{cat.Name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="input-block mb-3">
                    <label className="form-label">Sous-catégorie</label>
                    <select
                      className="form-control"
                      value={sousCategorie}
                      onChange={handleSousCategorieChange}
                      disabled={!category}
                    >
                      <option value="">Sélectionnez une sous-catégorie</option>
                      {currentSousCategories.map((sc, index) => (
                        <option key={index} value={sc}>{sc}</option>
                      ))}
                    </select>
                  </div>

                  <div className="input-block mb-3">
                    <label className="form-label">
                      Description courte<span className="text-danger ms-1">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      maxLength={160}
                      placeholder="Une courte description du cours (max 160 caractères)"
                      value={shortDescription}
                      onChange={(e) => setShortDescription(e.target.value)}
                    />
                    <span className="fs-13 text-gray-6 mt-1 d-block text-end">
                      {shortDescription.length}/160
                    </span>
                  </div>

                  <div className="input-block mb-3">
                    <label className="form-label">
                      Description complète<span className="text-danger ms-1">*</span>
                    </label>
                    <textarea
                      className="form-control"
                      rows={6}
                      placeholder="Décrivez votre cours en détail..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                </div>

                {/* Colonne 2 */}
                <div className="col-lg-4">
                  <div className="bg-light border p-3 rounded-3 mb-3">
                    <h6 className="mb-3">Vidéos du cours</h6>

                    <div className="input-block mb-3">
                      <label className="form-label">
                        Vidéo courte (aperçu ~2s)<span className="text-danger ms-1">*</span>
                      </label>

                      <input
                        type="file"
                        id="video-courte-input"
                        accept="video/*"
                        style={{ display: 'none' }}
                        onChange={handleVideoCourteChange}
                      />

                      {!videoCourte && !uploadingCourte && (
                        <label
                          htmlFor="video-courte-input"
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            minHeight: '110px',
                            border: '2px dashed #ccc',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            backgroundColor: '#fff',
                            textAlign: 'center',
                            padding: '16px'
                          }}
                        >
                          <i className="fa-solid fa-cloud-arrow-up fs-24 mb-1" />
                          <p className="fw-medium mb-1">Cliquez pour téléverser</p>
                          <span className="fs-13 text-gray-6">MP4, MOV, WebM...</span>
                        </label>
                      )}

                      {uploadingCourte && (
                        <div className="d-flex align-items-center justify-content-center border rounded-3 py-4">
                          <i className="fa-solid fa-spinner fa-spin me-2 text-primary" />
                          <span className="text-primary">Téléchargement en cours...</span>
                        </div>
                      )}

                      {!uploadingCourte && videoCourte && (
                        <div>
                          <video
                            src={videoCourte}
                            controls
                            className="w-100 rounded-2"
                            style={{ maxHeight: '150px' }}
                          />
                          <label htmlFor="video-courte-input" className="btn btn-light btn-sm mt-2" style={{ cursor: 'pointer' }}>
                            <i className="fa-solid fa-rotate me-1" />
                            Changer la vidéo
                          </label>
                        </div>
                      )}

                      <span className="fs-13 text-gray-6 mt-1 d-block">
                        Courte vidéo d'aperçu affichée sur la fiche du cours.
                      </span>
                    </div>

                    <div className="input-block mb-0">
                      <label className="form-label">
                        Vidéo complète (1h et plus)<span className="text-danger ms-1">*</span>
                      </label>

                      <input
                        type="file"
                        id="video-complete-input"
                        accept="video/*"
                        style={{ display: 'none' }}
                        onChange={handleVideoCompleteChange}
                      />

                      {!videoComplete && !uploadingComplete && (
                        <label
                          htmlFor="video-complete-input"
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            minHeight: '110px',
                            border: '2px dashed #ccc',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            backgroundColor: '#fff',
                            textAlign: 'center',
                            padding: '16px'
                          }}
                        >
                          <i className="fa-solid fa-cloud-arrow-up fs-24 mb-1" />
                          <p className="fw-medium mb-1">Cliquez pour téléverser</p>
                          <span className="fs-13 text-gray-6">MP4, MOV, WebM...</span>
                        </label>
                      )}

                      {uploadingComplete && (
                        <div className="d-flex align-items-center justify-content-center border rounded-3 py-4">
                          <i className="fa-solid fa-spinner fa-spin me-2 text-primary" />
                          <span className="text-primary">Téléchargement en cours...</span>
                        </div>
                      )}

                      {!uploadingComplete && videoComplete && (
                        <div>
                          <video
                            src={videoComplete}
                            controls
                            className="w-100 rounded-2"
                            style={{ maxHeight: '150px' }}
                          />
                          <label htmlFor="video-complete-input" className="btn btn-light btn-sm mt-2" style={{ cursor: 'pointer' }}>
                            <i className="fa-solid fa-rotate me-1" />
                            Changer la vidéo
                          </label>
                        </div>
                      )}


                      <span className="fs-13 text-gray-6 mt-1 d-block">
                        Vidéo principale suivie par les apprenants inscrits.
                      </span>
                    </div>

                    {uploadError && (
                      <div className="alert alert-danger py-2 mt-2 mb-0" role="alert">
                        {uploadError}
                      </div>
                    )}
                  </div>

                  <div className="input-block mb-3">
                    <label className="form-label">
                      Niveau<span className="text-danger ms-1">*</span>
                    </label>
                    <select className="select form-control" value={level} onChange={(e) => setLevel(e.target.value)}>
                      <option value="">Sélectionnez le niveau</option>
                      <option>Débutant</option>
                      <option>Intermédiaire</option>
                      <option>Avancé</option>
                      <option>Expert</option>
                    </select>
                  </div>

                  <div className="input-block mb-3">
                    <label className="form-label">
                      Langue<span className="text-danger ms-1">*</span>
                    </label>
                    <select className="select form-control" value={language} onChange={(e) => setLanguage(e.target.value)}>
                      <option value="">Sélectionnez la langue</option>
                      <option>Français</option>
                      <option>Arabe</option>
                      <option>Anglais</option>
                    </select>
                  </div>

                  <div className="input-block mb-3">
                    <label className="form-label">Durée estimée</label>
                    <div className="position-relative">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Ex: 2 heures 30 minutes"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="d-flex align-items-center justify-content-between border rounded-3 p-3">
                    <div>
                      <p className="fw-medium mb-0">Cours gratuit</p>
                      <span className="fs-13 text-gray-6">Activez si ce cours est gratuit</span>
                    </div>
                    <div className="form-check form-switch mb-0">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={isFree}
                        onChange={(e) => setIsFree(e.target.checked)}
                      />
                    </div>
                  </div>
                </div>

                {/* Colonne 3 */}
                <div className="col-lg-4">
                  <div className="input-block mb-3">
                    <label className="form-label">
                      Professionnel / Coach<span className="text-danger ms-1">*</span>
                    </label>
                    <select
                      className="form-control"
                      value={professional}
                      onChange={(e) => setProfessional(e.target.value)}
                      disabled={!category}
                    >
                      <option value="">
                        {category ? "Sélectionnez un professionnel" : "Choisissez d'abord une catégorie"}
                      </option>
                      {availableCoaches.map((coach) => (
                        <option key={coach._id} value={coach.Name}>{coach.Name}</option>
                      ))}
                    </select>
                    {category && availableCoaches.length === 0 && (
                      <span className="fs-13 text-danger mt-1 d-block">
                        Aucun coach n'est encore associé à cette catégorie{sousCategorie ? " / sous-catégorie" : ""}.
                      </span>
                    )}
                  </div>

                  <div className="input-block mb-3">
                    <label className="form-label">
                      Prix<span className="text-danger ms-1">*</span>
                    </label>
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Ex: 49.99"
                        value={isFree ? '0' : price}
                        onChange={(e) => setPrice(e.target.value)}
                        disabled={isFree}
                      />
                      <span className="input-group-text">DT</span>
                    </div>
                  </div>

                  <div className="input-block mb-3">
                    <label className="form-label">Tags</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Ajouter un tag et appuyez sur Entrée"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={handleTagKeyDown}
                    />
                    <span className="fs-13 text-gray-6 mt-1 d-block">
                      Ex: communication, couple, relations...
                    </span>
                    {tags.length > 0 && (
                      <div className="d-flex flex-wrap gap-1 mt-2">
                        {tags.map((tag, i) => (
                          <span key={i} className="badge bg-light text-dark border d-flex align-items-center">
                            {tag}
                            <button
                              type="button"
                              className="btn-close btn-close-sm ms-2"
                              style={{ fontSize: '0.55rem' }}
                              onClick={() => removeTag(tag)}
                              aria-label="Retirer"
                            />
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="input-block mb-3">
                    <label className="form-label">
                      Statut<span className="text-danger ms-1">*</span>
                    </label>
                    <select className="select form-control" defaultValue="Brouillon" disabled>
                      <option>Brouillon</option>
                    </select>
                    <span className="fs-13 text-gray-6 mt-1 d-block">
                      Brouillon ne sera visible que par vous.
                    </span>
                  </div>

                  <div className="input-block mb-3">
                    <label className="form-label">Pré-requis</label>
                    <textarea
                      className="form-control"
                      rows={3}
                      placeholder="Listez les pré-requis pour suivre ce cours"
                      value={prerequisites}
                      onChange={(e) => setPrerequisites(e.target.value)}
                    />
                  </div>

                  <div className="bg-light border rounded-3 p-3 d-flex">
                    <i className="fa-regular fa-lightbulb text-warning me-2 mt-1" />
                    <span className="fs-13">
                      Un bon titre et une description détaillée augmentent l'intérêt pour votre cours.
                    </span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'info' && (
              <div className="d-flex align-items-center justify-content-end gap-2 mt-4 pt-3 border-top">
                <button type="button" className="btn btn-light" onClick={handleCancel}>
                  Annuler
                </button>
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => handleSubmit('Brouillon')}
                >
                  <i className="fa-regular fa-floppy-disk me-1" />
                  Enregistrer comme brouillon
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => handleSubmit('Publié')}
                >
                  <i className="fa-solid fa-paper-plane me-1" />
                  Publier le cours
                </button>
              </div>
            )}

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

          </div>
          )}
        </div>
      </div>
    </div>
  );
}
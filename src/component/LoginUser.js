import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function LoginUser() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const [submitMessage, setSubmitMessage] = useState('');
  const [submitStatus, setSubmitStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitMessage('');
    setSubmitStatus('');
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8000/register/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          Email: email,
          Password: pass
        })
      });

      const data = await response.json();

      if (!response.ok) {
        setSubmitMessage(data.message || "Erreur lors de la connexion");
        setSubmitStatus('error');
        return;
      }

      // Sauvegarde de l'utilisateur connecté
      const storage = rememberMe ? localStorage : sessionStorage;
      storage.setItem("user", JSON.stringify(data.user));

      setSubmitMessage("Connexion réussie !");
      setSubmitStatus('success');

      setTimeout(() => navigate('/'), 800);

    } catch (error) {
      console.error(error);
      setSubmitMessage("Erreur de connexion au serveur");
      setSubmitStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
  <div>
  <div className="main-wrapper">
    <div className="login-content">
      <div className="row">
        {/* Login Banner */}
        <div className="col-lg-6 login-bg d-none d-lg-flex">
          <div className="login-carousel">
            <div>
              <div className="login-carousel-section mb-3">
                <div className="login-banner">
                  <img src="assets/img/auth/auth-1.svg" className="img-fluid" alt="Logo" />
                </div>
                <div className="mentor-course text-center">
                  <h3 className="mb-2">Bienvenue dans  <br />Will<span className="text-secondary">Mind</span> Coures.</h3>
<p>
  Découvrez nos formations en développement personnel, psychologie, relations de couple et éducation des enfants, 
  et progressez à votre rythme grâce à nos contenus et à l’accompagnement de professionnels.
</p>

                </div>
              </div>
            </div>
          </div>
        </div>
        {/* /Login Banner */}
        <div className="col-lg-6 login-wrap-bg">
          {/* Login */}
          <div className="login-wrapper">
            <div className="loginbox">
              <div className="w-100">
                <div className="d-flex align-items-center justify-content-between login-header">
                </div>
                <h1 className="fs-32 fw-bold topic">
                  
                                    <img src="assets/img/logo.png" className="img-fluid" alt="Logo" style={{width:300}} />

                  Se connecter</h1>
                <p className="mb-4">Accédez à votre espace en toute simplicité.</p>

                <form onSubmit={handleSubmit}>
                  <div className="mb-3 position-relative">
                    <label className="form-label">Email<span className="text-danger ms-1">*</span></label>
                    <div className="position-relative">
                      <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Ex: sarah@example.com"
                      />
                      <span><i className="isax isax-sms input-icon text-gray-7 fs-14" /></span>
                    </div>
                  </div>

                  <div className="mb-3 position-relative">
                    <label className="form-label">Mot de passe<span className="text-danger ms-1">*</span></label>
                    <div className="position-relative" id="passwordInput">
                      <input
                        type="password"
                        className="form-control"
                        value={pass}
                        onChange={(e) => setPass(e.target.value)}
                        placeholder="Votre mot de passe"
                      />
                      <span className="isax toggle-passwords isax-eye-slash text-gray-7 fs-14" />
                    </div>
                  </div>

                  <div className="d-flex align-items-center justify-content-between mb-4">
                    <div className="remember-me d-flex align-items-center">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        id="rememberMe"
                      />
                      <label className="form-check-label mb-0 d-inline-flex remember-me fs-14" htmlFor="rememberMe">
                        Se souvenir de moi
                      </label>
                    </div>
                  </div>

                  <div className="d-grid">
                    <button type="submit" className="btn btn-secondary main-btn" disabled={loading}>
                      {loading ? "Connexion..." : "Se connecter"} <i className="isax isax-arrow-right-3 ms-1" />
                    </button>
                  </div>

                  {submitMessage && (
                    <div
                      className={`alert ${submitStatus === 'success' ? 'alert-success' : 'alert-danger'} mt-3 text-center`}
                      role="alert"
                    >
                      {submitMessage}
                    </div>
                  )}
                </form>

                <div className="d-flex align-items-center justify-content-center or fs-14 mb-3 mt-3">
                  Or
                </div>
              
                <div className="fs-14 fw-normal d-flex align-items-center justify-content-center">
                  Vous n'avez pas de compte ?<Link to="/register" className="link-2 ms-1"> S'inscrire</Link>
                </div>
                {/* /Login */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

  )
}
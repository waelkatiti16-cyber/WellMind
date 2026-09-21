import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

export default function AddUser() {
  const navigate=useNavigate()

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [pass, setPass] = useState('');
  const [passC, setPassC] = useState('');
  const [submitMessage, setSubmitMessage] = useState('');
  const [submitStatus, setSubmitStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (pass !== passC) {
      setSubmitMessage("Les mots de passe ne correspondent pas");
      setSubmitStatus('error');
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/register/adduser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          Name: name,
          Email: email,
          Phone: phone,
          Password: pass
        })
      });

      const data = await response.json();

      if (!response.ok) {
        setSubmitMessage(data.message || "Erreur lors de l'inscription");
        setSubmitStatus('error');
        return;
      }

      setSubmitMessage("Compte créé avec succès !");
      setSubmitStatus('success');
      setName('');
      setEmail('');
      setPhone('');
      setPass('');
      setPassC('');

    } catch (error) {
      console.error(error);
      setSubmitMessage("Erreur de connexion au serveur");
      setSubmitStatus('error');
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
</p>                </div>
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
          
                <h1 className="fs-32 fw-bold topic">                                    <img src="assets/img/logo.png" className="img-fluid" alt="Logo" style={{width:300}} />
S'inscrire</h1>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3 position-relative">
                    <label className="form-label">Nom complete<span className="text-danger ms-1">*</span></label>
                    <div className="position-relative">
                      <input
                        type="text"
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Ex: Sarah Ben Ali"
                      />
                      <span><i className="isax isax-user input-icon text-gray-7 fs-14" /></span>
                    </div>
                  </div>
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
                    <label className="form-label">Téléphone<span className="text-danger ms-1">*</span></label>
                    <div className="position-relative">
                      <input
                        type="tel"
                        className="form-control"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Ex: 20 123 456"
                      />
                      <span><i className="isax isax-call input-icon text-gray-7 fs-14" /></span>
                    </div>
                  </div>
                  <div className="mb-3 position-relative">
                    <label className="form-label">Mot de passe <span className="text-danger"> *</span></label>
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
                    <div className="password-strength" id="passwordStrength">
                      <span id="poor" />
                      <span id="weak" />
                      <span id="strong" />
                      <span id="heavy" />
                    </div>
                    <div className="mt-2" id="passwordInfo" />
                  </div>
                  <div className="mb-3 position-relative">
                    <label className="form-label">Confirmer Mot de passe<span className="text-danger"> *</span></label>
                    <div className="position-relative">
                      <input
                        type="password"
                        className="form-control"
                        value={passC}
                        onChange={(e) => setPassC(e.target.value)}
                        placeholder="Confirmez le mot de passe"
                      />
                      <span className="isax toggle-passworda isax-eye-slash text-gray-7 fs-14" />
                    </div>
                  </div>
         
                  <div className="d-grid">
                    <button type="submit" className="btn btn-secondary main-btn">
                        S'inscrire<i className="isax isax-arrow-right-3 ms-1" /></button>
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
                <div className="d-flex align-items-center justify-content-center or fs-14 mb-3">
                  Or
                </div>
           
                <div className="fs-14 fw-normal d-flex align-items-center justify-content-center">
                 Vous avez une compte ?<NavLink to="/conxuser" className="link-2 ms-1"> Se connecter</NavLink>
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
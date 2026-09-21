import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  // Fonction Login
  const handleLogin = async (e) => {

    // Empêcher le rechargement de la page
    e.preventDefault();

    // Vider l'ancien message
    setMessage("");

    try {

      const response = await fetch(
  "http://localhost:8000/admin/login",        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            email: email,
            password: password
          })
        }
      );

      const data = await response.json();

      // Si email ou password incorrect
      if (!response.ok) {

        setMessage(
          data.message || "Email ou mot de passe incorrect"
        );

        return;
      }

      // Sauvegarder le token
      localStorage.setItem("token", data.token);

      // Sauvegarder les informations admin
      localStorage.setItem(
        "admin",
        JSON.stringify(data.admin)
      );

      // Redirection vers Dashboard
      navigate("/instructor-dashboard");

    } catch (error) {

      console.error(error);

      setMessage(
        "Erreur de connexion au serveur"
      );
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

                      <img
                        src="assets/img/auth/auth-1.svg"
                        className="img-fluid"
                        alt="Logo"
                      />

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

              <div className="login-wrapper">

                <div className="loginbox">

                  <div className="w-100">

                    {/* Header */}

           

                    <h1 className="fs-32 fw-bold topic">
                                    <img src="assets/img/logo.png" className="img-fluid" alt="Logo" style={{width:300}} />

Connecter comme administrateur
                    </h1>


                    {/* FORM LOGIN */}

                    <form
                      onSubmit={handleLogin}
                      className="mb-3 pb-3"
                    >

                      {/* EMAIL */}

                      <div className="mb-3 position-relative">

                        <label className="form-label">

                          Email

                          <span className="text-danger ms-1">
                            *
                          </span>

                        </label>


                        <div className="position-relative">

                          <input
                            type="email"
                            className="form-control form-control-lg"
                            value={email}
                            onChange={(e) =>
                              setEmail(e.target.value)
                            }
                            required
                          />

                          <span>

                            <i className="isax isax-sms input-icon text-gray-7 fs-14" />

                          </span>

                        </div>

                      </div>


                      {/* PASSWORD */}

                      <div className="mb-3 position-relative">

                        <label className="form-label">

                          Mot de passe

                          <span className="text-danger ms-1">
                            *
                          </span>

                        </label>


                        <div
                          className="position-relative"
                          id="passwordInput"
                        >

                          <input
                            type="password"
                            className="pass-inputs form-control form-control-lg"
                            value={password}
                            onChange={(e) =>
                              setPassword(e.target.value)
                            }
                            required
                          />

                          <span className="isax toggle-passwords isax-eye-slash fs-14" />

                        </div>

                      </div>


                      {/* Remember Me */}

                      <div className="d-flex align-items-center justify-content-between mb-4">

                        <div className="remember-me d-flex align-items-center">

                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="flexCheckDefault"
                          />

                          <label
                            className="form-check-label ms-2"
                            htmlFor="flexCheckDefault"
                          >

                            Remember Me

                          </label>

                        </div>


                        <div>

                        

                        </div>

                      </div>


                      {/* MESSAGE ERREUR */}

                      {message && (

                        <div
                          className="alert alert-danger"
                          role="alert"
                        >

                          {message}

                        </div>

                      )}


                      {/* BUTTON LOGIN */}

                      <div className="d-grid">

                        <button
                          className="btn btn-secondary btn-lg"
                          type="submit"
                        >

                          Connexion

                          <i className="isax isax-arrow-right-3 ms-1" />

                        </button>

                      </div>

                    </form>


                 

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
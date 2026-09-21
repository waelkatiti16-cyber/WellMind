import React from 'react'

export default function Home() {
  return (
    <div>
      {/* Bannière */}
      <section className="banner-section">
        <img className="img-fluid d-none d-lg-flex banner-bg1" src="./assets/img/bg/bg-15.png" alt="img" />
        <img className="img-fluid d-none d-lg-flex banner-bg2" src="./assets/img/bg/bg-16.png" alt="img" />
        <img className="img-fluid d-none d-lg-flex banner-bg3" src="./assets/img/bg/bg-17.png" alt="img" />
        <img className="img-fluid d-none d-lg-flex banner-bg4" src="./assets/img/bg/bg-18.png" alt="img" />
        <div className="container">
          <div className="row align-items-center justify-content-between">
            <div className="col-xl-7 col-lg-7">
              <div className="banner-content pe-xxl-5">
                <span className="hero-title">Le leader de l'apprentissage en ligne</span>
                <h1 className="mb-4 text-white">
                  Trouvez les meilleurs <span>cours</span> dispensés par les meilleurs <span>mentors</span> du monde
                </h1>
                <p className="fs-lg text-center text-md-start pb-2 pb-md-3 mb-4">
                  Nos cours en ligne spécialisés sont conçus pour vous apporter l'expérience de la salle de classe, où que vous soyez.
                </p>
                <form className="banner-search" action="course-list.html">
                  <div className="dropdown">
                    <a className="hero-dropdown" href="#" data-bs-toggle="dropdown" aria-expanded="false">
                      Sélectionner une catégorie <i className="isax isax-arrow-down5 fs-12" />
                    </a>
                    <ul className="dropdown-menu p-1">
                      <li><a className="dropdown-item" href="#">Relations amoureuses & Vie de couple</a></li>
                      <li><a className="dropdown-item" href="#">Enfants & Réussite scolaire</a></li>
                      <li><a className="dropdown-item" href="#">Santé mentale & Maladies neurologiques</a></li>
                      <li><a className="dropdown-item" href="#">Inspiration & Analyse des célébrités / sportifs</a></li>
                    </ul>
                  </div>
                  <input type="text" name="search" className="border-0 form-control p-0" placeholder="Rechercher des cours, des instructeurs" />
                  <button type="submit" className="btn btn-secondary ms-auto"><i className="isax isax-arrow-right-1" /></button>
                </form>
                <div className="d-flex align-items-center gap-4 justify-content-lg-between justify-content-center flex-wrap">
                  <div className="counter-item">
                    <div className="counter-icon flex-shrink-0">
                      <img src="assets/img/icons/icon-32.svg" alt="img" />
                    </div>
                    <div className="count-content">
                      <h5 className="text-purple"><span className="count-digit">10</span>K</h5>
                      <p>Cours en ligne</p>
                    </div>
                  </div>
                  <div className="counter-item">
                    <div className="counter-icon flex-shrink-0">
                      <img src="assets/img/icons/icon-33.svg" alt="img" />
                    </div>
                    <div className="count-content">
                      <h5 className="text-skyblue"><span className="count-digit">6</span>K</h5>
                      <p>Cours certifiés</p>
                    </div>
                  </div>
                  <div className="counter-item">
                    <div className="counter-icon flex-shrink-0">
                      <img src="assets/img/icons/icon-34.svg" alt="img" />
                    </div>
                    <div className="count-content">
                      <h5 className="text-success"><span className="count-digit">2</span>K</h5>
                      <p>Tuteurs expérimentés</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-5">
              <div className="banner-image">
                <div className="swiper swiper-slider-banner">
                  <div className="swiper-wrapper">
                    <BannerCourseSlide
                      img="course-22.jpg"
                      brand="assets/img/icons/course-01.svg"
                      avatar="user-50.jpg"
                      author="David Benitez"
                      badge="Productivité"
                      title="Le cours complet de gestion et d'entreprise"
                      rating="5.0 (210 avis)"
                      price="$168"
                    />
                    <BannerCourseSlide
                      img="course-25.jpg"
                      brand="assets/img/featured-courses/Clip-path-group.svg"
                      avatar="user-20.jpg"
                      author="Edith Dorsey"
                      badge="Style de vie"
                      title="Cours complet en arts créatifs et médias"
                      rating="4.9 (178 avis)"
                      price="$190"
                    />
                    <BannerCourseSlide
                      img="course-24.jpg"
                      brand="assets/img/featured-courses/react.svg"
                      avatar="user-23.jpg"
                      author="Calvin Johnsen"
                      badge="Développement"
                      title="Apprenez et créez des applications avec les fondamentaux de ReactJS"
                      rating="5.0 (154 avis)"
                      price="$147"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Avantages */}
      <section className="benefit-section">
        <div className="container">
          <div className="section-header text-center">
            <span className="fw-medium text-secondary text-decoration-underline mb-2 d-inline-block">Nos avantages</span>
            <h2>Maîtrisez les compétences pour booster votre carrière</h2>
            <p>Le bon cours, guidé par un mentor expert, peut vous apporter des connaissances précieuses et des compétences pratiques.</p>
          </div>
          <div className="row">
            <BenefitCard
              bg="bg-1.png"
              iconBg="bg-primary-transparent"
              icon="isax-book-1"
              title="Apprentissage flexible"
              text="Nous croyons qu'une éducation de qualité doit être accessible à tous. Nos modèles de tarification sont conçus en conséquence."
            />
            <BenefitCard
              bg="bg-2.png"
              iconBg="bg-secondary-transparent"
              icon="isax-bookmark5"
              title="Accès à vie"
              text="En vous inscrivant à nos cours, vous ne bénéficiez pas seulement d'un apprentissage temporaire, mais d'un véritable investissement."
            />
            <BenefitCard
              bg="bg-3.png"
              iconBg="bg-skyblue-transparent"
              icon="isax-chart-26"
              title="Enseignement par des experts"
              text="Nos instructeurs sont des professionnels chevronnés avec des années d'expérience dans leurs domaines respectifs."
            />
          </div>
        </div>
      </section>

      {/* Institutions partenaires */}
      <section className="client-section">
        <div className="container">
          <h6 className="fw-medium text-center mb-4">
            Approuvé par <span className="text-decoration-underline text-secondary">20+</span> institutions dans le monde
          </h6>
          <div className="institutions-slider lazy slider">
            {["01","02","03","04","05","06","07","02","03","04","05","06"].map((n, i) => (
              <div className="institutions-items p-1" key={i}>
                <img className="img-fluid" src={`./assets/img/client/${n}.svg`} alt="img" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meilleurs cours */}
      <section className="top-courses-sec">
        <img className="top-courses-bg" src="./assets/img/bg/bg-20.png" alt="img" />
        <div className="container">
          <div className="section-header text-center">
            <span className="fw-medium text-secondary text-decoration-underline mb-2 d-inline-block">Nos catégories</span>
            <h2>Meilleurs cours et catégories</h2>
            <p>Le bon cours, guidé par un mentor expert, peut vous apporter des connaissances précieuses et des compétences pratiques</p>
          </div>
          <div className="top-courses-slider lazy">
            {[
              ["icon-6.svg", "Développeur Frontend"],
              ["icon-7.svg", "Gestion Jira"],
              ["icon-8.svg", "Développeur Figma"],
              ["icon-9.svg", "Développeur Framer"],
              ["icon-10.svg", "Développeur Vue.js"],
              ["icon-11.svg", "Développeur Shopify"],
              ["icon-10.svg", "Développeur Vue.js"],
              ["icon-11.svg", "Développeur Shopify"],
            ].map(([icon, label], i) => (
              <div key={i}>
                <div className="categories-item categories-item-three mb-0">
                  <img className="mx-auto" src={`assets/img/category/icons/${icon}`} alt="img" />
                  <h6 className="title"><a href="course-category.html">{label}</a></h6>
                </div>
              </div>
            ))}
          </div>
          <a href="course-category.html" className="btn btn-primary btn-md">Voir toutes les catégories</a>
        </div>
      </section>

      {/* Confiance */}
      <section className="trust-sec">
        <div className="container">
          <div className="video-showcase">
            <img src="assets/img/feature/feature-1.jpg" className="img-fluid w-100 rounded-2" alt="banner" />
            <div className="video-play">
              <a href="https://www.youtube.com/embed/1trvO6dqQUI" data-fancybox><i className="isax isax-play5" /></a>
            </div>
          </div>
          <div className="trust-content">
            <img src="./assets/img/bg/bg-19.png" alt="img" className="w-100 trust-bg" />
            <div className="row justify-content-between">
              <div className="col-md-4">
                <h4>Approuvé par plus de 15 000 étudiants et utilisateurs satisfaits depuis 2000</h4>
                <div className="d-flex align-items-center flex-wrap mt-5 gap-2">
                  <a href="login.html" className="btn btn-secondary">S'inscrire en tant qu'étudiant</a>
                  <a href="become-an-instructor.html" className="btn btn-dark">Postuler en tant que tuteur</a>
                </div>
              </div>
              <div className="col-md-7">
                <div className="row">
                  <div className="col-md-6">
                    <h4 className="text-white mb-2">9.8/10</h4>
                    <h5 className="text-white mb-2">Score d'approbation des cours</h5>
                    <p className="text-white mb-5">Obtenir un score d'approbation complet pour un cours est un accomplissement significatif.</p>
                  </div>
                  <div className="col-md-6">
                    <h4 className="text-white mb-2">13k</h4>
                    <h5 className="text-white mb-2">Étudiants satisfaits dans le monde</h5>
                    <p className="text-white mb-5">Les étudiants satisfaits du monde entier partagent un même sentiment de bonheur.</p>
                  </div>
                </div>
                <div className="d-flex align-items-center bg-white user-goal p-2">
                  <div className="avatar avatar-lg flex-shrink-0">
                    <img className="rounded-pill" src="./assets/img/user/user-28.jpg" alt="img" />
                  </div>
                  <p className="text-gray-9 mb-0">« Tous les cours aident incroyablement les gens à atteindre leurs objectifs »</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cours en vedette */}
      <section className="featured-courses-section">
        <div className="container">
          <div className="section-header text-center">
            <span className="fw-medium text-secondary text-decoration-underline mb-2 d-inline-block">Cours en vedette</span>
            <h2>Quoi de neuf sur DreamsLMS</h2>
            <p>Découvrez nos cours en vedette, spécialement sélectionnés pour vous aider à acquérir des compétences recherchées</p>
          </div>
          <div className="feature-course-slider-2">
            <FeaturedCourse
              img="course-36.jpg" price="$500" badge="UI/UX" badgeClass="badge-soft-info"
              title="Informations sur le diplôme de design UI/UX"
              avatar="user-06.jpg" author="Brenda Slaton" heartFilled={false}
            />
            <FeaturedCourse
              img="course-37.jpg" price="$300" badge="Productivité" badgeClass="badge-soft-danger"
              title="Apprenez et créez des applications avec les fondamentaux de ReactJS"
              avatar="user-07.jpg" author="David Benitez" heartFilled={false}
            />
            <FeaturedCourse
              img="course-38.jpg" price="$350" badge="Gestion" badgeClass="badge-soft-purple"
              title="Le cours complet de gestion et d'entreprise"
              avatar="user-08.jpg" author="Calvin Johnsen" heartFilled={false}
            />
            <FeaturedCourse
              img="course-39.jpg" price="$500" badge="Art et médias" badgeClass="badge-soft-success"
              title="Cours complet en arts créatifs et médias"
              avatar="user-09.jpg" author="David Benitez" heartFilled={true}
            />
            <FeaturedCourse
              img="course-37.jpg" price="$300" badge="Productivité" badgeClass="badge-soft-danger"
              title="Apprenez et créez des applications avec les fondamentaux de ReactJS"
              avatar="user-07.jpg" author="David Benitez" heartFilled={false} link="course-details-2.html"
            />
          </div>
          <div className="d-flex align-items-center justify-content-center">
            <a href="course-list.html" className="btn btn-primary btn-md">Voir tous les cours</a>
          </div>
        </div>
      </section>

      {/* Communauté d'apprentissage */}
      <section className="community-to-learn">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="section-header">
                <span className="fw-medium text-secondary text-decoration-underline mb-2 d-inline-block">Apprentissage avancé</span>
                <h2>Créer une communauté d'apprenants.</h2>
                <p>Nous nous engageons à transformer l'éducation en proposant une large gamme de cours de qualité adaptés à tous les niveaux d'apprenants.</p>
              </div>
              <CommunityItem icon="isax-book-saved5" iconClass="community-icon-1" title="Apprenez de n'importe où" text="Apprendre de n'importe où est devenu un aspect transformateur de l'éducation moderne." />
              <CommunityItem icon="isax-bookmark5" iconClass="community-icon-2" title="Mentors experts" text="Apprendre de n'importe où est devenu un aspect transformateur de l'éducation moderne." />
              <CommunityItem icon="isax-chart-26" iconClass="community-icon-3" title="Apprenez des compétences recherchées" text="Dans un marché du travail en évolution rapide, apprendre des compétences recherchées est essentiel pour évoluer professionnellement." />
              <div className="d-flex align-items-center gap-2">
                <a href="login.html" className="btn btn-secondary btn-md">S'inscrire en tant qu'étudiant</a>
                <a href="become-an-instructor.html" className="btn btn-dark btn-md">Postuler en tant que tuteur</a>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="community-img d-none d-lg-flex">
                <img src="assets/img/shapes/shape-5.png" alt="img" className="img-fluid community-img-01" />
                <img src="assets/img/shapes/shape-6.png" alt="img" className="img-fluid community-img-02" />
                <img src="assets/img/feature/feature-2.jpg" alt="img" className="img-fluid community-img-03" />
                <img src="assets/img/feature/feature-3.jpg" alt="img" className="img-fluid community-img-04" />
                <img src="assets/img/shapes/shape-7.svg" alt="img" className="img-fluid community-img-05" />
                <div className="community-count p-2">
                  <div className="enrolled-list">
                    <div className="avatar-list-stacked mb-2">
                      {["01","03","07","08"].map((n) => (
                        <span className="avatar avatar-rounded" key={n}>
                          <img className="border border-white" src={`assets/img/user/user-${n}.jpg`} alt="img" />
                        </span>
                      ))}
                      <span className="avatar avatar-rounded">
                        <img src="assets/img/user/user-06.jpg" alt="img" />
                      </span>
                    </div>
                    <p className="mb-0"><span className="text-secondary">35 000+</span> étudiants inscrits</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Clients */}
      <div className="cliets-section-one">
        <div className="brand-slide">
          {["08","09","10","11","12","13","08","09"].map((n, i) => (
            <div key={i}><img src={`assets/img/client/${n}.svg`} alt="img" /></div>
          ))}
        </div>
      </div>

      {/* Comment ça marche */}
      <div className="how-it-works-sec-two">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="me-5" data-aos="fade-up">
                <img src="assets/img/feature/feature-27.jpg" className="img-fluid rounded-5" alt="img" />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="how-it-works-content aos" data-aos="fade-up">
                <div className="section-header">
                  <span className="fw-medium text-secondary text-decoration-underline mb-2 d-inline-block">Comment ça marche</span>
                  <h2 className="mb-1">Commencez votre parcours d'apprentissage dès aujourd'hui !</h2>
                  <p>Libérez votre potentiel et réalisez vos rêves grâce à nos ressources d'apprentissage complètes !</p>
                </div>
                <WorkStep n="01" title="Inscrivez-vous" text="Une fois sur la page d'accueil du site, recherchez le bouton d'inscription ou de création de compte." />
                <WorkStep n="02" title="Complétez votre profil" text="Après avoir vérifié votre e-mail, il se peut qu'on vous demande de compléter des informations supplémentaires." />
                <WorkStep n="03" title="Choisissez des cours ou des programmes" text="Selon le site, après l'inscription, vous pourrez parcourir et choisir des cours ou programmes." />
                <WorkStep n="04" title="Accédez à votre compte" text="Vous aurez accès aux fonctionnalités du site, comme l'inscription aux cours, les ressources et le suivi de votre progression." last />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Instructeurs en vedette */}
      <div className="featured-instructor-sec">
        <div className="container">
          <div className="section-header text-center" data-aos="fade-up">
            <span className="fw-medium text-light text-decoration-underline mb-2 d-inline-block">Instructeurs en vedette</span>
            <h2 className="text-white">Instructeurs de classe supérieure et professionnels</h2>
            <p className="text-light">Un changement porteur : témoignages de ceux qui ont sauté le pas</p>
          </div>
          <div className="featured-instructor-slider lazy">
            <Instructor img="instructor-09.jpg" name="Joyce Pence" role="Designer principal" rating="4.8" />
            <Instructor img="instructor-10.jpg" name="Edith Dorsey" role="Comptable" rating="5.0" />
            <Instructor img="instructor-11.jpg" name="Ruben Holmes" role="Architecte" rating="4.8" />
            <Instructor img="instructor-12.jpg" name="Carol Magner" role="Designer principal" rating="4.5" />
            <Instructor img="instructor-10.jpg" name="Edith Dorsey" role="Comptable" rating="5.0" />
          </div>
        </div>
      </div>

      {/* Témoignages */}
      <div className="testimonials-section testimonials-sec-one text-center">
        <div className="container">
          <div className="section-header text-center" data-aos="fade-up">
            <span className="fw-medium text-secondary text-decoration-underline mb-2 d-inline-block">Instructeurs en vedette</span>
            <h2>Instructeurs de classe supérieure et professionnels</h2>
            <p>Témoignages de ceux qui ont connu une véritable évolution</p>
          </div>
          <div className="testimonials-slider lazy mt-4">
            <Testimonial img="user-41.jpg" name="Brenda Slaton" role="Designer" text="Ce mentor m'a aidé à comprendre des concepts avec lesquels je luttais depuis des semaines." />
            <Testimonial img="user-42.jpg" name="Adrian Dennis" role="Développeur" text="J'ai énormément appris grâce à l'expérience personnelle de mon mentor." />
            <Testimonial img="user-43.jpg" name="Adrian Coztanza" role="Architecte" text="Les conseils étaient utiles, mais j'aurais aimé que mon mentor soit plus disponible pour des échanges de suivi." />
            <Testimonial img="user-43.jpg" name="Adrian Coztanza" role="Architecte" text="Les conseils étaient utiles, mais j'aurais aimé que mon mentor soit plus disponible pour des échanges de suivi." />
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="faq-section faq-banner-bg">
        <img src="assets/img/bg/bg-21.svg" alt="img" className="d-lg-flex d-none faq-bg2" />
        <img src="assets/img/bg/bg-22.svg" alt="img" className="d-lg-flex d-none faq-bg3" />
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="faq-img" data-aos="fade-up">
                <img className="img-fluid rounded-5" src="assets/img/feature/feature-4.jpg" alt="img" />
                <span><i className="isax isax-message-question5" /></span>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="faq-content">
                <div className="section-header" data-aos="fade-up">
                  <span className="fw-medium text-secondary text-decoration-underline mb-2 d-inline-block">Vos questions ont une réponse</span>
                  <h2 className="mb-1">Questions fréquentes</h2>
                  <p>Découvrez des réponses détaillées aux questions les plus fréquentes sur notre plateforme.</p>
                </div>
                <div className="accordion accordion-customicon1 accordions-items-seperate" id="accordioncustomicon1Example">
                  {[
                    "Comment puis-je m'inscrire à un cours ?",
                    "Combien de temps ai-je accès à un cours ?",
                    "Quels moyens de paiement sont acceptés ?",
                    "Vais-je recevoir un certificat après avoir terminé un cours ?",
                    "Quel est le but de DreamLMS ?",
                    "Que puis-je faire avec mon certificat ?",
                  ].map((question, i) => (
                    <FaqItem
                      key={i}
                      id={`customicon1${i}`}
                      question={question}
                      answer="De nombreux sites proposent un certificat de réussite pour les cours payants. Les cours gratuits peuvent ou non inclure un certificat, selon la politique de la plateforme."
                      open={i === 0}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Blog */}
      <section className="latest-blog-three latest-blog-five">
        <div className="container">
          <div className="section-header text-center" data-aos="fade-up">
            <span className="fw-medium text-secondary text-decoration-underline mb-2 d-inline-block">Articles et actualités</span>
            <h2>Nos derniers articles de blog</h2>
            <p>Découvrez du contenu soigneusement sélectionné pour informer, divertir et engager les lecteurs du monde entier.</p>
          </div>
          <div className="latest-blog-main">
            <div className="row">
              <div className="col-lg-4">
                <BlogCard img="blog-35.jpg" category="Style de vie" title="Pourquoi un LMS est essentiel pour l'éducation moderne" />
              </div>
              <div className="col-lg-8">
                <div className="row">
                  <div className="col-md-6"><BlogCard img="blog-36.jpg" category="Productivité" title="L'impact du LMS sur le parcours académique" /></div>
                  <div className="col-md-6"><BlogCard img="blog-38.jpg" category="Productivité" title="Maximiser la réussite académique avec le bon LMS" /></div>
                  <div className="col-md-6"><BlogCard img="blog-37.jpg" category="UI /UX" title="Promouvoir la santé et le bien-être à l'école" /></div>
                  <div className="col-md-6"><BlogCard img="blog-39.jpg" category="Développement" title="Comment créer et gérer un programme pilote de mentorat" /></div>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center">
            <a className="btn btn-view-all" data-aos="fade-up" href="blog-grid.html">Voir tous les articles</a>
          </div>
        </div>
      </section>
    </div>
  )
}

/* --- Petits composants réutilisables --- */

function BannerCourseSlide({ img, brand, avatar, author, badge, title, rating, price }) {
  return (
    <div className="swiper-slide">
      <div className="course-item-two course-item mb-0">
        <div className="course-img">
          <img src={`assets/img/course/${img}`} alt="img" className="img-fluid" />
          <div className="position-absolute start-0 top-0 d-flex align-items-start w-100 z-index-2 p-2">
            <a href="javascript:void(0);" className="fav-icon"><i className="isax isax-heart" /></a>
            <a href="javascript:void(0);" className="brand-icon ms-auto">
              <img src={brand} alt="img" className="img-fluid" />
            </a>
          </div>
        </div>
        <div className="course-content">
          <div className="d-flex justify-content-between mb-2">
            <div className="d-flex align-items-center">
              <a href="javascript:void(0);" className="avatar avatar-sm">
                <img src={`assets/img/user/${avatar}`} alt="img" className="img-fluid avatar avatar-sm rounded-circle" />
              </a>
              <div className="ms-2">
                <a href="javascript:void(0);" className="link-default fs-14">{author}</a>
              </div>
            </div>
            <span className="badge badge-light rounded-pill bg-light d-inline-flex align-items-center fs-13 fw-medium">{badge}</span>
          </div>
          <h6 className="mb-2"><a href="course-details.html">{title}</a></h6>
          <p className="d-flex align-items-center mb-3"><i className="ti ti-star-filled text-warning me-2" />{rating}</p>
          <div className="d-flex align-items-center justify-content-between">
            <h6 className="text-secondary fs-16 fw-semi-bold mb-0">{price}</h6>
            <a href="cart.html" className="btn btn-dark btn-sm d-inline-flex align-items-center">
              Ajouter au panier<i className="isax isax-arrow-right-3 ms-1" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

function BenefitCard({ bg, iconBg, icon, title, text }) {
  return (
    <div className="col-lg-4 col-md-6">
      <div className="card shadow-sm">
        <div className="card-body p-4">
          <div className="position-absolute top-0 end-0 mt-n3 me-n4">
            <img src={`assets/img/shapes/${bg}`} alt="img" />
          </div>
          <div className={`p-4 rounded-pill ${iconBg} d-inline-flex`}>
            <i className={`isax ${icon} fs-24`} />
          </div>
          <h5 className="mt-3 mb-1">{title}</h5>
          <p>{text}</p>
        </div>
      </div>
    </div>
  )
}

function FeaturedCourse({ img, price, badge, badgeClass, title, avatar, author, heartFilled, link = "course-details.html" }) {
  return (
    <div>
      <div className="course-item">
        <div className="course-img">
          <a href={link}><img src={`assets/img/course/${img}`} alt="img" className="img-fluid" /></a>
          <div className="position-absolute start-0 top-0 d-flex align-items-start w-100 z-index-2 p-2">
            <span className="price-badge ms-auto">{price}</span>
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-between">
          <span className={`badge badge-md ${badgeClass} rounded-pill shadow-none`}>{badge}</span>
          <a href="javascript:void(0);" className="fav-icon">
            <i className={`isax ${heartFilled ? "isax-heart5 text-danger" : "isax-heart"}`} />
          </a>
        </div>
        <div className="pb-3 border-bottom mb-3">
          <h5><a href={link}>{title}</a></h5>
        </div>
        <div className="d-flex align-items-center justify-content-between mb-4">
          <div className="course-rating">
            <span className="course-user"><a href="javascript:void(0);"><img src={`assets/img/user/${avatar}`} alt="img" className="img-fluid" /></a></span>
            <a href="javascript:void(0);">{author}</a>
          </div>
          <span className="d-flex align-items-center rating"><i className="fa-solid fa-star text-warning me-2" />5.0</span>
        </div>
        <a href="course-details.html" className="btn buy-course-btn">Acheter le cours maintenant</a>
      </div>
    </div>
  )
}

function CommunityItem({ icon, iconClass, title, text }) {
  return (
    <div className="community-item d-flex align-items-center">
      <span className={iconClass}><i className={`isax ${icon}`} /></span>
      <div>
        <h5 className="mb-2">{title}</h5>
        <p className="mb-0">{text}</p>
      </div>
    </div>
  )
}

function WorkStep({ n, title, text, last }) {
  return (
    <div className={`d-flex align-items-center works-items${last ? " mb-0 pb-0 border-0" : ""}`}>
      <span className="count">{n}</span>
      <div>
        <h5 className="mb-1">{title}</h5>
        <p>{text}</p>
      </div>
    </div>
  )
}

function Instructor({ img, name, role, rating }) {
  return (
    <div className="instructor-item instructor-item-three mb-0" data-aos="flip-left">
      <div className="instructors-img">
        <a href="instructor-list.html" tabIndex={0}>
          <img className="img-fluid" alt="Img" src={`assets/img/instructor/${img}`} />
        </a>
        <div className="position-absolute start-0 top-0 d-flex align-items-start w-100 z-index-2 p-2">
          <span className="verify"><img src="assets/img/icons/verify-icon.svg" alt="img" className="img-fluid" /></span>
          <a href="javascript:void(0);" className="favourite ms-auto"><i className="isax isax-heart" /></a>
        </div>
      </div>
      <div className="instructor-content">
        <div>
          <h3 className="title"><a href="instructor-details.html">{name}</a></h3>
          <span className="designation">{role}</span>
        </div>
        <p className="rating"><i className="fas fa-star me-1" />{rating}</p>
      </div>
    </div>
  )
}

function Testimonial({ img, name, role, text }) {
  return (
    <div>
      <div className="testimonials-item rounded-3 bg-white" data-aos="flip-right">
        <div className="position-relative d-inline-flex">
          <div className="avatar rounded-circle avatar-xxl border border-white border-3">
            <a href="student-details.html"><img className="img-fluid rounded-circle" src={`./assets/img/user/${img}`} alt="img" /></a>
          </div>
          <i className="isax isax-quote-up5 bg-secondary quote rounded-pill fs-16 p-1" />
        </div>
        <h6 className="mb-1"><a href="student-details.html">{name}</a></h6>
        <p className="designation">{role}</p>
        <p className="mb-3 text-truncate line-clamb-2">{text}</p>
        <div>
          {Array.from({ length: 5 }).map((_, i) => (
            <i className="fa-solid fa-star text-warning" key={i} />
          ))}
        </div>
      </div>
    </div>
  )
}

function FaqItem({ id, question, answer, open }) {
  return (
    <div className="accordion-item" data-aos="fade-up">
      <h2 className="accordion-header" id={`heading${id}`}>
        <a
          href="#"
          className={`accordion-button${open ? "" : " collapsed"}`}
          data-bs-toggle="collapse"
          data-bs-target={`#collapse${id}`}
          aria-expanded={open}
          aria-controls={`collapse${id}`}
        >
          {question} <i className="isax isax-add fs-20 fw-semibold ms-1" />
        </a>
      </h2>
      <div id={`collapse${id}`} className={`accordion-collapse collapse${open ? " show" : ""}`} aria-labelledby={`heading${id}`} data-bs-parent="#accordioncustomicon1Example">
        <div className="accordion-body pt-0">
          <p>{answer}</p>
        </div>
      </div>
    </div>
  )
}

function BlogCard({ img, category, title }) {
  return (
    <div className="event-blog-three blog-three-one" data-aos="fade-up">
      <div className="blog-img-three">
        <a href="blog-grid.html"><img className="img-fluid" alt="Img" src={`assets/img/blog/${img}`} /></a>
      </div>
      <div className="latest-blog-content">
        <div className="event-three-title">
          <div className="event-span-three d-flex align-items-center">
            <span className="category">{category}</span>
            <div className="blog-date"><i className="fa-solid fa-calendar" /><span>09 Aug 2025</span></div>
          </div>
          <a href="blog-grid.html"><h5>{title}</h5></a>
        </div>
      </div>
      <div className="blog-user-top">
        <a href="#"><img src="assets/img/user/user-01.jpg" alt="img" />David Benitez</a>
      </div>
    </div>
  )
}
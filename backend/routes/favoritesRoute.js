const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Import du modèle utilisateur (adaptez le chemin exact)
const User = require('../models/AddUser'); // ou '../models/addUser' selon le nom du fichier

// Import des modèles référencés pour que Mongoose les connaisse
// (même s'ils ne sont pas utilisés directement ici, cela évite les MissingSchemaError)
require('../models/AddCours'); // adaptez le nom exact du modèle cours
require('../models/Coach');  // adaptez le nom exact du modèle coach

// GET /favorites?userId=...
router.get('/', async (req, res) => {
  const { userId } = req.query;
  if (!userId) return res.status(401).json({ message: 'Non connecté' });
  if (!mongoose.Types.ObjectId.isValid(userId)) return res.status(400).json({ message: 'ID invalide' });

  try {
    const user = await User.findById(userId)
      .populate('favoriteCourses')   // utilise le ref 'AddCourse'
      .populate('favoriteCoaches');  // utilise le ref 'Coach'
    if (!user) return res.status(404).json({ message: 'Utilisateur introuvable' });

    res.status(200).json({
      coaches: user.favoriteCoaches || [],
      courses: user.favoriteCourses || []
    });
  } catch (err) {
    console.error('*** ERREUR GET /favorites avec populate ***');
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
});
// POST /favorites/coach/:coachId
router.post('/coach/:coachId', async (req, res) => {
  const { userId } = req.body;
  const { coachId } = req.params;
  console.log('POST /favorites/coach, userId:', userId, 'coachId:', coachId);

  if (!userId || !coachId) return res.status(400).json({ message: 'Paramètres manquants' });
  if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(coachId)) {
    return res.status(400).json({ message: 'ID invalide' });
  }

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'Utilisateur introuvable' });

    const index = user.favoriteCoaches.indexOf(coachId);
    if (index === -1) {
      user.favoriteCoaches.push(coachId);
    } else {
      user.favoriteCoaches.splice(index, 1);
    }
    await user.save();

    console.log('Favori coach mis à jour, nouvelle liste :', user.favoriteCoaches);
    res.status(200).json({ favoriteCoaches: user.favoriteCoaches });
  } catch (err) {
    console.error('*** ERREUR POST /favorites/coach ***');
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
});

// POST /favorites/course/:courseId
router.post('/course/:courseId', async (req, res) => {
  const { userId } = req.body;
  const { courseId } = req.params;
  console.log('POST /favorites/course, userId:', userId, 'courseId:', courseId);

  if (!userId || !courseId) return res.status(400).json({ message: 'Paramètres manquants' });
  if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(courseId)) {
    return res.status(400).json({ message: 'ID invalide' });
  }

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'Utilisateur introuvable' });

    const index = user.favoriteCourses.indexOf(courseId);
    if (index === -1) {
      user.favoriteCourses.push(courseId);
    } else {
      user.favoriteCourses.splice(index, 1);
    }
    await user.save();

    console.log('Favori cours mis à jour, nouvelle liste :', user.favoriteCourses);
    res.status(200).json({ favoriteCourses: user.favoriteCourses });
  } catch (err) {
    console.error('*** ERREUR POST /favorites/course ***');
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
});

module.exports = router;
const express = require("express");
const router = express.Router();

const AddCourse = require("../models/AddCours");
const uploadVideo = require("../middleware/uploadVideo");

// Upload d'un fichier vidéo (courte ou complète)
// Le front envoie le fichier dans le champ "video", et reçoit en retour l'URL à stocker en base
router.post("/upload-video", uploadVideo.single("video"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Aucun fichier vidéo reçu" });
    }

    const fileUrl = `http://localhost:8000/uploads/videos/${req.file.filename}`;

    return res.status(200).json({
      message: "Vidéo téléchargée avec succès",
      url: fileUrl
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Erreur lors de l'upload de la vidéo",
      error: error.message
    });
  }
});

router.post("/addcourse", async (req, res) => {
  try {
    const {
      Title,
      Category,
      SousCategorie,
      ShortDescription,
      Description,
      VideoCourte,
      VideoComplete,
      Level,
      Language,
      Duration,
      IsFree,
      Price,
      Professional,
      Tags,
      Status,
      Prerequisites
    } = req.body;

    const newCourse = new AddCourse({
      Title,
      Category,
      SousCategorie,
      ShortDescription,
      Description,
      VideoCourte,
      VideoComplete,
      Level,
      Language,
      Duration,
      IsFree,
      Price,
      Professional,
      Tags,
      Status,
      Prerequisites
    });

    await newCourse.save();

    return res.status(201).json({
      message: "Cours ajouté avec succès",
      course: newCourse
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Erreur serveur",
      error: error.message
    });
  }
});

// Récupérer tous les cours (pour InstructorDashboard)
router.get("/all", async (req, res) => {
  try {
    const courses = await AddCourse.find({});
    return res.status(200).json(courses);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Erreur serveur",
      error: error.message
    });
  }
});

// Récupérer un seul cours par son id (pour la page Edit)
router.get("/:id", async (req, res) => {
  try {
    const course = await AddCourse.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "Cours introuvable" });
    }
    return res.status(200).json(course);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Erreur serveur",
      error: error.message
    });
  }
});

// Modifier un cours
router.put("/:id", async (req, res) => {
  try {
    const updatedCourse = await AddCourse.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedCourse) {
      return res.status(404).json({ message: "Cours introuvable" });
    }

    return res.status(200).json({
      message: "Cours modifié avec succès",
      course: updatedCourse
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Erreur serveur",
      error: error.message
    });
  }
});

// Supprimer un cours
router.delete("/:id", async (req, res) => {
  try {
    const deletedCourse = await AddCourse.findByIdAndDelete(req.params.id);

    if (!deletedCourse) {
      return res.status(404).json({ message: "Cours introuvable" });
    }

    return res.status(200).json({
      message: "Cours supprimé avec succès"
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Erreur serveur",
      error: error.message
    });
  }
});

module.exports = router;
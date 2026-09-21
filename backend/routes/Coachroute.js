const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const Coach = require("../models/Coach");

// Configuration de multer pour l'upload des photos
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/coaches");
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage: storage });

// Upload d'une photo de coach
router.post("/upload", upload.single("photo"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "Aucun fichier envoyé" });
  }

  const fileUrl = `http://localhost:8000/uploads/coaches/${req.file.filename}`;

  return res.status(200).json({
    message: "Photo téléchargée avec succès",
    url: fileUrl
  });
});

// Ajouter un coach
router.post("/add", async (req, res) => {
  try {
    const { Nom, Specialite, Email, Telephone, Photo, Bio } = req.body;

    const newCoach = new Coach({
      Nom,
      Specialite,
      Email,
      Telephone,
      Photo,
      Bio
    });

    await newCoach.save();

    return res.status(201).json({
      message: "Coach ajouté avec succès",
      coach: newCoach
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Erreur serveur",
      error: error.message
    });
  }
});

// Récupérer tous les coachs
router.get("/all", async (req, res) => {
  try {
    const coaches = await Coach.find({});
    return res.status(200).json(coaches);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Erreur serveur",
      error: error.message
    });
  }
});

// Récupérer un coach par id
router.get("/:id", async (req, res) => {
  try {
    const coach = await Coach.findById(req.params.id);
    if (!coach) {
      return res.status(404).json({ message: "Coach introuvable" });
    }
    return res.status(200).json(coach);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Erreur serveur",
      error: error.message
    });
  }
});

// Modifier un coach
router.put("/:id", async (req, res) => {
  try {
    const { Nom, Specialite, Email, Telephone, Photo, Bio } = req.body;

    const updatedCoach = await Coach.findByIdAndUpdate(
      req.params.id,
      { Nom, Specialite, Email, Telephone, Photo, Bio },
      { new: true }
    );

    if (!updatedCoach) {
      return res.status(404).json({ message: "Coach introuvable" });
    }

    return res.status(200).json({
      message: "Coach modifié avec succès",
      coach: updatedCoach
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Erreur serveur",
      error: error.message
    });
  }
});

// Supprimer un coach
router.delete("/:id", async (req, res) => {
  try {
    const deletedCoach = await Coach.findByIdAndDelete(req.params.id);

    if (!deletedCoach) {
      return res.status(404).json({ message: "Coach introuvable" });
    }

    return res.status(200).json({
      message: "Coach supprimé avec succès"
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
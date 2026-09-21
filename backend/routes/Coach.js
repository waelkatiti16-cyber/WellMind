const express = require("express");
const router = express.Router();

const Coach = require("../models/Coach");
const { uploadImage, uploadCv } = require("../middleware/uploadFiles");

// --- Upload de la photo du coach ---
router.post("/upload-image", uploadImage.single("image"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Aucune image reçue" });
    }
    const fileUrl = `http://localhost:8000/uploads/images/${req.file.filename}`;
    return res.status(200).json({ message: "Image téléchargée avec succès", url: fileUrl });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erreur lors de l'upload de l'image", error: error.message });
  }
});

// --- Upload du CV du coach ---
router.post("/upload-cv", uploadCv.single("cv"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Aucun CV reçu" });
    }
    const fileUrl = `http://localhost:8000/uploads/cv/${req.file.filename}`;
    return res.status(200).json({ message: "CV téléchargé avec succès", url: fileUrl });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erreur lors de l'upload du CV", error: error.message });
  }
});

// --- Ajouter un coach ---
router.post("/addcoach", async (req, res) => {
  try {
    const { Name, Type, Image, Cv, Bio, Specialities } = req.body;

    const newCoach = new Coach({
      Name,
      Type,
      Image,
      Cv,
      Bio,
      Specialities: Specialities || []
    });

    await newCoach.save();

    return res.status(201).json({
      message: "Coach ajouté avec succès",
      coach: newCoach
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
});

// --- Récupérer tous les coachs ---
router.get("/all", async (req, res) => {
  try {
    const coaches = await Coach.find({});
    return res.status(200).json(coaches);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
});

// --- Récupérer un coach par id ---
router.get("/:id", async (req, res) => {
  try {
    const coach = await Coach.findById(req.params.id);
    if (!coach) {
      return res.status(404).json({ message: "Coach introuvable" });
    }
    return res.status(200).json(coach);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
});

// --- Modifier un coach ---
router.put("/:id", async (req, res) => {
  try {
    const updatedCoach = await Coach.findByIdAndUpdate(
      req.params.id,
      req.body,
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
    return res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
});

// --- Supprimer un coach ---
// --- Noter un coach (ajoute ou remplace la note de cet utilisateur) ---
router.post("/:id/rate", async (req, res) => {
  try {
    const { UserId, UserName, Stars } = req.body;

    if (!UserId || !Stars) {
      return res.status(400).json({ message: "UserId et Stars sont obligatoires" });
    }

    if (Stars < 1 || Stars > 5) {
      return res.status(400).json({ message: "La note doit être comprise entre 1 et 5" });
    }

    const coach = await Coach.findById(req.params.id);
    if (!coach) {
      return res.status(404).json({ message: "Coach introuvable" });
    }

    const existingIndex = coach.Ratings.findIndex((r) => r.UserId === UserId);

    if (existingIndex >= 0) {
      coach.Ratings[existingIndex].Stars = Stars;
      coach.Ratings[existingIndex].UserName = UserName || coach.Ratings[existingIndex].UserName;
    } else {
      coach.Ratings.push({ UserId, UserName: UserName || "", Stars });
    }

    await coach.save();

    return res.status(200).json({
      message: "Note enregistrée avec succès",
      coach
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedCoach = await Coach.findByIdAndDelete(req.params.id);

    if (!deletedCoach) {
      return res.status(404).json({ message: "Coach introuvable" });
    }

    return res.status(200).json({ message: "Coach supprimé avec succès" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
});

module.exports = router;
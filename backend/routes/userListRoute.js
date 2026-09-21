const express = require("express");
const router = express.Router();
const AddUsers = require("../models/AddUser"); // adaptez le chemin si nécessaire

// GET /users/all : liste tous les utilisateurs sans mot de passe
router.get("/all", async (req, res) => {
  try {
    const users = await AddUsers.find({}).select("-Password");
    res.status(200).json(users);
  } catch (err) {
    console.error("Erreur GET /users/all :", err);
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
});

// DELETE /users/:id : supprime un utilisateur
router.delete("/:id", async (req, res) => {
  try {
    const user = await AddUsers.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "Utilisateur introuvable" });
    }
    res.status(200).json({ message: "Utilisateur supprimé" });
  } catch (err) {
    console.error("Erreur DELETE /users/:id :", err);
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
});

module.exports = router;
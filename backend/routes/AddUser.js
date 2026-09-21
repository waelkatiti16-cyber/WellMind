const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

const AddUsers = require("../models/AddUser");
const Admin = require("../models/Admin");

router.post("/adduser", async (req, res) => {
  try {
    const { Name, Email, Phone, Password } = req.body;

    if (!Name || !Email || !Phone || !Password) {
      return res.status(400).json({ message: "Nom, email, téléphone et mot de passe sont obligatoires" });
    }

    const existingName = await AddUsers.findOne({ Name });
    if (existingName) {
      return res.status(400).json({ message: "Ce nom d'utilisateur existe déjà" });
    }

    const existingEmail = await AddUsers.findOne({ Email });
    if (existingEmail) {
      return res.status(400).json({ message: "Cet email est déjà utilisé" });
    }

    const newUser = new AddUsers({
      Name,
      Email,
      Phone,
      Password
    });

    await newUser.save();

    return res.status(201).json({
      message: "Utilisateur ajouté avec succès",
      user: newUser
    });

  } catch (error) {
    console.error("Erreur /register/adduser :", error);

    if (error.code === 11000) {
      const field = Object.keys(error.keyValue || {})[0] || 'inconnu';
      return res.status(400).json({ message: `Ce ${field.toLowerCase()} est déjà utilisé` });
    }

    return res.status(500).json({
      message: "Erreur serveur",
      error: error.message
    });
  }
});

// --- Connexion unifiée (Admin + Utilisateur) ---
router.post("/login", async (req, res) => {
  try {
    const { Email, Password } = req.body;

    if (!Email || !Password) {
      return res.status(400).json({ message: "Email et mot de passe sont obligatoires" });
    }

    // 1. On vérifie d'abord dans la collection Admin
    const admin = await Admin.findOne({ email: Email });

    if (admin) {
      const isAdminPasswordCorrect = await bcrypt.compare(Password, admin.password);

      if (!isAdminPasswordCorrect) {
        return res.status(401).json({ message: "Email ou mot de passe incorrect" });
      }

      const { password: _removed, ...adminWithoutPassword } = admin.toObject();

      return res.status(200).json({
        message: "Connexion réussie",
        role: "admin",
        user: adminWithoutPassword
      });
    }

    // 2. Sinon on vérifie dans la collection des utilisateurs classiques
    const user = await AddUsers.findOne({ Email });

    if (!user) {
      return res.status(401).json({ message: "Email ou mot de passe incorrect" });
    }

    const isMatch = await user.comparePassword(Password);
    if (!isMatch) {
      return res.status(401).json({ message: "Email ou mot de passe incorrect" });
    }

    const { Password: _removed, ...userWithoutPassword } = user.toObject();

    return res.status(200).json({
      message: "Connexion réussie",
      role: "user",
      user: userWithoutPassword
    });

  } catch (error) {
    console.error("Erreur /register/login :", error);
    return res.status(500).json({
      message: "Erreur serveur",
      error: error.message
    });
  }
});

// GET /register/all : retourne tous les utilisateurs sans le mot de passe
router.get('/all', async (req, res) => {
  try {
    const users = await AddUsers.find({}).select('-Password');
    res.status(200).json(users);
  } catch (err) {
    console.error('Erreur GET /register/all :', err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

module.exports = router;
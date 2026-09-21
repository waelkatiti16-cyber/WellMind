const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");
const Admin = require("../models/Admin");

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("Email reçu :", JSON.stringify(email));
    console.log("Password reçu :", password);

    // DEBUG: lister tous les admins présents dans la collection
    const allAdmins = await Admin.find({});
    console.log("Tous les admins dans la collection :", allAdmins);

    const admin = await Admin.findOne({ email: email });

    console.log("Admin trouvé :", admin);

    if (!admin) {
      return res.status(401).json({
        message: "Email incorrect"
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      admin.password
    );

    console.log("Résultat bcrypt :", isPasswordCorrect);

    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: "Mot de passe incorrect"
      });
    }

    return res.status(200).json({
      message: "Connexion réussie",
      admin: admin
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Erreur serveur"
    });
  }
});

module.exports = router;
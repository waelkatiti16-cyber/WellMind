const express = require("express");
const router = express.Router();

const AddCategorie = require("../models/AddCategorie");

// Ajouter une nouvelle catégorie (avec ses sous-catégories)
router.post("/addcategorie", async (req, res) => {
  try {
    const { Name, SousCategories } = req.body;

    const existing = await AddCategorie.findOne({ Name });
    if (existing) {
      return res.status(400).json({ message: "Cette catégorie existe déjà" });
    }

    const newCategorie = new AddCategorie({
      Name,
      SousCategories: SousCategories || []
    });

    await newCategorie.save();

    return res.status(201).json({
      message: "Catégorie ajoutée avec succès",
      category: newCategorie
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Erreur serveur",
      error: error.message
    });
  }
});

// Récupérer toutes les catégories (pour le formulaire d'ajout de cours par ex.)
router.get("/all", async (req, res) => {
  try {
    const categories = await AddCategorie.find({});
    return res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Erreur serveur",
      error: error.message
    });
  }
});

// Récupérer une seule catégorie par son id
router.get("/:id", async (req, res) => {
  try {
    const categorie = await AddCategorie.findById(req.params.id);
    if (!categorie) {
      return res.status(404).json({ message: "Catégorie introuvable" });
    }
    return res.status(200).json(categorie);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Erreur serveur",
      error: error.message
    });
  }
});

// Modifier une catégorie (nom et/ou liste complète de sous-catégories)
router.put("/:id", async (req, res) => {
  try {
    const updatedCategorie = await AddCategorie.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedCategorie) {
      return res.status(404).json({ message: "Catégorie introuvable" });
    }

    return res.status(200).json({
      message: "Catégorie modifiée avec succès",
      category: updatedCategorie
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Erreur serveur",
      error: error.message
    });
  }
});

// Ajouter une sous-catégorie à une catégorie existante
router.put("/:id/add-subcategory", async (req, res) => {
  try {
    const { SousCategorie } = req.body;

    const categorie = await AddCategorie.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { SousCategories: SousCategorie } },
      { new: true }
    );

    if (!categorie) {
      return res.status(404).json({ message: "Catégorie introuvable" });
    }

    return res.status(200).json({
      message: "Sous-catégorie ajoutée avec succès",
      category: categorie
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Erreur serveur",
      error: error.message
    });
  }
});

// Supprimer une sous-catégorie d'une catégorie existante
router.put("/:id/remove-subcategory", async (req, res) => {
  try {
    const { SousCategorie } = req.body;

    const categorie = await AddCategorie.findByIdAndUpdate(
      req.params.id,
      { $pull: { SousCategories: SousCategorie } },
      { new: true }
    );

    if (!categorie) {
      return res.status(404).json({ message: "Catégorie introuvable" });
    }

    return res.status(200).json({
      message: "Sous-catégorie supprimée avec succès",
      category: categorie
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Erreur serveur",
      error: error.message
    });
  }
});

// Supprimer une catégorie
router.delete("/:id", async (req, res) => {
  try {
    const deletedCategorie = await AddCategorie.findByIdAndDelete(req.params.id);

    if (!deletedCategorie) {
      return res.status(404).json({ message: "Catégorie introuvable" });
    }

    return res.status(200).json({
      message: "Catégorie supprimée avec succès"
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

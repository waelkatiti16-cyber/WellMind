const express = require("express");
const router = express.Router();

const Category = require("../models/Category");

// Ajouter une catégorie
router.post("/add", async (req, res) => {
  try {
    const { Title, SubCategories } = req.body;

    const newCategory = new Category({
      Title,
      SubCategories: SubCategories || []
    });

    await newCategory.save();

    return res.status(201).json({
      message: "Catégorie ajoutée avec succès",
      category: newCategory
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Erreur serveur",
      error: error.message
    });
  }
});

// Récupérer toutes les catégories
router.get("/all", async (req, res) => {
  try {
    const categories = await Category.find({});
    return res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Erreur serveur",
      error: error.message
    });
  }
});

// Récupérer une catégorie par id
router.get("/:id", async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Catégorie introuvable" });
    }
    return res.status(200).json(category);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Erreur serveur",
      error: error.message
    });
  }
});

// Modifier une catégorie
router.put("/:id", async (req, res) => {
  try {
    const { Title, SubCategories } = req.body;

    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      { Title, SubCategories },
      { new: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ message: "Catégorie introuvable" });
    }

    return res.status(200).json({
      message: "Catégorie modifiée avec succès",
      category: updatedCategory
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
    const deletedCategory = await Category.findByIdAndDelete(req.params.id);

    if (!deletedCategory) {
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
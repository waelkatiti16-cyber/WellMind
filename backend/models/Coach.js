const mongoose = require("mongoose");

// Une spécialité = une catégorie + (optionnellement) une sous-catégorie
const specialitySchema = new mongoose.Schema(
  {
    Category: { type: String, required: true },
    SousCategorie: { type: String, default: "" }
  },
  { _id: false }
);

// Une note laissée par un utilisateur connecté (une seule note par utilisateur, remplaçable)
const ratingSchema = new mongoose.Schema(
  {
    UserId: { type: String, required: true },
    UserName: { type: String, default: "" },
    Stars: { type: Number, required: true, min: 1, max: 5 }
  },
  { timestamps: true, _id: false }
);

const coachSchema = new mongoose.Schema(
  {
    Name: { type: String, required: true },
    Type: { type: String, enum: ["Coach de vie", "Psychologue"], required: true },
    Image: String, // URL de la photo
    Cv: String,    // URL du fichier CV (PDF)
    Bio: String,
    Specialities: [specialitySchema], // liste des catégories/sous-catégories sur lesquelles il/elle travaille
    Ratings: [ratingSchema], // notes laissées par les clients connectés
    AverageRating: { type: Number, default: 0 }, // recalculée automatiquement, ne pas modifier à la main
    RatingsCount: { type: Number, default: 0 }   // recalculée automatiquement, ne pas modifier à la main
  },
  { timestamps: true }
);

// Recalcule automatiquement la moyenne et le nombre d'avis à chaque sauvegarde
// où le tableau Ratings a changé (ajout, modification ou suppression d'une note).
coachSchema.pre("save", function () {
  if (this.isModified("Ratings")) {
    const ratings = this.Ratings || [];
    this.RatingsCount = ratings.length;
    this.AverageRating = ratings.length > 0
      ? Math.round((ratings.reduce((sum, r) => sum + r.Stars, 0) / ratings.length) * 10) / 10
      : 0;
  }
});

module.exports = mongoose.model(
  "Coach",
  coachSchema,
  "coaches"
);
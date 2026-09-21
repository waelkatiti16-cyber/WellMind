const mongoose = require("mongoose");

const addCourseSchema = new mongoose.Schema(
  {
    Title: String,
    Category: String,
    SousCategorie: String,
    ShortDescription: String,
    Description: String,

    // Remplace l'ancien champ "image" : deux vidéos distinctes
    VideoCourte: String,   // aperçu rapide (~2s)
    VideoComplete: String, // vidéo complète (1h+)

    Level: String,
    Language: String,
    Duration: String, // ex: "2 heures 30 minutes"
    IsFree: { type: Boolean, default: false },
    Price: Number,

    Professional: String,
    Tags: [{ type: String }],
    Status: { type: String, enum: ["Brouillon", "Publié"], default: "Brouillon" },
    Prerequisites: String
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "AddCourse",
  addCourseSchema,
  "courses"
);
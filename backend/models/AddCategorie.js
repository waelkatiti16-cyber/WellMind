const mongoose = require("mongoose");

const addCategorieSchema = new mongoose.Schema({
  Name: { type: String, required: true, unique: true },
  SousCategories: [{ type: String }]
});

module.exports = mongoose.model(
  "AddCategorie",
  addCategorieSchema,
  "categories"
);

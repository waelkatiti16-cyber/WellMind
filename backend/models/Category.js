const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  Title: { type: String, required: true },
  SubCategories: [{ type: String }]
});

module.exports = mongoose.model(
  "Category",
  categorySchema,
  "categories"
);
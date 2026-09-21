const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const addUserSchema = new mongoose.Schema(
  {
    Name: { type: String, required: true, unique: true },
    Email: { type: String, required: true, unique: true },
    Phone: { type: String, required: true },
    Password: { type: String, required: true },
favoriteCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'AddCourse' }],
favoriteCoaches: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Coach' }]
  },
  { timestamps: true } // ajoute createdAt / updatedAt (utilisé pour la "Date d'inscription")
);

// Hache le mot de passe automatiquement avant chaque sauvegarde,
// mais seulement s'il a été modifié (évite de le re-hacher à chaque update non lié au mot de passe)
addUserSchema.pre("save", async function () {
  if (!this.isModified("Password")) {
    return;
  }

  const salt = await bcrypt.genSalt(10);
  this.Password = await bcrypt.hash(this.Password, salt);
});

// Méthode utilitaire pour vérifier un mot de passe en clair face au hash stocké
addUserSchema.methods.comparePassword = function (plainPassword) {
  return bcrypt.compare(plainPassword, this.Password);
};

module.exports = mongoose.model(
  "AddUser",
  addUserSchema,
  "users"
);
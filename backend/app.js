// chargement des variables d'environnement (.env) : doit rester en premiere ligne
require('dotenv').config();

// importaion du express
const express=require('express')
// creation d`un application express
const app=express()
const bodyParser=require('body-parser')
const path = require('path')
const fs = require('fs');

// creer les dossiers d'upload s'ils n'existent pas (ex: sur Render)
['uploads/images', 'uploads/videos', 'uploads/cv'].forEach((dir) =>
  fs.mkdirSync(path.join(__dirname, dir), { recursive: true })
);

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/appwael');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded())

// parse application/json
app.use(bodyParser.json())

// Rendre le dossier "uploads" accessible publiquement (vidéos, images, etc.)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))


// security configuration
app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    process.env.FRONTEND_URL || "http://localhost:3000"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, Accept, Content-Type, X-Requested-with, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, DELETE, OPTIONS, PATCH, PUT"
  );

  // Répondre directement aux requêtes preflight (OPTIONS)
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();

});

const adminRoute = require("./routes/adminRoute");
const addCourseRoute = require("./routes/AddCours");
const addCategorieRoute = require("./routes/AddCategorie");
const coachRoute = require("./routes/Coach");
const addUser = require("./routes/AddUser");
const favoritesRoute = require("./routes/favoritesRoute");


app.use("/admin", adminRoute);
app.use("/course", addCourseRoute);
app.use("/category", addCategorieRoute);
app.use("/coach", coachRoute);
app.use("/register",addUser)
// ... après les autres imports
// ... après les autres app.use
app.use("/favorites", favoritesRoute);
const userListRoute = require("./routes/userListRoute");
app.use("/users", userListRoute);
module.exports = app;
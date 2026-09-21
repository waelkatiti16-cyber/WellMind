// importaion du express
const express=require('express')
// creation d`un application express
const app=express()
const bodyParser=require('body-parser')
const path = require('path')

const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/appwael');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded())

// parse application/json
app.use(bodyParser.json())

// Rendre le dossier "uploads" accessible publiquement (vidéos, images, etc.)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))


// security configuration
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
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
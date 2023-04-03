const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const path = require("path");

app.use(express.json());

const MY_PORT = process.env.PORT;
const MY_APP_SECRET = process.env.APP_SECRET;

app.get("/", (req, res) => {
  return res.send(MY_APP_SECRET);
});

app.listen(MY_PORT, () => console.log(`Server running on port ${MY_PORT}`));
mongoose
  .connect(
    "mongodb+srv://Zkine:W3gV3737DdwtTIXm@cluster0.uvn64cr.mongodb.net/?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

const userRoutes = require("./routes/users");
const stuffRoutes = require("./routes/sauces");

app.use("/api/sauces", stuffRoutes);
app.use("/api/auth", userRoutes);
app.use("/images", express.static(path.join(__dirname, "images")));

module.exports = app;

const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const userRoutes = require("./routes/user");
const adminRoutes = require("./routes/admin");
const cartRoutes = require("./routes/cart");

const app = express();

mongoose
  .connect(
    "mongodb+srv://sudipta:If3L9PeM8BO4GdlT@cluster0.u7zexdm.mongodb.net/shopping-app"
  )
  .then(() => {
    console.log("Connected to database");
  })
  .catch(() => {
    console.log("Connection failed");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join("backend/images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.use("/api", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/cart", cartRoutes);

module.exports = app;

// sudipta
// mongodb+srv://sudipta:If3L9PeM8BO4GdlT@cluster0.u7zexdm.mongodb.net/test

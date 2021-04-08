const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const User = require("./models/userSchema");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

mongoose.connect(
  "mongodb+srv://testuser:testuserpass@cluster0.w9j5l.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", (req, res) => {
  const data = req.body
  res.send.redirect("/");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.post("/register", (req, res) => {
  res.send.redirect("/");
});

app.get("/user", (req, res) => {
  res.render("user");
});

port = 3000;
app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});

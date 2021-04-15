const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const session = require("express-session");
const User = require("./models/userSchema");
const { request } = require("http");
const { findById } = require("./models/userSchema");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(session({ secret: "Not good" }));
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

app.post("/login", async (req, res) => {
  const {email, password} = req.body;
  //const user = new User(req.body);
  const foundUser = await User.validate(email, password);
  if (foundUser) {
    req.session.user_id = foundUser._id;
    res.redirect("/user");
  } else {
    res.redirect("/login");
  }
});

app.post("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/login");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.post("/register", async (req, res) => {
  const user = new User(req.body);
  await user.save();
  req.session.user_id = user._id;
  res.redirect("/info");
});

app.get("/user", async (req, res) => {
  if (!req.session.user_id) {
    res.redirect("/login");
  }
  const userFound = await User.findById(req.session.user_id);
  console.log(req.session.user_id);

  console.log(userFound);
  res.render("user", { userFound });
});

const port = 3000;
app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});

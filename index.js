const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const session = require("express-session");
const User = require("./models/userSchema");
const app = express();
const flash = require("connect-flash");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(session({ secret: "Not good", resave:true, saveUninitialized:true }));
app.use(flash());
app.use((req, res, next)=>{
  if(req.session.user){
    res.locals.user = req.session.user;
  }
  next();
})

function isLoggedIn(req, res, next) {
  if (!req.session.user_id) {
    return res.redirect("/login");
  }
  next();
}

function isLoggedOut(req, res, next) {
  if (!req.session.user_id) {
    return next();
  }
  res.redirect("/user");
}

mongoose.connect(
  "mongodb+srv://testuser:testuserpass@cluster0.w9j5l.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

app.get("/", isLoggedIn, (req, res) => {
  res.render("index", { userFound });
});

app.get("/login", isLoggedOut, (req, res) => {
  res.render("login", { message: req.flash("error") });
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  //const user = new User(req.body);
  const foundUser = await User.validate(email, password);
  if (foundUser) {
    req.session.user_id = foundUser._id;
    req.session.user = foundUser;
    res.redirect("/user");
  } else {
    req.flash("error", "username or password is incorrect");
    res.redirect("/login");
  }
});

app.post("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/login");
});

app.get("/register", isLoggedOut, (req, res) => {
  res.render("register", { message: flash("error") });
});

app.post("/register", async (req, res) => {
  const user = new User(req.body);
  const valid = await User.findOne({ email: user.email });
  if (!valid) {
    await user.save();
    req.session.user_id = user._id;
    req.session.user = user;  //req.session.foundUser //FoundUser is broken  
    res.redirect("/user");
  } else {
    req.flash("error", "Email is already registered");
    res.redirect("/register");
  }
});

app.get("/user", isLoggedIn, async (req, res) => {
  const userFound = await User.findById(req.session.user_id);
  res.render("user", { userFound });
});

const port = 3000;
app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});

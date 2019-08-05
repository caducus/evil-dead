// =====================
// Dependencies
// =====================

const express = require('express');
const methodOverride  = require('method-override');
const mongoose = require ('mongoose');
const session = require("express-session");

// require('dotenv').config();

const sessionsController = require("./controllers/sessions.js");
const studentController = require("./controllers/student.js");
const userController = require("./controllers/users.js");

const app = express ();
const db = mongoose.connection;

// =====================
// Port
// =====================

const port = process.env.PORT || 3000;

// =====================
// Database
// =====================

// connect to the database either with heroku or locally
const MONGODB_URI = process.env.MONGODB_URI;

// fix depreciation warnings from mongoose
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

// connect to mongo
mongoose.connect(MONGODB_URI ,  { useNewUrlParser: true}, () => {
  console.log("The connection with MongoDB is established.");
});

// error and success messages
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));

// =====================
// Middleware
// =====================

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false
}));
app.use("/sessions", sessionsController);
app.use("/student", studentController);
app.use("/users", userController);

// ===========================
// Routes
// ===========================

app.get("/", (req, res) => {
  res.render("index.ejs", {
    currentUser: req.session.currentUser
  });
});


// ===========================
// Listener
// ===========================

app.listen(port, () => {
  console.log("I'm totes listenin' on port: " + port);
});

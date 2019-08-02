// testing to make sure env is connected
// console.log(process.env.MONGODB_URI);

// =====================
// Dependencies
// =====================

const express = require('express');
const methodOverride  = require('method-override');
const mongoose = require ('mongoose');

const app = express ();
const db = mongoose.connection;

const SkillEntry = require("./models/SkillEntry.js");

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

// =====================
// Routes
// =====================

app.get('/' , (req, res) => {
  res.send('Hello World!');
});

app.get('/student' , (req, res) => {
  res.render('/student/index.ejs');
});

// =====================
// Listener
// =====================

app.listen(port, () =>
  console.log( 'Listening on port:', port
));

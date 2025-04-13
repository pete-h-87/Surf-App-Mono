const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

const { findUser } = require("./model/dbApi")

const session = require("express-session");
const flash = require("express-flash");


const port = process.env.PORT || 8000;

const corsOptions = {
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

//passport
const passport = require("passport");
const initializePassport = require("./passport-config");

//routes
const dbRoute = require("./routes/dbRoute");
const mateoWeatherRoutes = require("./routes/mateoWeatherRoutes");
const screenshotRoutes = require("./routes/screenshotRoutes");
const userRoute = require("./routes/userRoute");

app.use(cors(corsOptions));
app.use(express.json());
app.use("/api/userRoute", userRoute);
app.use("/api/dbRoute", dbRoute);
app.use("/api/mateoWeatherRoutes", mateoWeatherRoutes);
app.use("/api/screenshot", screenshotRoutes);
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize())
app.use(passport.session())
app.use(flash());

//login
initializePassport(passport, findUser);

app.post("/users/loginUser", passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true
}));

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

// STEP SIX
// recieve the routes,
// assign to the app to USE, with '/api' for prefix
// the entire app will now be listening on the specific port
// so when we make requests using HTTP, the port is now listening and will direct traffic
// NOTICE HERE! we required the 'dotenv' that imported our env file into our system
// THIS is the top of the SERVER-SIDE app, the MAIN server file.

// Key Responsibilities of the Main Server File:
// -Load Environment Variables: Using dotenv to load environment variables from a .env file.
// -Import and Configure Express: Setting up the Express application.
// -Define Middleware: Adding middleware for parsing JSON, handling routes, etc.
// -Import and Use Routes: Importing route definitions and using them with the Express application.
// -Start the Server: Listening on a specified port for incoming requests.

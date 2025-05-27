const express = require("express");
const cors = require("cors");
require("dotenv").config();
const passport = require("passport");
// const initializePassport = require("./local-strategy");
const app = express();
const session = require("express-session");
const flash = require("express-flash");
require("./local-strategy");
const checkSession = require("./middleware/middleware");

const port = process.env.PORT || 8000;

const corsOptions = {
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 20000,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
  console.log("Session Info:", req.session);
  next();
});
app.use(flash());

//routes
const dbRoute = require("./routes/dbRoute");
const mateoWeatherRoutes = require("./routes/mateoWeatherRoutes");
const screenshotRoutes = require("./routes/screenshotRoutes");
const userRoute = require("./routes/userRoute");

app.use("/api/userRoute", userRoute);
app.use("/api/dbRoute", dbRoute);
app.use("/api/mateoWeatherRoutes", mateoWeatherRoutes);
app.use("/api/screenshot", screenshotRoutes);

app.post("/api/userRoute/users/auth", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.error("Error during authentication:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
    if (!user) {
      console.log("Authentication failed:", info.message);
      return res.status(401).json({ message: info.message });
    }

    req.logIn(user, (err) => {
      if (err) {
        console.error("Error during login:", err);
        return res.status(500).json({ message: "Internal server error" });
      }
      console.log("User logged in successfully:", user);
      res.status(200).json({
        message: "Login successful",
        user: {
          id: user.user_id,
          name: user.user_name,
          email: user.user_email,
        },
        redirectUrl: "/",
      });
    });
  })(req, res, next);
});

//login
// initializePassport();

app.listen(port, () => {
  console.log(`App listening at the PORT: http://localhost:${port}`);
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

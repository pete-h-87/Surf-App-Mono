const express = require("express");
const cors = require("cors");
require("dotenv").config();

// import routes
const dbRoute = require("./routes/dbRoute");
const mateoWeatherRoutes = require("./routes/mateoWeatherRoutes")
const screenshotRoutes = require("./routes/screenshotRoutes");

// Running express server
const app = express();
const port = process.env.PORT || 10000;

// Configure CORS to allow requests from http://localhost:3000,
const corsOptions = {
  origin: process.env.FRONTEND_URL,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions)); // Enable CORS with corsOptions as a param

app.use(express.json());

// route middlewares - Prefix all routes defined in todoRoutes (the second param) with '/api'
app.use("/api/dbRoute", dbRoute);
app.use("/api/mateoWeatherRoutes", mateoWeatherRoutes);
app.use("/api/screenshot", screenshotRoutes);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

// STEP SIX
// recieve the routes,
// assign to the app to USE, with '/api' for prefix
// the entire app will now be listening on the specific port
// so when we make requests using HTTP, the port is now listening and will direct traffic
// NOTICE HERE! we required the 'dotenv' that imported our env file into our system - our dotenv dependency automatically looks for these types of files
// THIS is the top of the SERVER-SIDE app, the MAIN server file.

// Key Responsibilities of the Main Server File:
// -Load Environment Variables: Using dotenv to load environment variables from a .env file.
// -Import and Configure Express: Setting up the Express application.
// -Define Middleware: Adding middleware for parsing JSON, handling routes, etc.
// -Import and Use Routes: Importing route definitions and using them with the Express application.
// -Start the Server: Listening on a specified port for incoming requests.

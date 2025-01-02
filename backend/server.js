const express = require("express");
const cors = require("cors");
require("dotenv").config();

const dbRoute = require("./routes/dbRoute");
const mateoWeatherRoutes = require("./routes/mateoWeatherRoutes")
const screenshotRoutes = require("./routes/screenshotRoutes");

const app = express();
const port = process.env.PORT || 8000;

const corsOptions = {
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use("/api/dbRoute", dbRoute);
app.use("/api/mateoWeatherRoutes", mateoWeatherRoutes);
app.use("/api/screenshot", screenshotRoutes);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
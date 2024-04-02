const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoute = require("./Routes/authroute");
require("dotenv").config();

const app = express();
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(express.json());

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log("Database connected!");
  })
  .catch((err) => {
    console.log("Database connection error: " + err);
  });

app.use("/api/auth", authRoute);

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});

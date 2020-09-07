const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

///Connect to database with Mongoose
mongoose.connect(
  `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PWORD}@cluster0.1hf7x.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
  () => "Connected to the MongoDB"
);

////Import Routes
const authRoute = require("./routes/auth");

app.use("/api/user", authRoute);

app.listen(3000, () => console.log("Server is UP!"));

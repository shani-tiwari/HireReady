const express = require("express");
const app = express();
const authRouter = require("./routes/auth.routes"); 

// middlewares
app.use(express.json());

// routes 
app.use("/api/auth", authRouter);

module.exports = app;
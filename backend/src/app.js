const express = require("express");
const app = express();
const authRouter = require("./routes/auth.routes"); 
const cookieParser = require("cookie-parser");
const cors = require("cors");

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

// middlewares
app.use(express.json());
app.use(cookieParser());

// routes 
app.use("/api/auth", authRouter);

module.exports = app;
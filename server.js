const express = require("express");
const cors = require("cors");
const session = require("express-session");
const authRoutes = require("./routes/authRoutes");
const patientRoutes = require("./routes/patientRoutes");
const { initializePassport } = require("./middlewares/authMiddleware");

const app = express();

// Middleware
app.use(
  cors({ origin: ["http://localhost:5173", "https://crud-patient.vercel.app"] })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: "your_session_secret",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(initializePassport());

// Routes
app.use("/auth", authRoutes);
app.use("/patients", patientRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

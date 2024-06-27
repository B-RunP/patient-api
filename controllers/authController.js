const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../dbConfig");
const JWT_SECRET =
  "8c8001393c76cb77aeb35c6d10b8f926906d5e35929aa88654ac707b3cbac7b2f6a1e85b323b295f2a1d0425b83f5d60e7698a7d12dd4d9fb8993949c76cf3df";

exports.login = (req, res) => {
  const user = req.user;
  const token = jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    JWT_SECRET,
    { expiresIn: "1h" }
  );
  res.json({ user, token });
};

exports.register = async (req, res) => {
  const { username, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const query = "INSERT INTO users (username, password, role) VALUES (?, ?, ?)";
  pool.query(query, [username, hashedPassword, role], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Failed to register user" });
    }
    res.status(201).json({ message: "User registered successfully" });
  });
};

exports.googleCallback = (req, res) => {
  const user = req.user;
  const token = jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    JWT_SECRET,
    { expiresIn: "1h" }
  );
  res.redirect(`http://localhost:5173/auth/success?token=${token}`);
};

const pool = require("../dbConfig");

exports.getPatients = (req, res) => {
  pool.query("SELECT * FROM patients", (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Failed to fetch patients" });
    }
    res.json(results);
  });
};

exports.addPatient = (req, res) => {
  const { name, gender, age, address, diagnosis, treatment } = req.body;
  const query =
    "INSERT INTO patients (name, gender, age, address, diagnosis, treatment) VALUES (?, ?, ?, ?, ?, ?)";
  pool.query(
    query,
    [name, gender, age, address, diagnosis, treatment],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: "Failed to add patient" });
      }
      res.status(201).json({ message: "Patient added successfully" });
    }
  );
};

exports.getPatientById = (req, res) => {
  const { id } = req.params;
  pool.query("SELECT * FROM patients WHERE id = ?", [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Failed to fetch patient" });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "Patient not found" });
    }
    res.json(results[0]);
  });
};

exports.updatePatient = (req, res) => {
  const { id } = req.params;
  const { name, gender, age, address, diagnosis, treatment } = req.body;
  const query =
    "UPDATE patients SET name = ?, gender = ?, age = ?, address = ?, diagnosis = ?, treatment = ? WHERE id = ?";
  pool.query(
    query,
    [name, gender, age, address, diagnosis, treatment, id],
    (err, results) => {
      if (err) {
        console.error("Database update error: ", err);
        return res.status(500).json({ error: "Failed to update patient" });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ error: "Patient not found" });
      }
      res.json({ message: "Patient updated successfully" });
    }
  );
};

exports.deletePatient = (req, res) => {
  const { id } = req.params;
  pool.query("DELETE FROM patients WHERE id = ?", [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Failed to delete patient" });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: "Patient not found" });
    }
    res.json({ message: "Patient deleted successfully" });
  });
};

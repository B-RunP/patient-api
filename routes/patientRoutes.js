const express = require("express");
const router = express.Router();
const patientController = require("../controllers/patientController");
const authMiddleware = require("../middlewares/authMiddleware");

// rute REST API data pasien
router.get("/", authMiddleware.authenticateJWT, patientController.getPatients);
router.post("/", authMiddleware.authenticateJWT, patientController.addPatient);
router.get(
  "/:id",
  authMiddleware.authenticateJWT,
  patientController.getPatientById
);
router.put(
  "/:id",
  authMiddleware.authenticateJWT,
  patientController.updatePatient
);
router.delete(
  "/:id",
  authMiddleware.authenticateJWT,
  patientController.deletePatient
);

module.exports = router;

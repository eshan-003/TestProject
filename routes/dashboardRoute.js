const express = require("express");
const incidentController = require("../controllers/incidentController");

const router = express.Router();

router.get("/", incidentController.getAllIncidents);
router.post("/channel", incidentController.getIncidentsByChannel);

module.exports = router;

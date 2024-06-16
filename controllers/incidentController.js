const incidentModel = require("../models/incidentModel");

const getAllIncidents = async (req, res) => {
  try {
    const incidents = await incidentModel.fetchAllIncidents();
    res.json(incidents);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getIncidentsByChannel = async (req, res) => {
  const { channelName } = req.body;
  try {
    const incidents = await incidentModel.fetchIncidentsByChannel(channelName);
    res.json(incidents);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllIncidents,
  getIncidentsByChannel,
};

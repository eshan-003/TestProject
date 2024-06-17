



const updateIncidentById = async (id, updatedIncident) => {
  const response = await esClient.update({
    index: indexName,
    id: id,
    body: {
      doc: updatedIncident
    }
  });
  return response;
};



const updateIncident = async (req, res) => {
  const { id } = req.params;
  const updatedIncident = req.body;
  try {
    const response = await incidentModel.updateIncidentById(id, updatedIncident);
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllIncidents,
  getIncidentsByChannel,
  updateIncident,
};
```

 incidentController.getIncidentsByChannel);
router.put('/:id', incidentController.updateIncident);


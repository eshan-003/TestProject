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

 incidentController.getIncidentsByChannel);
router.put('/:id', incidentController.updateIncident);



const createIncidentIndex = async () => {
  const exists = await esClient.indices.exists({ index: indexName });

  if (!exists.body) {
    await esClient.indices.create({
      index: indexName,
      body: {
        mappings: {
          properties: {
            incidentName: { type: 'text' },
            channelName: { type: 'text' },
            appName: { type: 'text' },
            severity: { type: 'text' },
            description: { type: 'text' }, // Add any other fields as needed
            timestamp: { type: 'date' }
          }
        }
      }
    });
  }
};

const { createIncidentIndex } = require('./models/incidentModel');


const startServer = async () => {
  try {
    await createIncidentIndex();
    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
  }
};

startServer();


router.post('/', incidentController.createIncident); // Add this line



const createIncident = async (req, res) => {
  const incident = req.body;
  try {
    const response = await incidentModel.createIncident(incident);
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



const getIncidentsByChannel = async (req, res) => {
  const { channelName } = req.body;
  try {
    const incidents = await incidentModel.searchIncidentsByField('channelName', channelName);
    res.json(incidents);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getIncidentsByApp = async (req, res) => {
  const { appName } = req.body;
  try {
    const incidents = await incidentModel.searchIncidentsByField('appName', appName);
    res.json(incidents);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getIncidentsBySeverity = async (req, res) => {
  const { severity } = req.body;
  try {
    const incidents = await incidentModel.searchIncidentsByField('severity', severity);
    res.json(incidents);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const searchIncidentsByField = async (field, value) => {
  const response = await esClient.search({
    index: indexName,
    body: {
      query: {
        match: { [field]: value }
      }
    }
  });
  return response.hits.hits.map(hit => hit._source);
};


router.post('/channel', incidentController.getIncidentsByChannel);
router.post('/app', incidentController.getIncidentsByApp);
router.post('/severity', incidentController.getIncidentsBySeverity);
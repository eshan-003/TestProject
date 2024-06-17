
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


const { Client } = require("@elastic/elasticsearch");

const esClient = new Client({ node: "http://localhost:9200" });

const indexName = "incidents";

const createIncident = async (incident) => {
  const response = await esClient.index({
    index: indexName,
    body: incident,
  });
  return response;
};

const fetchAllIncidents = async () => {
  const response = await esClient.search({
    index: indexName,
    body: {
      query: {
        match_all: {},
      },
    },
  });
  return response.hits.hits;
};

const fetchIncidentsByChannel = async (channelName) => {
  const response = await esClient.search({
    index: indexName,
    body: {
      query: {
        match: { channelName },
      },
    },
  });
  return response.hits.hits;
};

module.exports = {
  createIncident,
  fetchAllIncidents,
  fetchIncidentsByChannel,
};

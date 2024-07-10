import React, { useState } from 'react';
import axios from 'axios';

const SearchSummary = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [summary, setSummary] = useState('');

  const handleSearch = async () => {
    try {
      // Replace this with your actual API call to fetch the summary
      const response = await axios.post('https://api.example.com/get-summary', { searchTerm });
      setSummary(response.data.summary);
    } catch (error) {
      console.error('Error fetching summary:', error);
      setSummary('Failed to fetch summary.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Enter search term"
        className="w-1/2 px-4 py-2 mb-4 text-lg border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={handleSearch}
        className="w-1/4 px-6 py-2 text-lg text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Search
      </button>
      {summary && (
        <div className="mt-6 p-6 bg-white rounded-lg shadow-lg max-w-md text-center border-t-4 border-blue-500">
          <h2 className="text-xl font-bold mb-4 text-blue-600">Summary</h2>
          <p className="text-gray-700">{summary}</p>
        </div>
      )}
    </div>
  );
};

export default SearchSummary;

import React, { useState } from 'react';
import axios from 'axios';

const SearchSummary = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [summary, setSummary] = useState('');

  const handleSearch = async () => {
    try {
      // Replace this with your actual API call to fetch the summary
      const response = await axios.post('https://api.example.com/get-summary', { searchTerm });
      setSummary(response.data.summary);
    } catch (error) {
      console.error('Error fetching summary:', error);
      setSummary('Failed to fetch summary.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Enter search term"
        className="px-4 py-2 mb-4 text-lg border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={handleSearch}
        className="px-6 py-2 text-lg text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Search
      </button>
      {summary && (
        <div className="mt-6 p-4 bg-white rounded-lg shadow-lg max-w-md text-center">
          {summary}
        </div>
      )}
    </div>
  );
};

export default SearchSummary;

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

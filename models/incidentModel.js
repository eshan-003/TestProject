import React, { useState } from 'react';

const rolesData = {
  Developer: ['Write Code', 'Fix Bugs', 'Review PRs'],
  Designer: ['Create Mockups', 'Design UI', 'Update Style Guide'],
  Tester: ['Write Test Cases', 'Perform Testing', 'Log Defects']
};

const Checklist = () => {
  const [roles, setRoles] = useState(Object.keys(rolesData));
  const [selectedRole, setSelectedRole] = useState('');
  const [checklist, setChecklist] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [roleInput, setRoleInput] = useState('');

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setChecklist(rolesData[role]);
  };

  const handleBackToDropdown = () => {
    setSelectedRole('');
    setChecklist([]);
    setNewItem('');
    setEditingIndex(null);
  };

  const handleAddItem = () => {
    if (newItem.trim() !== '') {
      setChecklist([...checklist, newItem]);
      setNewItem('');
    }
  };

  const handleRemoveItem = (index) => {
    const updatedChecklist = checklist.filter((_, i) => i !== index);
    setChecklist(updatedChecklist);
  };

  const handleEditItem = (index) => {
    setEditingIndex(index);
    setNewItem(checklist[index]);
  };

  const handleSaveEditItem = () => {
    const updatedChecklist = checklist.map((item, i) =>
      i === editingIndex ? newItem : item
    );
    setChecklist(updatedChecklist);
    setNewItem('');
    setEditingIndex(null);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      {selectedRole === '' ? (
        <div className="w-full max-w-md">
          <label className="block text-gray-700 text-2xl font-bold mb-4 text-center">Select a Role</label>
          <div className="relative">
            <input
              type="text"
              value={roleInput}
              onChange={(e) => setRoleInput(e.target.value)}
              placeholder="Type or select a role"
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              list="roles"
            />
            <datalist id="roles">
              {roles.map((role) => (
                <option key={role} value={role} />
              ))}
            </datalist>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline absolute right-0 top-0 mt-2 mr-2"
              onClick={() => handleRoleSelect(roleInput)}
            >
              Search
            </button>
          </div>
        </div>
      ) : (
        <div className="w-full max-w-2xl bg-white p-8 rounded shadow-md">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-gray-800">{selectedRole} Checklist</h2>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={handleBackToDropdown}
            >
              Back to Role Selection
            </button>
          </div>
          <ul className="list-disc list-inside mb-6">
            {checklist.map((item, index) => (
              <li key={index} className="flex justify-between items-center mb-2">
                <span className="text-lg text-gray-800">{item}</span>
                <div>
                  <button
                    className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline mr-2"
                    onClick={() => handleEditItem(index)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline"
                    onClick={() => handleRemoveItem(index)}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="flex mb-6">
            <input
              type="text"
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              placeholder="Add new item"
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
            />
            {editingIndex !== null ? (
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={handleSaveEditItem}
              >
                Save
              </button>
            ) : (
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={handleAddItem}
              >
                Add
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Checklist;




import React, { useState } from 'react';

const rolesData = {
  Developer: ['Write Code', 'Fix Bugs', 'Review PRs'],
  Designer: ['Create Mockups', 'Design UI', 'Update Style Guide'],
  Tester: ['Write Test Cases', 'Perform Testing', 'Log Defects']
};

const Checklist = () => {
  const [roles, setRoles] = useState(Object.keys(rolesData));
  const [selectedRole, setSelectedRole] = useState('');
  const [checklist, setChecklist] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setChecklist(rolesData[role]);
  };

  const handleBackToDropdown = () => {
    setSelectedRole('');
    setChecklist([]);
    setNewItem('');
    setEditingIndex(null);
  };

  const handleAddItem = () => {
    if (newItem.trim() !== '') {
      setChecklist([...checklist, newItem]);
      setNewItem('');
    }
  };

  const handleRemoveItem = (index) => {
    const updatedChecklist = checklist.filter((_, i) => i !== index);
    setChecklist(updatedChecklist);
  };

  const handleEditItem = (index) => {
    setEditingIndex(index);
    setNewItem(checklist[index]);
  };

  const handleSaveEditItem = () => {
    const updatedChecklist = checklist.map((item, i) =>
      i === editingIndex ? newItem : item
    );
    setChecklist(updatedChecklist);
    setNewItem('');
    setEditingIndex(null);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      {selectedRole === '' ? (
        <div className="w-full max-w-md">
          <label className="block text-gray-700 text-2xl font-bold mb-4 text-center">Select a Role</label>
          <select
            className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={(e) => handleRoleSelect(e.target.value)}
            defaultValue=""
          >
            <option value="" disabled>Select role</option>
            {roles.map((role, index) => (
              <option key={index} value={role}>{role}</option>
            ))}
          </select>
        </div>
      ) : (
        <div className="w-full max-w-2xl bg-white p-8 rounded shadow-md">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-gray-800">{selectedRole} Checklist</h2>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={handleBackToDropdown}
            >
              Back to Role Selection
            </button>
          </div>
          <ul className="list-disc list-inside mb-6">
            {checklist.map((item, index) => (
              <li key={index} className="flex justify-between items-center mb-2">
                <span className="text-lg text-gray-800">{item}</span>
                <div>
                  <button
                    className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline mr-2"
                    onClick={() => handleEditItem(index)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline"
                    onClick={() => handleRemoveItem(index)}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="flex mb-6">
            <input
              type="text"
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              placeholder="Add new item"
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
            />
            {editingIndex !== null ? (
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={handleSaveEditItem}
              >
                Save
              </button>
            ) : (
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={handleAddItem}
              >
                Add
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Checklist;



import React, { useState } from 'react';

const rolesData = {
  Developer: ['Write Code', 'Fix Bugs', 'Review PRs'],
  Designer: ['Create Mockups', 'Design UI', 'Update Style Guide'],
  Tester: ['Write Test Cases', 'Perform Testing', 'Log Defects']
};

const Checklist = () => {
  const [roles, setRoles] = useState(Object.keys(rolesData));
  const [selectedRole, setSelectedRole] = useState('');
  const [checklist, setChecklist] = useState([]);
  const [newItem, setNewItem] = useState('');

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setChecklist(rolesData[role]);
  };

  const handleBackToDropdown = () => {
    setSelectedRole('');
    setChecklist([]);
    setNewItem('');
  };

  const handleAddItem = () => {
    if (newItem.trim() !== '') {
      setChecklist([...checklist, newItem]);
      setNewItem('');
    }
  };

  const handleRemoveItem = (index) => {
    const updatedChecklist = checklist.filter((_, i) => i !== index);
    setChecklist(updatedChecklist);
  };

  const handleEditItem = (index, newValue) => {
    const updatedChecklist = checklist.map((item, i) =>
      i === index ? newValue : item
    );
    setChecklist(updatedChecklist);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      {selectedRole === '' ? (
        <div className="w-full max-w-xs">
          <label className="block text-gray-700 text-sm font-bold mb-2">Select a Role</label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={(e) => handleRoleSelect(e.target.value)}
            defaultValue=""
          >
            <option value="" disabled>Select role</option>
            {roles.map((role, index) => (
              <option key={index} value={role}>{role}</option>
            ))}
          </select>
        </div>
      ) : (
        <div className="w-full max-w-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">{selectedRole} Checklist</h2>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={handleBackToDropdown}
            >
              Back to Role Selection
            </button>
          </div>
          <ul className="list-disc list-inside mb-4">
            {checklist.map((item, index) => (
              <li key={index} className="flex justify-between items-center">
                <input
                  type="text"
                  value={item}
                  onChange={(e) => handleEditItem(index, e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
                />
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2"
                  onClick={() => handleRemoveItem(index)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <div className="flex">
            <input
              type="text"
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              placeholder="Add new item"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
            />
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={handleAddItem}
            >
              Add
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checklist;





<div className="mt-6 p-6 bg-red-500 text-white rounded-lg shadow-lg max-w-md text-center border-t-4 border-red-700 transition transform duration-500 ease-in-out hover:-translate-y-1 hover:shadow-2xl">
  <h2 className="text-2xl font-bold mb-4 text-white">Summary</h2>
  <p className="text-white"> {summary} </p>
</div>

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

Sure, here are 10 lessons learned for a manager persona based on the development and implementation of the 5 Why Analysis Dashboard:

1. **Effective Communication:** Clear and consistent communication between developers, stakeholders, and end-users is crucial. Regular updates and feedback loops ensure everyone is on the same page and can contribute to the project's success.

2. **Requirement Gathering:** Comprehensive requirement gathering and analysis at the project's onset help avoid scope creep and ensure that the final product meets the user's needs and expectations.

3. **Agile Methodology:** Adopting an Agile methodology allows for iterative development and continuous improvement. Regular sprints and reviews help in identifying issues early and implementing changes promptly.

4. **Data Integration:** Integrating data from multiple sources (ServiceNow, SharePoint) using batch jobs requires careful planning and testing to ensure data accuracy and consistency.

5. **Semantic Search Implementation:** Implementing NLP-based semantic search can significantly improve the user experience by providing more relevant search results, but it requires proper training of models and continuous refinement.

6. **Visualization:** Detailed visualizations using Chart.js provide valuable insights into incident trends and patterns, aiding in better decision-making. Ensure the visualizations are intuitive and easily interpretable.

7. **Performance Optimization:** Using Elasticsearch for database operations ensures fast data retrieval and enhances the application's performance. Regular performance testing and optimization are necessary to maintain efficiency.

8. **Security Measures:** Implementing robust security measures, such as authentication using LDAP and JWT, protects sensitive data and maintains user trust. Regular security audits are essential.

9. **User Training:** Providing training sessions for end-users ensures they understand how to effectively use the dashboard, maximizing its potential and minimizing user errors.

10. **Post-Deployment Support:** Continuous support and maintenance post-deployment are crucial for addressing any issues that arise and for implementing enhancements based on user feedback.







import React, { useState } from 'react';
import 'tailwindcss/tailwind.css';

const personas = [
  'Manager',
  'Engineer',
  'HR',
  'Designer',
  'Sales',
  'Marketing',
  'Support'
];

const PersonaDropdown = () => {
  const [selectedPersona, setSelectedPersona] = useState('Manager');

  const handleChange = (event) => {
    setSelectedPersona(event.target.value);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-4 text-center">{selectedPersona}</h1>
        <select
          value={selectedPersona}
          onChange={handleChange}
          className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
        >
          {personas.map((persona, index) => (
            <option key={index} value={persona}>
              {persona}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default PersonaDropdown;



import React, { useState } from 'react';

const personas = [
  'Manager',
  'Engineer',
  'HR',
  'Designer',
  'Sales',
  'Marketing',
  'Support'
];

const PersonaDropdown = () => {
  const [selectedPersona, setSelectedPersona] = useState('Manager');

  const handleChange = (event) => {
    setSelectedPersona(event.target.value);
  };

  return (
    <div>
      <h1>{selectedPersona}</h1>
      <select value={selectedPersona} onChange={handleChange}>
        {personas.map((persona, index) => (
          <option key={index} value={persona}>
            {persona}
          </option>
        ))}
      </select>
    </div>
  );
};

export default PersonaDropdown;



import React from 'react';
import { useTable, usePagination } from 'react-table';

const TableComponent = ({ data }) => {
  const columns = React.useMemo(
    () => [
      {
        Header: 'Issue ID',
        accessor: 'id'
      },
      {
        Header: 'Lessons Learned',
        accessor: 'lesson'
      }
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page, // Instead of rows, we use page
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize }
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 } // Pass our hoisted table state
    },
    usePagination
  );

  return (
    <>
      <table {...getTableProps()} className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th
                  {...column.getHeaderProps()}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()} className="bg-white divide-y divide-gray-200">
          {page.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => (
                  <td
                    {...cell.getCellProps()}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                  >
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="pagination p-4">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage} className="px-2 py-1 bg-gray-200">
          {'<<'}
        </button>{' '}
        <button onClick={() => previousPage()} disabled={!canPreviousPage} className="px-2 py-1 bg-gray-200">
          {'<'}
        </button>{' '}
        <button onClick={() => nextPage()} disabled={!canNextPage} className="px-2 py-1 bg-gray-200">
          {'>'}
        </button>{' '}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage} className="px-2 py-1 bg-gray-200">
          {'>>'}
        </button>{' '}
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <span>
          | Go to page:{' '}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            style={{ width: '100px' }}
            className="px-2 py-1 border rounded"
          />
        </span>{' '}
        <select
          value={pageSize}
          onChange={e => setPageSize(Number(e.target.value))}
          className="px-2 py-1 border rounded"
        >
          {[10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default TableComponent;


import React from 'react';
import TableComponent from './TableComponent';
import HeadingComponent from './HeadingComponent';

const App = () => {
  const heading = "Lessons Learned Table";

  const data = [
    { id: '1', lesson: 'Improve deployment process' },
    { id: '2', lesson: 'Enhance code review practices' },
    { id: '3', lesson: 'Better communication channels' }
  ];

  return (
    <div className="App">
      <HeadingComponent heading={heading} />
      <TableComponent data={data} />
    </div>
  );
};

export default App;

import React from 'react';
import { useTable } from 'react-table';

const TableComponent = ({ data }) => {
  const columns = React.useMemo(
    () => [
      {
        Header: 'Issue ID',
        accessor: 'id'
      },
      {
        Header: 'Lessons Learned',
        accessor: 'lesson'
      }
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable({ columns, data });

  return (
    <table {...getTableProps()} className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th
                {...column.getHeaderProps()}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()} className="bg-white divide-y divide-gray-200">
        {rows.map(row => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => (
                <td
                  {...cell.getCellProps()}
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                >
                  {cell.render('Cell')}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default TableComponent;



If you want to use a multi-select dropdown in React but do not want to display the selected options inside the text box of the select component, you can use the `react-select` library with some customization. Specifically, you can use the `control` prop to customize the appearance of the selected options.

Here's an example of how to implement a multi-select dropdown with hidden selected options inside the text box:

### Installation

First, install the `react-select` package:

```sh
npm install react-select
```

### Implementation

Here's how you can create a multi-select dropdown in React where the selected options are not shown inside the text box:

```javascript
import React, { useState } from 'react';
import Select, { components } from 'react-select';

const MultiSelectDropdown = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
    { value: 'option4', label: 'Option 4' },
  ];

  const handleChange = (selectedOptions) => {
    setSelectedOptions(selectedOptions);
  };

  // Custom control to hide the selected options in the text box
  const CustomControl = ({ children, ...props }) => {
    return (
      <components.Control {...props}>
        {children}
        <div style={{ display: 'none' }}>
          {props.getValue().map(option => option.label).join(', ')}
        </div>
      </components.Control>
    );
  };

  return (
    <div>
      <h1>Multi-Select Dropdown</h1>
      <Select
        isMulti
        value={selectedOptions}
        onChange={handleChange}
        options={options}
        components={{ Control: CustomControl }}
      />
      <div>
        <h2>Selected Options:</h2>
        {selectedOptions.map((option) => (
          <div key={option.value}>{option.label}</div>
        ))}
      </div>
    </div>
  );
};

export default MultiSelectDropdown;
```

### Explanation

1. **State Management**:
   - `selectedOptions`: State to manage the selected options from the dropdown.

2. **Options**:
   - `options`: Array of objects representing the options available in the dropdown.

3. **`react-select` Component**:
   - `<Select>`: The main component from `react-select` used to create the dropdown.
   - `isMulti`: Prop that enables multi-select functionality.
   - `value`: Prop to bind the selected options to the component state.
   - `onChange`: Callback function to handle changes in the selected options.
   - `components`: Prop to customize the internal components of `react-select`.

4. **Custom Control Component**:
   - `CustomControl`: A custom control component that hides the selected options inside the text box. It uses `components.Control` from `react-select` and hides the display of selected options by using inline styles.

5. **Displaying Selected Options**:
   - A simple map function to display the selected options below the dropdown.

### Conclusion

This example provides a basic implementation of a multi-select dropdown in React using `react-select` where the selected options are not shown inside the text box. You can further customize this example based on your needs and requirements.


import React, { useState } from 'react';
import Select from 'react-select';

const MultiSelectDropdown = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
    { value: 'option4', label: 'Option 4' },
  ];

  const handleChange = (selectedOptions) => {
    setSelectedOptions(selectedOptions);
  };

  return (
    <div>
      <h1>Multi-Select Dropdown</h1>
      <Select
        isMulti
        value={selectedOptions}
        onChange={handleChange}
        options={options}
      />
      <div>
        <h2>Selected Options:</h2>
        {selectedOptions.map((option) => (
          <div key={option.value}>{option.label}</div>
        ))}
      </div>
    </div>
  );
};

export default MultiSelectDropdown;



import React, { useState } from 'react';
import { FaPlus, FaTimes } from 'react-icons/fa';

const PersonaManager = () => {
  const [selectedPersonas, setSelectedPersonas] = useState([]);
  const personas = ['Persona 1', 'Persona 2', 'Persona 3'];

  const addPersona = (persona) => {
    if (!selectedPersonas.includes(persona)) {
      setSelectedPersonas([...selectedPersonas, persona]);
    }
  };

  const removePersona = (persona) => {
    setSelectedPersonas(selectedPersonas.filter((p) => p !== persona));
  };

  return (
    <div>
      <input
        type="text"
        value={selectedPersonas.join(', ')}
        readOnly
        placeholder="Selected Personas"
      />
      <div>
        {personas.map((persona) => (
          <div key={persona} style={{ margin: '10px 0' }}>
            <span>{persona}</span>
            {selectedPersonas.includes(persona) ? (
              <FaTimes
                style={{ cursor: 'pointer', color: 'red', marginLeft: '10px' }}
                onClick={() => removePersona(persona)}
              />
            ) : (
              <FaPlus
                style={{ cursor: 'pointer', color: 'green', marginLeft: '10px' }}
                onClick={() => addPersona(persona)}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PersonaManager;


import React, { useState } from 'react';

const rolesData = {
  Developer: ['Write Code', 'Fix Bugs', 'Review PRs'],
  Designer: ['Create Mockups', 'Design UI', 'Update Style Guide'],
  Tester: ['Write Test Cases', 'Perform Testing', 'Log Defects']
};

const Checklist = () => {
  const [roles, setRoles] = useState(Object.keys(rolesData));
  const [expandedRole, setExpandedRole] = useState(null);
  const [newItem, setNewItem] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);

  const handleAccordionClick = (role) => {
    setExpandedRole(expandedRole === role ? null : role);
  };

  const handleAddItem = (role) => {
    if (newItem.trim() !== '') {
      rolesData[role].push(newItem);
      setNewItem('');
    }
  };

  const handleRemoveItem = (role, index) => {
    rolesData[role].splice(index, 1);
    setExpandedRole(null);  // Close accordion to refresh the state
    setExpandedRole(role);  // Re-open accordion to show updated state
  };

  const handleEditItem = (role, index) => {
    setEditingIndex({ role, index });
    setNewItem(rolesData[role][index]);
  };

  const handleSaveEditItem = (role) => {
    const { role: r, index } = editingIndex;
    rolesData[r][index] = newItem;
    setNewItem('');
    setEditingIndex(null);
    setExpandedRole(null);  // Close accordion to refresh the state
    setExpandedRole(role);  // Re-open accordion to show updated state
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-2xl">
        <h1 className="text-3xl font-bold mb-4 text-center">Role-based Checklist</h1>
        {roles.map((role) => (
          <div key={role} className="mb-4">
            <div
              className="cursor-pointer bg-blue-500 text-white py-2 px-4 rounded"
              onClick={() => handleAccordionClick(role)}
            >
              {role}
            </div>
            {expandedRole === role && (
              <div className="bg-white p-4 shadow rounded mt-2">
                <ul className="list-disc pl-6">
                  {rolesData[role].map((item, index) => (
                    <li key={index} className="flex items-center justify-between mb-2">
                      <span className="text-lg">{item}</span>
                      <div className="flex space-x-2">
                        <button
                          className="bg-yellow-500 text-white px-2 py-1 rounded"
                          onClick={() => handleEditItem(role, index)}
                        >
                          Edit
                        </button>
                        <button
                          className="bg-red-500 text-white px-2 py-1 rounded"
                          onClick={() => handleRemoveItem(role, index)}
                        >
                          Delete
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex">
                  <textarea
                    value={newItem}
                    onChange={(e) => setNewItem(e.target.value)}
                    placeholder="Add new item"
                    className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
                    rows="3"
                  />
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded"
                    onClick={() => (editingIndex ? handleSaveEditItem(role) : handleAddItem(role))}
                  >
                    {editingIndex ? 'Save' : 'Add'}
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
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

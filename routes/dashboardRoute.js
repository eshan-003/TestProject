import React, { useState } from 'react';

const Item = ({
  answerID,
  questionID,
  question,
  checklist,
  isActive,
  onClick,
  ariaExpanded,
  backgroundColor = "bg-blue-200"
}) => {
  const [newPoint, setNewPoint] = useState("");
  const [checklistItems, setChecklistItems] = useState(checklist);

  const handleAdd = () => {
    if (newPoint.trim()) {
      setChecklistItems([...checklistItems, newPoint]);
      setNewPoint("");
    }
  };

  const handleEdit = (index) => {
    const editedPoint = prompt("Edit point:", checklistItems[index]);
    if (editedPoint) {
      const updatedChecklist = checklistItems.map((item, i) => i === index ? editedPoint : item);
      setChecklistItems(updatedChecklist);
    }
  };

  const handleDelete = (index) => {
    const updatedChecklist = checklistItems.filter((_, i) => i !== index);
    setChecklistItems(updatedChecklist);
  };

  return (
    <div className="item overflow-hidden">
      <div className="text-gray-dark font-medium overflow-hidden">
        <button
          type="button"
          role="button"
          id={questionID}
          className={`w-full flex gap-4 items-center justify-between p-5 transition-colors duration-100 ease-in focus:ring-4 focus:ring-gray-200 hover:${backgroundColor ? backgroundColor : "bg-blue-200"} ${
            isActive ? backgroundColor : ""
          }`}
          onClick={onClick}
          aria-expanded={ariaExpanded}
          aria-controls={answerID}
        >
          <h2 className="text-left text-xl">{question}</h2>
          <span className="sr-only">{isActive ? "Hide" : "Show"}</span>
          <svg
            data-accordion-icon
            className={`w-3 h-3 shrink-0 transition-transform duration-300 ease-in-out ${isActive ? "rotate-180" : "rotate-0"}`}
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5 5 1 1 5"
            />
          </svg>
        </button>
      </div>
      <div
        id={answerID}
        aria-labelledby={questionID}
        className={`transition-all duration-[600ms] ease-in-out ${
          isActive ? "max-h-[300px] opacity-100" : "max-h-[0px] opacity-0"
        }`}
      >
        <div className="p-5 space-y-2">
          {checklistItems.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <p className="text-gray-500">{item}</p>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(index)}
                  className="text-sm text-blue-600 hover:text-blue-800 focus:outline-none focus:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(index)}
                  className="text-sm text-red-600 hover:text-red-800 focus:outline-none focus:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
          <div className="flex items-center gap-2 mt-4">
            <textarea
              className="border border-gray-300 rounded p-2 w-full resize-none"
              rows="2"
              placeholder="Add new point"
              value={newPoint}
              onChange={(e) => setNewPoint(e.target.value)}
            />
            <button
              onClick={handleAdd}
              className="text-sm bg-green-600 text-white px-4 py-2 rounded hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Item;



import React from 'react';

const Item = ({
  answerID,
  questionID,
  question,
  answer,
  isActive,
  onClick,
  ariaExpanded,
  backgroundColor = "bg-blue-200"
}) => {
  return (
    <div className="item overflow-hidden">
      <div className="text-gray-dark font-medium overflow-hidden">
        <button
          type="button"
          role="button"
          id={questionID}
          className={`w-full flex gap-4 items-center justify-between p-5 transition-colors duration-100 ease-in focus:ring-4 focus:ring-gray-200 hover:${backgroundColor ? backgroundColor : "bg-blue-200"} ${
            isActive ? backgroundColor : ""
          }`}
          onClick={onClick}
          aria-expanded={ariaExpanded}
          aria-controls={answerID}
        >
          <h2 className="text-left">{question}</h2>
          <span className="sr-only">{isActive ? "Hide" : "Show"}</span>
          <svg
            data-accordion-icon
            className={`w-3 h-3 shrink-0 transition-transform duration-300 ease-in-out ${isActive ? "rotate-180" : "rotate-0"}`}
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5 5 1 1 5"
            />
          </svg>
        </button>
      </div>
      <div
        id={answerID}
        aria-labelledby={questionID}
        className={`transition-all duration-[600ms] ease-in-out ${
          isActive ? "max-h-[300px] opacity-100" : "max-h-[0px] opacity-0"
        }`}
      >
        <p className="text-gray-500 p-5">{answer}</p>
      </div>
    </div>
  );
};

export default Item;





export const rolesChecklist = [
  {
    role: "Manager",
    checklist: [
      "Conduct team meetings",
      "Approve budgets",
      "Monitor project progress",
      "Handle escalations",
      "Evaluate team performance"
    ]
  },
  {
    role: "Developer",
    checklist: [
      "Write and optimize code",
      "Fix bugs and issues",
      "Participate in code reviews",
      "Collaborate with designers and testers",
      "Update documentation"
    ]
  },
  {
    role: "Code Reviewer",
    checklist: [
      "Review code for best practices",
      "Ensure code quality",
      "Check for security vulnerabilities",
      "Provide constructive feedback",
      "Approve or request changes"
    ]
  },
  {
    role: "Release Coordinator",
    checklist: [
      "Plan release schedules",
      "Coordinate with teams",
      "Ensure all release criteria are met",
      "Communicate release status",
      "Handle post-release activities"
    ]
  },
  {
    role: "PSG",
    checklist: [
      "Provide technical support",
      "Resolve customer issues",
      "Document support cases",
      "Collaborate with development team",
      "Conduct customer training sessions"
    ]
  },
  {
    role: "PTE",
    checklist: [
      "Execute performance tests",
      "Analyze test results",
      "Identify performance bottlenecks",
      "Recommend optimizations",
      "Document performance metrics"
    ]
  },
  {
    role: "DARE",
    checklist: [
      "Define data requirements",
      "Analyze data trends",
      "Create data reports",
      "Ensure data accuracy",
      "Collaborate with data engineers"
    ]
  }
];


/* eslint-disable react/prop-types */
import { useState } from "react";

const Item = ({ answerID, questionID, isActive, onClick, question, checklist, ariaExpanded, backgroundColor }) => {
  const [newItem, setNewItem] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [items, setItems] = useState(checklist);

  const handleAddItem = () => {
    if (newItem.trim() !== '') {
      setItems([...items, newItem]);
      setNewItem('');
    }
  };

  const handleRemoveItem = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  const handleEditItem = (index) => {
    setEditingIndex(index);
    setNewItem(items[index]);
  };

  const handleSaveEditItem = () => {
    const updatedItems = items.map((item, index) => (index === editingIndex ? newItem : item));
    setItems(updatedItems);
    setNewItem('');
    setEditingIndex(null);
  };

  return (
    <div className={`p-4 ${backgroundColor}`} onClick={onClick}>
      <button
        className="w-full text-left"
        id={questionID}
        aria-expanded={ariaExpanded}
        aria-controls={answerID}
      >
        <h2 className="text-xl font-semibold">{question}</h2>
      </button>
      {isActive && (
        <div id={answerID} className="mt-2">
          <ul className="list-disc pl-6">
            {items.map((item, index) => (
              <li key={index} className="flex items-center justify-between mb-2">
                <span className="text-lg">{item}</span>
                <div className="flex space-x-2">
                  <button
                    className="bg-yellow-500 text-white px-2 py-1 rounded"
                    onClick={(e) => { e.stopPropagation(); handleEditItem(index); }}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    onClick={(e) => { e.stopPropagation(); handleRemoveItem(index); }}
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
              onClick={(e) => e.stopPropagation()}
            />
            <button
              className="bg-green-500 text-white px-4 py-2 rounded"
              onClick={(e) => { e.stopPropagation(); editingIndex !== null ? handleSaveEditItem() : handleAddItem(); }}
            >
              {editingIndex !== null ? 'Save' : 'Add'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Item;



import Item from "./Item";
import { faqArray } from "../Data";
import { useState } from "react";

const Accordion = ({ backgroundColor }) => {
  const [ActiveIndex, setActiveIndex] = useState(null);

  const handleToggle = (index) => {
    setActiveIndex(ActiveIndex === index ? null : index);
  };

  return (
    <div id="accordion-wrapper" className="flex flex-col gap-0 max-w-[800px] w-full mx-auto rounded-xl border border-gray-200 divide-y overflow-hidden">
      {faqArray.map((faq, i) => (
        <Item
          key={i}
          answerID={`answer-${i + 1}`}
          questionID={`question-${i + 1}`}
          isActive={ActiveIndex === i}
          onClick={() => handleToggle(i)}
          question={faq.question}
          checklist={faq.checklist}
          ariaExpanded={ActiveIndex === i ? true : false}
          backgroundColor={backgroundColor}
        />
      ))}
    </div>
  );
};

export default Accordion;
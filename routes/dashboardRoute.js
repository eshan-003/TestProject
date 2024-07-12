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
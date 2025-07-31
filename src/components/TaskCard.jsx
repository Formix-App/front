// components/TaskCard.js
import React from 'react';
import "../assets/styles/ComponentStyles/taskcard.css"; 

function TaskCard({ title, dueDate, status }) {
  return (
    <div className="task-card">
      <h3>{title}</h3>
      <p>Due: <span>{dueDate}</span></p>
      <p>Status: <span className={`status-${status.toLowerCase().replace(/\s/g, '-')}`}>{status}</span></p>
    </div>
  );
}

export default TaskCard;
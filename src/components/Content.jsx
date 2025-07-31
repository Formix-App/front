// components/Content.js
import React from 'react';
import "../assets/styles/ComponentStyles/content.css";
import TaskCard from './TaskCard';

function Content() {
  return (
    <main className="dashboard-content">
      <h2>Your Tasks</h2>
      <div className="cards-grid">
        <TaskCard title="Complete Project Proposal" dueDate="2025-08-15" status="In Progress" />
        <TaskCard title="Review Client Feedback" dueDate="2025-08-10" status="Pending" />
        <TaskCard title="Schedule Team Meeting" dueDate="2025-08-05" status="Completed" />
      </div>
    </main>
  );
}

export default Content;
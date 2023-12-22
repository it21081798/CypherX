
import React from 'react';

const KanbanCard = ({ ticket }) => {
  return (
    <div className="kanban-card">
      <h3>{ticket.title}</h3>
      <p>Status: {ticket.status}</p>
      <p>User: {ticket.user}</p>
      <p>Priority: {ticket.priority}</p>
    </div>
  );
};

export default KanbanCard;

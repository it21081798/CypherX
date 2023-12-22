
import React from 'react';
import KanbanCard from './KanbanCard'

const KanbanColumn = ({ group }) => {
  return (
    <div className="kanban-column">
      <h2>{group.status || group.user || `Priority ${group.priority}`}</h2>
      <div className="kanban-cards">
        {group.tickets.map((ticket) => (
          <KanbanCard key={ticket.id} ticket={ticket} />
        ))}
      </div>
    </div>
  );
};

export default KanbanColumn;

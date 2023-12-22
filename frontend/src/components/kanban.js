
import React from 'react';


const kanban = ({ groupedAndSortedTickets }) => {
    return (
      <div className="kanban-board">
        {groupedAndSortedTickets.map((group) => (
          <div key={group.status || group.user || group.priority} className="kanban-column">
            <h2>{group.status || group.user || `Priority ${group.priority}`}</h2>
            <div className="kanban-cards">
              {group.tickets.map((ticket) => (
                <div key={ticket.id} className="kanban-card">
                  <h3>{ticket.title}</h3>
                  <p>Status: {ticket.status}</p>
                  <p>User: {ticket.user}</p>
                  <p>Priority: {ticket.priority}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };
export default kanban;

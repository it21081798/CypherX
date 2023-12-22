

import KanbanColumn from './KanbanColumn';

const KanbanBoard = ({ groupedAndSortedTickets }) => {
  return (
    <div className="kanban-board">
      {groupedAndSortedTickets.map((group) => (
        <KanbanColumn key={group.status || group.user || group.priority} group={group} />
      ))}
    </div>
  );
};

export default KanbanBoard;

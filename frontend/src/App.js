import React, { useState, useEffect } from 'react';
import KanbanBoard from './components/KanbanBoard';
import './App.css';

const KANBAN_API_URL = 'http://localhost:5000/tickets';
const USER_PREFERENCES_API_URL = 'http://localhost:5000/user-preferences';


const App = () => {
  const [tickets, setTickets] = useState([]);
  const [groupingOption, setGroupingOption] = useState('status');
  const [sortBy, setSortBy] = useState('priority');
  const [groupedAndSortedTickets, setGroupedAndSortedTickets] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    fetch(KANBAN_API_URL)
      .then((response) => response.json())
      .then((data) => setTickets(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  useEffect(() => {
    fetch(USER_PREFERENCES_API_URL)
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          const { groupingOption, sortBy } = data;
          setGroupingOption(groupingOption);
          setSortBy(sortBy);
        }
      })
      .catch((error) => console.error('Error fetching user preferences:', error));
  }, []);

  useEffect(() => {
  const userPreferences = { groupingOption, sortBy };

 
  fetch(USER_PREFERENCES_API_URL, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userPreferences),
  })
    .then((response) => response.json())
    .then((data) => console.log('User preferences updated:', data))
    .catch((error) => console.error('Error updating user preferences:', error));
}, [groupingOption, sortBy]);
  
return (
  <div className="App">
    <div>
      <label>Group By:</label>
      <select value={groupingOption} onChange={(e) => setGroupingOption(e.target.value)}>
        <option value="status">Status</option>
        <option value="user">User</option>
        <option value="priority">Priority</option>
      </select>
    </div>
    <div>
      <label>Sort By:</label>
      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value="priority">Priority</option>
        <option value="title">Title</option>
      </select>
    </div>
    <button onClick={() => alert('Success')}>Display</button>



    <KanbanBoard groupedAndSortedTickets={groupedAndSortedTickets} />
  </div>
);
};

export default App;

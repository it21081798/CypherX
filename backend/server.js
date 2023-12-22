const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

const tickets=[
    {
        "id": "CAM-1",
        "title": "Update User Profile Page UI",
        "tag": [
            "Feature request"
        ],
        "userId": "usr-1",
        "status": "Todo",
        "priority": 4
    },
    {
        "id": "CAM-2",
        "title": "Add Multi-Language Support - Enable multi-language support within the application.",
        "tag": [
            "Feature Request"
        ],
        "userId": "usr-2",
        "status": "In progress",
        "priority": 3
    },
    {
        "id": "CAM-3",
        "title": "Optimize Database Queries for Performance",
        "tag": [
            "Feature Request"
        ],
        "userId": "usr-2",
        "status": "In progress",
        "priority": 1
    },
    {
        "id": "CAM-4",
        "title": "Implement Email Notification System",
        "tag": [
            "Feature Request"
        ],
        "userId": "usr-1",
        "status": "In progress",
        "priority": 3
    },
    {
        "id": "CAM-5",
        "title": "Enhance Search Functionality",
        "tag": [
            "Feature Request"
        ],
        "userId": "usr-5",
        "status": "In progress",
        "priority": 0
    },
    {
        "id": "CAM-6",
        "title": "Third-Party Payment Gateway",
        "tag": [
            "Feature Request"
        ],
        "userId": "usr-2",
        "status": "Todo",
        "priority": 1
    },
    {
        "id": "CAM-7",
        "title": "Create Onboarding Tutorial for New Users",
        "tag": [
            "Feature Request"
        ],
        "userId": "usr-1",
        "status": "Backlog",
        "priority": 2
    },
    {
        "id": "CAM-8",
        "title": "Implement Role-Based Access Control (RBAC)",
        "tag": [
            "Feature Request"
        ],
        "userId": "usr-3",
        "status": "In progress",
        "priority": 3
    },
    {
        "id": "CAM-9",
        "title": "Upgrade Server Infrastructure",
        "tag": [
            "Feature Request"
        ],
        "userId": "usr-5",
        "status": "Todo",
        "priority": 2
    },
    {
        "id": "CAM-10",
        "title": "Conduct Security Vulnerability Assessment",
        "tag": [
            "Feature Request"
        ],
        "userId": "usr-4",
        "status": "Backlog",
        "priority": 1
    }
]


let userPreferences = {
    groupingOption: 'status',
    sortBy: 'priority',
  };

app.use(cors());
app.use(express.json());

app.get ('/tickets', (req, res) => {
    const groupedAndSortedTickets = groupAndSortTickets();
    res.json(groupedAndSortedTickets);
  });

  app.get('/user-preferences', (req, res) => {
    res.json(userPreferences);
  });

  app.post('/user-preferences', (req, res) => {
    const { groupingOption, sortBy } = req.body;
    userPreferences = { groupingOption, sortBy };
    res.json({ success: true });
  });

  const groupAndSortTickets = () => {
    let groupedTickets;
  
    switch (userPreferences.groupingOption) {
      case 'status':
        groupedTickets = groupByStatus();
        break;
      case 'user':
        groupedTickets = groupByUser();
        break;
      case 'priority':
        groupedTickets = groupByPriority();
        break;
      default:
        groupedTickets = [];
    }

    return sortTickets(groupedTickets);
}
 
const groupByStatus = () => {
    const groupedByStatus = {};
  
    tickets.forEach((ticket) => {
      const { status } = ticket;
  
      if (!groupedByStatus[status]) {
        
        groupedByStatus[status] = [ticket];
      } else {
        
        groupedByStatus[status].push(ticket);
      }
    });
  
    const statusGroups = Object.entries(groupedByStatus).map(([status, ticketsInGroup]) => ({
      status,
      tickets: ticketsInGroup,
    }));
  
    return statusGroups;
  };

  const groupByUser = () => {
    const groupedByUser = {};
  
    tickets.forEach((ticket) => {
      const { user } = ticket;
  
      if (!groupedByUser[user]) {
    
        groupedByUser[user] = [ticket];
      } else {
       
        groupedByUser[user].push(ticket);
      }
    });
  
    
    const userGroups = Object.entries(groupedByUser).map(([user, ticketsInGroup]) => ({
      user,
      tickets: ticketsInGroup,
    }));
  
    return userGroups;
  };
  
  const groupByPriority = () => {
    const groupedByPriority = {};
  
    tickets.forEach((ticket) => {
      const { priority } = ticket;
  
      if (!groupedByPriority[priority]) {
       
        groupedByPriority[priority] = [ticket];
      } else {
        
        groupedByPriority[priority].push(ticket);
      }
    });
  
  
    const priorityGroups = Object.entries(groupedByPriority).map(([priority, ticketsInGroup]) => ({
      priority: parseInt(priority), 
      tickets: ticketsInGroup,
    }));
  
    return priorityGroups;
  };
  
  const sortTickets = (groupedTickets) => {
    const { sortBy } = userPreferences;
  
    switch (sortBy) {
      case 'priority':
        
        return groupedTickets.map((group) => ({
          ...group,
          tickets: group.tickets.sort((a, b) => b.priority - a.priority),
        }));
      case 'title':
        
        return groupedTickets.map((group) => ({
          ...group,
          tickets: group.tickets.sort((a, b) => a.title.localeCompare(b.title)),
        }));
      default:
        return groupedTickets;
    }
  };

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
  
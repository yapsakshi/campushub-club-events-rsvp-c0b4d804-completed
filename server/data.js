function getInitialEvents() {
  return [
    { id: 1, title: 'Intro to Robotics', club: 'Robotics Club', date: '2024-05-06', capacity: 30, attendees: 12 },
    { id: 2, title: 'Open Mic Night', club: 'Music Society', date: '2024-05-07', capacity: 50, attendees: 50 },
    { id: 3, title: 'Chess Blitz', club: 'Chess Club', date: '2024-05-08', capacity: 16, attendees: 9 },
    { id: 4, title: 'Hackathon Kickoff', club: 'Coding Club', date: '2024-05-09', capacity: 40, attendees: 39 },
    { id: 5, title: 'Watercolor Workshop', club: 'Art Circle', date: '2024-05-10', capacity: 20, attendees: 5 },
    { id: 6, title: 'Debate Finals', club: 'Debate Union', date: '2024-05-11', capacity: 25, attendees: 25 }
  ];
}

module.exports = { getInitialEvents };

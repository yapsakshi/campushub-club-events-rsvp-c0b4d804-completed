const express = require('express');
const { getInitialEvents } = require('./data');

const app = express();
app.use(express.json());

let events = getInitialEvents();

app.get('/api/events', (req, res) => {
  res.json(events);
});

app.post('/api/events/:id/rsvp', (req, res) => {
  const id = req.params.id;
  const event = events.find((e) => e.id === id);

  if (!event) {
    return res.status(404).json({ error: 'Event not found' });
  }

  event.attendees = event.attendees + 1;
  res.status(200).json(event);
});

module.exports = app;

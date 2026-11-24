const express = require('express');
const { getInitialEvents } = require('./data');

const app = express();
app.use(express.json());

let events = getInitialEvents();

app.get('/api/events', (req, res) => {
  res.json(events);
});

app.post('/api/events/:id/rsvp', (req, res) => {
  // const id = req.params.id;
  const eventId=Number(req.params.id);
  const event = events.find((e) => e.id === eventId);

  if (!event) {
    return res.status(404).json({ error: 'Event not found' });
  }
 if(event.attendees>=event.capacity){
  return res.status(409).json({error:'Event is full'});
 }
  event.attendees = event.attendees + 1;
  return res.status(200).json(event);
 //return res.json(event);
});

module.exports = app;

import React from 'react';

export default function EventCard({ event, onRsvp }) {
  const seatsLeft = event.capacity - event.attendees;
  const isFull = seatsLeft <= 0;

  return (
    <div className="event-card">
      <h2>{event.title}</h2>
      <p className="event-meta">
        {event.club} &middot; {event.date}
      </p>
      {isFull ? (
        <p className="seats-left">Full</p>
      ) : (
        <p className="seats-left">{seatsLeft} seats left</p>
      )}
      <button onClick={() => onRsvp(event.id)} disabled={isFull}>
        RSVP
      </button>
    </div>
  );
}

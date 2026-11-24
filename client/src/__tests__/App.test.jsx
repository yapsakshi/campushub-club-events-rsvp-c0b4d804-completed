import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import App from '../App.jsx';

const seedEvents = [
  { id: 1, title: 'Intro to Robotics', club: 'Robotics Club', date: '2024-05-06', capacity: 30, attendees: 12 },
  { id: 4, title: 'Hackathon Kickoff', club: 'Coding Club', date: '2024-05-09', capacity: 40, attendees: 39 }
];

beforeEach(() => {
  global.fetch = vi.fn((url, options) => {
    if (url === '/api/events') {
      return Promise.resolve({
        ok: true,
        status: 200,
        json: () => Promise.resolve(seedEvents.map((e) => ({ ...e })))
      });
    }
    if (url === '/api/events/1/rsvp' && options && options.method === 'POST') {
      return Promise.resolve({
        ok: true,
        status: 200,
        json: () => Promise.resolve({ ...seedEvents[0], attendees: 13 })
      });
    }
    return Promise.resolve({
      ok: false,
      status: 404,
      json: () => Promise.resolve({ error: 'Event not found' })
    });
  });
});

describe('App RSVP flow', () => {
  it('updates the seats-left number immediately after a successful RSVP', async () => {
    render(<App />);

    expect(await screen.findByText('18 seats left')).toBeDefined();

    const rsvpButtons = screen.getAllByRole('button', { name: /rsvp/i });
    fireEvent.click(rsvpButtons[0]);

    await waitFor(() => {
      expect(screen.getByText('17 seats left')).toBeDefined();
    });
  });
});

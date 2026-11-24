const { test, beforeEach } = require('node:test');
const assert = require('node:assert/strict');
const request = require('supertest');

let app;

beforeEach(() => {
  delete require.cache[require.resolve('../app')];
  app = require('../app');
});

test('GET /api/events returns all six events', async () => {
  const res = await request(app).get('/api/events');
  assert.equal(res.status, 200);
  assert.ok(Array.isArray(res.body));
  assert.equal(res.body.length, 6);
});

test('GET /api/events includes expected event fields', async () => {
  const res = await request(app).get('/api/events');
  const first = res.body.find((e) => e.id === 1);
  assert.ok(first);
  assert.equal(first.title, 'Intro to Robotics');
  assert.equal(first.capacity, 30);
  assert.equal(first.attendees, 12);
});

test('RSVP on an existing event with free seats returns 200 and the updated event', async () => {
  const res = await request(app).post('/api/events/1/rsvp');
  assert.equal(res.status, 200);
  assert.equal(res.body.id, 1);
  assert.equal(res.body.attendees, 13);
});

test('RSVP increments only the targeted event attendee count', async () => {
  await request(app).post('/api/events/3/rsvp');
  const res = await request(app).get('/api/events');
  const target = res.body.find((e) => e.id === 3);
  const other = res.body.find((e) => e.id === 1);
  assert.equal(target.attendees, 10);
  assert.equal(other.attendees, 12);
});

test('RSVP on an unknown event returns 404 with an error message', async () => {
  const res = await request(app).post('/api/events/999/rsvp');
  assert.equal(res.status, 404);
  assert.equal(typeof res.body.error, 'string');
  assert.ok(res.body.error.length > 0);
});

test('RSVP on a full event returns 409 with an error message', async () => {
  const res = await request(app).post('/api/events/2/rsvp');
  assert.equal(res.status, 409);
  assert.equal(typeof res.body.error, 'string');
  assert.ok(res.body.error.length > 0);
});

test('RSVP on a full event does not change the attendee count', async () => {
  await request(app).post('/api/events/2/rsvp');
  const res = await request(app).get('/api/events');
  const full = res.body.find((e) => e.id === 2);
  assert.equal(full.attendees, 50);
});

test('RSVP on the last free seat fills the event and the next RSVP is rejected', async () => {
  const first = await request(app).post('/api/events/4/rsvp');
  assert.equal(first.status, 200);
  assert.equal(first.body.attendees, 40);

  const second = await request(app).post('/api/events/4/rsvp');
  assert.equal(second.status, 409);
});

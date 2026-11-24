## Task Overview

CampusHub is a college clubs portal. Students open a React page that lists this week's club events and press an RSVP button to reserve a seat. The page talks to a small Node.js API that keeps the events in memory. After the last release the club coordinators noticed that a few things stopped working the way they should.

## Objectives

- Pressing RSVP on any event shows an error saying the event was not found, even for events that are clearly listed on the page.
- An event that is already full still lets people RSVP, and its attendee count keeps climbing past the number of seats it has.
- After a successful RSVP, the "seats left" number for that event does not change until the whole page is reloaded.

## Helpful Tips

- Consider following a single RSVP click from the page all the way to the API and back, and watch what each side sends and receives.
- Consider calling the API on its own, without the page, to work out which side each problem lives on.
- Review what the API does before it adds another attendee, and what it should do when there are no seats left.
- Explore when the page updates what it shows after the API responds successfully.

## How to Verify

- An RSVP to an event with free seats succeeds and the event's attendee count goes up by one.
- An RSVP to an event that is already full is rejected and its attendee count stays the same.
- After a successful RSVP, the "seats left" number drops by one right away, and an event that becomes full shows "Full" with its RSVP button disabled.
- Running `npm test` from the repository root passes every test.
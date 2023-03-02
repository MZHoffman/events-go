import React from 'react'
import { Link } from 'react-router-dom'

const EVENTS = [
  { id: 'e1', name: 'Event 1' },
  { id: 'e2', name: 'Event 2' },
  { id: 'e3', name: 'Event 3' },
  { id: 'e4', name: 'Event 4' },
  { id: 'e5', name: 'Event 5' },
]

const EventsPage = () => {
  return (
    <>
      <h1>Events</h1>
      <ul>
        {EVENTS.map((e) => (
          <li key={e.id}>
            <Link to={e.id}>{e.name}</Link>
          </li>
        ))}
      </ul>
    </>
  )
}

export default EventsPage

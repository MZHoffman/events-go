import React, { Suspense } from 'react'
import {
  useRouteLoaderData,
  json,
  redirect,
  defer,
  Await,
} from 'react-router-dom'

import EventItem from '../components/EventItem'
import EventsList from '../components/EventsList'

const EventDetailPage = () => {
  const { event, events } = useRouteLoaderData('event-detail')
  return (
    <>
      <Suspense fallback={<p>Loading...</p>}>
        <Await resolve={event}>
          {(loadedEvent) => <EventItem event={loadedEvent} />}
        </Await>
      </Suspense>

      <Suspense fallback={<p>Loading...</p>}>
        <Await resolve={events}>
          {(LoadedEvents) => <EventsList events={LoadedEvents} />}
        </Await>
      </Suspense>
    </>
  )
}

export default EventDetailPage

const loadEvent = async (id) => {
  const response = await fetch('http://localhost:8080/events/' + id)

  if (!response.ok) {
    throw json(
      { message: 'Could not fetch details for selected event!' },
      { status: 500 }
    )
  } else {
    const resData = await response.json()
    return resData.event
  }
}

const loadEvents = async () => {
  const response = await fetch('http://localhost:8080/events')
  if (!response.ok) {
    throw json({ message: 'Could not fetch events.' }, { status: 500 })
  } else {
    const resData = await response.json()
    return resData.events
  }
}
export const eventDetailLoader = async ({ request, params }) => {
  const id = params.eventId

  return defer({
    event: await loadEvent(id),
    events: loadEvents(),
  })
}

export const deleteItemAction = async ({ params, request }) => {
  const id = params.eventId
  const response = await fetch('http://localhost:8080/events/' + id, {
    method: request.method,
  })
  if (!response.ok) {
    throw json({ message: 'Could not delete  event!' }, { status: 500 })
  } else {
    return redirect('/events')
  }
}

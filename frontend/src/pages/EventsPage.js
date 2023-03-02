import { useLoaderData } from 'react-router-dom'

import EventsList from '../components/EventsList'

const EventsPage = () => {
  const data = useLoaderData()
  return (
    <>
      <EventsList events={data.events} />
    </>
  )
}

export default EventsPage

export const eventsLoader = async () => {
  const response = await fetch('http://localhost:8080/events')
  if (!response.ok) {
    throw { message: 'Could not fetch events!' }
  } else {
    return response
  }
}

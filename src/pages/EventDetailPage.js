import React from 'react'
import { useParams } from 'react-router-dom'

const EventDetailPage = () => {
  const params = useParams()
  return (
    <div>
      EventDetailPage
      <p>{params.eventId}</p>
    </div>
  )
}

export default EventDetailPage

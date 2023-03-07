import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import RootLayout from './pages/RootLayout'
import HomePage from './pages/HomePage'
import EditEventPage from './pages/EditEventPage'
import EventDetailPage, { eventDetailLoader } from './pages/EventDetailPage'
import EventsPage, { eventsLoader } from './pages/EventsPage'
import NewEventPage from './pages/NewEventPage'
import ErrorPage from './pages/ErrorPage'
import EventsRootLayout from './pages/EventsRootLayout'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: '', element: <HomePage /> },
      {
        path: 'events',
        element: <EventsRootLayout />,
        children: [
          {
            index: true,
            element: <EventsPage />,
            loader: eventsLoader,
          },
          {
            path: ':eventId',
            loader: eventDetailLoader,
            id: 'event-detail',
            children: [
              {
                index: true,
                element: <EventDetailPage />,
              },
              { path: 'edit', element: <EditEventPage /> },
            ],
          },
          { path: 'new', element: <NewEventPage /> },
        ],
      },
    ],
  },
])

const App = () => {
  return <RouterProvider router={router} />
}

export default App

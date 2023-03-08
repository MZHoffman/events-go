import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import RootLayout from './pages/RootLayout'
import HomePage from './pages/HomePage'
import EditEventPage from './pages/EditEventPage'
import EventDetailPage, {
  eventDetailLoader,
  deleteItemAction,
} from './pages/EventDetailPage'
import EventsPage, { eventsLoader } from './pages/EventsPage'
import NewEventPage from './pages/NewEventPage'
import ErrorPage from './pages/ErrorPage'
import EventsRootLayout from './pages/EventsRootLayout'
import { manipulateEventAction } from './components/EventForm'

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
                action: deleteItemAction,
              },
              {
                path: 'edit',
                element: <EditEventPage />,
                action: manipulateEventAction,
              },
            ],
          },
          {
            path: 'new',
            element: <NewEventPage />,
            action: manipulateEventAction,
          },
        ],
      },
    ],
  },
])

const App = () => {
  return <RouterProvider router={router} />
}

export default App

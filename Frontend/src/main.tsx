/**
 * DO NOT EDIT
 */
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import { ProjectPage } from './pages/ProjectPage'
import App from './App'
import ProjectDetailsPage from './pages/ProjectDetailsPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <ProjectPage /> },
      { path: 'project-details', element: <ProjectDetailsPage/> }
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)

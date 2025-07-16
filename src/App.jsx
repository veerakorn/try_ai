import { createBrowserRouter, RouterProvider, useNavigate, Outlet } from 'react-router'
import { HomePage, LoginPage } from './pages'

// Layout component to provide navigate function to all routes
function Layout() {
  const navigate = useNavigate()
  
  return <Outlet context={{ navigate }} />
}

// Router configuration
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: "login",
        element: <LoginPage />
      }
    ]
  }
])

function App() {
  return <RouterProvider router={router} />
}

export default App

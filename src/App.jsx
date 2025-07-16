import { createBrowserRouter, RouterProvider, useNavigate, Outlet } from 'react-router'
import Home from './components/Home'
import Login from './components/Login'

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
        element: <Home />
      },
      {
        path: "login",
        element: <Login />
      }
    ]
  }
])

function App() {
  return <RouterProvider router={router} />
}

export default App

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { getSession } from "./utils/storage"

import Login from './pages/Login'
import Register from "./pages/Register"
import Dashboard from "./components/Dashboard"

function ProtectedRoute({ children }) {
  const session = getSession()
  if (!session) {
    return <Navigate to="/login" />
  }
  return children
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

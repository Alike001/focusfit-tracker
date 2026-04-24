import { Link, useNavigate } from 'react-router-dom'
import { getSession, clearSession } from '../utils/storage'

export default function Navbar() {
  const username = getSession() // get who is logged in
  const navigate = useNavigate()

  function handleLogout() {
    clearSession() // remove session from localStorage
    navigate('/login')
  }

  return (
    <nav className="navbar">

      <Link to="/" className="navbar-brand">
        🏋️ FocusFit Tracker
      </Link>

      <div className="navbar-links">
        <Link to="/">Dashboard</Link>
        <Link to="/log">Log Activity</Link>
        <Link to="/goals">Goals</Link>
        <Link to="/progress">Progress</Link>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span className="navbar-user">👤 {username}</span>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

    </nav>
  )
}
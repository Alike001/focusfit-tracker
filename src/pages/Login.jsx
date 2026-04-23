import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { validateUser, saveSession } from '../utils/storage'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const navigate = useNavigate()

  function handleLogin() {
    if (!username.trim() || !password.trim()) {
      setError('Please enter your username and password.')
      return
    }

    const user = validateUser(username.trim(), password)

    if (!user) {
      setError('Incorrect username or password.')
      return
    }

    saveSession(user.username)
    navigate('/')
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') handleLogin()
  }

  return (
    <div className="auth-wrapper">
      <div className="auth-card">

        <h1>🏋️ FocusFit</h1>
        <p className="auth-subtitle">Welcome back! Log in to continue.</p>

        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            placeholder="Your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>

        {error && <p className="form-error">{error}</p>}

        <button className="btn btn-primary" onClick={handleLogin}>
          Log In
        </button>

        <div className="auth-footer">
          Don't have an account? <Link to="/register">Sign up</Link>
        </div>

      </div>
    </div>
  )
}
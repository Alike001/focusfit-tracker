import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { saveUser, userExists } from '../utils/storage'

export default function Register() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')

  const navigate = useNavigate()

  function handleRegister() {
    if (!username.trim() || !password.trim() || !confirm.trim()) {
      setError('All fields are required.')
      return
    }
    if (username.trim().length < 3) {
      setError('Username must be at least 3 characters.')
      return
    }
    if (password.length < 4) {
      setError('Password must be at least 4 characters.')
      return
    }
    if (password !== confirm) {
      setError('Passwords do not match.')
      return
    }
    if (userExists(username.trim())) {
      setError('That username is already taken.')
      return
    }

    saveUser({ username: username.trim(), password })
    navigate('/login')
  }

  return (
    <div className="auth-wrapper">
      <div className="auth-card">

        {/* Header */}
        <h1>🏋️ FocusFit</h1>
        <p className="auth-subtitle">Create your account to start tracking</p>

        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            placeholder="e.g. Ayomide"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Min. 4 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Confirm Password</label>
          <input
            type="password"
            placeholder="Repeat your password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />
        </div>

        {error && <p className="form-error">{error}</p>}

        <button className="btn btn-primary" onClick={handleRegister}>
          Create Account
        </button>
        
        <div className="auth-footer">
          Already have an account? <Link to="/login">Log in</Link>
        </div>

      </div>
    </div>
  )
}
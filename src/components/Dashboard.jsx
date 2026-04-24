
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { getSession, getActivities, getGoals } from '../utils/storage'

const TYPE_EMOJI = {
  workout: '🏋️',
  coding: '💻',
  study: '📚',
  reading: '📖',
}

export default function Dashboard() {
  const username = getSession()
  const activities = getActivities(username)  // all activities for this user
  const goals = getGoals(username) // all goals for this user

  // Total number of activities ever logged
  const totalActivities = activities.length

  // Total minutes logged this week
  const now = new Date()
  const startOfWeek = new Date(now)
  const day = startOfWeek.getDay()
  const diff = day === 0 ? -6 : 1 - day
  startOfWeek.setDate(startOfWeek.getDate() + diff)
  startOfWeek.setHours(0, 0, 0, 0)

  const weeklyMinutes = activities
    .filter((a) => new Date(a.date) >= startOfWeek)
    .reduce((sum, a) => sum + Number(a.duration), 0)

  // Number of active goals
  const activeGoals = goals.length

  // Count of each activity type (for the breakdown badges)
  const typeCounts = activities.reduce((acc, a) => {
    acc[a.type] = (acc[a.type] || 0) + 1
    return acc
  }, {})

  // Last 5 activities sorted by date descending
  const recent = [...activities]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5)

  return (
    <>
      <Navbar />

      <div className="page-wrapper">

        <div className="welcome-message">
          <h1>Welcome back, {username}!</h1>
          <p>Here's your activity summary at a glance.</p>
        </div>

        <div className="dashboard-stats">

          <div className="stat-box">
            <div className="stat-number">{totalActivities}</div>
            <div className="stat-label">Total Activities</div>
          </div>

          <div className="stat-box">
            <div className="stat-number">{weeklyMinutes}</div>
            <div className="stat-label">Minutes This Week</div>
          </div>

          <div className="stat-box">
            <div className="stat-number">{activeGoals}</div>
            <div className="stat-label">Active Goals</div>
          </div>

        </div>

        <div className="card">
          <h2>Activity Breakdown</h2>

          {totalActivities === 0 ? (
            <p style={{ color: '#718096' }}>
              No activities yet.{' '}
              <Link to="/log" style={{ color: '#2b6cb0', fontWeight: 600 }}>
                Log your first one
              </Link>
            </p>
          ) : (
            // Show a badge for each activity type that has entries
            <div>
              {Object.entries(typeCounts).map(([type, count]) => (
                <span key={type} className="badge">
                  {TYPE_EMOJI[type] || '🎯'} {type}: {count} session{count !== 1 ? 's' : ''}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="card">
          <h2>Recent Activity</h2>

          {recent.length === 0 ? (
            <p style={{ color: '#718096' }}>Nothing logged yet.</p>
          ) : (
            <ul className="recent-list">
              {recent.map((a) => (
                <li key={a.id}>
                  <span>
                    {TYPE_EMOJI[a.type] || '🎯'}{' '}
                    <strong style={{ textTransform: 'capitalize' }}>{a.type}</strong>
                    {a.notes && (
                      <span style={{ color: '#718096' }}>
                        {' '}— {a.notes.slice(0, 40)}{a.notes.length > 40 ? '…' : ''}
                      </span>
                    )}
                  </span>

                  <span style={{ color: '#a0aec0', fontSize: '0.85rem' }}>
                    {a.duration} min · {a.date}
                  </span>
                </li>
              ))}
            </ul>
          )}

          {activities.length > 5 && (
            <div style={{ marginTop: '14px' }}>
              <Link to="/progress" style={{ color: '#2b6cb0', fontSize: '0.9rem', fontWeight: 600 }}>
                View all activity →
              </Link>
            </div>
          )}
        </div>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <Link to="/log" className="btn btn-primary" style={{ width: 'auto' }}>
            + Log Activity
          </Link>
          <Link to="/goals" className="btn btn-secondary">
            Set a Goal
          </Link>
          <Link to="/progress" className="btn btn-secondary">
            View Progress
          </Link>
        </div>

      </div>
    </>
  )
}
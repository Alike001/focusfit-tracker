import { useState } from 'react'
import Navbar from '../components/Navbar'
import ActivityChart from '../components/ActivityChart'
import GoalProgress from '../components/GoalProgress'
import {
  getSession,
  getActivities,
  getGoals,
  deleteGoal,
  deleteActivity,
} from '../utils/storage'

const TYPE_EMOJI = {
  workout: '🏋️',
  coding: '💻',
  study: '📚',
  reading: '📖',
}

export default function Progress() {
  const username = getSession()

  // Load data into state so UI updates after deletes
  const [activities, setActivities] = useState(() => getActivities(username))
  const [goals, setGoals]  = useState(() => getGoals(username))

  // Filter for the history section at the bottom
  const [filter, setFilter] = useState('all')

  const totalMinutes = activities.reduce((sum, a) => sum + Number(a.duration), 0)
  const totalSessions = activities.length

  // Most logged activity type
  const typeTotals = activities.reduce((acc, a) => {
    acc[a.type] = (acc[a.type] || 0) + Number(a.duration)
    return acc
  }, {})
  const topType = Object.entries(typeTotals).sort((a, b) => b[1] - a[1])[0]

  function handleGoalDelete(id) {
    deleteGoal(id)
    setGoals(getGoals(username))
  }

  function handleActivityDelete(id) {
    deleteActivity(id)
    setActivities(getActivities(username))
  }

  // Filtered + sorted activity list for the history section
  const filtered = filter === 'all'
    ? activities
    : activities.filter((a) => a.type === filter)

  const sorted = [...filtered].sort((a, b) => new Date(b.date) - new Date(a.date))

  return (
    <>
      <Navbar />

      <div className="page-wrapper">
        <h1 className="section-title">📈 Progress</h1>

        <div className="dashboard-stats" style={{ marginBottom: '24px' }}>

          <div className="stat-box">
            <div className="stat-number">{totalSessions}</div>
            <div className="stat-label">Total Sessions</div>
          </div>

          <div className="stat-box">
            <div className="stat-number">{totalMinutes}</div>
            <div className="stat-label">Total Minutes</div>
          </div>

          <div className="stat-box">
            <div className="stat-number">
              {topType ? `${TYPE_EMOJI[topType[0]]} ${topType[1]}m` : '—'}
            </div>
            <div className="stat-label">
              Top Activity{topType ? ` (${topType[0]})` : ''}
            </div>
          </div>

        </div>

        <ActivityChart activities={activities} />

        {goals.length > 0 && (
          <div className="card">
            <h2>Goal Progress</h2>
            {goals.map((goal) => (
              <GoalProgress
                key={goal.id}
                goal={goal}
                activities={activities}
                onDelete={handleGoalDelete}
              />
            ))}
          </div>
        )}

        <div style={{ marginTop: '8px' }}>
          <h2 className="section-title" style={{ fontSize: '1.15rem' }}>
            Full Activity History
          </h2>

          <div className="filter-bar">
            <label style={{ fontSize: '0.9rem', fontWeight: 600, color: '#2d3748' }}>
              Filter by:
            </label>
            <select value={filter} onChange={(e) => setFilter(e.target.value)}>
              <option value="all">All Types</option>
              <option value="workout">🏋️ Workout</option>
              <option value="coding">💻 Coding</option>
              <option value="study">📚 Study</option>
              <option value="reading">📖 Reading</option>
            </select>
          </div>

          {sorted.length === 0 && (
            <p style={{ color: '#718096' }}>
              {filter === 'all'
                ? 'No activities logged yet.'
                : `No "${filter}" activities found.`}
            </p>
          )}

          {sorted.map((a) => (
            <div key={a.id} className="activity-item">

              <div className="activity-info">
                <h3>
                  {TYPE_EMOJI[a.type] || '🎯'}{' '}
                  <span style={{ textTransform: 'capitalize' }}>{a.type}</span>
                </h3>
                {a.notes && <p>{a.notes}</p>}
              </div>

              <div className="activity-meta">
                <div style={{ fontWeight: 700, color: '#2b6cb0' }}>
                  {a.duration} min
                </div>
                <div>{a.date}</div>
                <button
                  className="btn btn-danger"
                  style={{ marginTop: '8px' }}
                  onClick={() => handleActivityDelete(a.id)}
                >
                  Delete
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </>
  )
}
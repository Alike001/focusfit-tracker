import { useState } from 'react'
import Navbar from '../components/Navbar'
import ActivityForm from '../components/ActivityForm'
import { getSession, getActivities, saveActivity, deleteActivity } from '../utils/storage'

const TYPE_EMOJI = {
  workout: '🏋️',
  coding: '💻',
  study: '📚',
  reading: '📖',
}

export default function LogActivity() {
  const username = getSession()

  // Load activities into state so the list updates instantly after save/delete
  const [activities, setActivities] = useState(() => getActivities(username))

  const [filter, setFilter] = useState('all')

  // Called by ActivityForm when user clicks Save
  function handleSave(newActivity) {
    // Attach the username before saving
    saveActivity({ ...newActivity, username })
    // Reload from localStorage so the list is always in sync
    setActivities(getActivities(username))
  }

  function handleDelete(id) {
    deleteActivity(id)
    setActivities(getActivities(username))
  }

  const filtered = filter === 'all'
    ? activities
    : activities.filter((a) => a.type === filter)

  // Sort filtered list by date descending (newest first)
  const sorted = [...filtered].sort((a, b) => new Date(b.date) - new Date(a.date))

  return (
    <>
      <Navbar />

      <div className="page-wrapper">
        <h1 className="section-title">📝 Log Activity</h1>

        <ActivityForm onSave={handleSave} />

        <div style={{ marginTop: '32px' }}>
          <h2 className="section-title" style={{ fontSize: '1.15rem' }}>
            Your Activity History
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
                ? 'No activities logged yet. Use the form above to add one!'
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
                  onClick={() => handleDelete(a.id)}
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
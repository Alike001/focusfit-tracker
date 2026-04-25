import { useState } from 'react'

// The four activity types students and devs can log
const ACTIVITY_TYPES = ['workout', 'coding', 'study', 'reading']

export default function ActivityForm({ onSave }) {
  const [type, setType] = useState('workout')
  const [duration, setDuration] = useState('')
  const [notes, setNotes] = useState('')
  const [date, setDate] = useState(getTodayDate())
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  function getTodayDate() {
    return new Date().toISOString().split('T')[0]
  }

  function handleSubmit() {
    if (!duration || Number(duration) <= 0) {
      setError('Please enter a valid duration in minutes.')
      return
    }
    if (Number(duration) > 600) {
      setError('Duration cannot exceed 600 minutes (10 hours).')
      return
    }
    if (!date) {
      setError('Please select a date.')
      return
    }

    const newActivity = {
      type,
      duration: Number(duration),
      notes: notes.trim(),
      date,
    }

    onSave(newActivity)

    setType('workout')
    setDuration('')
    setNotes('')
    setDate(getTodayDate())
    setError('')

    setSuccess(true)
    setTimeout(() => setSuccess(false), 2000)
  }

  return (
    <div className="card">
      <h2>Log a New Activity</h2>

      <div className="form-group">
        <label>Activity Type</label>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          {ACTIVITY_TYPES.map((t) => (
            <option key={t} value={t}>
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Duration (minutes)</label>
        <input
          type="number"
          placeholder="e.g. 45"
          min="1"
          max="600"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Date</label>
        <input
          type="date"
          value={date}
          max={getTodayDate()}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Notes <span style={{ color: '#a0aec0', fontWeight: 400 }}>(optional)</span></label>
        <textarea
          placeholder="e.g. Completed 3 sets of push-ups, studied React hooks..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>

      {error && <p className="form-error">{error}</p>}

      {success && (
        <p style={{ color: '#38a169', fontWeight: 600, marginBottom: '8px' }}>
          Activity saved!
        </p>
      )}

      <button className="btn btn-primary" onClick={handleSubmit}>
        Save Activity
      </button>
    </div>
  )
}
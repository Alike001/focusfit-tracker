import { useState } from 'react'

const ACTIVITY_TYPES = ['workout', 'coding', 'study', 'reading']

export default function GoalForm({ onSave }) {
  const [type, setType] = useState('workout')
  const [target, setTarget] = useState('')
  const [period, setPeriod] = useState('weekly')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  function handleSubmit() {
    if (!target || Number(target) <= 0) {
      setError('Please enter a target greater than 0.')
      return
    }
    if (Number(target) > 10000) {
      setError('Target cannot exceed 10,000 minutes.')
      return
    }

    onSave({ type, target: Number(target), period })

    setType('workout')
    setTarget('')
    setPeriod('weekly')
    setError('')

    setSuccess(true)
    setTimeout(() => setSuccess(false), 2000)
  }

  return (
    <div className="card">
      <h2>Set a New Goal</h2>

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
        <label>Target (minutes)</label>
        <input
          type="number"
          placeholder="e.g. 300"
          min="1"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Period</label>
        <select value={period} onChange={(e) => setPeriod(e.target.value)}>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
      </div>

      {error && <p className="form-error">{error}</p>}

      {success && (
        <p style={{ color: '#38a169', fontWeight: 600, marginBottom: '8px' }}>
            Goal saved!
        </p>
      )}

      <button className="btn btn-primary" onClick={handleSubmit}>
        Save Goal
      </button>
    </div>
  )
}
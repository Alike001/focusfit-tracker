import { getTotalMinutes } from '../utils/storage'

const TYPE_EMOJI = {
  workout: '🏋️',
  coding: '💻',
  study: '📚',
  reading: '📖',
}

export default function GoalProgress({ goal, activities, onDelete }) {
  // Calculate how many minutes the user has logged toward this goal
  const logged = getTotalMinutes(activities, goal.type, goal.period)

  // Cap at 100% so the bar never overflows
  const percent = Math.min(Math.round((logged / goal.target) * 100), 100)

  const isComplete = percent >= 100

  return (
    <div className="goal-item">

      <div className="goal-header">
        <span>
          {TYPE_EMOJI[goal.type] || '🎯'}{' '}
          <span style={{ textTransform: 'capitalize' }}>{goal.type}</span>
          {' '}—{' '}
          <span style={{ color: '#718096', fontWeight: 400 }}>
            {goal.period === 'weekly' ? 'This Week' : 'This Month'}
          </span>
        </span>

        <div className="goal-actions">
          <span style={{ color: isComplete ? '#38a169' : '#2b6cb0', fontWeight: 700 }}>
            {logged} / {goal.target} min
            {isComplete && ' 🎉'}
          </span>
          <button
            className="btn btn-danger"
            onClick={() => onDelete(goal.id)}
          >
            Delete
          </button>
        </div>
      </div>

      <div className="progress-track">
        <div
          className={`progress-fill ${isComplete ? 'complete' : ''}`}
          style={{ width: `${percent}%` }}
        />
      </div>

      <p className="goal-percent">{percent}% complete</p>

    </div>
  )
}
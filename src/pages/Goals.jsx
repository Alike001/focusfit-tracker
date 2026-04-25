import { useState } from 'react'
import Navbar from '../components/Navbar'
import GoalForm from '../components/GoalForm'
import GoalProgress from '../components/GoalProgress'
import {
  getSession,
  getGoals,
  saveGoal,
  deleteGoal,
  getActivities,
} from '../utils/storage'

export default function Goals() {
  const username = getSession()
  const activities = getActivities(username)

  // Load goals into state so the list updates after save/delete
  const [goals, setGoals] = useState(() => getGoals(username))

  function handleSave(newGoal) {
    saveGoal({ ...newGoal, username })
    setGoals(getGoals(username))
  }

  function handleDelete(id) {
    deleteGoal(id)
    setGoals(getGoals(username))
  }

  // Separate goals into weekly and monthly for cleaner display
  const weeklyGoals = goals.filter((g) => g.period === 'weekly')
  const monthlyGoals = goals.filter((g) => g.period === 'monthly')

  return (
    <>
      <Navbar />

      <div className="page-wrapper">
        <h1 className="section-title">🎯 Goals</h1>

        <GoalForm onSave={handleSave} />

        <div className="card" style={{ marginTop: '24px' }}>
          <h2>Weekly Goals</h2>

          {weeklyGoals.length === 0 ? (
            <p style={{ color: '#718096' }}>
              No weekly goals set yet. Add one above!
            </p>
          ) : (
            weeklyGoals.map((goal) => (
              <GoalProgress
                key={goal.id}
                goal={goal}
                activities={activities}
                onDelete={handleDelete}
              />
            ))
          )}
        </div>

        <div className="card">
          <h2>Monthly Goals</h2>

          {monthlyGoals.length === 0 ? (
            <p style={{ color: '#718096' }}>
              No monthly goals set yet. Add one above!
            </p>
          ) : (
            monthlyGoals.map((goal) => (
              <GoalProgress
                key={goal.id}
                goal={goal}
                activities={activities}
                onDelete={handleDelete}
              />
            ))
          )}
        </div>

      </div>
    </>
  )
}
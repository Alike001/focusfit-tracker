import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'

const TYPE_COLORS = {
  workout: '#2b6cb0',
  coding: '#38a169',
  study: '#d69e2e',
  reading: '#9f7aea',  
}

const ACTIVITY_TYPES = ['workout', 'coding', 'study', 'reading']

export default function ActivityChart({ activities }) {
  const days = getLast30Days()

  // For each day, calculate total minutes per activity type
  const chartData = days.map((dateStr) => {
    const entry = { date: formatShortDate(dateStr) }

    // For each type, sum up the minutes logged on this day
    ACTIVITY_TYPES.forEach((type) => {
      const total = activities
        .filter((a) => a.date === dateStr && a.type === type)
        .reduce((sum, a) => sum + Number(a.duration), 0)
      entry[type] = total
    })

    return entry
  })

  if (activities.length === 0) {
    return (
      <div className="card">
        <h2>📊 Activity Chart — Last 30 Days</h2>
        <p style={{ color: '#718096' }}>
          No activities yet. Start logging to see your chart!
        </p>
      </div>
    )
  }

  return (
    <div className="card">
      <h2>📊 Activity Chart — Last 30 Days</h2>

      {/* chart-wrapper adds horizontal scroll on small screens */}
      <div className="chart-wrapper">
        {/*
          ResponsiveContainer makes the chart fill its parent width.
          We set a fixed height of 300px.
        */}
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={chartData}
            margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
          >

            <XAxis
              dataKey="date"
              tick={{ fontSize: 10 }}
              interval={4} 
            />

            <YAxis
              tick={{ fontSize: 11 }}
              label={{
                value: 'min',
                angle: -90,
                position: 'insideLeft',
                offset: 15,
                style: { fontSize: 11, fill: '#718096' },
              }}
            />

            {/* Tooltip shows exact minutes when you hover a bar */}
            <Tooltip
              formatter={(value, name) => [`${value} min`, name]}
            />

            {/* Legend shows which colour = which activity */}
            <Legend
              wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }}
            />

            {/* One Bar per activity type, stacked on top of each other */}
            {ACTIVITY_TYPES.map((type) => (
              <Bar
                key={type}
                dataKey={type}
                stackId="a"
                fill={TYPE_COLORS[type]}
                name={type.charAt(0).toUpperCase() + type.slice(1)}
                radius={type === 'reading' ? [4, 4, 0, 0] : [0, 0, 0, 0]}
                // Only the top bar gets rounded corners
              />
            ))}

          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Colour legend below the chart */}
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginTop: '12px' }}>
        {ACTIVITY_TYPES.map((type) => (
          <span key={type} style={{ fontSize: '0.82rem', color: '#4a5568', display: 'flex', alignItems: 'center', gap: '5px' }}>
            <span style={{
              display: 'inline-block',
              width: '12px',
              height: '12px',
              borderRadius: '3px',
              background: TYPE_COLORS[type],
            }} />
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </span>
        ))}
      </div>
    </div>
  )
}

// Helper: returns an array of the last 30 date strings (YYYY-MM-DD)
function getLast30Days() {
  const days = []
  for (let i = 29; i >= 0; i--) {
    const d = new Date()
    d.setDate(d.getDate() - i)
    days.push(d.toISOString().split('T')[0])
  }
  return days
}

// Helper: formats "2024-04-20" → "Apr 20" for the X axis label
function formatShortDate(dateStr) {
  const d = new Date(dateStr + 'T00:00:00') // force local time parse
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}
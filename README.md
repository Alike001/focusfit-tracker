# 🏋️ FocusFit Tracker

A Workout and Study Habit Tracker for students and beginner developers.
Track your workouts, coding practice, study sessions, and reading habits — all in one place.

Built with React + Vite, React Router, Recharts, and localStorage.

## Live Demo: https://focusfit-tracker.vercel.app/

## Features

- **Register & Login** — Create an account with a username and password
- **Protected Routes** — Unauthenticated users are redirected to login automatically
- **Log Activities** — Add activity type, duration, date, and optional notes
- **Filter by Type** — Narrow your activity history by workout, coding, study, or reading
- **Delete Activities** — Remove any logged entry instantly
- **Set Goals** — Define weekly or monthly minute targets per activity type
- **Goal Progress Bars** — Visual progress bars that turn green when 100% is reached
- **30-Day Chart** — Stacked bar chart showing daily activity minutes by type
- **Dashboard Summary** — Quick stats: total activities, weekly minutes, active goals
- **Responsive Design** — Works on desktop and mobile screens

## Tech Stack

| Tool | Purpose |
|---|---|
| React 18 | UI components and state management |
| Vite | Development server and build tool |
| React Router v6 | Client-side page routing |
| Recharts | 30-day activity bar chart |
| localStorage | Persistent in-browser data storage |
| Plain CSS | All styling — no CSS frameworks |

## Folder Structure

```
focusfit-tracker/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── ActivityForm.jsx
│   │   ├── GoalForm.jsx
│   │   ├── GoalProgress.jsx
│   │   └── ActivityChart.jsx
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Dashboard.jsx
│   │   ├── LogActivity.jsx
│   │   ├── Goals.jsx
│   │   └── Progress.jsx
│   ├── utils/
│   │   └── storage.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
└── vite.config.js
```

## Getting Started

```bash
# 1. Clone the repository
git clone https://github.com/Alike001/focusfit-tracker.git

# 2. Move into the project folder
cd focusfit-tracker

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

Then open `http://localhost:5173` in your browser.

## How It Works

1. **Register** a new account — your data is saved to localStorage
2. **Log activities** daily — choose from workout, coding, study, or reading
3. **Set goals** — define how many minutes per week or month you want to hit
4. **Track progress** — watch your progress bars fill up and view your 30-day chart
5. **Dashboard** — see a summary of your stats every time you log in

## Pages

| Route | Page | Description |
|---|---|---|
| `/register` | Register | Create a new account |
| `/login` | Login | Sign in to your account |
| `/` | Dashboard | Summary stats and recent activity |
| `/log` | Log Activity | Add and manage activity entries |
| `/goals` | Goals | Set and track weekly/monthly goals |
| `/progress` | Progress | 30-day chart and full activity history |

## Built by Ali Hammed
Web3Bridge Cohort XIV Final Project Week.

## License
MIT
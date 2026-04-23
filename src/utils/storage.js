const USERS_KEY = 'focusfit_users';
const SESSION_KEY = 'focusfit_session';
const ACTIVITIES_KEY = 'focusfit_activities';
const GOALS_KEY = 'focusfit_goals'; 

// Get all registered users (returns an array)
export function getUsers() {
  const data = localStorage.getItem(USERS_KEY);
  return data ? JSON.parse(data) : [];
}

// Save a new user to the users list
export function saveUser(user) {
  const users = getUsers();
  users.push(user);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function userExists(username) {
  const users = getUsers();
  return users.some((u) => u.username === username);
}

export function validateUser(username, password) {
  const users = getUsers();
  return users.find(
    (u) => u.username === username && u.password === password
  );
}

// Save the logged-in username to localStorage
export function saveSession(username) {
  localStorage.setItem(SESSION_KEY, username);
}

// Get the currently logged-in username (or null if no one is logged in)
export function getSession() {
  return localStorage.getItem(SESSION_KEY);
}

// Remove the session (log out)
export function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}

// Get all activities for the logged-in user
export function getActivities(username) {
  const data = localStorage.getItem(ACTIVITIES_KEY);
  const all = data ? JSON.parse(data) : [];
  // Filter to return only this user's activities
  return all.filter((a) => a.username === username);
}

// Save a new activity entry
export function saveActivity(activity) {
  const data = localStorage.getItem(ACTIVITIES_KEY);
  const all = data ? JSON.parse(data) : [];
  // Each activity gets a unique ID using the current timestamp
  all.push({ ...activity, id: Date.now() });
  localStorage.setItem(ACTIVITIES_KEY, JSON.stringify(all));
}

// Delete an activity by its ID
export function deleteActivity(id) {
  const data = localStorage.getItem(ACTIVITIES_KEY);
  const all = data ? JSON.parse(data) : [];
  const updated = all.filter((a) => a.id !== id);
  localStorage.setItem(ACTIVITIES_KEY, JSON.stringify(updated));
}

// Get all goals for the logged-in user
export function getGoals(username) {
  const data = localStorage.getItem(GOALS_KEY);
  const all = data ? JSON.parse(data) : [];
  return all.filter((g) => g.username === username);
}

// Save a new goal
export function saveGoal(goal) {
  const data = localStorage.getItem(GOALS_KEY);
  const all = data ? JSON.parse(data) : [];
  all.push({ ...goal, id: Date.now() });
  localStorage.setItem(GOALS_KEY, JSON.stringify(all));
}

// Delete a goal by its ID
export function deleteGoal(id) {
  const data = localStorage.getItem(GOALS_KEY);
  const all = data ? JSON.parse(data) : [];
  const updated = all.filter((g) => g.id !== id);
  localStorage.setItem(GOALS_KEY, JSON.stringify(updated));
}

export function getTotalMinutes(activities, type, period) {
  const now = new Date();

  return activities
    .filter((a) => {
      // Only count activities matching the type
      if (a.type !== type) return false;

      const actDate = new Date(a.date);

      if (period === 'weekly') {
        // Get the start of the current week (Monday)
        const startOfWeek = new Date(now);
        const day = startOfWeek.getDay(); // 0 = Sunday
        const diff = day === 0 ? -6 : 1 - day; // adjust to Monday
        startOfWeek.setDate(startOfWeek.getDate() + diff);
        startOfWeek.setHours(0, 0, 0, 0);
        return actDate >= startOfWeek;
      }

      if (period === 'monthly') {
        // Check if same month and year
        return (
          actDate.getMonth() === now.getMonth() &&
          actDate.getFullYear() === now.getFullYear()
        );
      }

      return false;
    })
    .reduce((sum, a) => sum + Number(a.duration), 0); // add up all durations
}
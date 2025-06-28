// src/utils/localStorage.js

const USERS_KEY = "smilesync_users";
const SESSION_KEY = "smilesync_session";

// Default hardcoded users (admin and patient)
const defaultUsers = [
  {
    name: "Dr. Admin",
    email: "admin@smilesync.com",
    password: "admin123",
    role: "admin",
  },
  {
    name: "Sneha Reddy",
    email: "patient@smilesync.com",
    password: "patient123",
    role: "patient",
  },
];

// Initialize users in localStorage if not present
export const initializeUsers = () => {
  const users = localStorage.getItem(USERS_KEY);
  if (!users) {
    localStorage.setItem(USERS_KEY, JSON.stringify(defaultUsers));
  }
};

// Get all users
export const getUsers = () => {
  return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
};

// Add a new user to localStorage
export const registerUser = (user) => {
  const users = getUsers();
  const existing = users.find((u) => u.email === user.email);
  if (existing) {
    throw new Error("User with this email already exists.");
  }
  const updatedUsers = [...users, user];
  localStorage.setItem(USERS_KEY, JSON.stringify(updatedUsers));
  localStorage.setItem(SESSION_KEY, JSON.stringify(user)); // auto login
  return user;
};

// Authenticate user and store session
export const loginUser = (email, password) => {
  const users = getUsers();
  const user = users.find((u) => u.email === email && u.password === password);
  if (user) {
    localStorage.setItem(SESSION_KEY, JSON.stringify(user));
    return user;
  }
  return null;
};

// Get currently logged-in user
export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem(SESSION_KEY));
};

// Log out the current user
export const logoutUser = () => {
  localStorage.removeItem(SESSION_KEY);
};

// Clear all data (for debugging/demo reset)
export const clearAllData = () => {
  localStorage.removeItem(USERS_KEY);
  localStorage.removeItem(SESSION_KEY);
  localStorage.removeItem("appointments"); // if you're using it
};

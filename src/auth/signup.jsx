// src/auth/signup.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUsers, initializeUsers } from "../utils/localStorage";

const Signup = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "admin" });
  const navigate = useNavigate();

  React.useEffect(() => {
    initializeUsers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = getUsers();
    const exists = users.find((u) => u.email === form.email);
    if (exists) {
      alert("User already exists");
      return;
    }
    const newUsers = [...users, form];
    localStorage.setItem("smilesync_users", JSON.stringify(newUsers));
    localStorage.setItem("smilesync_session", JSON.stringify(form));
    navigate(form.role === "admin" ? "/admin-dashboard" : "/patient-dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow w-80 space-y-4">
        <h2 className="text-xl font-bold text-blue-700">Sign Up</h2>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
        />
        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        >
          <option value="admin">Admin</option>
          <option value="patient">Patient</option>
        </select>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signin from "./auth/signin";
import Signup from "./auth/signup";
import Home from "./Home";
import Dashboard from "./Admin/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import PatientDashboard from "./Patient/Dashboard";
 
function App() {
  return (
    <BrowserRouter basename="/dental-management">
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />

      {/*  Protected admin route */}
      <Route
        path="/admin-dashboard"
        element={
          <ProtectedRoute role="admin">
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* Protected patient route */}
      <Route
        path="/patient-dashboard"
        element={
          <ProtectedRoute role="patient">
            <PatientDashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
    </BrowserRouter>
  );
}

export default App;

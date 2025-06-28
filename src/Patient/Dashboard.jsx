import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ import navigation hook

const PatientDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [patient, setPatient] = useState(null);
  const navigate = useNavigate(); // ✅

  useEffect(() => {
    const patientId = "p1"; // Fixed ID for demo
    const allAppointments = JSON.parse(localStorage.getItem("appointments")) || [];
    const allPatients = JSON.parse(localStorage.getItem("patients")) || [];

    const currentPatient = allPatients.find((p) => p.id === patientId);
    const myAppointments = allAppointments.filter((a) => a.patientId === patientId);

    setPatient(currentPatient);
    setAppointments(myAppointments);
  }, []);

  const today = new Date();
  const upcoming = appointments.filter(a => new Date(a.datetime) > today);
  const past = appointments.filter(a => new Date(a.datetime) <= today);

  // ✅ Logout handler
  const handleLogout = () => {
    localStorage.removeItem("loggedInUser"); // optional, if you're simulating login
    navigate("/"); // go to home
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* ✅ Logout button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      <h2 className="text-2xl font-bold text-blue-600 mb-6">
        Welcome, {patient?.fullName || "Patient"}
      </h2>

      {/* Personal Info */}
      <div className="bg-white shadow rounded p-4 mb-6">
        <h3 className="text-lg font-semibold mb-2">Your Info</h3>
        <p><strong>DOB:</strong> {patient?.dob}</p>
        <p><strong>Contact:</strong> {patient?.contact}</p>
        <p><strong>Health Info:</strong> {patient?.healthInfo}</p>
      </div>

      {/* Upcoming Appointments */}
      <div className="bg-white shadow rounded p-4 mb-6">
        <h3 className="text-lg font-semibold mb-2 text-green-700">Upcoming Appointments</h3>
        {upcoming.length === 0 ? (
          <p className="text-gray-500">No upcoming appointments.</p>
        ) : (
          <ul className="space-y-2">
            {upcoming.map((app) => (
              <li key={app.id} className="border-b pb-2">
                <p><strong>Title:</strong> {app.title}</p>
                <p><strong>Date:</strong> {new Date(app.datetime).toLocaleString()}</p>
                <p><strong>Description:</strong> {app.description}</p>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Appointment History */}
      <div className="bg-white shadow rounded p-4">
        <h3 className="text-lg font-semibold mb-2 text-gray-800">Appointment History</h3>
        {past.length === 0 ? (
          <p className="text-gray-500">No past appointments.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2">Date</th>
                  <th className="p-2">Treatment</th>
                  <th className="p-2">Cost</th>
                  <th className="p-2">Files</th>
                </tr>
              </thead>
              <tbody>
                {past.map((a) => (
                  <tr key={a.id} className="border-t">
                    <td className="p-2">{new Date(a.datetime).toLocaleString()}</td>
                    <td className="p-2">{a.treatment || "—"}</td>
                    <td className="p-2">{a.cost ? `₹${a.cost}` : "—"}</td>
                    <td className="p-2 space-x-2">
                      {a.files && a.files.length > 0 ? (
                        a.files.map((file, index) => (
                          <a
                            key={index}
                            href={file}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 underline"
                          >
                            File {index + 1}
                          </a>
                        ))
                      ) : (
                        "—"
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientDashboard;

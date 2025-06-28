import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PatientManager from "./PatientManager";
import AppointmentManager from "./AppointmentManager";
import CalendarView from "./CalendarView";

// KPI Card
const MetricCard = ({ label, value }) => (
  <div className="bg-white p-4 shadow rounded text-center">
    <p className="text-sm text-gray-500">{label}</p>
    <p className="text-2xl font-semibold">{value}</p>
  </div>
);

const Dashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [activeTab, setActiveTab] = useState("dashboard");

  const navigate = useNavigate();

  const handleLogout = () => {
    // You can also clear any session info here if needed
    navigate("/");
  };

  useEffect(() => {
    const demoPatients = [
      { id: 1, fullName: "Ravi Kumar", dob: "1992-05-12", contact: "9876543210", healthInfo: "Diabetes" },
      { id: 2, fullName: "Sneha Reddy", dob: "1987-11-25", contact: "9123456780", healthInfo: "Hypertension" },
      { id: 3, fullName: "Arjun Das", dob: "1995-04-03", contact: "9988776655", healthInfo: "Asthma" },
      { id: 4, fullName: "Meena Rao", dob: "1990-09-19", contact: "9001122334", healthInfo: "None" },
      { id: 5, fullName: "Anil Verma", dob: "1985-02-28", contact: "9345678901", healthInfo: "Heart condition" },
    ];
    const storedPatients = localStorage.getItem("patients");
    if (storedPatients) {
      setPatients(JSON.parse(storedPatients));
    } else {
      localStorage.setItem("patients", JSON.stringify(demoPatients));
      setPatients(demoPatients);
    }

    const demoAppointments = [
      { id: 1, patient: "Ravi Kumar", date: "2025-07-01T10:00", status: "pending", revenue: 500, treatment: "" },
      { id: 2, patient: "Sneha Reddy", date: "2025-07-01T12:00", status: "completed", revenue: 700, treatment: "Root Canal" },
      { id: 3, patient: "Arjun Das", date: "2025-07-02T09:00", status: "pending", revenue: 400, treatment: "" },
      { id: 4, patient: "Meena Rao", date: "2025-07-02T11:00", status: "completed", revenue: 600, treatment: "Scaling" },
      { id: 5, patient: "Anil Verma", date: "2025-07-03T14:00", status: "pending", revenue: 350, treatment: "" },
    ];
    const storedAppointments = localStorage.getItem("appointments");
    if (storedAppointments) {
      setAppointments(JSON.parse(storedAppointments));
    } else {
      localStorage.setItem("appointments", JSON.stringify(demoAppointments));
      setAppointments(demoAppointments);
    }
  }, []);

  // Metrics
  const revenue = appointments.reduce((sum, a) => sum + a.revenue, 0);
  const completedCount = appointments.filter(a => a.status === "completed").length;
  const pendingCount = appointments.filter(a => a.status === "pending").length;
  const nextAppointments = appointments
    .filter(a => new Date(a.date) > new Date())
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 10);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Fixed Top Header */}
      <header className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center shadow-md">
        <h1 className="text-xl font-bold">SmileSync Admin Dashboard</h1>
        <div className="flex items-center gap-4">
          <nav className="flex gap-4">
            {["dashboard", "patients", "appointments", "calendar"].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`capitalize px-4 py-2 rounded ${
                  activeTab === tab
                    ? "bg-white text-blue-600 font-bold shadow"
                    : "hover:bg-blue-700 transition"
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 transition px-4 py-2 rounded text-white font-semibold"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6 mt-4">
        {activeTab === "dashboard" && (
          <>
            <div className="grid md:grid-cols-5 gap-4 mb-8">
              <MetricCard label="Total Patients" value={patients.length} />
              <MetricCard label="Upcoming Appointments" value={nextAppointments.length} />
              <MetricCard label="Total Revenue" value={`₹${revenue.toLocaleString("en-IN")}`} />
              <MetricCard label="Completed Treatments" value={completedCount} />
              <MetricCard label="Pending Treatments" value={pendingCount} />
            </div>

            {/* Next 10 Appointments */}
            <section className="bg-white p-6 rounded shadow mb-6">
              <h2 className="text-xl font-bold text-blue-600 mb-4">Next 10 Appointments</h2>
              <ul className="space-y-2">
                {nextAppointments.map(appt => (
                  <li key={appt.id} className="border-b pb-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{appt.patient}</span>
                      <span className="text-sm text-gray-500">{new Date(appt.date).toLocaleString()}</span>
                    </div>
                    <p className="text-sm text-gray-600">Status: {appt.status}</p>
                  </li>
                ))}
              </ul>
            </section>

            {/* Patient Summary */}
            <section className="bg-white p-6 rounded shadow mb-6">
              <h2 className="text-xl font-bold text-blue-600 mb-4">Patients Summary</h2>
              <table className="w-full text-sm text-left">
                <thead>
                  <tr className="text-gray-600 border-b">
                    <th>Name</th>
                    <th>DOB</th>
                    <th>Contact</th>
                    <th>Health Info</th>
                  </tr>
                </thead>
                <tbody>
                  {patients.slice(0, 5).map(p => (
                    <tr key={p.id} className="border-t">
                      <td>{p.fullName}</td>
                      <td>{p.dob}</td>
                      <td>{p.contact}</td>
                      <td>{p.healthInfo}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>

            {/* Completed Treatments */}
            <section className="bg-white p-6 rounded shadow">
              <h2 className="text-xl font-bold text-blue-600 mb-4">Recent Treatments</h2>
              <table className="w-full text-sm text-left">
                <thead>
                  <tr className="text-gray-600 border-b">
                    <th>Patient</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Cost</th>
                    <th>Treatment</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments
                    .filter(a => a.status === "completed")
                    .slice(0, 5)
                    .map(a => (
                      <tr key={a.id} className="border-t">
                        <td>{a.patient}</td>
                        <td>{new Date(a.date).toLocaleString()}</td>
                        <td>{a.status}</td>
                        <td>₹{a.revenue}</td>
                        <td>{a.treatment || "N/A"}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </section>
          </>
        )}

        {/* Other Tabs */}
        {activeTab === "patients" && <PatientManager />}
        {activeTab === "appointments" && <AppointmentManager />}
        {activeTab === "calendar" && <CalendarView />}
      </main>
    </div>
  );
};

export default Dashboard;

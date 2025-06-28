import React, { useEffect, useState } from "react";

const defaultForm = {
  patient: "",
  title: "",
  description: "",
  comments: "",
  date: "",
  status: "pending",
  revenue: "",
  treatment: "",
  nextDate: "",
  file: "",
};

const AppointmentManager = () => {
  const [appointments, setAppointments] = useState([]);
  const [form, setForm] = useState(defaultForm);
  const [editingId, setEditingId] = useState(null);
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const storedAppts = localStorage.getItem("appointments");
    if (storedAppts) {
      setAppointments(JSON.parse(storedAppts));
    }

    const storedPatients = localStorage.getItem("patients");
    if (storedPatients) {
      setPatients(JSON.parse(storedPatients));
    }
  }, []);

  const saveToLocalStorage = (data) => {
    localStorage.setItem("appointments", JSON.stringify(data));
    setAppointments(data);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      setForm({ ...form, file: files[0]?.name || "" }); // simulate file upload
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.patient || !form.title || !form.date) {
      alert("Patient, Title and Appointment Date are required");
      return;
    }

    if (editingId !== null) {
      const updated = appointments.map((a) =>
        a.id === editingId ? { ...a, ...form } : a
      );
      saveToLocalStorage(updated);
      setEditingId(null);
    } else {
      const newAppt = {
        id: Date.now(),
        ...form,
        revenue: form.revenue ? Number(form.revenue) : 0,
      };
      saveToLocalStorage([newAppt, ...appointments]);
    }

    setForm(defaultForm);
  };

  const handleEdit = (appt) => {
    setForm(appt);
    setEditingId(appt.id);
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this appointment?")) {
      const updated = appointments.filter((a) => a.id !== id);
      saveToLocalStorage(updated);
    }
  };

  return (
    <div className="p-6 bg-white shadow rounded mb-10">
      <h2 className="text-xl font-bold text-blue-700 mb-4">Appointment / Incident Management</h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="grid md:grid-cols-3 gap-4 mb-6">
        <select
          name="patient"
          value={form.patient}
          onChange={handleChange}
          className="border rounded p-2"
          required
        >
          <option value="">Select Patient</option>
          {patients.map((p) => (
            <option key={p.id} value={p.fullName}>{p.fullName}</option>
          ))}
        </select>

        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          className="border rounded p-2"
          required
        />
        <input
          type="datetime-local"
          name="date"
          value={form.date}
          onChange={handleChange}
          className="border rounded p-2"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="border rounded p-2 col-span-3"
        />
        <textarea
          name="comments"
          placeholder="Comments"
          value={form.comments}
          onChange={handleChange}
          className="border rounded p-2 col-span-3"
        />
        <input
          type="number"
          name="revenue"
          placeholder="Cost (₹)"
          value={form.revenue}
          onChange={handleChange}
          className="border rounded p-2"
        />
        <input
          type="text"
          name="treatment"
          placeholder="Treatment Done"
          value={form.treatment}
          onChange={handleChange}
          className="border rounded p-2"
        />
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="border rounded p-2"
        >
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
        <input
          type="date"
          name="nextDate"
          value={form.nextDate}
          onChange={handleChange}
          className="border rounded p-2"
        />
        <input
          type="file"
          name="file"
          onChange={handleChange}
          className="border rounded p-2 col-span-3"
        />
        <button
          type="submit"
          className="col-span-3 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {editingId ? "Update Appointment" : "Add Appointment"}
        </button>
      </form>

      {/* Table */}
      <table className="w-full text-sm text-left">
        <thead>
          <tr>
            <th>Patient</th>
            <th>Title</th>
            <th>Status</th>
            <th>Date</th>
            <th>Cost</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((a) => (
            <tr key={a.id} className="border-t">
              <td>{a.patient}</td>
              <td>{a.title}</td>
              <td>{a.status}</td>
              <td>{new Date(a.date).toLocaleString()}</td>
              <td>₹{a.revenue || 0}</td>
              <td>
                <button
                  onClick={() => handleEdit(a)}
                  className="text-blue-500 mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(a.id)}
                  className="text-red-500"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AppointmentManager;

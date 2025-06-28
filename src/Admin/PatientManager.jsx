import React, { useEffect, useState } from "react";

const defaultForm = {
  fullName: "",
  dob: "",
  contact: "",
  healthInfo: "",
};

const PatientManager = () => {
  const [patients, setPatients] = useState([]);
  const [form, setForm] = useState(defaultForm);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("patients");
    if (stored) {
      setPatients(JSON.parse(stored));
    }
  }, []);

  const saveToLocalStorage = (newList) => {
    localStorage.setItem("patients", JSON.stringify(newList));
    setPatients(newList);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.fullName || !form.dob || !form.contact) {
      alert("Full Name, DOB, and Contact are required!");
      return;
    }

    if (editingId !== null) {
      const updated = patients.map(p =>
        p.id === editingId ? { ...p, ...form } : p
      );
      saveToLocalStorage(updated);
      setEditingId(null);
    } else {
      const newPatient = {
        id: Date.now(),
        ...form,
      };
      saveToLocalStorage([newPatient, ...patients]);
    }

    setForm(defaultForm);
  };

  const handleEdit = (patient) => {
    setForm(patient);
    setEditingId(patient.id);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this patient?")) {
      const updated = patients.filter(p => p.id !== id);
      saveToLocalStorage(updated);
    }
  };

  return (
    <div className="p-6 bg-white shadow rounded mb-10">
      <h2 className="text-xl font-bold text-blue-700 mb-4">
        Patient Management
      </h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="grid md:grid-cols-4 gap-4 mb-6">
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={form.fullName}
          onChange={handleChange}
          className="border rounded p-2"
          required
        />
        <input
          type="date"
          name="dob"
          value={form.dob}
          onChange={handleChange}
          className="border rounded p-2"
          required
        />
        <input
          type="text"
          name="contact"
          placeholder="Contact"
          value={form.contact}
          onChange={handleChange}
          className="border rounded p-2"
          required
        />
        <input
          type="text"
          name="healthInfo"
          placeholder="Health Info"
          value={form.healthInfo}
          onChange={handleChange}
          className="border rounded p-2"
        />
        <button
          type="submit"
          className="col-span-4 bg-blue-600 text-white rounded py-2 hover:bg-blue-700"
        >
          {editingId ? "Update Patient" : "Add Patient"}
        </button>
      </form>

      {/* Patient Table */}
      <table className="w-full text-sm text-left">
        <thead>
          <tr>
            <th>Name</th>
            <th>DOB</th>
            <th>Contact</th>
            <th>Health Info</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((p) => (
            <tr key={p.id} className="border-t">
              <td>{p.fullName}</td>
              <td>{p.dob}</td>
              <td>{p.contact}</td>
              <td>{p.healthInfo}</td>
              <td>
                <button
                  onClick={() => handleEdit(p)}
                  className="text-blue-500 mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(p.id)}
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

export default PatientManager;

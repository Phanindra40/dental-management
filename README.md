# SmileSync – Dental Center Admin Dashboard 🦷

A modern and mobile-responsive **React + Tailwind CSS** web app built for the **ENTNT technical frontend assignment**. SmileSync serves as a dashboard system for both **Admin and Patient roles**, simulating real-world clinic functionality using localStorage.

---

## 🛠️ Tech Stack

* **React (Vite)**
* **Tailwind CSS** for utility-first styling
* **React Router** for navigation
* **localStorage** for simulating authentication and data persistence
* No backend/API used (self-contained)

---

## ✅ Features Overview

### 🔐 Role-Based Login

* Admin and Patient login using email/password
* Auth flow managed entirely in `localStorage`

### 📊 Admin Dashboard

* Dashboard KPIs:

  * Total Patients
  * Revenue (from completed appointments)
  * Upcoming and Completed Appointments
* Tables with summary data:

  * Patients (5 recent)
  * Upcoming Appointments (next 5)
* Fully responsive (mobile, tablet, desktop)
* Logout and session management

### 👩‍⚕️ Patient Dashboard

* Greeting message
* View personal profile
* See upcoming and completed appointments
* File viewer for reports (PDF/images)
* Logout

---

## 🚪 Test Credentials

| Role    | Email                                                 | Password   |
| ------- | ----------------------------------------------------- | ---------- |
| Admin   | [admin@smilesync.com](mailto:admin@smilesync.com)     | admin123   |
| Patient | [patient@smilesync.com](mailto:patient@smilesync.com) | patient123 |

---

## Sample localStorage Data (DevTools Console)

js
// Paste in browser console

localStorage.setItem("smilesync_users", JSON.stringify([
  { name: "Dr. Admin", email: "admin@smilesync.com", password: "admin123", role: "admin" },
  { name: "Sneha Reddy", email: "patient@smilesync.com", password: "patient123", role: "patient" }
]));

localStorage.setItem("patients", JSON.stringify([
  { id: "p1", fullName: "Sneha Reddy", dob: "1987-11-25", contact: "9123456780", healthInfo: "Hypertension" }
]));

localStorage.setItem("appointments", JSON.stringify([
  {
    id: "i1",
    patientId: "p1",
    title: "Tooth Cleaning",
    description: "Routine scaling",
    appointmentDate: "2025-07-01T10:00:00",
    cost: 600,
    status: "Completed",
    files: [
      { name: "report.pdf", url: "https://example.com/report.pdf" }
    ]
  }
]));

localStorage.setItem("smilesync_session", JSON.stringify({
  name: "Dr. Admin",
  email: "admin@smilesync.com",
  role: "admin"
}));


---

##  Getting Started

```bash
git clone https://github.com/yourusername/smilesync-dashboard.git
cd smilesync-dashboard
npm install
npm run dev
```

Visit `http://localhost:5173` to see the app in action.

---

Chintha Phanindra
📧 chintha.phanindra40@gmail.com
📞 +91 8340898059

---

*Thank you ENTNT for the opportunity to work on this assignment!*

import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';

const CalendarView = () => {
  const [appointments, setAppointments] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    const stored = localStorage.getItem("appointments");
    if (stored) {
      setAppointments(JSON.parse(stored));
    }
  }, []);

  const formatDate = (dateObj) => {
    return dateObj.toISOString().slice(0, 10);
  };

  const selectedDateStr = formatDate(selectedDate);

  const appointmentsOnDate = appointments.filter(
    (a) => a.date.slice(0, 10) === selectedDateStr
  );

  return (
    <div className="p-6 bg-white shadow rounded mb-10">
      <h2 className="text-xl font-bold text-blue-700 mb-4">Calendar View</h2>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Calendar */}
        <Calendar
          onChange={setSelectedDate}
          value={selectedDate}
        />

        {/* Appointment List */}
        <div>
          <h3 className="text-lg font-semibold mb-2 text-gray-700">
            Appointments on {selectedDateStr}
          </h3>
          {appointmentsOnDate.length === 0 ? (
            <p className="text-gray-500">No appointments scheduled.</p>
          ) : (
            <ul className="space-y-2">
              {appointmentsOnDate.map((a) => (
                <li
                  key={a.id}
                  className="border-b pb-2"
                >
                  <div className="flex justify-between">
                    <span className="font-medium">{a.patient}</span>
                    <span className="text-sm text-gray-500">
                      {new Date(a.date).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">Status: {a.status}</p>
                  <p className="text-sm text-gray-600">Title: {a.title}</p>
                  <p className="text-sm text-gray-600">Treatment: {a.treatment || "N/A"}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default CalendarView;

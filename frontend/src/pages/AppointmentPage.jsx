import React, { useState } from "react";
import AvailabledoctorsPage from "./AvailabledoctorsPage.jsx";

export default function AppointmentPage() {
  const [appointments, setAppointments] = useState([
    { patient: "Alice Brown", doctor: "Dr. Smith", time: "8:00 AM", date: "2025-08-10" },
    { patient: "Charlie Davis", doctor: "Dr. Johnson", time: "11:30 AM", date: "2025-08-11" },
    { patient: "Eva White", doctor: "Dr. Lee", time: "2:00 PM", date: "2025-08-12" },
  ]);
  const [showForm, setShowForm] = useState(false);

  // Function to add new appointment
  const handleAddAppointment = (newAppointment) => {
    setAppointments([...appointments, newAppointment]);
    setShowForm(false);
  };

  return (
    <div>
      <section>
        <h2 className="text-lg font-semibold mb-3">Appointment Management</h2>
        <ul>
          {appointments.map((a, index) => (
            <li
              key={index}
              className="flex items-center justify-between bg-gray-700 rounded p-3 mb-2"
            >
              <div>
                <span className="font-bold">{a.patient}</span>
                <div className="text-sm text-gray-400">
                  {a.doctor} · {a.date} · {a.time}
                </div>
              </div>
              <div>
                <span className="bg-blue-700 px-3 py-1 rounded text-white">
                  Booked
                </span>
              </div>
            </li>
          ))}
        </ul>
        <button
          onClick={() => setShowForm(true)}
          className="w-full bg-blue-700 text-white py-2 rounded mt-2 hover:bg-blue-800"
        >
          Schedule New Appointment
        </button>
        {showForm && (
          <ScheduleAppointmentForm
            onClose={() => setShowForm(false)}
            onAdd={handleAddAppointment}
          />
        )}
      </section>

      <section>
        <AvailabledoctorsPage />
      </section>
    </div>
  );
}

// Popup form component
function ScheduleAppointmentForm({ onClose, onAdd }) {
  const [patient, setPatient] = useState("");
  const [doctor, setDoctor] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!patient || !doctor || !date || !time) return;

    onAdd({
      patient,
      doctor,
      date,
      time,
    });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="bg-gray-800 p-6 rounded shadow-lg min-w-[320px]">
        <h3 className="font-bold text-lg mb-3">Schedule New Appointment</h3>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Patient"
            className="bg-gray-700 rounded px-2 py-1 text-white"
            value={patient}
            onChange={(e) => setPatient(e.target.value)}
          />
          <select
            className="bg-gray-700 rounded px-2 py-1 text-white"
            value={doctor}
            onChange={(e) => setDoctor(e.target.value)}
          >
            <option value="">Select a doctor</option>
            <option>Dr. Smith</option>
            <option>Dr. Johnson</option>
            <option>Dr. Lee</option>
            <option>Dr. Patel</option>
          </select>
          <input
            type="date"
            className="bg-gray-700 rounded px-2 py-1 text-white"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            min={new Date().toISOString().split("T")[0]} // prevents past dates
          />
          <input
            type="time"
            className="bg-gray-700 rounded px-2 py-1 text-white"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
          <div className="flex gap-2 justify-end">
            <button
              type="submit"
              className="bg-blue-600 px-4 py-1 rounded hover:bg-blue-700 text-white"
            >
              Schedule
            </button>
            <button
              type="button"
              className="bg-gray-600 px-4 py-1 rounded"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

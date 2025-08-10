import { useState } from "react";
 
import QueuemanagementPage from "./QueuemanagementPage";
import AppointmentPage from "./AppointmentPage";

export default function HomePage() {
  const [tab, setTab] = useState("queue");

  return (
    <div className="min-h-screen bg-gray-900 text-white">

      {/* Tabs */}
      <nav className="flex border-b border-gray-700">
        <button
          onClick={() => setTab("queue")}
          className={`px-4 py-2 ${tab === "queue" ? "border-b-2 border-white" : ""}`}
        >
          Queue Management
        </button>
        <button
          onClick={() => setTab("appointments")}
          className={`px-4 py-2 ${tab === "appointments" ? "border-b-2 border-white" : ""}`}
        >
          Appointment Management
        </button>
      </nav>

      {/* Main Content */}
      <main className="p-4 space-y-6">
        {tab === "queue" ? <QueuemanagementPage /> : <AppointmentPage />}
      </main>
    </div>
  );
}

import React, { useState } from "react";

const initialQueue = [
  { name: "John Doe", status: "Waiting", arrival: "09:30 AM", wait: 15, priority: "Normal" },
  { name: "Jane Smith", status: "With Doctor", arrival: "09:45 AM", wait: 0, priority: "Normal" },
  { name: "Bob Johnson", status: "Waiting", arrival: "10:00 AM", wait: 5, priority: "Urgent" },
];

export default function QueuemanagementPage() {
  const [queue, setQueue] = useState(initialQueue);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const [newName, setNewName] = useState("");
  const [newArrival, setNewArrival] = useState("");
  const [newPriority, setNewPriority] = useState("Normal");

  const handleRemove = (index) => {
    setQueue((queue) => queue.filter((_, idx) => idx !== index));
  };

  const handleAdd = () => {
    if (!newName.trim() || !newArrival.trim()) return;
    const newPatient = {
      name: newName,
      status: "Waiting",
      arrival: newArrival,
      wait: 15,
      priority: newPriority,
    };
    setQueue((prev) => [...prev, newPatient]);
    setNewName("");
    setNewArrival("");
    setNewPriority("Normal");
  };

  const filteredQueue = queue
    .filter((item) => {
      if (filter === "All") return true;
      if (filter === "Urgent") return item.priority === "Urgent";
      return item.status === filter;
    })
    .filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <section>
      <h2 className="text-lg font-semibold mb-3">Queue Management</h2>
      <div className="mb-3 flex justify-between">
        <select
          className="bg-gray-700 text-white rounded px-2 py-1"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option>All</option>
          <option>Waiting</option>
          <option>With Doctor</option>
          <option>Urgent</option>
        </select>
        <input
          type="text"
          className="bg-gray-700 text-white rounded px-2 py-1 ml-2"
          placeholder="Search patients"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <ul>
        {filteredQueue.length > 0 ? (
          filteredQueue.map((item, idx) => (
            <li
              key={item.name}
              className="flex items-center justify-between bg-gray-700 rounded p-3 mb-2"
            >
              <div>
                <span className="font-bold">
                  {idx + 1}. {item.name}
                </span>
                <span
                  className={`ml-1 ${item.priority === "Urgent" ? "text-red-500" : ""}`}
                >
                  {item.priority === "Urgent" && "⚠"}
                </span>
                <div className="text-sm text-gray-400">
                  Arrival: {item.arrival} | Est. Wait: {item.wait} min
                </div>
              </div>
              <div className="flex gap-2 items-center">
                <span
                  className={`px-2 py-1 rounded ${
                    item.status === "Waiting" ? "bg-yellow-600" : "bg-green-600"
                  }`}
                >
                  {item.status}
                </span>
                <span className="bg-gray-900 px-2 py-1 rounded">{item.priority}</span>
                <button
                  className="text-red-400 px-2 py-1 hover:bg-gray-600 rounded"
                  onClick={() => handleRemove(idx)}
                >
                  ✖
                </button>
              </div>
            </li>
          ))
        ) : (
          <li className="text-center text-gray-400 py-4">That's all folks!</li>
        )}
      </ul>
      <div className="mt-4 bg-gray-800 p-3 rounded">
        <h3 className="text-md font-semibold mb-2">Add New Patient</h3>
        <input
          type="text"
          placeholder="Patient Name"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          className="w-full bg-gray-700 text-white rounded px-2 py-1 mb-2"
        />
        <input
          type="time"
          placeholder="Arrival Time "
          value={newArrival}
          onChange={(e) => setNewArrival(e.target.value)}
          className="w-full bg-gray-700 text-white rounded px-2 py-1 mb-2"
        />
        <select
          value={newPriority}
          onChange={(e) => setNewPriority(e.target.value)}
          className="w-full bg-gray-700 text-white rounded px-2 py-1 mb-2"
        >
          <option>Normal</option>
          <option>Urgent</option>
        </select>
        <button
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          onClick={handleAdd}
        >
          Add Patient
        </button>
      </div>
    </section>
  );
}

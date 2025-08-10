const doctors = [
  { name: "Dr. Smith", specialty: "General Practice", status: "Available", next: "Now" },
  { name: "Dr. Johnson", specialty: "Pediatrics", status: "Busy", next: "2:30 PM" },
  { name: "Dr. Lee", specialty: "Cardiology", status: "Off Duty", next: "Tomorrow 9:00 AM" },
  { name: "Dr. Patel", specialty: "Dermatology", status: "Available", next: "Now" },
];

export default function AvailabledoctorsPage() {
  return (
    <section className="mt-8">
      <h2 className="text-lg font-semibold mb-3">Available Doctors</h2>
      <ul>
        {doctors.map((doc) => (
          <li key={doc.name} className="flex items-center justify-between bg-gray-700 rounded p-3 mb-2">
            <div>
              <span className="font-bold">{doc.name}</span>
              <div className="text-sm text-gray-400">{doc.specialty}</div>
            </div>
            <div className="flex items-center gap-2">
              <span className={`px-2 py-1 rounded
                ${doc.status === "Available" ? "bg-green-600" : ""}
                ${doc.status === "Busy" ? "bg-yellow-600" : ""}
                ${doc.status === "Off Duty" ? "bg-red-600" : ""}
              `}>
                {doc.status}
              </span>
              <span className="text-gray-400 text-sm">Next available: {doc.next}</span>
              
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

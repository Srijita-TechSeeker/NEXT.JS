'use client';

import { useEffect, useState } from 'react';

interface Event {
  id: number;
  title: string;
}

interface Attendee {
  id: number;
  name: string;
  email: string;
  eventId: number;
}

export default function AdminAttendeesPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null);
  const [attendees, setAttendees] = useState<Attendee[]>([]);
  const [loading, setLoading] = useState(false);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');

  useEffect(() => {
    fetch('/api/events')
      .then(res => res.json())
      .then(data => setEvents(data));
  }, []);

  useEffect(() => {
    if (selectedEvent) {
      setLoading(true);
      fetch(`/api/attendees?eventId=${selectedEvent}`)
        .then(res => res.json())
        .then(data => setAttendees(data))
        .finally(() => setLoading(false));
    }
  }, [selectedEvent]);

  const handleSave = async (id: number) => {
    const res = await fetch(`/api/attendees/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: editName, email: editEmail }),
    });

    if (res.ok) {
      const updated = await fetch(`/api/attendees?eventId=${selectedEvent}`);
      const data = await updated.json();
      setAttendees(data);
      setEditingId(null);
    } else {
      alert('Failed to update attendee');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-400 via-cyan-300 to-blue-500 p-6 text-gray-800">
      <div className="max-w-4xl mx-auto bg-white/70 backdrop-blur rounded-xl p-6 shadow-2xl">
        <h1 className="text-3xl font-bold mb-6 text-center">🧑‍💼 Admin: Manage Attendees</h1>

        {/* Event selector */}
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Select Event:</label>
          <select
            onChange={e => setSelectedEvent(Number(e.target.value))}
            className="w-full p-2 border rounded"
          >
            <option value="">-- Choose an event --</option>
            {events.map(event => (
              <option key={event.id} value={event.id}>
                {event.title}
              </option>
            ))}
          </select>
        </div>

        {/* Attendees list */}
        {loading ? (
          <p>Loading attendees...</p>
        ) : selectedEvent && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">Registered Attendees:</h2>
            {attendees.length === 0 ? (
              <p>No attendees yet.</p>
            ) : (
              <ul className="space-y-4">
                {attendees.map(att => (
                  <li key={att.id} className="bg-white rounded shadow p-4 border">
                    {editingId === att.id ? (
                      <div className="space-y-2">
                        <input
                          className="w-full p-2 border rounded"
                          value={editName}
                          onChange={e => setEditName(e.target.value)}
                        />
                        <input
                          className="w-full p-2 border rounded"
                          value={editEmail}
                          onChange={e => setEditEmail(e.target.value)}
                        />
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleSave(att.id)}
                            className="bg-green-600 text-white px-4 py-1 rounded"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEditingId(null)}
                            className="bg-gray-400 text-white px-4 py-1 rounded"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex justify-between items-center">
                        <div>
                          <strong>{att.name}</strong> – {att.email}
                        </div>
                        <button
                          onClick={() => {
                            setEditingId(att.id);
                            setEditName(att.name);
                            setEditEmail(att.email);
                          }}
                          className="text-blue-600 hover:underline font-medium"
                        >
                          ✏️ Edit
                        </button>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

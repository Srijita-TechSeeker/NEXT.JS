'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function EventsDashboardPage() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await fetch('/api/events');
        const data = await res.json();
        setEvents(data);
      } catch (err) {
        console.error('Failed to fetch events:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, []);

  if (loading) return <p className="p-4">Loading events...</p>;

  return (
    <div className="min-h-screen p-6 space-y-4 bg-gradient-to-br from-pink-50 via-pink-400 to-pink-600">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-green-700">📅 All Events</h1>
          <button
            onClick={() => router.push('/dashboard/events/create')}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            ➕ Create New Event
          </button>
        </div>

        {events.length === 0 ? (
          <p className="text-gray-500">No events available.</p>
        ) : (
          <ul className="space-y-4">
            {events.map((event) => (
              <li
                key={event.id}
                className="bg-green-100 border-l-4 border-green-600 p-4 rounded shadow"
              >
                <h2 className="text-xl font-semibold">{event.title}</h2>
                <p>{event.description}</p>
                <p className="text-sm text-gray-600">📍 {event.location}</p>
                <p className="text-sm text-gray-600">📅 {new Date(event.date).toLocaleString()}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

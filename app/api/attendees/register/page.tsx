'use client';

import React, { useEffect, useState } from 'react';

interface Event {
  id: number;
  title: string;
}

export default function AttendeeRegisterPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [eventId, setEventId] = useState<number | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/api/events')
      .then(res => res.json())
      .then(data => setEvents(data));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventId || !name || !email) {
      setMessage('⚠️ Please fill in all fields.');
      return;
    }

    const res = await fetch('/api/attendees', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ eventId, name, email }),
    });

    if (res.ok) {
      setMessage('✅ Registered successfully!');
      setName('');
      setEmail('');
    } else {
      setMessage('❌ Failed to register.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-amber-300 via-rose-200 to-violet-300 p-6">
      <div className="w-full max-w-lg bg-white/60 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-white/20">
        <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-6 drop-shadow-sm">
          🎫 Attendee Registration
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Select Event:
            </label>
            <select
              onChange={e => setEventId(Number(e.target.value))}
              className="w-full p-3 border border-gray-300 rounded-xl bg-white/80 focus:outline-none focus:ring-2 focus:ring-violet-400 shadow-sm"
            >
              <option value="">-- Choose an event --</option>
              {events.map(e => (
                <option key={e.id} value={e.id}>
                  {e.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Name:
            </label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-xl bg-white/80 focus:outline-none focus:ring-2 focus:ring-violet-400 shadow-sm"
              placeholder="Your full name"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Email:
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-xl bg-white/80 focus:outline-none focus:ring-2 focus:ring-violet-400 shadow-sm"
              placeholder="you@example.com"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-violet-500 to-pink-500 hover:from-violet-600 hover:to-pink-600 text-white font-bold py-3 rounded-xl shadow-md transition duration-300"
          >
            🚀 Register Now
          </button>

          {message && (
            <p className="text-center mt-3 text-sm font-medium text-gray-800">
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

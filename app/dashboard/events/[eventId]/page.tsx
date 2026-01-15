// app/events/[eventId]/page.tsx

'use client';
import { useState } from 'react';

export default function EventDetailPage({ params }: { params: { eventId: string } }) {
  const { eventId } = params;

  const events: Record<string, any> = {
    '1': {
      title: 'Tech Conference 2025',
      date: 'June 14, 2025',
      location: 'San Francisco, CA',
      description:
        'Join the leading minds in technology for an immersive day of talks, networking, and innovation.',
      image: '/event1.jpg',
    },
    '2': {
      title: 'Startup Pitch Night',
      date: 'June 20, 2025',
      location: 'New York City, NY',
      description:
        'Pitch your startup idea in front of investors and a live audience. Get feedback, connections, and maybe even funding!',
      image: '/event2.jpg',
    },
    '3': {
      title: 'Creative Design Expo',
      date: 'June 28, 2025',
      location: 'Los Angeles, CA',
      description:
        'Explore the future of design. A showcase of modern trends, tools, and creative thinkers from around the globe.',
      image: '/event3.jpg',
    },
  };

  const event = events[eventId];

  const [formData, setFormData] = useState({ name: '', email: '' });
  const [message, setMessage] = useState('');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email) {
      setMessage('✅ You are registered successfully!');
      setFormData({ name: '', email: '' });
    } else {
      setMessage('❌ Please fill in all fields.');
    }
  };

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-pink-100 text-xl font-semibold text-red-500">
        ❌ Event not found
      </div>
    );
  }

  return (
    <div className="min-h-screen px-6 py-10 bg-gradient-to-br from-pink-50 via-pink-100 to-pink-200">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <img src={event.image} alt={event.title} className="w-full h-64 object-cover" />

        <div className="p-8 space-y-4">
          <h1 className="text-4xl font-bold text-gray-800">{event.title}</h1>
          <p className="text-sm text-gray-600">📅 {event.date}</p>
          <p className="text-sm text-gray-600">📍 {event.location}</p>
          <p className="mt-4 text-gray-700">{event.description}</p>

          <hr className="my-6" />

          <h2 className="text-2xl font-semibold mb-2 text-gray-800">Register for this Event</h2>
          <form onSubmit={handleRegister} className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded"
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded"
              required
            />
            <button
              type="submit"
              className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700"
            >
              ✅ Register
            </button>
          </form>

          {message && <p className="mt-4 font-medium">{message}</p>}
        </div>
      </div>
    </div>
  );
}

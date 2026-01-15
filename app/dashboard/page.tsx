'use client';

import Link from 'next/link';
import EventCard from '../components/EventCard';

export default function DashboardHome() {
  const cards = [
    {
      title: '📅 Create New Event',
      description: 'Start a new event now!',
      link: '/dashboard/events/create',
      bg: 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500',
    },
    {
      title: '🎉 View All Events',
      description: 'See your organized events',
      link: '/dashboard/events',
      bg: 'bg-gradient-to-r from-green-400 to-blue-500',
    },
    {
      title: '👥 Manage Attendees',
      description: 'Add or remove attendees',
      link: '/dashboard/attendees',
      bg: 'bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500',
    },
    {
      title: '📊 Analytics',
      description: 'Track event performance',
      link: '/dashboard/analytics',
      bg: 'bg-gradient-to-r from-purple-400 to-indigo-600',
    },
    {
      title: '🖼 Upload Media',
      description: 'Add images or banners',
      link: '/dashboard/media',
      bg: 'bg-gradient-to-r from-teal-400 to-cyan-600',
    },
    {
      title: '⚙️ Settings',
      description: 'Update your profile or password',
      link: '/dashboard/settings',
      bg: 'bg-gradient-to-r from-gray-400 to-gray-600',
    },
  ];

  const upcomingEvents = [
    {
      id: 1,
      name: 'Tech Conference 2025',
      date: 'June 14, 2025',
      image: '/event1.jpg',
    },
    {
      id: 2,
      name: 'Startup Pitch Night',
      date: 'June 20, 2025',
      image: '/event2.jpg',
    },
    {
      id: 3,
      name: 'Creative Design Expo',
      date: 'June 28, 2025',
      image: '/event3.jpg',
    },
  ];

  return (
    <div className="p-6 space-y-10 min-h-screen bg-gradient-to-br from-pink-50 via-pink-100 to-pink-700">
      <h1 className="text-4xl font-bold text-gray-800">Welcome to Your Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <Link key={index} href={card.link}>
            <div className={`${card.bg} p-6 rounded-xl shadow-lg text-white hover:scale-105 transition-transform cursor-pointer`}>
              <h2 className="text-2xl font-semibold mb-2">{card.title}</h2>
              <p className="text-sm">{card.description}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-700 mb-6">📅 Upcoming Events</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingEvents.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </div>
  );
}

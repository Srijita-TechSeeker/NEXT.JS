'use client';

import Link from 'next/link';
import { logout } from '../lib/logout';

export default function Sidebar1() {
  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen p-6">
      <h2 className="text-2xl font-bold mb-8">🎉 Event Manager</h2>
      <nav>
        <ul className="space-y-4">
          <li>
            <Link href="/dashboard" className="hover:text-blue-400 transition">
              Dashboard
            </Link>
          </li>
          <li>
            <Link href="/dashboard/events" className="hover:text-blue-400 transition">
              Events
            </Link>
          </li>
          <li>
            <Link href="/dashboard/attendees" className="hover:text-blue-400 transition">
              Attendees
            </Link>
          </li>
          <li>
            <Link href="/dashboard/settings" className="hover:text-blue-400 transition">
              Settings
            </Link>
          </li>
        </ul>
        <button
        onClick={logout}
        className="mt-6 bg-pink-500 hover:bg-red-600 text-white py-2 px-4 rounded"
      >
        Logout
      </button>
      </nav>
    </aside>
  );
}

'use client';

import { useEffect, useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from 'recharts';

interface EventAnalytics {
  id: number;
  title: string;
  attendeeCount: number;
}

export default function AnalyticsPage() {
  const [data, setData] = useState<EventAnalytics[]>([]);

  useEffect(() => {
    fetch('/api/analytics')
      .then(res => res.json())
      .then(setData);
  }, []);

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-orange-50 via-yellow-100 to-stone-100">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">📊 Event Attendance Analytics</h1>

      <div className="bg-white rounded-xl shadow p-6 max-w-4xl mx-auto">
        {data.length === 0 ? (
          <p className="text-center text-gray-600">No data available.</p>
        ) : (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="title" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="attendeeCount" fill="#f59e0b" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}

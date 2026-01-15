'use client';

import { useEffect, useState } from 'react';

interface Event {
  id: number;
  title: string;
}

interface Media {
  id: number;
  filename: string;
  originalName: string;
  eventId: number;
}

export default function MediaPage() {
  const [file, setFile] = useState<File | null>(null);
  const [eventId, setEventId] = useState('');
  const [message, setMessage] = useState('');
  const [mediaList, setMediaList] = useState<Media[]>([]);
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    fetch('/api/events')
      .then(res => res.json())
      .then(setEvents);

    fetch('/api/media') // You need to create this API route (below)
      .then(res => res.json())
      .then(setMediaList);
  }, []);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !eventId) {
      setMessage('Please select a file and event.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('eventId', eventId);

    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    const result = await res.json();
    if (res.ok) {
      setMessage('✅ File uploaded successfully');
      setMediaList(prev => [
        ...prev,
        {
          id: Date.now(),
          filename: result.filename,
          originalName: file.name,
          eventId: Number(eventId),
        },
      ]);
      setFile(null);
    } else {
      setMessage('❌ Upload failed');
    }
  };

  return (
    <div className="p-6 bg-gradient-to-br from-sky-200 via-blue-100 to-white min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-center text-blue-800">📸 Upload & Gallery</h1>

      <form onSubmit={handleUpload} className="mb-6 space-y-4 max-w-md mx-auto bg-violet p-6 rounded shadow">
        <div>
          <label className="block font-semibold">Select Event:</label>
          <select value={eventId} onChange={e => setEventId(e.target.value)} className="w-full p-2 border rounded">
            <option value="">-- Choose an event --</option>
            {events.map(e => (
              <option key={e.id} value={e.id}>{e.title}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-semibold">Upload Image:</label>
          <input type="file" onChange={e => setFile(e.target.files?.[0] || null)} className="w-full" />
        </div>

        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 font-bold">
          Upload
        </button>

        {message && <p className="text-center text-sm text-gray-700">{message}</p>}
      </form>

      {/* Gallery */}
      {mediaList.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {mediaList.map(m => (
            <div key={m.id} className="bg-white p-2 rounded shadow">
              <img
                src={`/uploads/${m.filename}`}
                alt={m.originalName}
                className="rounded w-full h-40 object-cover"
              />
              <p className="text-xs mt-1 text-center">{m.originalName}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

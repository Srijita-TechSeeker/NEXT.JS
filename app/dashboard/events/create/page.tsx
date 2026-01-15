'use client';
import React, { useState } from 'react';
import Link from 'next/link';

export default function CreateEvent() {
  // State for form fields
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = {
      title: name,
      date,
      location,
      description,
      // image upload needs separate handling (formData or base64), skipping here for brevity
    };

    try {
      const response = await fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setSuccess(true);
        // Clear form
        setName('');
        setDate('');
        setLocation('');
        setDescription('');
        setImage(null);
      } else {
        alert('Error: ' + (result.error || 'Something went wrong'));
      }
    } catch (error: any) {
      alert('Error: ' + (error.message || 'Network error'));
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 flex items-center justify-center p-6">
      <div className="w-full max-w-3xl bg-white/20 backdrop-blur-lg border border-white/30 rounded-xl shadow-2xl p-8">
        <h1 className="text-3xl font-extrabold text-center text-white drop-shadow mb-6">
          🎉 Create a New Event
        </h1>

        {success && (
          <div className="bg-green-100 border border-green-400 text-green-800 px-4 py-3 rounded mb-4 text-center font-semibold">
            ✅ Your event has been created successfully!
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5 text-white font-medium">
          <div>
            <label htmlFor="name" className="block mb-1">Event Name</label>
            <input
              id="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-white/70 text-black focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>

          <div>
            <label htmlFor="date" className="block mb-1">Date</label>
            <input
              id="date"
              type="date"
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-white/70 text-black focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>

          <div>
            <label htmlFor="location" className="block mb-1">Location</label>
            <input
              id="location"
              type="text"
              required
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-white/70 text-black focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>

          <div>
            <label htmlFor="description" className="block mb-1">Description</label>
            <textarea
              id="description"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-white/70 text-black focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>

          <div>
            <label htmlFor="image" className="block mb-1">Upload Event Banner</label>
            <input
              id="image"
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files?.[0] || null)}
              className="w-full bg-white/80 text-black px-4 py-2 rounded-lg"
            />
          </div>

          {image && (
            <div className="mt-4">
              <p className="font-semibold mb-1">Preview:</p>
              <img
                src={URL.createObjectURL(image)}
                alt="Preview"
                className="max-h-48 rounded-md border-2 border-white/60 shadow-lg"
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 rounded-lg shadow-lg transition duration-300"
          >
            🚀 Create Event
          </button>
        </form>
      </div>
       <Link href="/dashboard/events">
  <button className="fixed bottom-6 right-6 bg-blue-600 text-white font-bold px-6 py-3 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300">
    ➕ Back to Events
  </button>
</Link>

    </div>
  );
}

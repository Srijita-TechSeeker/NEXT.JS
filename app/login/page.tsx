'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await res.json();

    if (!res.ok) {
      setErrorMsg(data.error || 'Login failed');
    } else {
      // redirect to dashboard after login
      router.push('/dashboard');
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage:
          "url('https://tse2.mm.bing.net/th?id=OIP.v59PkVlNRyBGZ1vFS2X-iAHaEK&pid=Api&P=0&h=220')",
      }}
    >
      <div className="bg-white/20 backdrop-blur-md rounded-xl shadow-xl p-8 w-full max-w-md border border-white/30">
        <h2 className="text-3xl font-bold text-center text-white mb-6">
          🎉 Login to Event Manager
        </h2>

        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label className="block mb-1 text-sm font-semibold text-white">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-white/50 rounded-lg bg-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-semibold text-white">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-white/50 rounded-lg bg-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {errorMsg && <p className="text-red-200 text-sm text-center">{errorMsg}</p>}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-300"
          >
            Log In
          </button>
        </form>

        <p className="text-sm text-center text-white mt-4">
          Don’t have an account?{' '}
          <a href="/signup" className="text-blue-200 font-semibold hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}

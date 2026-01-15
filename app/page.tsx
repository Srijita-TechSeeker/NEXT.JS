export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white">
      <h1 className="text-5xl font-bold mb-4">Welcome to Event Management System</h1>
      <p className="text-lg max-w-xl text-center mb-8">
        Create, manage, and promote your events with ease.
      </p>

      <div className="space-x-4">
        <a
          href="/login"
          className="px-6 py-3 bg-white text-purple-700 font-semibold rounded shadow hover:bg-gray-200 transition"
        >
          Log In
        </a>
        <a
          href="/signup"
          className="px-6 py-3 border border-white font-semibold rounded hover:bg-white hover:text-purple-700 transition"
        >
          Sign Up
        </a>
      </div>
    </div>
  );
}

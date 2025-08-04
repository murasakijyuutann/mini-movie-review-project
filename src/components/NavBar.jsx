import { Link } from 'react-router-dom';

export default function NavBar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black bg-opacity-70 px-6 py-4 flex items-center justify-between shadow-md border-b border-indigo-400/40 backdrop-blur-md">
      
      {/* 🔹 Left side: Logo */}
      <Link
        to="/"
        className="text-indigo-300 text-2xl font-bold tracking-widest drop-shadow-[0_0_6px_rgba(99,102,241,0.4)] hover:text-indigo-200 transition"
      >
        🌌
      </Link>

      {/* 🔹 Right side: Buttons */}
      <div className="hidden md:flex space-x-4">
        <Link
          to="/login"
          className="bg-transparent border border-indigo-400 text-indigo-300 px-4 py-2 rounded-lg hover:bg-indigo-700/30 transition"
        >
          Login
        </Link>

        <Link
          to="/signup"
          className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition"
        >
          Sign Up
        </Link>
      </div>
      
    </nav>
  );
}

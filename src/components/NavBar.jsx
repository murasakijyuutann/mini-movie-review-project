import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi'; // ✅ ADDED

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!search.trim()) return;

    // ✅ CHANGED: Use URL query instead of axios and state
    navigate(`/search?q=${encodeURIComponent(search.trim())}`);
    setSearch('');
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black bg-opacity-70 px-6 py-4 shadow-md border-b border-indigo-400/40 backdrop-blur-md">
      <div className="flex items-center justify-between gap-4">
        {/* 🔹 Logo */}
        <Link
          to="/"
          className="text-indigo-300 text-2xl font-bold tracking-widest drop-shadow-[0_0_6px_rgba(99,102,241,0.4)] hover:text-indigo-200 transition"
        >
          🌌
        </Link>

        {/* 🔍 Search Bar */}
        <form onSubmit={handleSearchSubmit} className="hidden md:flex flex-grow max-w-md">
          <input
            type="text"
            placeholder="Search movies..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 rounded-l-lg bg-white/20 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <button
            type="submit"
            className="bg-indigo-500 text-white px-4 py-2 rounded-r-lg hover:bg-indigo-600 transition"
          >
            Search
          </button>
        </form>

        {/* 🔘 Desktop Buttons */}
        <div className="hidden md:flex space-x-4">
          <Link to="/login" className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition">
            Login
          </Link>
          <Link to="/signup" className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition">
            Sign Up
          </Link>
        </div>

        {/* ☰ Mobile Toggle */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-indigo-300 focus:outline-none">
            {isOpen ? (
              <HiOutlineX className="w-8 h-8" />
            ) : (
              <HiOutlineMenu className="w-8 h-8" />
            )}
          </button>
        </div>
      </div>

      {/* 🔻 Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden mt-4 flex flex-col space-y-2">
          <Link to="/login" onClick={() => setIsOpen(false)} className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition">
            Login
          </Link>
          <Link to="/signup" onClick={() => setIsOpen(false)} className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition">
            Sign Up
          </Link>
        </div>
      )}
    </nav>
  );
}

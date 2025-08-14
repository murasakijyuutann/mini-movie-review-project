// src/components/NavBar.jsx
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();

  const getUser = () => {
    try { return JSON.parse(localStorage.getItem('user') || 'null'); }
    catch { return null; }
  };

  const [user, setUser] = useState(getUser);
  const [q, setQ] = useState(''); // ← search box state

  // refresh auth state on route change
  useEffect(() => { setUser(getUser()); }, [location.pathname]);

  // sync across tabs
  useEffect(() => {
    const onStorage = (e) => { if (e.key === 'user') setUser(getUser()); };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  // submit search -> /search?q=...
  const onSearch = (e) => {
    e.preventDefault();
    const term = q.trim();
    if (!term) return;
    navigate(`/search?q=${encodeURIComponent(term)}&query=${encodeURIComponent(term)}`); // supports both q/query
    setQ('');
  };

  const linkBase = 'px-4 py-2 rounded-lg font-semibold transition hover:opacity-90';

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur bg-black/30 border-b border-white/10">
      <div className="mx-auto max-w-6xl px-4 h-16 flex items-center gap-3">
        {/* Brand */}
        <Link to="/" className="text-xl font-bold text-indigo-200">🎬 MovieApp</Link>

        {/* Left links */}
        <div className="hidden sm:flex items-center gap-2">
          <NavLink
            to="/"
            className={({ isActive }) => `${linkBase} ${isActive ? 'bg-white/20 text-white' : 'text-white/80'}`}
          >
            Home
          </NavLink>
        </div>

        {/* 🔎 CENTER: Search box */}
        <form onSubmit={onSearch} className="flex-1 mx-2">
          <div className="relative max-w-xl mx-auto">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search movies…"
              className="w-full bg-white/15 text-white placeholder-white/60 rounded-lg pl-10 pr-24 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            {/* icon */}
            <svg className="absolute left-3 top-2.5 h-5 w-5 opacity-70" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="11" cy="11" r="7" strokeWidth="2"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65" strokeWidth="2"></line>
            </svg>
            {/* button */}
            <button
              type="submit"
              className="absolute right-1 top-1 bottom-1 px-3 rounded-md bg-indigo-500 hover:bg-indigo-600 text-white font-semibold"
            >
              Search
            </button>
          </div>
        </form>

        {/* Right: auth-aware */}
        <div className="flex items-center gap-2">
          {user ? (
            <>
              <NavLink
                to="/mypage"
                className={({ isActive }) => `${linkBase} ${isActive ? 'bg-indigo-600 text-white' : 'bg-indigo-500 text-white'}`}
              >
                My Page
              </NavLink>
              <button onClick={logout} className={`${linkBase} bg-gray-600 text-white`} title={`Logout ${user.name || ''}`}>
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/signup"
                className={({ isActive }) => `${linkBase} ${isActive ? 'bg-indigo-600 text-white' : 'bg-indigo-500 text-white'}`}
              >
                Sign Up
              </NavLink>
              <NavLink
                to="/login"
                className={({ isActive }) => `${linkBase} ${isActive ? 'bg-white/20 text-white' : 'text-white/80 border border-white/20'}`}
              >
                Log In
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

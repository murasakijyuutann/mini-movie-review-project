import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Signup from './components/Signup';
import Login from './components/Login';
import SearchResult from './components/SearchResult';
import MovieDetail from './components/MovieDetail';
import HomePage from './components/HomePage'; // ✅ NEWLY CREATED HOMEPAGE
import { Outlet } from 'react-router-dom'; // ✅ Optional, if you keep Layout here

function Layout() {
  return (
    <>
      <NavBar />
      <div className="pt-24 p-8">
        <Outlet />
      </div>
    </>
  );
}

export default function App() {
  return (
    <div className="relative min-h-screen text-white overflow-hidden bg-gradient-to-br from-gray-900 via-indigo-900 to-black">
      <Routes>
        {/* ✅ All routes under Layout get NavBar and padding */}
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="movie/:id" element={<MovieDetail />} />
          <Route path="search" element={<SearchResult />} />
          <Route path="*" element={<div className="text-center text-white">404 - Not Found</div>} />

        </Route>

        {/* ✅ Standalone routes */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

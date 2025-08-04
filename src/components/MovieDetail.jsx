import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function MovieDetail() {
  const { id } = useParams(); // ✅ Extracts movie ID from URL
  const [movie, setMovie] = useState(null); // ✅ State to hold API result

  const apiKey = import.meta.env.VITE_TMDB_API_KEY; // ✅ ADDED: get API key from .env

  useEffect(() => {
    // ✅ CHANGED: fetch movie detail by ID from TMDb API
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`)
      .then(res => res.json())
      .then(data => setMovie(data)) // ✅ store result in state
      .catch(err => console.error(err));
  }, [id, apiKey]); // ✅ FIXED: added apiKey to dependency array

  if (!movie) return <div className="text-white p-4">Loading...</div>; // ✅ Handles loading state

  const { title, poster_path, genres, vote_average, overview } = movie; // ✅ Destructure movie object

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-black text-white p-8 grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
      <img
        src={`https://image.tmdb.org/t/p/w500${poster_path}`}
        alt={title}
        className="w-full max-w-md mx-auto rounded-lg shadow-2xl ring-2 ring-indigo-400/50 transition-transform hover:scale-105 duration-300"
      />
      <div className="max-w-xl mx-auto space-y-6">
        <div className="text-4xl font-extrabold tracking-wide text-indigo-300 drop-shadow-[0_1px_5px_rgba(99,102,241,0.8)]">
          {title}
        </div>
        <div className="text-indigo-100 text-sm tracking-wide uppercase">
          {genres.map((g) => g.name).join(' • ')} {/* ✅ Safely render genres */}
        </div>
        <p className="text-yellow-300 font-semibold text-lg">
          ⭐ {vote_average} / 10
        </p>
        <p className="text-gray-200 leading-relaxed border-l-4 border-indigo-500 pl-4 italic">
          {overview}
        </p>
      </div>
    </div>
  );
}

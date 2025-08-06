import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';


export default function MovieDetail() {
  const { id } = useParams();
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;

  const [movie, setMovie] = useState(null);
  
  const [nickname, setNickname] = useState('');       // ✅ ADDED
  const [password, setPassword] = useState('');       // ✅ ADDED
  const [review, setReview] = useState('');           // ✅ ADDED
  const [reviews, setReviews] = useState([]);         // ✅ ADDED
  const [notFound, setNotFound] = useState(false); // ✅ ADDED

  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
          params: {
            api_key: apiKey,
            language: 'ja-JP',
          },
        });

        setMovie(response.data);
        setNotFound(false);

      } catch (error) {
        console.error("Movie not found or other error:", error);
        setNotFound(true); // ✅ Show fallback message
      }
    };

    fetchMovieDetail();
  }, [id, apiKey]);

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!nickname.trim() || !password.trim() || !review.trim()) {
      alert("Please fill in all fields!");
      return;
    }

    const newReview = {
      nickname,                             // ✅ ADDED
      password,                             // ✅ ADDED (not shown)
      text: review,
      timestamp: new Date().toLocaleString() // ✅ ADDED
    };

    setReviews([newReview, ...reviews]);    // ✅ ADDED
    setNickname('');
    setPassword('');
    setReview('');
  };

  const handleDeleteReview = (timestampToDelete) => { // ✅ ADDED
    const updated = reviews.filter(r => r.timestamp !== timestampToDelete);
    setReviews(updated);
  };

  if (notFound) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-indigo-900 to-black text-white p-8 space-y-10 text-xl">
        🎬 Movie with that ID does not exist.
      </div>
    );
  }
  
  if (!movie) return <div className="text-white p-4">Loading...</div>;

  const { title, poster_path, genres, vote_average, overview } = movie;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-black text-white p-8 space-y-10">
      {/* Movie Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
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
            {genres.map((g) => g.name).join(' • ')}
          </div>
          <p className="text-yellow-300 font-semibold text-lg">
            ⭐ {vote_average} / 10
          </p>
          <p className="text-gray-200 leading-relaxed border-l-4 border-indigo-500 pl-4 italic">
            {overview}
          </p>
        </div>
      </div>

     {/* ✅ Review Form Section (layout restored) */}
<div className="bg-white/5 rounded-xl p-6 border border-indigo-500/30 shadow-xl">
  <h3 className="text-2xl font-bold text-indigo-300 mb-6 flex items-center gap-2">
    📝 리뷰 작성
  </h3>

  <form onSubmit={handleReviewSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
    {/* 🔹 Left side: nickname/password stacked */}
    <div className="space-y-4">
      <input
        type="text"
        placeholder="Nickname"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        className="w-full p-3 rounded bg-indigo-500/10 placeholder-indigo-200 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-3 rounded bg-indigo-500/10 placeholder-indigo-200 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />
    </div>

    {/* 🔹 Right side: textarea spans right side */}
    <textarea
      value={review}
      onChange={(e) => setReview(e.target.value)}
      placeholder="Share your thoughts about this movie"
      className="w-full md:col-span-2 p-4 rounded bg-indigo-500/10 placeholder-indigo-200 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 min-h-[140px]"
    />

    {/* 🔹 Bottom-right: Submit button */}
    <div className="md:col-start-3 flex justify-end">
      <button
        type="submit"
        className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold transition"
      >
        Submit
      </button>
    </div>
  </form>
</div>


      {/* ✅ Submitted Reviews Section */}
      <div className="bg-white/5 rounded-xl p-6 border border-indigo-500/30">
        <h3 className="text-2xl font-bold text-indigo-300 mb-4 flex items-center gap-2">
          📜 Submitted Reviews
        </h3>
        {reviews.length > 0 ? (
          <ul className="space-y-4">
            {reviews.map((r) => (
              <li key={r.timestamp} className="bg-white/10 p-4 rounded flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-indigo-200">{r.nickname}</span>
                  <button
                    onClick={() => handleDeleteReview(r.timestamp)}
                    className="text-red-400 hover:text-red-300 text-sm"
                  >
                    ❌ Delete
                  </button>
                </div>
                <p className="text-white italic">{r.text}</p>
                <span className="text-xs text-indigo-400">{r.timestamp}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400 italic">No reviews yet. Be the first to write one!</p>
        )}
      </div>
    </div>
  );
}

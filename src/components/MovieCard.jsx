import { Link } from 'react-router-dom';

export default function MovieCard({ id, title, posterPath, vote_count, vote_average }) {
  return (
    <Link to={`/movie/${id}`} className="block">
      <div className="bg-white p-4 rounded shadow hover:shadow-lg transition">
        <img
          src={`https://image.tmdb.org/t/p/w500${posterPath}`}
          alt={title}
          className="w-full h-60 object-cover rounded"
        />
        <h2 className="mt-2 text-lg font-semibold">{title}</h2>
        
        {/* 👍 for vote count */}
        <p className="text-gray-600">👍 {vote_count.toLocaleString()} ⭐ {vote_average}</p>
        
      </div>
    </Link>
  );
}

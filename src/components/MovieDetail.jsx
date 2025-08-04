import movie from '../const/data/movieDetailData.json';

export default function MovieDetail() {
  const { title, poster_path, genres, vote_average, overview } = movie;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-black text-white p-8 grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
      {/* Poster */}
      <img
        src={`https://image.tmdb.org/t/p/w500${poster_path}`}
        alt={title}
        className="w-full max-w-md mx-auto rounded-lg shadow-2xl ring-2 ring-indigo-400/50 transition-transform hover:scale-105 duration-300"
      />

      {/* Details */}
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
  );
}

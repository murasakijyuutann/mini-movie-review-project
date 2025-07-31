import movie from '../const/data/movieDetailData.json'; // ✅ Use single object

export default function MovieDetail() {
  // ✅ Destructure directly from the single movie object
  const { title, poster_path, genres, vote_average, overview } = movie;

  return (
    <div className="min-h-screen bg-gray-50 p-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
      {/* Poster */}
      <img
        src={`https://image.tmdb.org/t/p/w500${poster_path}`}
        alt={title}
        className="w-full max-w-md mx-auto rounded shadow-lg"
      />

      {/* Details */}
      <div className="max-w-xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">{title}</h1>

        <p className="mb-2 text-gray-700">
          <span className="font-semibold">Genres:</span>{' '}
          {genres.map((g) => g.name).join(', ')}
        </p>

        <p className="mb-4 text-gray-700">
          <span className="font-semibold">Rating:</span> ⭐ {vote_average}
        </p>

        <p className="text-gray-800 leading-relaxed">{overview}</p>
      </div>
    </div>
  );
}

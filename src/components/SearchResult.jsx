import { useEffect, useState, useRef, useCallback } from 'react';
import { useSearchParams, Link } from 'react-router-dom'; // ✅ CHANGED: useSearchParams instead of useLocation
import axios from 'axios';

export default function SearchResult() {
  const [searchParams] = useSearchParams(); // ✅ ADDED
  const query = searchParams.get('q') || ''; // ✅ ADDED
  const [showButton, setShowButton] = useState(false);
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const apiKey = import.meta.env.VITE_TMDB_API_KEY;
  const observer = useRef(null);

  const lastMovieRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  // ✅ ADDED: Reset results when query changes
  useEffect(() => {
    setResults([]);
    setPage(1);
    setHasMore(true);
  }, [query]);

  // 🔍 Fetch results
  useEffect(() => {
    if (!query) return;

    setLoading(true);
    axios
      .get('https://api.themoviedb.org/3/search/movie', {
        params: {
          api_key: apiKey,
          query,
          page,
        },
      })
      .then((res) => {
        const data = res.data;
        setResults((prev) => (page === 1 ? data.results : [...prev, ...data.results]));
        setHasMore(data.page < data.total_pages);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch data:', err);
        setLoading(false);
      });
  }, [query, page, apiKey]);

 useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };


  return (
    <div className="relative min-h-screen text-white overflow-hidden bg-gradient-to-br from-gray-900 via-indigo-900 to-black p-6 pt-28">
      <h2 className="text-2xl font-bold mb-4">🔍 Results for: {query}</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {results.map((movie, index) => {
          const isLast = index === results.length - 1;
          return (
            <Link
              to={`/movie/${movie.id}`}
              key={movie.id}
              ref={isLast ? lastMovieRef : null}
              className={`bg-gradient-to-br from-amber-100 via-amber-200 to-rose-200
                      p-4 rounded-xl shadow-md border border-amber-300/40
                      transition-all duration-300 hover:scale-[1.04]
                      hover:ring-2 hover:ring-rose-400/40 hover:ring-offset-1
                      hover:shadow-[0_0_20px_4px_rgba(251,113,133,0.3)]
                      hover:animate-shimmer text-black`}
            >
              <img
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                alt={movie.title}
                className="rounded mb-2 w-full"
              />
              <h3 className="text-lg font-semibold">{movie.title}</h3>
            </Link>
          );
        })}
      </div>

      {loading && <p className="text-center mt-4 text-indigo-300">Loading more...</p>}

      {showButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full shadow-lg transition-opacity duration-300"
        >
          ↑ Top
        </button>
      )}
    </div>
  );
}

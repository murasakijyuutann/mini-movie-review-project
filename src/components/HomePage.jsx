import { useState, useEffect, useRef, useCallback } from 'react';

import MovieCard from "./MovieCard";
import axios from 'axios';

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const observer = useRef();
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://api.themoviedb.org/3/movie/popular', {
          params: {
            api_key: apiKey,
            language: 'ja-JP',
            page: page,
          },
        });

        setMovies((prev) => [...prev, ...response.data.results]);
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [page, apiKey]);

  const lastMovieRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPage((prev) => prev + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading]
  );

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
    <>
      <h1 className="text-4xl font-[Georgia,_serif] text-center text-indigo-300 mb-10 tracking-widest drop-shadow-[0_2px_6px_rgba(99,102,241,0.6)]">
        Movie Explorer
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.map((movie, index) => {
          if (index === movies.length - 1) {
            return (
              <div ref={lastMovieRef} key={movie.id}>
                <MovieCard
                  id={movie.id}
                  original_title={movie.original_title}
                  posterPath={movie.poster_path}
                  vote_average={movie.vote_average}
                  vote_count={movie.vote_count}
                />
              </div>
            );
          } else {
            return (
              <MovieCard
                key={movie.id}
                id={movie.id}
                original_title={movie.original_title}
                posterPath={movie.poster_path}
                vote_average={movie.vote_average}
                vote_count={movie.vote_count}
              />
            );
          }
        })}
      </div>

      {loading && (
        <div className="text-center text-indigo-400 mt-10">Loading more movies...</div>
      )}

      {showButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full shadow-lg transition-opacity duration-300"
        >
          ↑ Top
        </button>
      )}
    </>
  );
}

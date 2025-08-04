import { useEffect, useState } from 'react'; // 🔹 ADDED: for state and fetching
import { Routes, Route } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import './index.css';
import MovieCard from './components/MovieCard';
import MovieDetail from './components/MovieDetail';
import NavBar from './components/NavBar';
import Signup from './components/Signup';
import Login from './components/Login';

// import rawMovieData from './const/data/movieListData.json'; ❌ REMOVED: static data

export default function App() {
  const [movies, setMovies] = useState([]); // 🔹 ADDED: state for API data
  const apiKey = import.meta.env.VITE_TMDB_API_KEY; // 🔹 ADDED: from .env

  useEffect(() => {
    // 🔹 ADDED: fetch movies from TMDb API
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`)
      .then((res) => res.json())
      .then((data) => setMovies(data.results))
      .catch((err) => console.error("Error fetching movies:", err));
  }, [apiKey]); // 🔹 FIXED: added apiKey to dependencies

  return (
    <div className="relative min-h-screen text-white overflow-hidden bg-gradient-to-br from-gray-900 via-indigo-900 to-black">
      <NavBar /> {/* ✅ Inserted NavBar */}
      <div className="pt-24 p-8">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <h1 className="text-4xl font-[Georgia,_serif] text-center text-indigo-300 mb-10 tracking-widest drop-shadow-[0_2px_6px_rgba(99,102,241,0.6)]">
                  Movie Explorer
                </h1>

                <Swiper
                  spaceBetween={24}
                  slidesPerView={4}
                  navigation
                  loop={true}
                  autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                  }}
                  speed={3000}
                  modules={[Navigation, Autoplay]}
                  breakpoints={{
                    640: { slidesPerView: 2 },
                    768: { slidesPerView: 3 },
                    1024: { slidesPerView: 4 },
                  }}
                >
                  {movies.map((movie) => ( // 🔹 CHANGED: from rawMovieData to movies (API data)
                    <SwiperSlide key={movie.id}>
                      <MovieCard
                        id={movie.id}
                        original_title={movie.original_title}
                        posterPath={movie.poster_path}
                        vote_average={movie.vote_average}
                        vote_count={movie.vote_count}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </>
            }
          />
          <Route path="/movie/:id" element={<MovieDetail />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </div>
  );
}

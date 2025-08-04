import { Routes, Route } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules'; // ✅ Import Autoplay
import 'swiper/css';
import 'swiper/css/navigation';
import './index.css';

import rawMovieData from './const/data/movieListData.json';
import MovieCard from './components/MovieCard';
import MovieDetail from './components/MovieDetail';

function App() {
  return (
    <div className="relative min-h-screen text-white overflow-hidden bg-gradient-to-br from-gray-900 via-indigo-900 to-black">
      <div className="p-8">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <h1 className="text-4xl font-[Georgia,_serif] text-center text-indigo-300 mb-10 tracking-widest drop-shadow-[0_2px_6px_rgba(99,102,241,0.6)]">
                  🌌 Movie Explorer
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
                  {rawMovieData.results.map((movie) => (
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
        </Routes>
      </div>
    </div>
  );
}

export default App;

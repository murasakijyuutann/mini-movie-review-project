// 🧩 Add these imports at the top of App.jsx
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { Routes, Route } from 'react-router-dom'; // 🔹 NEW
import './index.css';
import rawMovieData from './const/data/movieListData.json';
import MovieCard from './components/MovieCard';
import MovieDetail from './components/MovieDetail'; // 🔹 NEW

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <Routes>
        {/* 🔹 Movie list route */}
        <Route
          path="/"
          element={
            <>
              <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
                🎬 Movie Review Site
              </h1>

              {/* 🔹 Replace grid with Swiper */}
              <Swiper
                spaceBetween={20}
                slidesPerView={1}
                navigation
                modules={[Navigation]}
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
                      title={movie.title}
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

        {/* 🔹 Movie detail route */}
        <Route path="/movie/:id" element={<MovieDetail />} />
      </Routes>
    </div>
  );
}

export default App;

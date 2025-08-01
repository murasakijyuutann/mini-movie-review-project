// import movieListData from './const/data/movieListData.json';
import MovieCard from './components/MovieCard';
// import { useState } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import MovieDetail from './components/MovieDetail';

function App() {
  // const [movie, setMovie] = useState([]);

  //* movieListData.results.map((item) >> .json파일은 현재 객체, 그 안에서 results만 배열 데이터.
  //* 현재 상태에서 .results.map을 통해 배열만 뽑아내서 가능, 단 추후 page 분할 등에서 관리를 통해 useState가 편함
  return (
    <BrowserRouter>
      <div>
        <header className="flex justify-start bg-indigo-900 text-white font-bold items-center h-20">
          <p className="m-1 p-1 text-lg">GIGABOX</p>
        </header>
        <Routes>
          <Route path="/" element={<MovieCard />} />
          <Route path="/MovieDetail/" element={<MovieDetail />} />
          {/* <Route path="/MovieDetail/:id" element={<MovieDetail />} /> */}
        </Routes>
        <footer className="flex justify-start bg-indigo-900  text-white font-bold items-center h-10">
          <p className="m-1 p-1 text-lg">㉿ GIGABOX</p>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;

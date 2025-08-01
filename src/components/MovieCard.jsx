// import { useState } from 'react';
import App from '../App.jsx';
import movieListData from '../const/data/movieListData.json';
// import Modal from './modal.jsx';
import MovieDetail from './MovieDetail.jsx';
import { Link } from 'react-router-dom';

const MovieCard = () => {
  // const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div>
        <p className="flex text-blue-900 text-[40px] font-bold justify-center items-center p-5">
          🎥 상영중인 영화
        </p>
      </div>
      <div className="m-1 p-1 flex justify-end">
        🔍 <input className="m-1 p-1 rounded border" placeholder="검색"></input>
      </div>
      <div className="flex justify-center items-center">
        <div className="rounded-2xl bg-cyan-100 grid grid-cols-4 m-1 p-1 gap-2">
          {movieListData.results.map((item) => (
            <div key={item.id} className="flex flex-col m-1 p-1">
              <div className="flex justify-center p-1">
                <img
                  className="border rounded mb-2 object-cover w-full max-w-[1000px] max-h-[500px]"
                  src={`https://image.tmdb.org/t/p/original/${item.poster_path}`}
                  alt="포스터"
                />
              </div>
              <div className="border rounded bg-white flex font-bold mb-2">
                <p className="font-bold text-start m-1 p-1 pt-3px">
                  🎥 {item.title}
                </p>
                <button className="cursor-pointer">👍</button>
                <p className="p-2 m-2">{item.vote_count}</p>
              </div>
              <div className="border rounded  bg-white font-bold flex justify-around items-center p-2 mb-2 gap-20">
                <p className="text-start">개봉일 : {item.release_date}</p>
                <div>
                  <Link to="/MovieDetail/">
                    <button className="cursor-pointer max-w-[90px] mb-2 w-full bg-amber-50 border rounded">
                      상세보기
                    </button>
                  </Link>
                  <button className="cursor-pointer max-w-[90px] w-full bg-amber-50 border rounded">
                    예매하기
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;

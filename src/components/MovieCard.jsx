import App from '../App.jsx';
import movieListData from '../const/data/movieListData.json';

const MovieCard = () => {
  return (
    <div>
      <div>
        <p className="flex text-9x1 font-bold justify-center items-center p-5">
          🎥 상영중인 영화
        </p>
      </div>
      <div className="m-1 p-1 flex justify-end">
        🔍 <input className="m-1 p-1 rounded border" placeholder="검색"></input>
      </div>
      <div className="flex justify-center items-center">
        <div className="grid grid-cols-4 m-1 p-1 gap-2">
          {movieListData.results.map((item) => (
            <div key={item.id} className="flex flex-col m-1 p-1">
              <p className="flex justify-center p-1">
                <img
                  className="object-cover w-full max-h-[400px]"
                  src={`https://image.tmdb.org/t/p/original/${item.poster_path}`}
                  alt="포스터"
                />
              </p>
              <p className="font-bold text-start m-2 p-2">🎥 {item.title}</p>
              <p className="text-start p-1">개봉일 : {item.release_date}</p>
              <div className="flex justify-between font-bold gap-2 m-2 p-2">
                <button className="cursor-pointer">👍</button>
                {item.vote_count}
                <button className="cursor-pointer border w-full rounded">
                  예매하기
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;

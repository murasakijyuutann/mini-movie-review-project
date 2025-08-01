import React from 'react';
import MovieDetailData from '../const/data/MovieDetailData.json';
// import { useParams } from 'react-router-dom';

const MovieDetail = () => {
  // alert(JSON.stringify(MovieDetailData));
  // console.log(MovieDetailData['id']);

  //* json > {} 객체 형태
  //* 객체를 구조분해 할당해서 필요한 데이터 값만 추출
  const { title, poster_path, overview, vote_average, tagline } =
    MovieDetailData;

  return (
    <div className="flex gap-3">
      <div>
        <img
          className="border w-full m-1 rounded object-cover max-h-[px]"
          src={`https://image.tmdb.org/t/p/original/${poster_path}`}
          alt="포스터"
        />
      </div>
      <div className="bg-sky-50 rounded flex flex-col p-2 m-1">
        <div className="font-bold text-[40px] mb-2 p-2">{title}</div>
        <div className="rounded font-bold bg-amber-100 mb-2 p-2 w-100">
          "{tagline}"
        </div>
        <div className="rounded font-bold bg-amber-100 w-80 mb-2 p-2">
          ⭐{vote_average}/ 10
        </div>
        <div className="rounded font-bold bg-amber-100 w-80 flex gap-1 p-2 mb-1">
          장르:{' '}
          {MovieDetailData.genres.map((item) => (
            <div className="text-violet-500">{item.name}</div>
          ))}
        </div>
        <div className=" rounded bg-amber-100 p-2">{overview}</div>
      </div>
    </div>
  );
};

export default MovieDetail;

//! Filter 사용해서 Movie 상세보기

import React from 'react';
import MovieDetailData from '../const/data/MovieDetailData.json';
import { useParams } from 'react-router-dom';

const MovieDetail = () => {
  // alert(JSON.stringify(MovieDetailData));
  // console.log(MovieDetailData['id']);

  const { id } = useParams();
  console.log(id);

  let data = MovieDetailData.find(
    (item) => String(item.belongs_to_collection.id) === String(id)
  );
  if (!data) data = MovieDetailData[0];

  return (
    <div className="flex gap-3">
      <div>
        <img
          className="w-full m-1 border rounded object-cover max-h-[px]"
          src={`https://image.tmdb.org/t/p/original/${data.poster_path}`}
          alt="포스터"
        />
      </div>
      <div className="m-1">
        <div className="border mb-2 p-2">{data.title}</div>
        <div className="border mb-2 p-2">genres</div>
        <div className="border p-2">{data.overview}</div>
      </div>
    </div>
  );
};

export default MovieDetail;

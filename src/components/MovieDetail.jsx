import React from 'react';
import MovieDetailData from '../const/data/MovieDetailData.json';

const MovieDetail = () => {
  return (
    <div>
      <div>
        {MovieDetailData.results.map((item) => (
          <div key={item.id}>
            <p>{item.name}</p>
            <p>{item.poster_path}</p>
            <p>{item.backdrop_path}</p>
            <p>시놉시스 : {item.overview}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieDetail;

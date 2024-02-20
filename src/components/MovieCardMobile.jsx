import React from 'react';
import PropTypes from 'prop-types';

import style from '../css_modules/CardInfo.module.css';

import { MovieCardImg } from './MovieCard/MovieCardImg';
import { MovieInfo } from './MovieCard/MovieInfo';
import { OtherInfo } from './MovieCard/MovieOtherInfo';

const SMALL_IMAGE_URL = 'https://image.tmdb.org/t/p/w92';

export const MovieCardMobile = ({ movie, rateChange }) => {
  const { id, title, poster_path: poster, release_date: date, genre_ids, vote_average: vote } = movie;

  return (
    <li className={style.movie__card}>
      <div
        style={{
          display: 'flex',
          width: '100%',
          justifyContent: 'space-between',
        }}
      >
        <MovieCardImg src={SMALL_IMAGE_URL} poster={poster} title={title} />
        <MovieInfo id={id} title={title} date={date} genre_ids={genre_ids} vote={vote} />
        <span
          className={style.rate}
          style={{
            borderColor: `${typeof vote === 'number' ? (vote > 7 ? '#66E900' : vote > 5 ? '#E9D100' : vote > 3 ? '#E97E00' : '#E90000') : null}`,
          }}
        >
          {vote && vote.toFixed(1)}
        </span>
      </div>
      <OtherInfo movie={movie} rateChange={rateChange} />
    </li>
  );
};

MovieCardMobile.propTypes = {
  movie: PropTypes.object,
  rateChange: PropTypes.func,
};

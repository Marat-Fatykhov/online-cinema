import React from 'react';
import PropTypes from 'prop-types';

import style from '../../css_modules/CardInfo.module.css';
import { genres, mounth } from '../../data';

export const MovieInfo = ({ title, date, genre_ids }) => {
  let genreData = {};

  genres.forEach((genre) => (genreData[genre.id] = genre.name));

  const getDate = () => {
    date = date.split('-');
    let [y, m, d] = date;
    d = d.split('');
    d = d[0] === '0' ? d[1] : d.join('');
    return `${mounth[m]} ${d}, ${y}`;
  };

  return (
    <div className={style.card__info}>
      <h5>{title}</h5>
      <p style={{ color: 'rgba(130, 126, 126, 1)' }}>{date.length > 0 ? getDate() : 'Дата неизвестна'}</p>
      {
        <span style={{ width: 210 }}>
          {genre_ids.map((id) => (
            <span className={style.genre} key={id}>
              {id ? genreData[id] : 'Неизвестный жанр'}
            </span>
          ))}
        </span>
      }
    </div>
  );
};

MovieInfo.propTypes = {
  date: PropTypes.array,
  title: PropTypes.string,
  genre_ids: PropTypes.array,
};

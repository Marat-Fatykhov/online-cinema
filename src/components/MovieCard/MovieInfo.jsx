import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import style from '../../css_modules/CardInfo.module.css';
import { mounth } from '../../data';
import { Context } from '../../context';

export const MovieInfo = ({ title, date, genre_ids }) => {
  const { genres } = useContext(Context);

  const genresData = {};

  genres.forEach((genre) => (genresData[genre.id] = genre.name));

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
              {id ? genresData[id] : 'Неизвестный жанр'}
            </span>
          ))}
        </span>
      }
    </div>
  );
};

MovieInfo.propTypes = {
  date: PropTypes.string,
  title: PropTypes.string,
  genre_ids: PropTypes.array,
};

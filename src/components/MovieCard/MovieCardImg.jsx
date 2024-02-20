import React from 'react';
import PropTypes from 'prop-types';

import style from '../../css_modules/CardInfo.module.css';

const DEFAULT_POSTER = 'https://afisha.yakutia.ru/storage/noposter.jpg';

export const MovieCardImg = ({ poster, src, title }) => {
  return <img className={style.image} src={poster ? `${src}${poster}` : DEFAULT_POSTER} alt={title} />;
};

MovieCardImg.propTypes = {
  poster: PropTypes.string,
  src: PropTypes.string,
  title: PropTypes.string,
};

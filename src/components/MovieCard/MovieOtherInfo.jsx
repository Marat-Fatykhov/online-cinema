import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Rate } from 'antd';

import { Context } from '../../context';
import style from '../../css_modules/CardInfo.module.css';

export const OtherInfo = ({ movie }) => {
  const { handleRateChange } = useContext(Context);

  const { overview, id, rating } = movie;
  return (
    <>
      <p className={style.overview}>{overview ? overview : 'Здесь должно было быть описание'}</p>
      <Rate
        allowHalf
        count={10}
        className={style.rate__stars}
        defaultValue={rating}
        onChange={(value) => handleRateChange(value, id)}
      />
    </>
  );
};

OtherInfo.propTypes = {
  movie: PropTypes.object,
};

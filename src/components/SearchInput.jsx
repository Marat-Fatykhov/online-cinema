import React from 'react';
import PropTypes from 'prop-types';

import style from '../App.module.css';

const InputSearch = ({ onChange, onClick }) => {
  const handleChange = (event) => {
    onChange(event.target.value);
  };

  return (
    <input type="text" className={style.input_1} onFocus={onClick} onKeyUp={handleChange} placeholder="Type to search..." />
  );
};

export default InputSearch;

InputSearch.propTypes = {
  onChange: PropTypes.func,
  onClick: PropTypes.func,
};

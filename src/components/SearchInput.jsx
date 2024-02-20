import React from 'react';
import PropTypes from 'prop-types';

const InputSearch = ({ onChange, onClick }) => {
  const handleChange = (event) => {
    onChange(event.target.value);
  };

  return (
    <input type="text" className="input_1" onFocus={onClick} onKeyUp={handleChange} placeholder="Type to search..." />
  );
};

export default InputSearch;

InputSearch.propTypes = {
  onChange: PropTypes.func,
  onClick: PropTypes.func,
};

import PropTypes from 'prop-types';
import React from 'react';
import { InputField } from '../../../../../components/atoms';

const SearchPeopleInput = ({ search, setSearch }) => {
  const handleChange = (e) => {
    setSearch(e.target.value.toLowerCase());
  };
  const handleClick = (e) => {
    e.stopPropagation();
  };

  return (
    <InputField
      autoFocus
      innerPaddingLeft="6px"
      noBorder
      placeholder="Search people"
      variant="outlined"
      type="text"
      padding="3px 16px 3px 8px"
      name="search"
      value={search}
      onChange={handleChange}
      onClick={handleClick}
    />
  );
};

SearchPeopleInput.propTypes = {
  setSearch: PropTypes.func.isRequired,
  search: PropTypes.string.isRequired,
};

export default SearchPeopleInput;

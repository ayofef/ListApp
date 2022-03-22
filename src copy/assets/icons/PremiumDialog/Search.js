import PropTypes from 'prop-types';
import React from 'react';

const Search = ({ fill }) => {
  return (
    <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.5 11C8.98528 11 11 8.98528 11 6.5C11 4.01472 8.98528 2 6.5 2C4.01472 2 2 4.01472 2 6.5C2 8.98528 4.01472 11 6.5 11ZM6.5 13C10.0899 13 13 10.0899 13 6.5C13 2.91015 10.0899 0 6.5 0C2.91015 0 0 2.91015 0 6.5C0 10.0899 2.91015 13 6.5 13Z"
        fill={fill}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.0001 16C15.6096 16.3905 14.9764 16.3905 14.5859 16L10.0001 11.4142C9.60955 11.0236 9.60955 10.3905 10.0001 9.99995C10.3906 9.60943 11.0238 9.60943 11.4143 9.99995L16.0001 14.5857C16.3906 14.9763 16.3906 15.6094 16.0001 16Z"
        fill={fill}
      />
    </svg>
  );
};

Search.propTypes = {
  fill: PropTypes.string,
};

Search.defaultProps = {
  fill: '#545A61',
};

export default Search;

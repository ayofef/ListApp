import React from 'react';
import { string } from 'prop-types';

const Flows = ({ fill }) => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9ZM7 12C7 9.23858 9.23858 7 12 7C14.7614 7 17 9.23858 17 12C17 14.7614 14.7614 17 12 17C9.23858 17 7 14.7614 7 12Z"
        fill={fill}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.0500183 12C0.0500183 11.4477 0.497734 11 1.05002 11H7.00002C7.5523 11 8.00002 11.4477 8.00002 12C8.00002 12.5523 7.5523 13 7.00002 13H1.05002C0.497734 13 0.0500183 12.5523 0.0500183 12Z"
        fill={fill}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.01 12C16.01 11.4477 16.4577 11 17.01 11H22.96C23.5123 11 23.96 11.4477 23.96 12C23.96 12.5523 23.5123 13 22.96 13H17.01C16.4577 13 16.01 12.5523 16.01 12Z"
        fill={fill}
      />
    </svg>
  );
};

Flows.propTypes = {
  fill: string,
};

Flows.defaultProps = {
  fill: '#787F88',
};

export default Flows;

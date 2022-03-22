import React from 'react';
import PropTypes from 'prop-types';

const Emails = ({ stroke, ...props }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M2.5 7.43381V7.71691L2.74275 7.86256L11.7428 13.2625L12 13.4169L12.2572 13.2625L21.2572 7.86256L21.5 7.71691V7.43381V6C21.5 5.17158 20.8284 4.5 20 4.5H4C3.17158 4.5 2.5 5.17158 2.5 6V7.43381ZM21.5 9.76619V8.88309L20.7428 9.33744L12.7718 14.12C12.2967 14.4051 11.7033 14.4051 11.2282 14.12L3.25725 9.33744L2.5 8.88309V9.76619V18C2.5 18.8284 3.17158 19.5 4 19.5H20C20.8284 19.5 21.5 18.8284 21.5 18V9.76619ZM1.5 6C1.5 4.61929 2.61929 3.5 4 3.5H20C21.3808 3.5 22.5 4.61929 22.5 6V18C22.5 19.3808 21.3808 20.5 20 20.5H4C2.61929 20.5 1.5 19.3808 1.5 18V6Z"
      fill="#787F88"
      stroke="#4E40EF"
    />
  </svg>
);

Emails.propTypes = {
  stroke: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
Emails.defaultProps = {
  stroke: '#4E40EF',
};

export default Emails;

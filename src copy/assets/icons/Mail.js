import React from 'react';
import PropTypes from 'prop-types';

const Mail = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M1.2 5.1998C1.2 3.87432 2.27452 2.7998 3.6 2.7998H16.4C17.7255 2.7998 18.8 3.87432 18.8 5.1998V14.7998C18.8 16.1253 17.7255 17.1998 16.4 17.1998H3.6C2.27452 17.1998 1.2 16.1253 1.2 14.7998V5.1998ZM3.6 4.3998C3.15817 4.3998 2.8 4.75798 2.8 5.1998V6.34685L10 10.6668L17.2 6.34685V5.1998C17.2 4.75798 16.8418 4.3998 16.4 4.3998H3.6ZM17.2 8.21276L10.8232 12.0388C10.3165 12.3428 9.68352 12.3428 9.1768 12.0388L2.8 8.21276V14.7998C2.8 15.2416 3.15817 15.5998 3.6 15.5998H16.4C16.8418 15.5998 17.2 15.2416 17.2 14.7998V8.21276Z"
      fill="white"
    />
  </svg>
);

Mail.propTypes = {
  size: PropTypes.number,
};

Mail.defaultProps = {
  size: 20,
};

export default Mail;

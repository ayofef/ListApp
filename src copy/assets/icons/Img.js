import PropTypes from 'prop-types';
import React from 'react';

const Img = ({ fill }) => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18 16C18.3466 16 18.6684 15.8205 18.8506 15.5257C19.0329 15.2309 19.0494 14.8628 18.8944 14.5528L14.8944 6.55279C14.725 6.214 14.3788 6 14 6C13.6212 6 13.275 6.214 13.1056 6.55279L11 10.7639L9.89442 8.55279C9.72503 8.214 9.37877 8 9 8C8.62122 8 8.27496 8.214 8.10557 8.55279L5.10557 14.5528C4.95058 14.8628 4.96714 15.2309 5.14935 15.5257C5.33156 15.8205 5.65342 16 6 16H18ZM11.8989 13.4382L14 9.23607L16.382 14H11.618L11.8892 13.4576C11.8925 13.4512 11.8958 13.4447 11.8989 13.4382ZM9.88196 13L9 11.2361L7.61803 14H9.38196L9.88196 13Z"
        fill={fill}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1 4C1 2.34315 2.34315 1 4 1H20C21.6569 1 23 2.34315 23 4V20C23 21.6569 21.6569 23 20 23H4C2.34315 23 1 21.6569 1 20V4ZM4 3C3.44772 3 3 3.44772 3 4V20C3 20.5523 3.44772 21 4 21H20C20.5523 21 21 20.5523 21 20V4C21 3.44772 20.5523 3 20 3H4Z"
        fill={fill}
      />
    </svg>
  );
};

Img.propTypes = {
  fill: PropTypes.string,
};
Img.defaultProps = {
  fill: '#C1C3C6',
};

export default Img;

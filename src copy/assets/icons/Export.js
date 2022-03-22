import PropTypes from 'prop-types';
import React from 'react';

const Export = ({ size }) => {
  return (
    <svg width={size} height={size} className="path" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M19.3711 10.2219V17.2495C19.3711 18.2175 18.586 18.995 17.6256 18.995H6.64976C5.68937 18.995 4.9043 18.2175 4.9043 17.2495V10.2219"
        stroke="#787F88"
        strokeWidth="2"
        strokeMiterlimit="10"
        strokeLinecap="round"
      />
      <path
        d="M8.81421 6.1365L11.6496 3.26296C11.924 2.91235 12.4576 2.91235 12.732 3.26296L15.5674 6.1365"
        stroke="#787F88"
        strokeWidth="2"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.1909 3.25537V13.9263"
        stroke="#787F88"
        strokeWidth="2"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

Export.propTypes = {
  size: PropTypes.number,
};
Export.defaultProps = {
  size: 24,
};
export default Export;

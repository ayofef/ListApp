import React from 'react';
import { number, string } from 'prop-types';

const Check = ({ width, height, fill }) => (
  <svg width={width} height={height} viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.4041 0.95958C11.7946 1.3501 11.7946 1.98327 11.4041 2.37379L4.73745 9.04046C4.34693 9.43098 3.71376 9.43098 3.32324 9.04046L0.292933 6.01016C-0.097591 5.61963 -0.097591 4.98647 0.292933 4.59594C0.683458 4.20542 1.31662 4.20542 1.70715 4.59594L4.03034 6.91914L9.9899 0.95958C10.3804 0.569056 11.0136 0.569056 11.4041 0.95958Z"
      fill={fill}
    />
  </svg>
);

Check.propTypes = {
  width: number,
  height: number,
  fill: string,
};

Check.defaultProps = {
  width: 12,
  height: 10,
  fill: '#1F25F4',
};

export default Check;
